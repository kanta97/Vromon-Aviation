
'use strict';

var CustomPackageLocation = require('../model/customPackageLocation');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');

exports.list_all_customPackageLocation = function (req, res) {

    CustomPackageLocation.getAllCustomPackageLocation(req,function (err, customPackageLocation) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(customPackageLocation, "200 OK");
        res.status(200).json(resp);
        logger.log(req,customPackageLocation,err);

    });
};



exports.create_customPackageLocation = function (req, res) {
    CustomPackageLocation.create_CustomPackageLocation(req.body, function (err, customPackageLocation) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"insertion successful", "insertid" : customPackageLocation}, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,customPackageLocation,err);

    });
};

exports.read_customPackageLocation = function (req,res) {
    CustomPackageLocation.getCustomPackageLocationById(req.params.id,function (err,customPackageLocation) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(customPackageLocation, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,customPackageLocation,err);

    });


};

exports.update_customPackageLocation = function (req, res) {

console.log(req.body);
    CustomPackageLocation.updateById(req.params.id, (req.body), function (err, customPackageLocation) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp("update successful", "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,customPackageLocation,err);

    });
};
exports.delete_customPackageLocation = function (req,res) {

    CustomPackageLocation.remove(req.params.id, function (err, customPackageLocation) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            if(customPackageLocation.affectedRows == 0){
                var resp = new Resp("CustomPackageLocation Not Available", "200 OK");
                res.status(200).json(resp);
            }
            else{
                var resp = new Resp("Delete successful", "200 OK");
                res.status(200).json(resp);
            }

        }
        logger.log(req,customPackageLocation,err);

    });
};