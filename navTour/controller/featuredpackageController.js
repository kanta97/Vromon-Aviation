/**
 * Created by Shohanur on 3/10/2019.
 */

'use strict';

var Fixedpackage = require('../model/fixedpackage.js');
var Resp = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

exports.list_all_featuredpackage = function (req, res){
    Fixedpackage.getAllFeaturedPackage(req, function (err, featuredPackages,records) {
        if (err) {
            var resp = new Resp(err, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({ "featuredPackages" : featuredPackages}, "200 OK",records);
            res.status(200).json(resp);
        }
        logger.log(req,featuredPackages,err);

    });
};