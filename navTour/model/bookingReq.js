"user strict";
var sql = require("./db.js");
var Room = require("./room");
var Booking = require("./booking.js");
var joi = require("joi");
var request = require("request");
const config = require("../config/config");
const pdfTemplate = require("./../documents/booking-pdf-format");
const pdf = require("html-pdf");
const payment = require("../model/payment");
const {
  responseMessage,
  responseMessageKey,
  respMsg,
} = require("../config/responseMessage");

class BookingReq {
  constructor(req) {
    try {
      let i = 0;
      this.booking = new Booking(
        req.packageId,
        req.tourType,
        generateStrings(1, 5),
        req.peopleCount,
        req.children_count_bed,
        req.children_count_no_bed,
        req.mobileNumber,
        req.email,
        req.paymentMode,
        "BOOKING_IN_PROGRESS",
        req.remark,
        req.userId,
        req.userName,
        req.travelDate,
        req.price
      );
      this.promoCode = req.promoCode;
      this.room = [];
      for (i = 0; i < req.roomType.length; i++) {
        console.log(req.roomType[i].type + req.roomType[i].count);
        this.room.push(
          new Room(req.roomType[i].type, req.roomType[i].count, 0)
        );
      }
    } catch (err) {
      this.err = err;
      return 0;
    }
  }

