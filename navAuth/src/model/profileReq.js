/**
 * Created by Shohanur on 3/28/2019.
 */

'user strict';
var sql = require('./authDB.js');
var joi = require('joi');

var request = require('request');


var ProfileSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    middleName: joi.string().allow(''),
    date_of_birth: joi.string().allow(''),
    passport:joi.string().allow(''),
    nid: joi.string().allow(''),
    email:joi.string().required(),
    presentAddress:joi.string().allow(''),
    parmanentAddress:joi.string().allow(''),
    bloodGroup:joi.string().allow(''),
    maritalStatus:joi.string().allow(''),
    Profession:joi.string().allow(''),
    nationality:joi.string().allow(''),
    gender:joi.string().allow(''),
    usernm:joi.string().allow(''),
    display_name:joi.string().allow(''),
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
    updatedAt:joi.string().allow('')
});
var bultUserInfoSchema = joi.object().keys({
    user_ids: joi.array().items(joi.number())
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
        this.gender=profile.gender||'',
        this.Profession=profile.Profession,
        this.nationality=profile.nationality,
        this.usernm=profile.usernm,
        this.display_name=profile.display_name,
        this.password=profile.password,
        this.phone_no=profile.phone_no,
        this.user_type=profile.user_type ||2,
        this.service_id=profile.service_id ||0,
        this.role= profile.role||2,
        this.is_active =profile.is_active||1,
        this.reference_one=profile.reference_one,
        this.reference_two=profile.reference_two,
        this.createdBy=profile.createdBy|| '1',
        this.updatedBy= profile.updatedBy|| '1'
        // this.createdAt= new Date() || null
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
ProfileReq.bulkDetails = function bulkDetails(req,result){

    var err = bultUserInfoSchema.validate(req).error;
    if (err) {
        result(err, null);
    }
    else {
        try {
            var userList="(";

            for (i = 0; i < req.user_ids.length; i++) {
                if (i === req.user_ids.length - 1) {
                    userList = userList + req.user_ids[i];
                } else {
                    userList = userList + req.user_ids[i] + ',';
                }
            }

            var query=`SELECT id AS userId,usernm AS userName, phone_no AS mobileNumber,email  FROM users WHERE id IN `+userList+')';

            sql.query(query, function (err, res) {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            })
        }
        catch (e) {
            result(e, null);
        }


    }

}

// Function to create a new profile and send verification link if needed
ProfileReq.create_profile = async function (new_profile, result) {
    try {
        const checkActiveQuery = "SELECT id, is_active FROM users WHERE email = ?";
        sql.query(checkActiveQuery, [new_profile.email], async (err, res) => {
            if (err) return result(err, null, "Error checking user active status.");

            const isUserInactive = res.length > 0 && (res[0].is_active === '0' || res[0].is_active === 0);
            if (isUserInactive) {
                await sendVerificationLink(res[0].id, new_profile, result);
            } else {
                sql.query("INSERT INTO users SET ?", new_profile, async (err, res) => {
                    if (err) return result(err, null, "Error creating new user profile.");
                    const user_entry_id = res.insertId;
                    await sendVerificationLink(user_entry_id, new_profile, result);
                });
            }
        });
    } catch (e) {
        result(e, null, "An unexpected error occurred.");
    }
};

// Helper function to send verification link
async function sendVerificationLink(user_entry_id, new_profile, result) {
    const code = Math.random().toString(36).substr(2, 10);
    const verifylink = `https://navigatortourism.com/verification/${code}`;

    try {
        console.log('first',user_entry_id);
        console.log('first',code);

        sql.query("INSERT INTO user_verification_code (user_id, email_verification_code) VALUES (?, ?)", [user_entry_id, code], (err, res) => {
            if (err){
                console.log('err');
                return result(err, null, "Failed to insert verification code.");
            }
            else{
console.log('first',res);
            }



            const payload_data = {
                notification_type: "signUp",
                priority: 1,
                userName: new_profile.usernm,
                additionalMessage: [{ link: verifylink, name: new_profile.firstName }],
                email: new_profile.email
            };

            request.post({
                headers: { 'Content-Type': 'application/json', 'cache-control': "no-cache" },
                url: "https://148.72.212.173:3000/notification/dispatcher",
                body: JSON.stringify(payload_data),
                strictSSL: false
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const obj = JSON.parse(body);
                    if (obj.status) {
                        result(null, "200 OK", "Verification link sent.");
                    } else {
                        rollbackUserCreation(user_entry_id);
                        result(null, false, "Rolled back user signUp.");
                    }
                } else {
                    rollbackUserCreation(user_entry_id);
                    result(null, false, "Dispatcher API failed to send verification link.");
                }
            });
        });
    } catch (error) {
        rollbackUserCreation(user_entry_id);
        result(error, null, "Error inserting verification code or sending link.");
    }
}

// Rollback function for failed user creation
function rollbackUserCreation(user_entry_id) {
    sql.query("DELETE FROM users WHERE id = ?", [user_entry_id], (err, res) => {
        if (err) console.error("Error rolling back user creation:", err);
    });
}

ProfileReq.read_profile = function read_profile(id, result) {

    try {

        sql.query("SELECT * FROM  users WHERE id=?", [id], function (err, res) {

            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res);
                result(null, res);
            }
        })
    }
    catch (e) {
        console.log(e)
    }





};

ProfileReq.update_profile = function update_profile(update_profile_req,user_id, result) {
    console.log("update profile user id = " + user_id + " request body = " + JSON.stringify(update_profile_req));
    var err = UpdateProfileSchema.validate(update_profile_req).error;
    console.log("update profile validation error = " + err);
    if (err) {
        result(err, null);
    } else {
        try {
            sql.query("UPDATE users set ? WHERE id = ?", [update_profile_req,user_id], function (err, res) {
                if (err) {
                    console.log("profile update error: ", err);
                    result(err, null);
                } else {
                    console.log("profile update saved res = " + JSON.stringify(res));
                    result(null, res.insertId);
                }
            })
        } catch (e) {
            console.log("profile update sql try error = " + e);
        }
    }
};
ProfileReq.verify_code = function update_profile(code, result) {


    try {
        var query="SELECT user_id FROM user_verification_code  WHERE email_verification_code ='"+code+"'";
        sql.query(query, function (err, res) {
            if (err) {
                result(err, null);
            }
            else {
                var data=res[0];
                if(data!==undefined){
                    console.log("here not undefiend");
                    var user_id=data['user_id'];
                    sql.query("UPDATE  users set  is_active='1' WHERE id=?",[user_id], function (err, res) {

                        if (err) {
                            result(err, null);
                        }
                        else {

                            result(null, "Account Activated",true);
                        }
                    })

                }
                else {
                    console.log("inside undefinedkkk undefiend");
                    result(null, "No user found",false);
                }

                console.log(user_id);

                /* result(null, res[0]);*/
            }
        })
    }
    catch (e) {
        console.log(e)
    }


};



module.exports = ProfileReq;
