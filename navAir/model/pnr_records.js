/**
 * Created by Shohanur on 3/11/2019.
 */
"user strict";
var sql = require("./db.js");
var joi = require("joi");
var moment = require("moment");
var config = require("../config/config");

var Pnr = function (pnr) {
    this.customer = JSON.stringify(pnr.customer);
    this.pnr_response = JSON.stringify(pnr.pnr_response);
    this.customer_id = pnr.customer_id;
    this.price = pnr.price;
    this.pnr_id = pnr.pnr_id;
    this.to_be_paid = pnr.to_be_paid;
    this.coupon_discount = pnr.coupon_discount;
    this.used_coupon = pnr.used_coupon;
    this.payment_status = "NOT_PAID";
    this.pnr_status = "PENDING";
    this.journey_type = pnr.journey_type;
    this.requested = JSON.stringify(pnr.requested);
    var current_time = moment().format("YYYY-MM-DD HH:mm:ss");
    this.created_at = current_time;
    this.updated_at = current_time;
    this.pnr_body = pnr.pnr_body;
    this.payment_mode=pnr.payment_mode;
    this.flight_details=JSON.stringify(pnr.flight_details);
};

let pnr_recrods = `${config.database.live}`;

Pnr.getAllPnr = function getAllPnr(req, result) {
    var query = `Select pnr.*,
                        customer.id           as customer_id,
                        customer.display_name as display_name
                 from ${pnr_recrods}.pnr_records pnr

                          join
                      prod_auth_db.users customer
                      ON pnr.customer_id = customer.id
                 ORDER BY pnr.id DESC`;
    sql.query(query, function (err, res) {
        if (err) {
            // console.log("error: ", err);
            result(null, err);
        } else {
            //console.log('fixed_packages : ', res);

            result(null, res);
        }
    });
};

Pnr.save_pnr = async (pnr) => {
    console.log("inserting ");
    // console.log(pnr)
    sql.query("INSERT INTO pnr_records set ?", pnr, function (err, res) {
        if (err) {
            console.log("error: ", err);
            return null;
        } else {
            let result = JSON.stringify(res);
            console.log("insertedPnr = " + JSON.parse(result).insertId);
            return JSON.parse(result).insertId;
        }
    });
};
// Hotel.updateById = function  (id, hotel, result) {

//     var err = UpdatePnrScema.validate(hotel).error;
//     if (err) {
//         // handle error and abort
//         result(err, null);
//     }
//     else {
//         sql.query("UPDATE hotels set ? where id = ?", [hotel, id], function (err, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//             }
//             else {
//                 result(null, res);
//             }
//         });
//     }
// };

// Hotel.remove = function (id,result) {

//     sql.query("DELETE FROM hotels WHERE id = ?", [id], function (err, res) {

//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else {
//             result(null, res);
//         }
//     });

// };
Pnr.getRecordByUser = function getHotelById(userId, result) {
    sql.query(
        "Select * from pnr_records where customer_id = ? order by created_at desc",
        [userId],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};
module.exports = Pnr;
