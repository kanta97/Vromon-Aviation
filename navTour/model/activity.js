/**
 * Created by Shohanur on 3/11/2019.
 */
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');
var Resource = require('./resource');

var ActivitySchema = joi.object().keys({
    location: joi.string().allow(''),
    description: joi.string().allow(''),
    duration: joi.string().allow(''),
    price: joi.number().integer().allow(''),
    type:joi.string().allow(''),
    issueBy:joi.number().integer().required(),
    updatedBy:joi.number().integer(),
    activityName : joi.string().allow(''),
    custom_package_location_id : joi.number().integer()

}).unknown(true);
var UpdateActivitySchema=ActivitySchema.keys({

    issueBy:joi.number().integer().optional(),
    updatedBy:joi.number().integer().required()



});
var Activity = function (activity,files) {
    this.location = activity.location;
    this.description = activity.description;
    this.duration = activity.duration;
    this.price = activity.price;
    this.type = activity.type;
    this.image_name = [];
    this.issueBy=activity.issueBy;
    this.updatedBy=activity.updatedBy,
    this.activityName=activity.activityName,
    this.custom_package_location_id=activity.custom_package_location_id

        var regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$");
    for (let item of files) {
        if (regex.test(item.mimetype)) {
            path = /*config.app.ip + ":" + config.app.port + "/" +*/ item.filename;

            this.image_name.push(path);
        }
    }

};



Activity.getAllActivity = function getAllActivity(req,result) {

    if(req.params.limit && req.params.offset){
        var query="Select * from activities LIMIT " + req.params.offset + ", " + req.params.limit + "";

    }
    else{
        var query="Select * from activities ORDER BY id DESC";

    }

    sql.query(query, function (err, res) {

        if (err) {
            result(err, null);
        }
        else {

            result(null, res);
        }
    });
};

Activity.create_activity = function create_activity(activity, result) {
    var err = ActivitySchema.validate(activity).error;
    if (err) {
        // handle error and abort
        result(err, null);

    }
    else {
        sql.query("INSERT INTO activities set ?", activity, function (err, res) {

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

Activity.getActivityById = function getActivityById(activityid, result) {


    sql.query("Select * from activities where id = ? ", [activityid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

Activity.read_activity_customlocation = function read_activity_customlocation(customlocationid, result) {


    sql.query("Select * from activities where custom_package_location_id = ? ", [customlocationid], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};
Activity.updateById = function updateById(activityid,activity, result) {



    var err = UpdateActivitySchema.validate(activity).error;


    if (err) {
        // handle error and abort
        result(err, null);
    }
    else {
        sql.query("UPDATE activities set ? where id = ?", [activity, activityid], function (err, res) {
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

Activity.remove = function (id,result) {



    sql.query("DELETE FROM activities WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};

module.exports = Activity;