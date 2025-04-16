
'user strict';
import sql from './db.js';
import { object, string, date } from 'joi';
import config from '../config/config';

var CustomPkgRoomSchema = object().keys({
    custom_reference: string().allow(''),
    room_type: date(),
    count: date()
}).unknown(true);

class CustomPkgRoom {
    constructor(custom_reference, room_type, count) {
        this.custom_reference = custom_reference;
        this.room_type = room_type;
        this.count = count;
        var err = CustomPkgRoomSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }
}
export default CustomPkgRoom;