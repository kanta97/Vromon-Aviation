'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');
var md5 = require('md5');
var request = require('request');
const pdf = require('html-pdf');
const pdfTemplate = require('./../documents/booking-pdf-format');
var logger = require('../middleware/logger');
const { responseMessage, responseMessageKey, respMsg } = require('../config/responseMessage');

// require('request').debug = true
class Payment {
    constructor(req) {


    }
    static listen_ipn(req, result, booking_ref) {
        try {
            let tran_id;
            if (booking_ref) {
                tran_id = booking_ref;
            } else {
                tran_id = req.params.tran_id;
            }
            console.log("got tran_id", tran_id)
            logger.log("listen ipn called" + tran_id);
            var query;
            var i = 0;
            var bookingResp = {};
            /*logger.log("listen ipn called" + req.body['verify_key']);
            var i = 0;
            var store_passwd = md5(config.payment_ssl.store_passwd);
            // JSON.stringify(req.body);
            var verify_key = req.body['verify_key'];
            var verify_key_arr = verify_key.split(',');
            verify_key_arr[verify_key_arr.length] = 'store_passwd';
            verify_key_arr.sort();
            var hash_string = '';
            var query;
            var bookingResp = {};
            for (i = 0; i < verify_key_arr.length; i++) {
                if(verify_key_arr[i] == 'store_passwd') {
                    hash_string = hash_string + verify_key_arr[i] + "=" + store_passwd + '&';
                }
                else{
                    hash_string = hash_string + verify_key_arr[i] + "=" + req.body[verify_key_arr[i]] + '&';
                }
            }
            hash_string = hash_string.substring(0, hash_string.length - 1);
            logger.log(hash_string);
            logger.log(md5(hash_string));
            logger.log(req.body['verify_sign']);
            if (md5(hash_string) == req.body['verify_sign']) {
                console.log("match");

                var url = config.payment_ssl.validation_api + '?val_id=' + req.body['val_id'] + '&store_id=' + config.payment_ssl.store_id + '&store_passwd=' + config.payment_ssl.store_passwd + '&format=json';
                request.get(url, function (error, response, body) {
                    logger.log(url);
                    logger.log(response.statusCode);
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        var resp = JSON.parse(body);
                        query = "SELECT * FROM fixed_packages f, booking b, transactions t WHERE f.id = b.package_id AND t.booking_ref = b.booking_ref AND b.booking_ref ='" + resp.tran_id + "'";*/
            query = "SELECT * FROM fixed_packages f, booking b, transactions t WHERE f.id = b.package_id AND t.booking_ref = b.booking_ref AND b.booking_ref ='" + tran_id + "'";

            sql.sql_query(query)
                .then(rows => {
                    bookingResp = rows[0];
                    logger.log("query = " + query + "length = " + rows.length);
                    if (rows.length == 0) {
                        return;
                    }
                    // booking_ref = bookingResp.booking_ref;
                    //query = "update transactions set status = '" + resp.status + "' where tran_id='" + resp.tran_id + "'";
                    query = "update transactions set status = 'BOOKED', bank_trans_id='" + req.body.bank_tran_id + "' " + "where tran_id='" + tran_id + "'";
                    logger.log(query);

                    return sql.sql_query(query);
                })
                .then(rows => {
                    //query = "update booking set booking_status = '" + resp.status + "' where booking_ref='" + resp.tran_id + "'";
                    query = "update booking set booking_status ='BOOKED' where booking_ref='" + tran_id + "'";

                    logger.log(query);

                    return sql.sql_query(query);
                })
                .then(rows => {
                    logger.log("successful");
                    var total_no_of_travelers = bookingResp.people_count + bookingResp.children_count_bed + bookingResp.children_count_no_bed;
                    var receipt_name = "invoice/" + bookingResp.invoice_no + ".pdf";

                    var d = new Date(bookingResp.travel_date);

                    var m = d.getMonth() + 1;

                    if (d.getMonth() < 9) {
                        m = "0" + m;
                    } else {
                        m = m;
                    }

                    var datestring = d.getDate() + "-" + m + "-" + d.getFullYear();


                    pdf.create(pdfTemplate(
                        bookingResp.userName,
                        bookingResp.name,
                        bookingResp.destination,
                        bookingResp.summary,
                        bookingResp.invoice_no,
                        bookingResp.mobile_no,
                        bookingResp.price,
                        datestring,
                        total_no_of_travelers,
                        bookingResp.paymentMode
                    ), {}).toFile(receipt_name, (err) => {

                        if (err) {
                            return console.log('pdf creation error' + err);
                        }

                        logger.log("dispatch" + bookingResp.email + bookingResp.userName + receipt_name);

                        var options = {
                            uri: config.notification.dispatcher,
                            method: 'POST',
                            json: {
                                notification_type: "bookingConfirmEmail",
                                priority: 1,
                                userName: bookingResp.userName,
                                email: bookingResp.email,
                                file_location: receipt_name,
                                additionalMessage: [{
                                    name: bookingResp.userName,
                                    booking_ref: bookingResp.booking_ref
                                }]
                            },
                            strictSSL: false
                        };

                        request.post(options, (error, res, body) => {
                            if (error) {
                                logger.log(error)
                                return
                            }

                            var options = {
                                uri: config.notification.dispatcher,
                                method: 'POST',
                                json: {
                                    notification_type: "bookingConfirmEmailToOfficeSales",
                                    priority: 1,
                                    userName: bookingResp.userName,
                                    email: config.notification.to_office,
                                    file_location: receipt_name,
                                    additionalMessage: [{
                                        name: bookingResp.userName,
                                        invoice_no: bookingResp.invoice_no,
                                        package_name: bookingResp.name,
                                        package_location: bookingResp.destination,
                                        package_summary: bookingResp.summary,
                                        total_travelers: total_no_of_travelers,
                                        travel_date: datestring,
                                        payment_mode: bookingResp.paymentMode,
                                        sub_total: bookingResp.price,
                                        tax: "0",
                                        total_amount: bookingResp.price,
                                        paid: bookingResp.price,
                                        due: "0",
                                        final_balance: "0",
                                        phone_no: bookingResp.mobile_no,
                                    }]
                                },
                                strictSSL: false
                            };

                            request.post(options, (error, res, body) => {
                                if (error) {
                                    logger.log(error)
                                    return
                                }

                                options = {
                                    uri: config.notification.dispatcher,
                                    method: 'POST',
                                    json: {
                                        notification_type: "bookingConfirmSms",
                                        priority: 1,
                                        userName: bookingResp.userName,
                                        number: bookingResp.mobile_no,
                                        additionalMessage: [{
                                            name: bookingResp.userName,
                                            booking_ref: bookingResp.booking_ref
                                        }]
                                    },
                                    strictSSL: false
                                };
                                request.post(options, (error, res, body) => {
                                    if (error) {
                                        logger.log(error)
                                        return
                                    }
                                    logger.log(`statusCode: ${res.statusCode}`)
                                    logger.log(body)
                                });
                            });
                        });
                    });
                    return;
                }, err => {
                    throw err;
                })
                .catch(err => {
                    logger.log("exception handled" + err);
                });
            /*}
            else{
                logger.log("error in validation" + error);
            }
        }
        );
        result(null, '200 OK');
    }
    else {
        logger.log("match failed");
        result(null, '200 OK');
    }*/
            result(null, '200 OK');
        } catch (err) {
            logger.log("exception handled" + err);
            result(err, 'FAILED');
        }
    }

