'use strict';
var Fixedpackage = require('../model/fixedpackage.js');
var Resp = require('../model/Resp.js');
var Response = require('../model/ResponsModel.js');
var logger = require('../middleware/logger');

var RespWithLimit = require('../model/respWithLimit.js');
const {responseMessage, responseMessageKey, respMsg} = require('../config/responseMessage');

exports.list_all_fixedpackage = function (req, res) {
    Fixedpackage.getAllPackage(function (err, fixedpackage) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(fixedpackage, "200 OK");
        res.status(200).json(resp);
        logger.log(req, fixedpackage, err);

    });
};
exports.list_all_configs = function (req, res) {
    Fixedpackage.list_all_configs(function (err, fixedpackage) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(fixedpackage, "200 OK");
        res.status(200).json(resp);
        logger.log(req, fixedpackage, err);

    });
};
exports.get_package_by_limit = function (req, res) {
    Fixedpackage.get_package_by_limit(req.params.limit, req.params.offset, function (err, fixedpackage, records) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            var respWithLimit = new RespWithLimit(fixedpackage, "200 OK", records);
            res.status(200).json(respWithLimit);
        }
        logger.log(req, fixedpackage, err);

    });
};
exports.upload_file = function (req, res) {
    for (let item of req.files) {
        console.log(item.mimetype + " " + item.originalname + " " + item.filename);
    }
    res.status(200).json(req.body);

};

exports.create_fixedpackage = function (req, res) {

    Fixedpackage.create_fixedpackage(req, function (err, fixedpackage) {

        // if (err) {
        //   var resp = new Resp(req.body, "400 Bad Request");
        //   res.status(400).json(resp);
        // }
        if (err == '200') {
            var resp = new Resp({"msg": "insertion successful"}, "200 OK");
            res.status(200).json(resp);
        } else {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        logger.log(req, fixedpackage, err);

    });
}


exports.read_fixedpackage = function (req, res) {
    Fixedpackage.getPackageById(req.params.packageid, function (err, fixedpackage) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            var resp = new Resp(fixedpackage, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, fixedpackage, err);

    });
};
exports.search_package_by_packageid = function (req, res) {
    Fixedpackage.getPackageDetailsById(req.params.packageid, function (err, response) {
        if (err) {
            var resp = new Resp({
                "package": req.body,
                "message": respMsg.get(responseMessageKey.package.search.detail_fail)
            }, "400 Bad Request");
            res.status(400).json(resp);
        } else {

            var resp = new Resp(response, "200 OK");
            console.log(resp);
            res.status(200).json(resp);
        }
        logger.log(req, response, err);

    });
};

exports.update_fixedpackage = function (req, res) {
    Fixedpackage.updateById(req, function (err, response) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            var resp = new Resp(response, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req, response, err);

    });
};


exports.delete_fixedpackage = function (req, res) {


    Fixedpackage.remove(req.params.packageid, function (err, fixedpackage) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            if (fixedpackage.affectedRows == 0) {
                var resp = new Resp("Package Not Available", "200 OK");
                res.status(200).json(resp);
            } else {
                var resp = new Resp("Delete successful", "200 OK");
                res.status(200).json(resp);
            }

        }
        logger.log(req, fixedpackage, err);

    });
};

exports.search_package_by_destination = function (req, res) {
    Fixedpackage.getPackageByDestination(req, function (err, fixedpackage, records) {
        if (err) {
            var resp = new Response(err, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            if (records >= 1) {
                var resp = new Response({"packages": fixedpackage}, "200 OK", records);
                res.status(200).json(resp);
            } else {
                var resp = new Response({
                    "packages": null,
                    "message": respMsg.get(responseMessageKey.package.search.fail)
                }, "200 OK", records);
                res.status(200).json(resp);
            }

        }
        logger.log(req, fixedpackage, err);
    });
};

exports.get_package_count_by_country = function (req, res) {
    Fixedpackage.get_package_count_by_country(function (err, fixedpackage) {
        if (err) {
            var resp = new Response(err, "400 Bad Request");
            res.status(400).json(resp);
        } else {
            var resp = new Response({"packages": fixedpackage}, "200 OK", fixedpackage.length);
            res.status(200).json(resp);
        }
        logger.log(req, fixedpackage, err);
    });
};
