'use strict';
var Home = require('../model/home.js');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');

exports.contact_us = function (req, res) {
    Home.submit_info(req,function (err, result) {
        if (err) {
            let resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }else {
            let resp = new Resp(result, "200 OK");
            res.status(200).json(resp);
        }

        logger.log(req, result, err);

    });
};