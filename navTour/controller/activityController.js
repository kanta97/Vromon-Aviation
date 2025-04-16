/**
 * Created by Shohanur on 3/11/2019.
 */

'use strict';

var Activity = require('../model/activity');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');

exports.list_all_activity = function (req, res) {

    Activity.getAllActivity(req,function (err, activity) {
        console.log(err);
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        else{
            var resp = new Resp(activity, "200 OK");
            res.status(200).json(resp);
       
        }
        logger.log(req,activity,err);
        });
};



exports.create_activity = function (req, res) {
    var new_activity = new Activity(req.body, req.files);
    console.log(new_activity);



   // console.log(new_activity);

    Activity.create_activity(new_activity, function (err, activity) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
            logger.error('error: '+ err);

        }
        else {
            var resp = new Resp({"msg":"insertion successful", "insertid" : activity}, "200 OK");
            res.status(200).json(resp);
            logger.info("request params: " +  JSON.stringify(req.params) + " request body: "+  JSON.stringify(req.body) +" response status: "+ res.status+" response : "+  JSON.stringify(activity));

        }
        logger.log(req,activity,err);
    });
};

exports.read_activity = function (req,res) {


    Activity.getActivityById(req.params.activityid,function (err,activity) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(activity, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,activity,err);
    });


};
exports.read_activity_customlocation = function (req,res) {


    Activity.read_activity_customlocation(req.params.customlocationid,function (err,activity) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp(activity, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,activity,err);
    });


};
exports.update_activity = function (req, res) {

console.log(req.body);
    Activity.updateById(req.params.activityid, (req.body), function (err, activity) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp("update successful", "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,activity,err);
    });
};
exports.delete_activity = function (req,res) {

    Activity.remove(req.params.activityid, function (err, activity) {
        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            if(activity.affectedRows == 0){
                var resp = new Resp("Activity Not Available", "200 OK");
                res.status(200).json(resp);
            }
            else{
                var resp = new Resp("Delete successful", "200 OK");
                res.status(200).json(resp);
            }
            logger.log(req,activity,err);

        }
    });
};