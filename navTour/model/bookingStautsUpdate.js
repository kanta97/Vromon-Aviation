/**
 * Created by Shohanur on 3/28/2019.
 */
"user strict";
var sql = require("./db.js");
var Room = require("./room");
var Booking = require("./booking.js");
var joi = require("joi");
var request = require("request");
const pdf = require("html-pdf");
var config = require("../config/config");
const pdfTemplate = require("./../documents/Updatebooking-pdf-format");

var UpdateBookingStatusSchema = joi.object().keys({
  booking_ref: joi.string().min(4).required(),
  booking_status: joi.string().required(),
});

var BookingStatusUpdateReq = function (updateStsRq) {
  this.booking_ref = updateStsRq.booking_ref;
  this.booking_status = updateStsRq.booking_status;
};

BookingStatusUpdateReq.statusUpdate = function statusUpdate(
  newBookingStatusUpdateReq,
  result
) {
  var err = UpdateBookingStatusSchema.validate(newBookingStatusUpdateReq).error;

  if (err) {
    result(err, null);
  } else {
    try {
      sql.query(
        "UPDATE booking set booking_status =? where booking_ref=?",
        [
          newBookingStatusUpdateReq.booking_status,
          newBookingStatusUpdateReq.booking_ref,
        ],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
          } else {
            var booking_details_query =
              "SELECT booking.email,booking.mobile_no,booking.userName,fixed_packages.destination,fixed_packages.summary,booking.price,booking.travel_date,booking.people_count,fixed_packages.`name` FROM booking RIGHT JOIN fixed_packages ON booking.package_id=fixed_packages.id WHERE booking.booking_ref ='" +
              newBookingStatusUpdateReq.booking_ref +
              "'";
            console.log(booking_details_query);
            sql.sql_query(booking_details_query, function (err, res) {
              if (err) {
                result(err, null, "Something went wrong");
              } else {
                console.log(res[0]);
                var data = res[0];
                if (data !== undefined) {
                  name = data["name"];
                  number = data["mobile_no"];
                  email = data["email"];

                  var Invoice_no = generateStrings(1, 9);
                  console.log("invoice number=" + Invoice_no);
                  var receipt_name = "invoice/" + Invoice_no + ".pdf";
                  pdf
                    .create(
                      pdfTemplate(
                        data["userName"],
                        data["name"],
                        data["destination"],
                        data["summary"],
                        Invoice_no,
                        data["mobile_no"],
                        data["price"],
                        data["travel_date"],
                        data["people_count"],
                        newBookingStatusUpdateReq.booking_status,
                        0
                      ),
                      {}
                    )
                    .toFile(receipt_name, (err) => {
                      if (err) {
                        console.log("pdf generate error");
                      }
                      var payload_data_mobile = {};
                      payload_data_mobile["notification_type"] =
                        "bookingUPDATEsms";
                      payload_data_mobile["priority"] = 1;
                      payload_data_mobile["additionalMessage"] = [
                        {
                          name: data["userName"],
                          packageName: name,
                          status: newBookingStatusUpdateReq.booking_status,
                          reference: newBookingStatusUpdateReq.booking_ref,
                        },
                      ];
                      payload_data_mobile["number"] = number;

                      if (
                        newBookingStatusUpdateReq.booking_status ==
                          "BOOKED_CASH_PAID" ||
                        newBookingStatusUpdateReq.booking_status ==
                          "CASH_RECEIVED"
                      ) {
                        console.log("here inside cash payment");
                        var payload_data = {};
                        payload_data["notification_type"] =
                          "bookingUPDATEemail";
                        payload_data["priority"] = 1;
                        payload_data["additionalMessage"] = [
                          {
                            name: data["userName"],
                            packageName: name,
                            status: newBookingStatusUpdateReq.booking_status,
                            reference: newBookingStatusUpdateReq.booking_ref,
                          },
                        ];
                        payload_data["email"] = email;
                        payload_data["file_location"] = receipt_name;
                      } else {
                        var payload_data = {};
                        payload_data["notification_type"] =
                          "bookingUPDATEemail";
                        payload_data["priority"] = 1;
                        payload_data["additionalMessage"] = [
                          {
                            name: data["userName"],
                            packageName: name,
                            status: newBookingStatusUpdateReq.booking_status,
                            reference: newBookingStatusUpdateReq.booking_ref,
                          },
                        ];
                        payload_data["email"] = email;
                      }
                      request.post(
                        {
                          headers: {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                          },
                          url: config.notification.dispatcher,
                          body: JSON.stringify(payload_data),
                          strictSSL: false,
                        },
                        function (error, response, body) {
                          console.log(error);

                          if (!error && response.statusCode == 200) {
                            var obj = JSON.parse(body);
                            var status = obj.status;
                            if (status) {
                              request.post(
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                    "cache-control": "no-cache",
                                  },
                                  url: config.notification.dispatcher,
                                  body: JSON.stringify(payload_data_mobile),
                                  strictSSL: false,
                                },
                                function (error, response, body) {
                                  console.log(error);

                                  if (!error && response.statusCode == 200) {
                                    var obj = JSON.parse(body);
                                    var status = obj.status;
                                    if (status) {
                                      console.log(
                                        "Notification has been has been sent to your mobile"
                                      );
                                    } else {
                                      console.log(
                                        "Notification has been has been sent to your mobile"
                                      );
                                    }
                                  } else {
                                    console.log(
                                      "Notification has been has not been sent to your mobile"
                                    );
                                  }
                                }
                              );
                              result(
                                null,
                                true,
                                "Notification has been has been sent to your email"
                              );
                            } else {
                              result(
                                null,
                                false,
                                "Notification has been has not been sent to your email"
                              );
                            }
                          } else {
                            result(
                              null,
                              false,
                              "Notification has been has not been sent to your email"
                            );
                            console.log("without 200");
                          }
                        }
                      );
                    });

                  /* Hit notification dispacther for email send*/
                } else {
                  console.log("here inside data undefined");
                  result(
                    true,
                    null,
                    "Notification has been has not been sent to your email"
                  );
                }
              }
            });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
};

const generateStrings = (numberOfStrings, stringLength) => {
  const randomstring = require("randomstring");
  return randomstring.generate(stringLength);
};

module.exports = BookingStatusUpdateReq;
