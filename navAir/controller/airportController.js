'use strict';

var Airport = require('../model/airport');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');

exports.list_all_airports = function (req, res) {

    Airport.getAllAirport(req, function (err, hotel) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(hotel, "200 OK");
        res.status(200).json(resp);
        logger.log(req,hotel,err);
    });
};
// exports.create_hotel = function (req, res) {
//     var new_hotel = new Hotel(req.body);
//     console.log(new_hotel);

//     Hotel.create_hotel(new_hotel, function (err, hotel) {

//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp({"msg":"insertion successful", "insertid" : hotel}, "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.update_hotel = function (req, res) {


//     Hotel.updateById(req.params.hotelid, (req.body), function (err, hotel) {
//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp("update successful", "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.delete_hotel = function (req,res) {

//     Hotel.remove(req.params.hotelid, function (err, hotel) {
//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             if(hotel.affectedRows == 0){
//                 var resp = new Resp("Hotel Not Available", "200 OK");
//                 res.status(200).json(resp);
//             }
//             else{
//                 var resp = new Resp("Delete successful", "200 OK");
//                 res.status(200).json(resp);
//             }

//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.read_hotel = function (req,res) {

//     Hotel.getHotelById(req.params.hotelid,function (err,hotel) {

//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp(hotel, "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });


// };