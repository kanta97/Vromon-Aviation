/**
/**
 * Created by Shohanur on 3/28/2019.
 */

'use strict';

//var UserProfileResp = require('../model/UserProfileResp.js');

var ProfileReq = require('../model/profileReq');

var Resp = require('../model/Resp.js');
var Response=require('../model/Response')


exports.bulkUserInfoForNotification = function(req,res){
    ProfileReq.bulkDetails(req.body, function (err, profile) {

        if (err) {
            var resp = new Resp({"messaage":"Could not updated at this moment, invalid data supplied","data":req.body},"400 bad Request", err.sqlMessage);
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"messaage":"Data has been sent successfully", "data" : profile}, "200 OK");
            res.status(200).json(resp);
        }
    });
}

exports.create_profile = function (req,res) {


    var new_profile = new ProfileReq(req.body);

/*
console.log(new_profile);
*/
    ProfileReq.create_profile(new_profile, function (err,status, profile) {

        if (err) {
            var resp = new Response(false,"400 bad Request", err.sqlMessage);
            res.status(400).json(resp);
        }
        else {
            var resp = new Response(status ,profile, "200 OK");
            res.status(200).json(resp);
        }
    });
};

exports.read_user = function (req,res) {




    ProfileReq.read_profile(req.params.id, function (err, user) {

        if (err) {
            var resp = new Resp(req.body,"400 bad Request", err.sqlMessage);
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"successful", "data" : user}, "200 OK");
            res.status(200).json(resp);
        }
    });
};

exports.update_profile = function (req,res) {
    ProfileReq.update_profile((req.body),req.params.id, function (err, profile) {
        if (err) {
            var resp = new Resp(req.body,"400 bad Request", err.sqlMessage);
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"You profile has been updated successfully.", "updatedId" : profile}, "200 OK");
            res.status(200).json(resp);
        }
    });
};



exports.verification_user = function (req,res) {


    var code = req.params.code;
    console.log(code);


    ProfileReq.verify_code(code, function (err, message,status) {

        if (err) {
            var resp = new Resp(req.body,"400 bad Request", err.sqlMessage);
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":message, "status" : status}, "200 OK");
            res.status(200).json(resp);
        }
    });
};
