
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');

var BuildCustomPackageRespSchema = joi.object().keys({
    customPackageReference: joi.string().allow(''),
    itinerary: joi.string().allow(''),
    currency: joi.string().allow(''),
}).unknown(true);

class BuildCustomPackageResp {
    constructor(customPackageReference, itinerary, price, currency) {
        this.customPackageReference = customPackageReference;
        this.itinerary = itinerary;
        this.price = price;
        this.currency = currency;
       
        var err = BuildCustomPackageRespSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }
}
module.exports = BuildCustomPackageResp;