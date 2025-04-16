/**
 * Created by Shohanur on 9/4/2019.
 */
/**
 * Created by Shohanur on 9/4/2019.
 */
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');

var PriceFactorSchema = joi.object().keys({
    priceChargeFactor: joi.string().required(),

    updatedAt: joi.string().allow('')
})

class PriceFactor {


    static allPriceFactor(req, result) {
        try {



            var getCurrencyQuery='SELECT * FROM priceChargeFactor';

            sql.query(getCurrencyQuery, function (err, res) {

                if (err) {
                    result(err, null);
                }
                else {

                    result(null, res);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    static createPriceFactor(req, result) {
        var d = new Date();
        var err = PriceFactorSchema.validate(req.body).error;

        if (err) {
            result(err, null);

        }

        else {

            req.body.updatedAt=d;
            sql.query("INSERT INTO priceChargeFactor set ?", req.body, function (err, res) {


                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res.insertId);
                }
            });
        }
    }

    static updatePriceFactorByID(req, result) {

        var err = PriceFactorSchema.validate(req.body).error;



        if (err) {
            result(err, null);

        } else {
            var d = new Date();
            req.body.updatedAt=d;
            sql.query("UPDATE priceChargeFactor SET ? WHERE id =?", [req.body, req.params.id], function (err, res) {

                if (err) {
                    result(err, null);
                }
                else {
                    result(null, "Successfully Updated");
                }
            });
        }
    }
    static deletePriceFactorByID(req, result) {


        sql.query("DELETE FROM priceChargeFactor WHERE id=?", [ req.params.id], function (err, res) {

            if (err) {
                result(err, null);
            }
            else {
                result(null, res);
            }
        });

    }


}
module.exports = PriceFactor;