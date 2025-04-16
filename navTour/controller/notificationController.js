/**
 * Created by Shohanur on 3/29/2019.
 */



'use strict';

var NotificationReq = require('../model/notificationReq');
var NotificationDispactherReq = require('../model/notificationDispactherModel');
var logger = require('../middleware/logger');

var Resp = require('../model/Resp.js');
var Response = require('../model/notificationResponseModel.js');





exports.create_notification = function (req,res) {


    var new_notification = new NotificationReq(req.body);


    NotificationReq.create_notification(new_notification, function (err, profile) {

        if (err) {
            var resp = new Resp(req.body, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Resp({"msg":"insertion successful", "insertid" : profile}, "200 OK");
            res.status(200).json(resp);
        }
        logger.log(req,profile,err);

    });
};


exports.dispatch_notification = function (req,res) {

    var notification = new NotificationDispactherReq(req.body);

console.log(notification);



   NotificationDispactherReq.process_notification(notification, function (err,status, message) {
/*
       console.log(err);
*/

        if (err) {
            var resp = new Response(req.body,status, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Response(message, status ,"200 OK");
            res.status(200).json(resp);
        }
       logger.log(req,(status+"message="+message),err);

   });
};


exports.sendEmail = function (req,res) {
    let tempBody;
    let tempEmail;
    if(req.body.notification_type=='contactUsEmail'){
        tempBody={
            "name":req.body.name, 
            "phone_no": req.body.phone_no, 
            "email":req.body.email, 
            "travelling_to":req.body.travelling_to, 
            "citizen_of":req.body.citizen_of, 
            "visa_category":req.body.visa_category
        }
        tempEmail='sales@navigatortourism.com'
    }
    else if(req.body.notification_type=='contactUsFeedbackEmail'){
        tempBody={
            "name":req.body.name,
            "travelling_to":req.body.travelling_to, 
            "citizen_of":req.body.citizen_of,
            "left_template":req.body.left_template, 
            "right_template_one": req.body.right_template_one, 
            "right_template_two":req.body.right_template_two,
            "visa_category":req.body.visa_category
        }
        tempEmail=req.body.email

        console.log(tempBody)
    }
    else if(req.body.notification_type=='contactEmail'){
        tempBody={
            "name":req.body.name, 
            "phone_no": req.body.phone_no, 
            "email":req.body.email, 
            "service":req.body.service, 
            "message":req.body.message
        }
        tempEmail='hello@navigatortourism.com'
    }
    var body={
        "notification_type":req.body.notification_type,
        "priority":1,
        "userName":req.body.name,
        "additionalMessage":[tempBody],
        "email":tempEmail
    }

    var notification = new NotificationDispactherReq(body);

    console.log(notification);



   NotificationDispactherReq.process_notification(notification, function (err,status, message) {
    /*
        console.log(err);
    */

        if (err) {
            var resp = new Response(req.body,status, "400 Bad Request");
            res.status(400).json(resp);
        }
        else {
            var resp = new Response(message, status ,"200 OK");
            res.status(200).json(resp);
        }
       logger.log(req,(status+"message="+message),err);

   });
};

