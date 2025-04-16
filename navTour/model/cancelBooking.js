/**
 * Created by Shohanur on 3/13/2019.
 */
'user strict';
var joi = require('joi');

var CancelBookingSchema = joi.object().keys({
    booking_ref: joi.string().min(5).required()

});

var CancelBooking = function (booking_reference) {
    this.booking_ref = booking_reference;

    var err = CancelBookingSchema.validate(this).error;
    if (err) {
        throw new Error(err);

    }
};

module.exports = CancelBooking;