/**
 * Created by Shohanur on 3/13/2019.
 */

'user strict';
var sql = require('./db.js');
var CancelBooking = require('./cancelBooking');
var joi = require('joi');

var CancelBookingReq = function (req) {

    try {
        this.cancelbooking = new CancelBooking(req.booking_ref)


        }
     catch(err){
        this.err = err;
        return 0;
    }
};

CancelBookingReq.cancel_booking = function cancel_booking(req, result) {

    try {


        var cancelBooking = new CancelBookingReq(req);

        if(cancelBooking.err){
            result(cancelBooking.err, null);
            return;
        }
        sql.query("UPDATE booking set booking_status =? where ?", ['BOOKING_CANCEL_REQUESTED',cancelBooking.cancelbooking], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });

    }
    catch (e) {
        console.log(e)
    }

};


module.exports = CancelBookingReq;