/**
 * Created by Shohanur on 3/29/2019.
 */

/**
 * Created by Shohanur on 3/28/2019.
 */

'user strict';
var sql = require('./db.js');
var joi = require('joi');


var NotificationSchema = joi.object().keys({
    body: joi.string().required(),
    msisdn: joi.string().allow(''),
    emails: joi.string().allow(''),
    dispatch_url: joi.string().allow(''),
    dispatch_url_method:joi.string().allow(''),
    status: joi.string().allow(''),
    insert_date:joi.string().allow(''),
    insert_by:joi.number().integer().allow(''),
    updated_date:joi.string().allow(''),
    updated_by: joi.number().integer().allow('')



});

var NotificationReq = function (notification) {
        this.body= notification.body,
        this.msisdn= notification.msisdn,
        this.emails= notification.emails,
        this.dispatch_url= notification.dispatch_url,
        this.dispatch_url_method=notification.dispatch_url_method,
        this.status =notification.status,
            this.insert_date=notification.insert_date,
            this.updated_date=notification.updated_date,

            this.insert_by=notification.insert_by,
        this.updated_by=notification.updated_by

    var err = NotificationSchema.validate(this).error;
    if (err) {
        throw new Error(err);

    }
};

NotificationReq.create_notification = function create_notification(new_notification, result) {
    console.log(new_notification);

    try {

        sql.query("INSERT INTO notifications set ?", new_notification, function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        })
    }
    catch (e) {
        console.log(e)
    }





};

module.exports = NotificationReq;