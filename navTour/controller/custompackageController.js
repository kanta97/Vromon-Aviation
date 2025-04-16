'use strict';
const { BookCustomPackage, UpdateCustomPackage,BuildCustomPackageReq } = require('../model/bookCustomPackage');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');

exports.Build_Custom_Package = function (req, res) {

    BuildCustomPackageReq.Build_Custom_Package(req, function (err, response) {

        if (err) {
            var resp = new Resp(response, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({ "msg": response }, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};
exports.bookCustomPackage = function (req, res) {

    BookCustomPackage.Book_Custom_Package(req, function (err, response) {

        if (err) {
            var resp = new Resp(response, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({ "msg": response }, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};

exports.updateCustomPackage = function (req, res) {

    UpdateCustomPackage.updateCustomPackage(req, function (err, response) {

        if (err) {
            var resp = new Resp(response, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({ "msg": response }, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,response,err);

    });
};