/**
 * Created by Shohanur on 3/11/2019.
 */
'user strict';
var sql = require('./db.js');
var joi = require('joi');

var HotelSchema = joi.object().keys({
    name: joi.string().trim().min(2).required(),
    location: joi.string().trim().min(2).required(),
    tour_type: joi.string().trim().min(1).required(),
    description: joi.string().allow(''),
    issueBy:joi.number().integer(),
    updatedBy:joi.number().integer()

});

var Hotel = function (hotel) {
    this.name = hotel.name;
    this.location = hotel.location;
    this.tour_type = hotel.tour_type;
    this.description = hotel.description;
    this.issueBy=hotel.issueBy;
    this.updatedBy=hotel.updatedBy
};
var UpdateHotelScema=HotelSchema.keys({
    name: joi.string().trim().min(2).optional(),
    location: joi.string().trim().min(2).optional(),
    tour_type: joi.string().trim().min(1).optional(),
    updatedBy:joi.number().integer().required()


});


Hotel.getAllHotel = function getAllHotel(req,result) {

    if(req.params.limit && req.params.offset){
        var query="Select * from hotels ORDER BY id DESC  LIMIT " + req.params.offset + ", " + req.params.limit + "";
        console.log(query);

    }
    else{
        var query="Select * from hotels ORDER BY id DESC";

    }
    sql.query(query, function (err, res) {

        if (err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else {

            // console.log('fixed_packages : ', res);

            result(null, res);
        }
    });
};

Hotel.create_hotel = function createHotel(hotel, result) {
    var err = HotelSchema.validate(hotel).error;
    if (err) {
        result(err, null);

    }
    else {
        sql.query("INSERT INTO hotels set ?", hotel, function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }

};
Hotel.updateById = function  (id, hotel, result) {

    var err = UpdateHotelScema.validate(hotel).error;
    if (err) {
        // handle error and abort
        result(err, null);
    }
    else {
        sql.query("UPDATE hotels set ? where id = ?", [hotel, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
};

Hotel.remove = function (id,result) {

    sql.query("DELETE FROM hotels WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};
Hotel.getHotelById = function getHotelById(hotelid, result) {


    sql.query("Select * from hotels where id = ? ", [hotelid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
module.exports = Hotel;