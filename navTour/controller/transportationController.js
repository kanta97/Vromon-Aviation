/**
 * Created by Shohanur on 3/12/2019.
 */

'use strict';

var Transportation = require('../model/transportation');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');


exports.create_transportation = function (req, res) {
    var new_transportation = new Transportation(req.body);

    Transportation.create_transportation(new_transportation, function (err, transportation) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"insertion successful", "insertid" : transportation}, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,transportation,err);

    });
};

exports.list_all_transportation = function (req, res) {


    Transportation.getAllTransportation(req,function (err, hotel) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(hotel, "200 OK");
        res.status(200).json(resp);
        logger.log(req,hotel,err);

    });
};

exports.read_transportation = function (req,res) {

    console.log(req.params.transportationid);

    Transportation.getTransportationById(req.params.transportationid,function (err,transportation) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(transportation, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,transportation,err);

    });


};

exports.update_transportation = function (req, res) {


    Transportation.updateById(req.params.transportationid, (req.body), function (err, transportation) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp("update successful", "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,transportation,err);


    });
};
exports.delete_transportation = function (req,res) {

    Transportation.remove(req.params.transportationid, function (err, transportation) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            if(transportation.affectedRows == 0){
                var resp = new Resp("Transportation Not Available", "200 OK");
                res.status(200).json(resp);
            }
            else{
                var resp = new Resp("Delete successful", "200 OK");
                res.status(200).json(resp);
            }

        }
        logger.log(req,transportation,err);

    });
};