/**
 * Created by Shohanur on 3/13/2019.
 */
'user strict';
var sql = require('./db.js');
var Room = require('./room');
var joi = require('joi');
var Booking = require('./booking.js');


var UpdateBookingSchema = joi.object().keys({
    tour_type: joi.string().allow(''),
    package_id: joi.number().integer(),
    people_count: joi.number().integer(),
    children_count:joi.number().integer(),
    mobile_no: joi.string().allow(''),
    email:joi.string().allow(''),
    paymentMode:joi.string().allow(''),
    booking_status:joi.string().allow(''),
    remark:joi.string().allow(''),
    roomType:joi.array().items(joi.object({
        type: joi.string().allow(''),
        count: joi.number().integer()
     }))
});
var showObjectjQuery= function (obj) {
    var keys = "";
    var values=""
    for (var p in obj) {
        if( obj.hasOwnProperty(p) ) {
            keys += p ;
            values+= obj[p] ;
        }
    }
    return keys,values;
};

var UpdateBookingReq = function (roomType) {

    try {
        this.room = [];
        for (i = 0; i < roomType.length; i++) {

            this.room.push(new Room(roomType[i].type, roomType[i].count, 0));
        }
        /*console.log(this.room);*/
    } catch(err){
        this.err = err;
        return 0;
    }
};

UpdateBookingReq.update_fixedpackage = function update_fixedpackage(bookingReference,req, result) {

    try {
        var err = UpdateBookingSchema.validate(req).error;
        if (err) {

            result(err, null);
        }
        else
        {

                var bookingreq_roomtype = req.roomType;
                delete req.roomType;
                Object.assign(req, {booking_status: "BOOKING_UPDATE_REQUESTED"});

                var bookingreqRoom = new UpdateBookingReq(bookingreq_roomtype);
                room_string="";
                for (i = 0; i < bookingreqRoom.room.length; i++) {

                    room_string = room_string + bookingreqRoom.room[i].room_type+","+ bookingreqRoom.room[i].no_of_room;
                    if(i < bookingreqRoom.room.length - 1 ) room_string = room_string + "|";
                }
                var update_element = "";
                for (var p in req) {
                    if( req.hasOwnProperty(p) ) {
                        update_element += p+","+ req[p] +"|" ;

                    }
                }

                console.log(bookingReference);

            query='CALL updateBooking ('+'"' +update_element+ '"'+','+'"'+room_string+'"'+','+'"'+bookingReference+ '")';



                sql.sql_query(query)
                    .then(res => {



                        return "BOOKING_UPDATE_REQUESTED";
                    }) .then(rows => {
                        result(null, "BOOKING_UPDATE_REQUESTED");
                    }, err => {
                    result(null, "Update booking rollbacked");
                    throw err;

                }).catch(err => {

                        console.log("exception handled");
                    })




        }


    }catch (e) {
        console.log(e)
    }

};


module.exports = UpdateBookingReq;