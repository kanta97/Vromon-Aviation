/**
 * Created by Shohanur on 3/28/2019.
 */

'user strict';
var sql = require('./authDB.js');
var joi = require('joi');


var ProfileSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    middleName: joi.string().allow(''),
    date_of_birth: joi.string().allow(''),
    passport:joi.string().allow(''),
    nid: joi.string().allow(''),
    email:joi.string().required(),
    presentAddress:joi.string().required(),
    parmanentAddress:joi.string().allow(''),
    bloodGroup:joi.string().allow(''),
    maritalStatus:joi.string().allow(''),
    Profession:joi.string().allow(''),
    nationality:joi.string().allow(''),
    usernm:joi.string().required(),
    display_name:joi.string().required(),
    password:joi.string().required(),
    phone_no:joi.string().required(),
    user_type:joi.number().integer().allow(''),
    service_id:joi.number().integer().allow(''),
    role:joi.number().integer().allow(''),
    is_active:joi.number().integer().allow(''),
    reference_one:joi.number().integer().allow(''),
    reference_two:joi.number().integer().allow(''),
    createdBy:joi.number().integer().allow(''),
    updatedBy:joi.number().integer().allow(''),
    createdAt:joi.string().allow(''),
    updatedAt:joi.string().allow(''),


});

var ProfileReq = function (profile) {
        this.firstName= profile.firstName,
        this.lastName= profile.lastName,
        this.middleName= profile.middleName,
        this.date_of_birth= profile.date_of_birth,
        this.passport=profile.passport,
        this.nid =profile.nid,
        this.email=profile.email,
        this.presentAddress=profile.presentAddress,
        this.parmanentAddress=profile.parmanentAddress,
        this.bloodGroup=profile.bloodGroup,
        this.maritalStatus=profile.maritalStatus,
        this.Profession=profile.Profession,
        this.nationality=profile.nationality,
        this.usernm=profile.usernm,
        this.display_name=profile.display_name,
        this.password=profile.password,
        this.phone_no=profile.phone_no,
        this.user_type=profile.user_type,
        this.service_id=profile.service_id,
        this.role=profile.role,
        this.is_active=profile.is_active,
        this.reference_one=profile.reference_one,
        this.reference_two=profile.reference_two,
        this.createdBy=profile.createdBy,
        this.updatedBy=profile.updatedBy,
        this.createdAt=profile.createdAt
    var err = ProfileSchema.validate(this).error;
    if (err) {
        throw new Error(err);

    }
};
var UpdateProfileSchema=ProfileSchema.keys({
    phone_no: joi.string().optional(),
    password: joi.string().trim().min(2).optional(),
    display_name: joi.string().trim().min(1).optional(),
    email: joi.string().trim().min(6).optional(),
    firstName: joi.string().trim().min(2).optional(),
    lastName: joi.string().trim().min(2).optional(),
    presentAddress:joi.string().optional(),
    usernm:joi.string().optional()

});

ProfileReq.create_profile = function create_profile(new_profile, result) {

    try {

        sql.query("INSERT INTO users set ?", new_profile, function (err, res) {

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

ProfileReq.update_profile = function update_profile(update_profile_req,user_id, result) {
    var err = UpdateProfileSchema.validate(update_profile_req).error;
    console.log(err);

    if (err) {
        // handle error and abort
        result(err, null);

    }
    else {

    try {

        sql.query("UPDATE users set ? WHERE id = ?", [update_profile_req,user_id], function (err, res) {

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


    }


};
module.exports = ProfileReq;