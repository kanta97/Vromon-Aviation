"user strict";
var sql = require("./db.js");
var joi = require("joi");
const config = require("../config/config");

var BookCustomPackageSchema = joi
  .object()
  .keys({
    userId: joi.string().required(),
    mobileNumber: joi.number().required(),
    email: joi.string().required(),
    paymentMode: joi.string().allow(""),
    promoCode: joi.string().allow(""),
    customPackageReference: joi.string().required(),
  })
  .unknown(true);

class BookCustomPackage {
  constructor(req) {
    this.userId = req.userId;
    this.mobileNumber = req.mobileNumber;
    this.email = req.email;
    this.paymentMode = req.paymentMode;
    this.promoCode = req.promoCode;
    this.customPackageReference = req.customPackageReference;
    var err = BookCustomPackageSchema.validate(this).error;
    if (err) {
      throw new Error(err);
    }
  }
  static Book_Custom_Package(req, result) {
    var resp = {};
    var finalPrice = 0;
    var discount = 0;
    var query;
    var i, j;
    try {
      var bookCustomPackageReq = new BookCustomPackage(req.body);
      if (bookCustomPackageReq.err) {
        result(bookCustomPackageReq.err, null);
        return;
      }
      const booking_ref = bookCustomPackageReq.userId + generateStrings(1, 10);
      resp.bookingReference = booking_ref;
      resp.bookingStatus = "BOOKING_IN_PROGRESS";
      var promo_query =
        "SELECT * FROM promos,promo_user WHERE promos.code = '" +
        bookCustomPackageReq.promoCode +
        "' and promo_user.promo_id = promos.id and promo_user.user_id = '" +
        bookCustomPackageReq.userId +
        "'";
      console.log(promo_query);
      sql
        .sql_query(promo_query)
        .then((rows) => {
          console.log(rows.length);
          if (
            bookCustomPackageReq.promoCode == "" ||
            typeof bookCustomPackageReq.promoCode == undefined
          ) {
          } else {
            if (rows.length == 0) {
              result(null, "invalid promo code");
              return;
            }
            discount = rows[0].discount;
          }

          query =
            "select * from custom_package where  customPackageReference= '" +
            bookCustomPackageReq.customPackageReference +
            "'";
          console.log(query);
          return sql.sql_query(query);
        })
        .then((rows) => {
          if (rows.length == 0) {
            result(null, "invalid customer reference");
            return;
          }
          if (rows[0].bookingStatus == "BOOKING_IN_PROGRESS") {
            result(null, "Already booked");
            return;
          }

          var finalPrice = rows[0].price - (rows[0].price * discount) / 100;
          resp.finalPrice = finalPrice;
          resp.currency = rows[0].currency;
          query =
            "update custom_package set mobileNumber = '" +
            bookCustomPackageReq.mobileNumber +
            "', email = '" +
            bookCustomPackageReq.email +
            "', paymentMode = '" +
            bookCustomPackageReq.paymentMode +
            "',promoCode='" +
            bookCustomPackageReq.promoCode +
            "',bookingReference='" +
            booking_ref +
            "',bookingStatus='BOOKING_IN_PROGRESS',finalPrice=" +
            finalPrice +
            " where customPackageReference = '" +
            bookCustomPackageReq.customPackageReference +
            "'";
          console.log(query);

          return sql.sql_query(query);
          // result(null, "promo successful");
        })
        .then(
          (rows) => {
            result(null, resp);
          },
          (err) => {
            result(null, "rollbacked");
            throw err;
          }
        )
        .catch((err) => {
          console.log("exception handled" + err);
        });
    } catch (e) {
      result(e, req.body);
      console.log(e);
    }
  }
}
const generateStrings = (numberOfStrings, stringLength) => {
  const randomstring = require("randomstring");
  return randomstring.generate(stringLength);
};
var UpdateCustomPackageSchema = joi
  .object()
  .keys({
    mobileNumber: joi.number().required(),
    email: joi.string().required(),
    customPackageReference: joi.string().required(),
  })
  .unknown(true);

class UpdateCustomPackage {
  constructor(req) {
    this.mobileNumber = req.mobileNumber;
    this.email = req.email;
    this.customPackageReference = req.customPackageReference;
    var err = UpdateCustomPackageSchema.validate(this).error;
    if (err) {
      throw new Error(err);
    }
  }
  static updateCustomPackage(req, result) {
    var resp = {};
    var finalPrice = 0;
    var discount = 0;
    var query;
    var i, j;
    try {
      var updateCustomPackage = new UpdateCustomPackage(req.body);
      if (updateCustomPackage.err) {
        result(updateCustomPackage.err, null);
        return;
      }
      query =
        "select * from custom_package where  customPackageReference= '" +
        updateCustomPackage.customPackageReference +
        "'";
      console.log(query);
      sql
        .sql_query(query)
        .then((rows) => {
          console.log(rows.length);
          if (rows.length == 0) {
            result(null, "invalid custom Package Reference");
            return;
          }
          resp.bookingStatus = rows[0].bookingStatus;
          query =
            "update custom_package set mobileNumber = '" +
            updateCustomPackage.mobileNumber +
            "', email = '" +
            updateCustomPackage.email +
            "' where customPackageReference='" +
            updateCustomPackage.customPackageReference +
            "'";
          console.log(query);

          return sql.sql_query(query);
          // result(null, "promo successful");
        })
        .then(
          (rows) => {
            resp.message =
              "Thank you for your booking. We will contact you very soon for further procedures.";
            result(null, resp);
          },
          (err) => {
            result(null, "rollbacked");
            throw err;
          }
        )
        .catch((err) => {
          console.log("exception handled" + err);
        });
    } catch (e) {
      result(e, req.body);
      console.log(e);
    }
  }
}

