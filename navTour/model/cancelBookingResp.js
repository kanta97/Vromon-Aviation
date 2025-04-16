/**
 * Created by Shohanur on 3/14/2019.
 */

/**
 * Created by Shohanur on 3/13/2019.
 */

'user strict';
var joi = require('joi');

var CancelBookingRespSchema = joi.object().keys({
    bookingStatus:joi.string().allow(''),
    message:joi.string().allow('')


});

var BookingResp = function (booking_status,message) {
    this.bookingStatus = booking_status;
    this.message = message;
};
module.exports = BookingResp;