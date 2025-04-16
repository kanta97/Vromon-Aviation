/**
 * Created by Shohanur on 9/4/2019.
 */
/**
 * Created by Shohanur on 9/4/2019.
 */
'use strict';
var Resp = require('../model/Resp.js');
var Response = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

const { responseMessage }  = require('../config/responseMessage');
const priceFactor = require('../model/priceFactor');

exports.list_all_priceFactor = function (req, res) {
    priceFactor.allPriceFactor(req,function (err, currency) {
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

exports.create_priceFactor = function (req, res) {



    priceFactor.createPriceFactor(req, function (err, priceFactor) {

        if(err ) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);

        }
        else{
            var resp = new Resp({"msg":"insertion successful"}, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,priceFactor,err);

    });
}




exports.update_priceFactor = function (req, res) {

    priceFactor.updatePriceFactorByID(req, function (err, response) {


        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(response, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};


exports.delete_priceFactor = function (req, res) {


    priceFactor.deletePriceFactorByID(req, function (err, currency) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            if(currency.affectedRows == 0){
                var resp = new Resp("This Price factor rate Not Available", "200 OK");
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
