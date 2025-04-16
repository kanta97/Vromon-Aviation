'user strict';
var joi = require('joi');

var BookingRespSchema = joi.object().keys({
    bookingReference: joi.string().allow(''),
    bookingStatus:joi.string().allow(''),
    message:joi.string().allow('')


});

var BookingResp = function (booking_ref,booking_status,message) {
    this.bookingReference = booking_ref;
    this.bookingStatus = booking_status;
    this.message = message;  
};
module.exports = BookingResp;