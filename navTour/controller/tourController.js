/**
 * Created by Shohanur on 3/16/2019.
 */
'use strict';

var Tour = require('../model/tour.js');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');



exports.list_all_tour_type = function (req, res) {


    Tour.getAllTourTypes(function (err, tour_type) {
        if (err) {
            var resp = new Resp("", "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(tour_type, "200");
        res.status(200).json(resp);
        logger.log(req,tour_type,err);

    });
};