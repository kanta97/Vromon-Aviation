"user strict";
var sql = require("./db.js");

const config = require("../config/config");
const create_pnr_function = require("../function/pnrFunction")
var request = require("request");

const {
    responseMessage,
    responseMessageKey,
    respMsg,
} = require("../config/responseMessage");
const axios = require("axios");

// require('request').debug = true
class Payment {
    constructor(req) {
    }

    static listen_ipn(req, callback) {
        console.log("listen ipn body before change", req.body)
        create_pnr_function(req,callback);
        // req.body={...req.body,booking_ref:req.body.tran_id}
        // console.log("body after change",req.body)
        // let query =
        //     "SELECT pnr.id , pnr.pnr_id , pnr.customer, pnr.pnr_body FROM pnr_records pnr WHERE pnr.pnr_id ='" +
        //     req.body.booking_ref +
        //     "' AND payment_status != 'PAID' ORDER BY created_at DESC";
        // sql
        //     .sql_query(query)
        //     .then( async (rows) => {
        //         console.log("result", rows);
        //         if (rows.length == 0) {
        //             callback(null, {
        //                 rows: rows,
        //                 success: false,
        //                 req: req.body,
        //             });
        //         } else {

        //             let pnr_body = JSON.parse(rows[0].pnr_body);
        //             let result = await this.pnr_create_actual(pnr_body);
        //             console.log("pnr result = " + result);
        //             if (result && result.success) {
        //                 let payload = result.payload;
        //                 let pnrId = payload.CreatePassengerNameRecordRS.ItineraryRef.ID;
        //                 query =
        //                     "update pnr_records set payment_status = 'PAID', bank_trans_id='" +
        //                     req.body.bank_tran_id +
        //                     "'," +
        //                     "currency='" +
        //                     req.body.currency +
        //                     "'," +
        //                     "pnr_id='" +
        //                     pnrId +
        //                     "'," +
        //                     "pnr_response='" +
        //                     payload +
        //                     "'" +
        //                     " where pnr_id='" +
        //                     req.body.booking_ref +
        //                     "'";
        //                 console.log("listen er por e", req.body);

        //                 var customer_info = JSON.parse(rows[0].customer);
        //                 this.sendSMS(customer_info);
        //                 let mail_payload_data = {
        //                     from: config.notification.from_email,
        //                     to: customer_info.email,
        //                     subject: "Navigator Travels",
        //                     html: `Hello ${customer_info.name} ${customer_info.surname}, thank you for booking at Navigator Tourism Ltd. Your air booking pnr reference number is ${pnrId}. We will get back to you shortly.`,
        //                 };
        //                 this.sendEmail(mail_payload_data);
        //                 let update = await sql.sql_query(query);
        //                 console.log("update = " + update);
        //                 if (update) {
        //                     return {
        //                         success : true,
        //                         message : mail_payload_data.html
        //                     }
        //                 }
        //             } else {

        //                 return {
        //                     success : false,
        //                     message : result ? result.message : "Internal Server Error"
        //                 }
        //             }
        //         }
        //     })
        //     .then((rows) => {
        //         callback(null, {
        //             success: rows.success,
        //             req: req.body,
        //             message: rows.message
        //         });
        //     });
    }

    static pnr_create_actual (body) {
        console.log("pnr_create_actual");
        let token = body.token;
        if (typeof token == "string") token = token.split(" ").join("");

        axios
            .post(
                config.pnr_api_url + "/sabre/create_pnr",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {

                let responseData = response.data;
                console.log("Pnr response = " + JSON.stringify(responseData));
                let result = {};

                if (responseData.CreatePassengerNameRecordRS.ApplicationResults.status === "Complete") {
                    result = {
                        success : true,
                        payload : responseData,
                        message : ""
                    }
                    return result;
                } else {
                    console.log("pnr response else for other status");
                    let errors = responseData.CreatePassengerNameRecordRS.ApplicationResults.Error;
                    let warnings = responseData.CreatePassengerNameRecordRS.ApplicationResults.Warning;
                    let message = "Pnr creation failed due to an error.";
                    errors.forEach(error => {
                        message += "\n" + error.SystemSpecificResults[0].Message[0].code + ": " + error.SystemSpecificResults[0].Message[0].content;
                    })
                    warnings.forEach(warning => {
                        message += "\n" + warning.SystemSpecificResults[0].Message[0].code + ": " + warning.SystemSpecificResults[0].Message[0].content;
                    })
                    result = {
                        success : false,
                        payload : null,
                        message : message
                    }
                    return result;
                }
            })
            .catch((err) => {
                console.log("pnr response error = " + err);
                if (err.response) {
                    console.log(err.response.data); // => the response payload
                }
                return {
                    success : false,
                    payload : null,
                    message : "PNR creation failed with an error."
                }
            });
    }

