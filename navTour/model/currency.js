/**
 * Created by Shohanur on 9/4/2019.
 */
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');

var CurrencySchema = joi.object().keys({
    toCurrency: joi.string().required(),
    fromCurrency: joi.string().required(),
    conversionRate: joi.string().required(),
    updatedBy: joi.string().allow(''),
    updatedAt: joi.string().allow('')
})

class Currency {


    static allCurrency(req, result) {
        try {



            var getCurrencyQuery='SELECT * FROM currencyConversionRate';

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
    static createCurrencyRate(req, result) {
        var d = new Date();
        var err = CurrencySchema.validate(req.body).error;

         if (err) {
         result(err, null);

         }

         else {
             sql.query("SELECT * FROM currencyConversionRate WHERE fromCurrency=? AND toCurrency=?",[req.body.fromCurrency,req.body.toCurrency],function (err, res) {
                 console.log("here"+err);

                 if (err) {
                     result(err, null);
                 }
                 else {
                     console.log("first query"+res.length);
                     if(res.length>=1){
                         result("This conversion has already been added", null);


                     }else {
                         req.body.updatedAt=d;
                         sql.query("INSERT INTO currencyConversionRate set ?", req.body, function (err, res) {

                             if (err) {
                                 result(err, null);
                             }
                             else {
                                 result(null, res.insertId);
                             }
                         });
                     }



                 }
             })


         }
    }

    static updateCurrencyRateByID(req, result) {

        var err = CurrencySchema.validate(req.body).error;



        if (err) {
            result(err, null);

        } else {

            sql.query("SELECT * FROM currencyConversionRate WHERE fromCurrency=? AND toCurrency=?",[req.body.fromCurrency,req.body.toCurrency],function (err, res) {


                if (err) {
                    result(err, null);
                }
                else {
                    if(res.length>=1){
                        result("This update is not possible.. Already exits", null);


                    }else {
                        var d = new Date();
                        req.body.updatedAt=d;
                        sql.query("UPDATE currencyConversionRate SET ? WHERE id =?", [req.body, req.params.id], function (err, res) {

                            if (err) {
                                result(err, null);
                            }
                            else {
                                result(null, "Successfully Updated");
                            }
                        });
                    }



                }
            })

        }
    }
    static deleteCurrencyRateByID(req, result) {


            sql.query("DELETE FROM currencyConversionRate WHERE id=?", [ req.params.id], function (err, res) {

                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            });

    }
    static getCurrency(req, result) {
        try {



            var getCurrencyQuery='SELECT * FROM currencyConversionRate WHERE fromCurrency=? AND toCurrency=? ORDER BY updatedAt DESC';

            sql.query(getCurrencyQuery,[req.params.toCurrency,req.params.fromCurrency], function (err, res) {

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


}
module.exports = Currency;