'use strict';
var Payment = require('../model/payment');
var Resp = require('../model/Resp.js');
var RespWithLimit = require('../model/respWithLimit');
var logger = require('../middleware/logger');
const { responseMessage, responseMessageKey,respMsg }  = require('../config/responseMessage');

exports.listen_ipn = function (req, res) {

    Payment.listen_ipn(req, function (err, response) {

        if (err) {
            var resp = new Resp(respMsg.get(responseMessageKey.generic.error), "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({ "msg": response }, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};
exports.payment_success = function (req, res) {
    console.log("success url " + req);
    res.status(400).json("200 OK");
    // Payment.payment_success(req, function (err, response) {

    //     if (err) {
    //         var resp = new Resp(respMsg.get(responseMessageKey.generic.error), "400 Bad Request");
    //         res.status(400).json(resp);
    //     }
    //     else {
    //         var resp = new Resp({ "msg": response }, "200 OK");
    //         res.status(200).json(resp);
    //     }
    // });
};

