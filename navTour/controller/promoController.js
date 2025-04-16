'use strict';
var Promo = require('../model/promo');
var Resp = require('../model/Resp.js');
var RespWithLimit = require('../model/respWithLimit');
var logger = require('../middleware/logger');
const { responseMessage, responseMessageKey,respMsg }  = require('../config/responseMessage');

exports.create_promo = function (req, res) {

    Promo.create_promo(req, function (err, response) {

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

exports.assign_user = function (req, res) {


    Promo.assign_user(req, function (err, response) {
        console.log(err);
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
exports.update_promo = function (req, res) {

    Promo.update_promo(req.params.id, req, function (err, response) {

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
exports.delete_promo = function (req, res) {

    Promo.delete_promo(req.params.id, req, function (err, response) {

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
exports.check_promo = function (req, res) {
    var resp = {};
    Promo.check_promo(req, function (err, response, status) {

        if (err) {
            resp.discount = 0;
            resp.validityResult = "400 Bad Request";
            resp.message = respMsg.get(responseMessageKey.generic.error)
            res.status(400).json(resp);
        }
        else {
            if(status == 1){
                console.log(response);

                if (typeof response !== "undefined") {
                    var currentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    response.valid_till = response.valid_till.toISOString().slice(0, 19).replace('T', ' ');
                    console.log(response.promo_status);
                    console.log(response.valid_till + " "+ currentdate);
                    if(response.promo_status == 'EXPIRED'){
                        resp.discount = response.discount;
                        resp.validityResult = "INVALID_DATE_EXPIRED";
                        resp.message = respMsg.get(responseMessageKey.promo.invalid);
                    }
                    else if(currentdate <= response.valid_till){
                        console.log(response.valid_till + " "+ currentdate);
                        resp.discount = response.discount;
                        resp.validityResult = "VALID";
                        resp.message = respMsg.get(responseMessageKey.promo.valid);
                    }
                    else{
                        resp.discount = response.discount;
                        resp.validityResult = "INVALID_DATE_EXPIRED";
                        resp.message = respMsg.get(responseMessageKey.promo.invalid);
                    }
                }

                else {
                    resp.discount = 0;
                    resp.validityResult = "INVALID_DOESNOT_EXIST";
                    resp.message = respMsg.get(responseMessageKey.promo.invalid);
                }
                res.status(200).json(resp);
            }
            else{
                resp.discount = 0;
                resp.validityResult = "400 Bad Request";
                resp.message = respMsg.get(responseMessageKey.generic.error)
                res.status(400).json(resp);
            }

        }
        logger.log(req,response,err);

    });
}
exports.get_promo_by_criteria = function (req, res){
    Promo.get_promo_by_criteria(req, function (err, result,records) {
      if (err) {
        var resp = new Resp(respMsg.get(responseMessageKey.generic.error), "400 Bad Request");
        res.status(400).json(resp);
      }
      else {
          console.log(result);
        var respWithLimit = new RespWithLimit(result,"200 OK", records);
        res.status(200).json(respWithLimit);
      }
        logger.log(req,result,err);

    });

};
