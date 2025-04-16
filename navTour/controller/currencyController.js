/**
 * Created by Shohanur on 9/4/2019.
 */
'use strict';
var Fixedpackage = require('../model/fixedpackage.js');
var Resp = require('../model/Resp.js');
var Response = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

var RespWithLimit = require('../model/respWithLimit.js');
const { responseMessage, responseMessageKey,respMsg }  = require('../config/responseMessage');
const Currency = require('../model/currency');

exports.list_all_currencies = function (req, res) {
    Currency.allCurrency(req,function (err, currency) {
        if (err) {

            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(err);
        }else {
            var resp = new Resp(currency, "200 OK");
            res.status(200).json(resp);
            logger.log(req,currency,err);
        }


    });
};

exports.create_currencyRate = function (req, res) {


    Currency.createCurrencyRate(req, function (err, activity) {

        if(err ) {
            var resp = new Resp(err, "400 Bad Request");
            res.status(400).json(resp);

        }
        else{
            var resp = new Resp({"msg":"insertion successful"}, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,activity,err);

    });
}



exports.update_currencyRate = function (req, res) {

    Currency.updateCurrencyRateByID(req, function (err, response) {


        if (err) {
            var resp = new Resp(err, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(response, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};


exports.delete_currencyRate = function (req, res) {


    Currency.deleteCurrencyRateByID(req, function (err, currency) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            if(currency.affectedRows == 0){
                var resp = new Resp("This currency rate Not Available", "200 OK");
                res.status(200).json(resp);
            }
            else{
                var resp = new Resp("Delete successful", "200 OK");
                res.status(200).json(resp);
            }

        }
        logger.log(req,currency,err);

    });
};

exports.search_currency_by_destination = function (req, res){
    Currency.getCurrency(req, function(err, currency) {
        if (err) {
            var resp = new Response(err, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Response(currency, "200 OK");
            res.status(400).json(resp);

        }
        logger.log(req,currency,err);
    });



};