    static sendSMS(customer_info) {
        var payload_data = {};
        payload_data["from"] = config.notification.from_sms;
        payload_data["to"] = customer_info.contact_number;
        payload_data["text"] =
            "Your ticket issue is in process. we will keep you updated";
        request.post(
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                    "cache-control": "no-cache",
                },
                url: config.notification.sms,
                body: JSON.stringify(payload_data),
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var obj = JSON.parse(body);
                    console.log("sms response : ", obj);
                }
            }
        );
    }

    static sendEmail(mail_payload_data) {
        var contentLength = mail_payload_data.length;
        console.log(mail_payload_data);
        request.post(
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Content-Length": contentLength,
                    Authorization: "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                    "cache-control": "no-cache",
                },
                url: config.notification.email,
                formData: mail_payload_data,
                method: "POST",
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var obj = JSON.parse(body);

                    console.log("Email successfully sent : ", obj);
                } else {
                    console.log("Email api response without 200");
                }
            }
        );
    }

    static do_transaction(bookingReq, result) {
        let payment_config = config.payment_mode == "live" ? config.payment_ssl_prod : config.payment_ssl_dev;

        var response = {};
        console.log('using config : ', payment_config);
        var postData = {
            store_id: payment_config.store_id,
            store_passwd: payment_config.store_passwd,
            total_amount: bookingReq.to_be_paid,
            currency: "BDT",
            tran_id: bookingReq.booking_ref,
            success_url: payment_config.success_url + bookingReq.booking_ref,
            fail_url: payment_config.fail_url,
            cancel_url: payment_config.cancel_url,
            cus_name: bookingReq.userName,
            cus_email: bookingReq.email,
            cus_phone: bookingReq.mobile_no,
        };
        request.post(
            {
                uri: payment_config.paymenturl,
                headers: {"content-type": "application/x-www-form-urlencoded"},
                body: require("querystring").stringify(postData),
            },
            function (error, res, body) {
                console.log("after payment resp = " + body);
                var resp = JSON.parse(body);
                console.log("respMsg = " + JSON.stringify(respMsg));
                console.log("res status" + JSON.stringify(res));
                if (!error && resp.status == "SUCCESS") {
                    response.GatewayPageURL = resp.GatewayPageURL;
                    response.status = resp.status;
                    response.total_amount = bookingReq.to_be_paid;
                    response.booking_ref = bookingReq.booking_ref;
                    response.msg = respMsg.get(responseMessageKey.booking.new.success);
                    result(null, response);
                    //return response;
                } else {
                    response.status = "FAILED";
                    response.failedreason = resp.failedreason;
                    response.msg = respMsg.get(responseMessageKey.booking.new.fail);
                    result(null, response);
                    //return response;
                }
                // console.log(resp.failedreason);
            }
        );
    }

    static payment_success(req, result) {
        var query;
        var bookingResp = {};
        console.log(req);
        query =
            "SELECT * FROM fixed_packages f, booking b, transactions t WHERE f.id = b.package_id AND t.booking_ref = b.booking_ref AND b.booking_ref ='" +
            req.booking_ref +
            "'";
        sql
            .sql_query(query)
            .then((rows) => {
                bookingResp = rows[0];
                console.log("query = " + query + "length = " + rows.length);
                if (rows.length == 0) {
                    return;
                }
                // booking_ref = bookingResp.booking_ref;
                query =
                    "update transactions set status = '" +
                    req.status +
                    "' where tran_id='" +
                    req.booking_ref +
                    "'";
                console.log(query);

                return sql.sql_query(query);
            })
            .then((rows) => {
                query =
                    "update booking set booking_status = '" +
                    req.status +
                    "' where booking_ref='" +
                    req.booking_ref +
                    "'";
                console.log(query);

                return sql.sql_query(query);
            })
            .then(
                (rows) => {
                    console.log("successful");


                },
                (err) => {
                    throw err;
                }
            )
            .catch((err) => {
                console.log("exception handled" + err);
            });
        result(null, "200 OK");
    }
}

module.exports = Payment;