var BuildCustomPackageReqSchema = joi
  .object()
  .keys({
    location: joi.string().required(),
    travelDate: joi.date().required(),
    travelEndDate: joi.date().required(),
    tourType: joi.string().required(),
    peopleCount: joi.number().integer().required(),
    childrenCount: joi.number().integer().required(),
    infantCount: joi.number().integer().required(),
    numberOfDays: joi.number().integer(),
    user_id: joi.string().required(),
    roomType: joi.array().items({
      type: joi.string().required(),
      count: joi.number().required(),
    }),
  })
  .unknown(true);

class BuildCustomPackageReq {
  constructor(req) {
    this.location = req.location;
    this.travelDate = req.travelDate;
    this.travelEndDate = req.travelEndDate;
    this.tourType = req.tourType;
    this.peopleCount = req.peopleCount;
    this.childrenCount = req.childrenCount;
    this.infantCount = req.infantCount;
    this.numberOfDays = req.numberOfDays;
    this.user_id = req.user_id;
    this.roomType = req.roomType;
    this.days = req.days;
    // this.activityIds = req.activityIds;

    var err = BuildCustomPackageReqSchema.validate(this).error;
    if (err) {
      throw new Error(err);
    }
  }
  static Build_Custom_Package(req, result) {
    var price_resp = {};
    var resp = {};
    var i, j;
    try {
      var buildCustomPackageReq = new BuildCustomPackageReq(req.body);
      if (buildCustomPackageReq.err) {
        result(buildCustomPackageReq.err, null);
        return;
      }
      const custom_ref = buildCustomPackageReq.user_id + generateStrings(1, 7);
      resp.customPackageReference = custom_ref;
      let room_string = "";
      for (i = 0; i < buildCustomPackageReq.roomType.length; i++) {
        room_string =
          room_string +
          buildCustomPackageReq.roomType[i].type +
          "," +
          buildCustomPackageReq.roomType[i].count;
        if (i < buildCustomPackageReq.roomType.length - 1)
          room_string = room_string + "|";
      }
      console.log(room_string);
      let activity_string = "";
      let day_wise_activity_query =
        "insert into day_wise_activity (day, activity_id, custom_reference, seq_num) values ";
      for (i = 0; i < buildCustomPackageReq.days.length; i++) {
        for (j = 0; j < buildCustomPackageReq.days[i].activityIds.length; j++) {
          activity_string =
            activity_string +
            buildCustomPackageReq.days[i].activityIds[j] +
            ",";
          var day = i + 1;
          var activity = j + 1;
          day_wise_activity_query =
            day_wise_activity_query +
            "(" +
            day +
            "," +
            buildCustomPackageReq.days[i].activityIds[j] +
            ",'" +
            custom_ref +
            "'," +
            activity +
            "),";
        }
      }
      var newactivity_string = activity_string.substr(
        0,
        activity_string.length - 1
      );
      var newday_wise_activity_query = day_wise_activity_query.substr(
        0,
        day_wise_activity_query.length - 1
      );

      var get_price_query =
        "SELECT SUM(price) price, currency FROM activity_price_matrix WHERE activity_id IN (" +
        newactivity_string +
        ") AND tour_type = '" +
        buildCustomPackageReq.tourType +
        "'";
      console.log(get_price_query);
      sql
        .sql_query(get_price_query)
        .then((rows) => {
          price_resp = rows;
          var query = "CALL BuildCustomPackage(";
          query =
            query +
            "'" +
            buildCustomPackageReq.location +
            "','" +
            buildCustomPackageReq.travelDate +
            "','" +
            buildCustomPackageReq.travelEndDate +
            "','" +
            buildCustomPackageReq.tourType +
            "'," +
            buildCustomPackageReq.peopleCount +
            "," +
            buildCustomPackageReq.childrenCount +
            "," +
            buildCustomPackageReq.infantCount +
            "," +
            price_resp[0].price +
            ",'" +
            price_resp[0].currency +
            "','" +
            buildCustomPackageReq.user_id +
            "','" +
            custom_ref +
            "','" +
            room_string +
            "','" +
            newactivity_string +
            "')";
          console.log(query);

          resp.currency = price_resp[0].currency;
          return sql.sql_query(query);
          // result(null, "promo successful");
        })
        .then((rows) => {
          resp.price = rows[0][0]._price;
          console.log(newday_wise_activity_query);
          return sql.sql_query(newday_wise_activity_query);
        })
        .then((rows) => {
          var query =
            "SELECT * FROM day_wise_activity d, activities a WHERE d.custom_reference = '" +
            custom_ref +
            "' AND d.activity_id = a.id ORDER BY DAY, seq_num";

          return sql.sql_query(query);
        })
        .then(
          (rows) => {
            var key = 0;
            var key_string = "";
            var itenerary_str = "";
            for (i = 0; i < rows.length; i++) {
              if (rows[i].day != key) {
                key++;
                key_string = "Day-" + key;
                itenerary_str = itenerary_str.substr(
                  0,
                  itenerary_str.length - 1
                );
                itenerary_str = itenerary_str + " " + key_string + ":";
              }
              itenerary_str = itenerary_str + " " + rows[i].description + ",";
            }
            itenerary_str = itenerary_str.substr(0, itenerary_str.length - 1);
            resp.itenerary = itenerary_str;
            result(null, resp);
          },
          (err) => {
            console.log("exception handled" + err);
            result(null, "rollbacked");
            throw err;
          }
        )
        .catch((err) => {
          console.log("exception handled" + err);
        });
    } catch (e) {
      result(e, req.body);
      console.log(e);
    }
  }
}
module.exports = {
  BookCustomPackage,
  UpdateCustomPackage,
  BuildCustomPackageReq,
};
