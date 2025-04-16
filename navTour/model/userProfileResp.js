/**
 * Created by Shohanur on 3/28/2019.
 */
'user strict';
var joi = require('joi');

var RespSchema = joi.object().keys({
    status:joi.string().allow(''),
    message:joi.string().allow('')


});

var UserProfileResp = function (status,message) {
    this.status = status;
    this.message = message;
};
module.exports = UserProfileResp;