  static book_fixedpackage(req, result) {
    try {
      var response = {};
      var bookingreq = new BookingReq(req.body);
      var Invoice_no = generateStrings(1, 9);
      let i = 0;
      if (bookingreq.err) {
        console.log(bookingreq.err);
        result(bookingreq.err, null);
        return;
      }
      let room_string = "";
      for (i = 0; i < bookingreq.room.length; i++) {
        room_string =
          room_string +
          bookingreq.room[i].room_type +
          "," +
          bookingreq.room[i].no_of_room;
        if (i < bookingreq.room.length - 1) room_string = room_string + "|";
      }
      console.log(room_string);
      let book_query = "CALL book_package_v2(";
      book_query =
        book_query +
        bookingreq.booking.package_id +
        ",'" +
        bookingreq.booking.tour_type +
        "'," +
        bookingreq.booking.people_count +
        "," +
        bookingreq.booking.children_count_bed +
        "," +
        bookingreq.booking.children_count_no_bed +
        ",'" +
        bookingreq.booking.mobile_no +
        "','" +
        bookingreq.booking.email +
        "','" +
        bookingreq.booking.paymentMode +
        "','" +
        bookingreq.booking.booking_status +
        "','" +
        bookingreq.booking.remark +
        "','" +
        bookingreq.booking.booking_ref +
        "','" +
        bookingreq.booking.user_id +
        "','" +
        bookingreq.booking.userName +
        "','" +
        bookingreq.booking.travel_date +
        "','" +
        bookingreq.promoCode +
        "','" +
        room_string +
        "','" +
        Invoice_no +
        "'," +
        bookingreq.booking.price +
        ")";
      console.log("query", book_query);
      sql
        .sql_query(book_query)
        .then(
          (rows) => {
            console.log(rows[0][0].resp);
            if (rows[0][0].resp > 0) {
              var booking = {};
              console.log(bookingreq.booking);
              var total_no_of_travelers =
                parseInt(bookingreq.booking.people_count) +
                parseInt(bookingreq.booking.children_count_bed) +
                parseInt(bookingreq.booking.children_count_no_bed);

              if (bookingreq.booking.paymentMode == "CASH") {
                response.status = "SUCCESS";
                response.message = respMsg.get(
                  responseMessageKey.booking.new.success
                );
                response.bookingReq = bookingreq.booking;
                result(null, response);
                var receipt_name = "invoice/" + Invoice_no + ".pdf";


                var d = new Date(bookingreq.booking.travel_date);

                var m = d.getMonth() + 1;

                if (d.getMonth() < 9) {
                  m = "0" + m;
                } else {
                  m = m;
                }

                var datestring = d.getDate() + "-" + m + "-" + d.getFullYear();

                pdf
                  .create(
                    pdfTemplate(
                      bookingreq.booking.userName,
                      rows[0][0]._name,
                      rows[0][0]._destination,
                      rows[0][0]._summary,
                      Invoice_no,
                      bookingreq.booking.mobile_no,
                      rows[0][0]._price,
                      datestring,
                      total_no_of_travelers,
                      bookingreq.booking.paymentMode
                    ),
                    {}
                  )
                  .toFile(receipt_name, (err) => {
                    if (err) {
                      return console.log("error");
                    }
                    console.log(
                      "dispatch" +
                      bookingreq.booking.email +
                      bookingreq.booking.userName +
                      receipt_name
                    );

                    var options = {
                      uri: config.notification.dispatcher,
                      method: "POST",
                      json: {
                        notification_type: "bookingConfirmEmail",
                        priority: 1,
                        userName: bookingreq.booking.userName,
                        email: bookingreq.booking.email,
                        file_location: receipt_name,
                        additionalMessage: [
                          {
                            name: bookingreq.booking.userName,
                            booking_ref: bookingreq.booking.booking_ref,
                          },
                        ],
                      },
                      strictSSL: false,
                    };

                    request.post(options, (error, res, body) => {

                      if (error) {
                        console.error(error);
                        return;
                      }

                      var options = {
                        uri: config.notification.dispatcher,
                        method: "POST",
                        json: {
                          notification_type: "bookingConfirmEmailToOfficeSales",
                          priority: 1,
                          userName: bookingreq.booking.userName,
                          email: config.notification.to_office,
                          file_location: receipt_name,
                          additionalMessage: [
                            {
                              name: bookingreq.booking.userName,
                              invoice_no: Invoice_no,
                              package_name: rows[0][0]._name,
                              package_location: rows[0][0]._destination,
                              package_summary: rows[0][0]._summary,
                              total_travelers: total_no_of_travelers,
                              travel_date: datestring,
                              payment_mode: bookingreq.booking.paymentMode,
                              sub_total: rows[0][0]._price,
                              tax: "0",
                              total_amount: rows[0][0]._price,
                              paid: "0",
                              due: rows[0][0]._price,
                              final_balance: rows[0][0]._price,
                              phone_no: bookingreq.booking.mobile_no,
                            },
                          ],
                        },
                        strictSSL: false,
                      };

                      request.post(options, (error, res, body) => {

                        if (error) {
                          console.error(error);
                          return;
                        }

                        options = {
                          uri: config.notification.dispatcher,
                          method: "POST",
                          json: {
                            notification_type: "bookingConfirmSms",
                            priority: 1,
                            userName: bookingreq.booking.userName,
                            number: bookingreq.booking.mobile_no,
                            additionalMessage: [
                              {
                                name: bookingreq.booking.userName,
                                booking_ref: bookingreq.booking.booking_ref,
                              },
                            ],
                          },
                          strictSSL: false,
                        };

                        request.post(options, (error, res, body) => {
                          if (error) {
                            console.error(error);
                            return;
                          }
                          console.log(`statusCode: ${res.statusCode}`);
                          console.log(body);
                        });

                      });

                    });
                  });
              } else {
                payment.do_transaction(
                  bookingreq.booking,
                  rows[0][0],
                  function (err, response) {
                    result(null, response);
                    if (err) {
                      // payment did not succeed
                    } else {
                    }
                  }
                );
              }
              // result(null, payment_resp);
              // result(null, "booking successful");
            } else if (rows[0][0].resp == -1) {
              var resp = {};
              resp.status = "FAILED";
              resp.price = rows[0][0]._price;
              resp.msg = "price mismatch";
              result(null, resp);
            } else if (rows[0][0].resp == 0) {
              var resp = {};
              resp.status = "FAILED";
              resp.msg = "invalid promo";
              result(null, resp);
            } else if (rows[0][0].resp == -2) {
              var resp = {};
              resp.status = "FAILED";
              resp.msg = "invalid tourtype or package";
              result(null, resp);
            } else {
              var resp = {};
              resp.status = "FAILED";
              resp.msg = respMsg.get(responseMessageKey.booking.new.fail);
              result(null, resp);
            }
          },
          (err) => {
            var resp = {};
            resp.status = "FAILED";
            resp.msg = respMsg.get(responseMessageKey.booking.new.fail);
            result(null, resp);
            throw err;
          }
        )
        .catch((err) => {
          console.log("exception handled" + err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  static searchbookedpackage(req, result) {
    var resp = {};
    try {
      var query = require("url").parse(req.url, true).query;
      var tour_type = query.tour_type;
      var mobile_no = query.mobile_no;
      var email = query.email;
      var booking_ref = query.booking_ref;
      var user_id = query.user_id;
      var limit = query.limit;
      var offset = query.offset;
      var search_params = {};
      if (typeof tour_type !== "undefined") {
        search_params.tour_type = tour_type;
      }
      if (typeof mobile_no !== "undefined") {
        search_params.mobile_no = mobile_no;
      }
      if (typeof booking_ref !== "undefined") {
        search_params.booking_ref = booking_ref;
      }
      if (typeof email != "undefined") {
        search_params.email = query.email;
      }
      if (typeof user_id != "undefined") {
        search_params.user_id = query.user_id;
      }
      var count = 0;
      var search_query = "select * from booking ";
      var search_count_query = "select count(*) records from booking ";
      for (var i in search_params) {
        if (count == 0) {
          search_query = search_query + "where ";
          search_count_query = search_count_query + "where ";
        }
        count++;
        search_query = search_query + i + " = '" + search_params[i] + "'";
        search_count_query =
          search_count_query + i + " = '" + search_params[i] + "'";
        if (Object.keys(search_params).length > count) {
          search_query = search_query + " and ";
          search_count_query = search_count_query + " and ";
        }
      }
      if (typeof limit != "undefined" && typeof offset != "undefined") {
        search_query =
          search_query + " ORDER BY id DESC LIMIT " + offset + "," + limit;
      }
      console.log(search_query);
      console.log(search_count_query);
      sql
        .sql_query(search_query)
        .then((rows) => {
          resp = rows;
          return sql.sql_query(search_count_query);
        })
        .then(
          (rows) => {
            console.log(rows[0].records);
            result(null, resp, rows[0].records);
          },
          (err) => {
            result(null, "Failed", 0);
            throw err;
          }
        )
        .catch((err) => {
          console.log("exception handled");
        });
    } catch (e) {
      console.log(e);
    }
  }
}

const generateStrings = (numberOfStrings, stringLength) => {
  const randomstring = require("randomstring");
  return randomstring.generate(stringLength);
};

module.exports = BookingReq;