    static do_transaction(bookingReq, bookingResp, result) {
        var response = {};
        var postData = {
            store_id: config.payment_ssl.store_id,
            store_passwd: config.payment_ssl.store_passwd,
            // total_amount: bookingResp._price,
             total_amount: bookingReq.price,

            campaign_code:bookingReq.package_id=="294"?"INT_PACK_01":
            bookingReq.package_id=="302"?"INT_PACK_01":"",

            currency: bookingResp._currency,
            tran_id: bookingReq.booking_ref,
            success_url: config.payment_ssl.success_url + "/" + bookingReq.booking_ref,
            fail_url: config.payment_ssl.fail_url,
            cancel_url: config.payment_ssl.cancel_url,
            cus_name: bookingReq.userName,
            cus_email: bookingReq.email,
            cus_phone: bookingReq.mobile_no

        };
        request.post({
            uri: config.payment_ssl.paymenturl,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: require('querystring').stringify(postData)
        }, function (error, res, body) {
            console.log(body);
            var resp = JSON.parse(body);
            // console.log(res.statusCode);
            if (!error && res.statusCode == 200) {
                response.GatewayPageURL = resp.GatewayPageURL;
                response.status = resp.status;
                response.total_amount = bookingResp._price;
                response.bookingReq = bookingReq;
                response.msg = respMsg.get(responseMessageKey.booking.new.success);
                result(null, response);
                //return response;
            }
            else {
                response.status = 'FAILED';
                response.failedreason = resp.failedreason;
                response.msg = respMsg.get(responseMessageKey.booking.new.fail);
                result(null, response);
                //return response;
            }
            console.log(resp.failedreason);
        });
    }

    static payment_success(req, result) {

        console.log(req);
        result(null, req);
    }
}
module.exports = Payment