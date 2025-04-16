
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');

var CustomPackageSchema = joi.object().keys({
    location: joi.string().allow(''),
    travelDate: joi.date(),
    travelEndDate: joi.date(),
    tourType: joi.string(),
    peopleCount: joi.number().integer(),
    childrenCount: joi.number().integer(),
    infantCount: joi.number().integer(),
    price: joi.number(),
    customPackageReference: joi.string().allow(''),
    itinerary: joi.string().allow(''),
    currency: joi.string().allow(''),
    mobileNumber: joi.string(),
    userId: joi.string(),
    finalPrice: joi.number(),
    email: joi.string().allow(''),
    paymentMode: joi.string().allow(''),
    promoCode: joi.string().allow(''),
    bookingReference: joi.string().allow(''),
    bookingStatus: joi.string().allow('')
}).unknown(true);

class CustomPackage {
    constructor(location, travelDate, travelEndDate, tourType, peopleCount, childrenCount, infantCount, 
        customPackageReference, itinerary, price, currency, userId, mobileNumber, email, 
        paymentMode, promoCode, bookingReference, bookingStatus, finalPrice) {
        this.location = location;
        this.travelDate = travelDate;
        this.travelEndDate = travelEndDate;
        this.tourType = tourType;
        this.peopleCount = peopleCount;
        this.childrenCount = childrenCount;
        this.infantCount = infantCount;
        this.customPackageReference = customPackageReference;
        this.itinerary = itinerary;
        this.price = price;
        this.currency = currency;
        this.userId = userId;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.paymentMode = paymentMode;
        this.promoCode = promoCode;
        this.bookingReference = bookingReference;
        this.bookingStatus = bookingStatus;
        this.finalPrice = finalPrice;
        var err = custompackageSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }
}
module.exports = CustomPackage;