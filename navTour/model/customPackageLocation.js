'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');
var Resource = require('./resource');

var CustomPackageLocationSchema = joi.object().keys({
    location: joi.string().allow(''),
    price: joi.number().allow(''),
    currency: joi.string().allow(''),
    tour_type: joi.string().allow(''),
    terms_conditions: joi.string().allow(''),
    inclusion: joi.string().allow(''),
    exclusion: joi.string().allow('')


}).unknown(true);

var CustomPackageLocation = function (customPackageLocation) {
    this.location = customPackageLocation.location;
    this.price = customPackageLocation.price;
    this.currency = customPackageLocation.currency;
    this.tour_type = customPackageLocation.tour_type;
    this.terms_conditions = customPackageLocation.terms_conditions;
    this.inclusion = customPackageLocation.inclusion;
    this.exclusion = customPackageLocation.exclusion;

    var err = CustomPackageLocationSchema.validate(this).error;
    if (err) {
        throw new Error(err);

    }

};

CustomPackageLocation.getAllCustomPackageLocation = function getAllCustomPackageLocation(req, result) {

    if (req.params.limit && req.params.offset) {
        var query = "Select * from custom_package_location LIMIT " + req.params.offset + ", " + req.params.limit + "";

    }
    else {
        var query = "Select * from custom_package_location ORDER BY id DESC";

    }

    sql.query(query, function (err, res) {

        if (err) {
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

CustomPackageLocation.create_CustomPackageLocation = function create_CustomPackageLocation(req, result) {
    try {
        var customPackageLocation = new CustomPackageLocation(req);
        sql.query("INSERT INTO custom_package_location set ?", customPackageLocation, function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    } catch (e) {
        console.log(e);
        return 0;
    }
};

CustomPackageLocation.getCustomPackageLocationById = function getCustomPackageLocationById(customPackageLocationid, result) {


    sql.query("Select * from custom_package_location where id = ? ", [customPackageLocationid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

CustomPackageLocation.updateById = function updateById(customPackageLocationid, customPackageLocation, result) {
    sql.query("UPDATE custom_package_location set ? where id = ?", [customPackageLocation, customPackageLocationid], function (err, res) {
        if (err) {
            console.log("error: ", err);

            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};

CustomPackageLocation.remove = function (id, result) {
    sql.query("DELETE FROM custom_package_location WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};

module.exports = CustomPackageLocation;