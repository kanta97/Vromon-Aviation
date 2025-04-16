'user strict';
var joi = require('joi');

class package_hotel {
    constructor(hotel_id, tour_type, duration) {
        this.hotel_id = hotel_id;
        this.tour_type = tour_type;
        this.duration = duration;
    }
}


module.exports = package_hotel;