/**
 * Created by Shohanur on 3/28/2019.
 */

'use strict';

// var UserProfileResp = require('../model/UserProfileResp.js');

var ProfileReq = require('../model/profileReq');

var Resp = require('../model/Resp.js');



exports.create_profile = function (req,res) {


    var new_profile = new ProfileReq(req.body);


    ProfileReq.create_profile(new_profile, function (err, profile) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"insertion successful", "insertid" : profile}, "200 OK");
            res.status(200).json(resp);
        }
    });
};

exports.update_profile = function (req,res) {




    ProfileReq.update_profile((req.body),req.params.id, function (err, profile) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"We have receieve your update Request successful", "updatedId" : profile}, "200 OK");
            res.status(200).json(resp);
        }
    });
};