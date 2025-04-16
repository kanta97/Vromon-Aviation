/**
 * Created by Shohanur on 3/11/2019.
 */
'user strict';
var sql = require('./db.js');
var joi = require('joi');

var TransportationSchema = joi.object().keys({
    name: joi.string().trim().min(2).required(),
    origin: joi.string().trim().min(2).required(),
    destination: joi.string().trim().min(2).required(),
    description: joi.string().allow(''),
    status:joi.number().integer(),
    issueBy:joi.number().integer().required(),
    updatedBy:joi.number().integer()

});

var Transportation = function (transportation) {
    this.name = transportation.name;
    this.origin = transportation.origin;
    this.destination = transportation.destination;
    this.description = transportation.description;
    this.status=transportation.status;
    this.issueBy=transportation.issueBy;
    this.updatedBy=transportation.updatedBy
};

var UpdateTransportationSchema=TransportationSchema.keys({

    name: joi.string().trim().min(2).optional(),
    origin: joi.string().trim().min(2).optional(),
    destination: joi.string().trim().min(2).optional(),
    updatedBy:joi.number().integer().required(),
    issueBy:joi.number().integer().optional(),



});

Transportation.create_transportation = function createtransportation(transportation, result) {
    var err = TransportationSchema.validate(transportation).error;


    if (err) {
        // handle error and abort
        result(err, null);

    }
    else {
        sql.query("INSERT INTO transportations set ?", transportation, function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }

};
Transportation.getAllTransportation = function getAllTransportation(req,result) {

    if(req.params.limit && req.params.offset){
        var query="Select * from transportations ORDER BY id DESC LIMIT " + req.params.offset + ", " + req.params.limit + "";

    }
    else{
        var query="Select * from transportations ORDER BY id DESC";

    }
    sql.query(query, function (err, res) {

        if (err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else {
            // console.log('fixed_packages : ', res);

            result(null, res);
        }
    });
};
Transportation.updateById = function updateById(transportationid,transportaion, result) {

    var err = UpdateTransportationSchema.validate(transportaion).error;
    console.log(err);


    if (err) {
        // handle error and abort
        result(err, null);
    }
    else {
        sql.query("UPDATE transportations set ? where id = ?", [transportaion, transportationid], function (err, res) {
            if (err) {
                console.log("error: ", err);

                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
};
Transportation.remove = function (id,result) {

    sql.query("DELETE FROM transportations WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};

Transportation.getTransportationById = function getTransportationById(transportationid, result) {


    sql.query("Select * from transportations where id = ? ", [transportationid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
module.exports = Transportation;