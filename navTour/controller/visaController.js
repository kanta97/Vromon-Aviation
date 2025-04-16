'use strict';
var Visa = require('../model/visaModel.js');
var Resp = require('../model/Resp.js');
var Response = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

var RespWithLimit = require('../model/respWithLimit.js');
const {responseMessage, responseMessageKey, respMsg} = require('../config/responseMessage');

exports.uploadVisaDocumentByCountry = function (req, res) {
    Visa.add_visa_document(req,function (err, visaDocument) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }else {
            let resp = new Resp(visaDocument, "200 OK");
            res.status(200).json(resp);
        }

        logger.log(req, visaDocument, err);

    });
};
exports.list_of_visa_document = function (req, res) {
    Visa.getVisaDocument(req, function (err, visaDocument) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(visaDocument, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, visaDocument, err);

    });
};

exports.delete_visa_document = function (req, res) {
    Visa.remove(req, function (err, visaDocument) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            let resp = new Resp(visaDocument, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, visaDocument, err);

    });
}

exports.UpdateuploadVisaDocumentByCountry = function (req, res) {
    Visa.update_add_visa_document(req,function (err, visaDocument) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }else {
            let resp = new Resp(visaDocument, "200 OK");
            res.status(200).json(resp);
        }

        logger.log(req, visaDocument, err);

    });
};

exports.checkVisaContactUs = function (req, res) {
    Visa.check_visa_contact_us(req,function (err, visaDocument) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }else {
            let resp = new Resp(visaDocument, "200 OK");
            res.status(200).json(resp);
        }

        logger.log(req, visaDocument, err);

    });
};

