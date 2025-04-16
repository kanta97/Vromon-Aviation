'user strict';
var joi = require('joi');


var BookingSchema = joi.object().keys({
    tour_type: joi.string().required(),
    package_id: joi.number().required(),
    people_count: joi.number().integer().required(),
    booking_ref: joi.string().allow('').required(),
    children_count_bed:joi.number().integer(),
    children_count_no_bed:joi.number().integer(),
    mobile_no: joi.string().allow('').required(),
    email:joi.string().allow('').required(),
    paymentMode:joi.string().required(),
    booking_status:joi.string().allow(''),
    remark:joi.string().allow(''),
    user_id:joi.string().required(),
    userName:joi.string().required(),
    travel_date: joi.date().required(),
    price: joi.number().required()

});

var Booking = function (package_id,tour_type,booking_ref,people_count,children_count_bed,children_count_no_bed,mobile_no,email,paymentMode,booking_status,remark, user_id, userName, travel_date, price) {
    this.package_id = package_id;
    this.tour_type = tour_type;
    this.booking_ref = booking_ref;
    this.people_count = people_count;
    this.children_count_bed = children_count_bed;
    this.children_count_no_bed = children_count_no_bed;
    this.mobile_no = mobile_no;
    this.email = email;
    this.paymentMode = paymentMode;
    this.booking_status = booking_status;
    this.remark = remark;
    this.user_id = user_id;
    this.userName = userName;
    this.travel_date = travel_date;
    this.price = price;

    var err = BookingSchema.validate(this).error;
    if (err) {
        throw new Error(err); 

    }
};


module.exports = Booking;