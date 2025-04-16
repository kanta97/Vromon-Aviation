'user strict';
var joi = require('joi');

var RoomSchema = joi.object().keys({
    room_type: joi.string().allow(''),
    no_of_room: joi.number().integer(),
    booking_id: joi.number().integer()
  
});

var Room = function (room_type,no_of_room,booking_id) {
    this.room_type = room_type;
    this.no_of_room = no_of_room;
    this.booking_id = booking_id;
    var err = RoomSchema.validate(this).error;
    if (err) {
        // handle error and abort
        return err;

    }
};



module.exports = Room;