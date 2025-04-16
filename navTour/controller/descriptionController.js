'use strict';
var Description = require('../model/Description.js');
var Resp = require('../model/Resp.js');
var Response = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

var RespWithLimit = require('../model/respWithLimit.js');
const {responseMessage, responseMessageKey, respMsg} = require('../config/responseMessage');



exports.add_description = function (req, res) {
    Description.add_document(req, function (err, description) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(description, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, description, err);

    });
};



exports.get_description = function (req, res) {
    Description.getDescription(req, function (err, description) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(description, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, description, err);

    });
};

exports.updateDescription = function (req, res) {
    Description.updateDescriptionById(req, function (err, description) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(description, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, description, err);

    });
}


exports.delete_description = function (req, res) {
    Description.delete_description(req, function (err, description) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(description, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, description, err);

    });
}
