'user strict';
var joi = require('joi');
var sql = require('./db.js');
const config = require('../config/config');
var request = require('request');


var PromoSchema = joi.object().keys({
    name: joi.string().required(),
    code: joi.string(),
    discount: joi.number().integer().required(),
    valid_till: joi.date().required(),
    status: joi.string().allow('')
});
var Promo_UserSchema = joi.object().keys({
    channel: joi.string().required(),
    promo_id: joi.number().integer().required(),
    user_id: joi.array().items(joi.number().integer()).required(),
    status: joi.string().allow('')
});
var Promo_ValiditySchema = joi.object().keys({
    code: joi.string().required(),
    user_id: joi.string().required()
});
class Promo_User {
    constructor(promo_user) {
        this.promo_id = promo_user.promo_id;
        this.user_id = promo_user.user_id;
        this.status = "ASSIGNED";
        this.channel = promo_user.channel;

        var err = Promo_UserSchema.validate(this).error;
        if (err) {
            this.err = err;
        }
    }
}
class Promo_Validity {
    constructor(promo_Validity) {
        this.code = promo_Validity.promoCode;
        this.user_id = promo_Validity.userId;
        var err = Promo_ValiditySchema.validate(this).error;
        if (err) {
            this.err = err;
        }
    }
}
class Promo {
    constructor(promo) {
        this.name = promo.name;
        this.code = promo.code;
        this.discount = promo.discount;
        this.valid_till = promo.valid_till;
        this.status = "ACTIVE";
        var err = PromoSchema.validate(this).error;
        if (err) {
            this.err = err;
        }
    }
    static create_promo(req, result) {
        try {
            var promo = new Promo(req.body);
            if (promo.err) {
                result(promo.err, null);
                return;
            }
            const codes = generateStrings(req.body.numberofpromo, 7);
            var codes_string = '';
            for (const value of codes.values()) {
                codes_string = codes_string + value + '|';
            }
            var promo_query = "CALL create_promo(";
            promo_query = promo_query + "'" + promo.name + "'," + promo.discount + ",'" + promo.valid_till + "','" + promo.status + "','" + codes_string + "')";
            console.log(promo_query);
            sql.sql_query(promo_query)
                .then(rows => {
                    result(null, "promo successful");
                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }
   /* static assign_user(req, result) {
        try {
            var promo_user = new Promo_User(req.body);
            if (promo_user.err) {
                result(promo_user.err, null);
                return;
            }

            var user_string = '';
            var i = 0;
            for (i = 0; i < promo_user.user_id.length; i++) {
                user_string = user_string + promo_user.user_id[i] + '|';
            }

            var promo_query = "CALL assign_promo(";
            promo_query = promo_query + promo_user.promo_id + ",'" + promo_user.status + "','" + promo_user.channel + "','" + user_string + "')";
            console.log(promo_query);
            sql.sql_query(promo_query)
                .then(rows => {
                    result(null, "promo successful");
                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }*/
   /* static assign_user(req, result) {
        try {
            var promo_user = new Promo_User(req.body);

            if (promo_user.err) {
                result(promo_user.err, null);
                return;
            }

            var user_string = '';
            var i = 0;
            for (i = 0; i < promo_user.user_id.length; i++) {

                user_string = user_string + promo_user.user_id[i] + '|';
            }

            var promo_query = "CALL assign_promo(";
            promo_query = promo_query + promo_user.promo_id + ",'" + promo_user.status + "','" + promo_user.channel + "','" + user_string + "')";
            sql.sql_query(promo_query)
                .then(rows => {
                    var response=  JSON.stringify(rows[0]);
                    var promo=JSON.parse(response);
                    console.log(promo_user.user_id);

                    var  options = {
                        uri: config.authServer.bulkUserDetails,
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'app_key':'123456'
                        },
                        json: {
                            user_ids: promo_user.user_id
                        },
                        strictSSL: false
                    };
                    request.post(options, (error, res) => {
                        if (error) {
                            result(null, "Promo assigned but email/sms hasn't been sent ");

                        }else {
                            var userDetails=res.body.body.data;

                            if(userDetails.length>0){
                                for(let val of userDetails) {
                                    if(promo_user.channel==='SMS'){
                                        var options = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoSMS",
                                                priority: 1,
                                                userName: val.userName,
                                                number: val.mobileNumber,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };

                                        request.post(options, (error, res, body) => {
                                            if (error) {
                                                console.log("here notification sms error");
                                                console.log(error);
                                                result(null, "Promo asigned successfully but sms/email has not been sent to user");
                                            }else {
                                                result(null, "Promo asigned successfully");
                                            }

                                        });
                                    }else if(promo_user.channel==='EMAIL'){
                                        var optionsEmail = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoEmail",
                                                priority: 1,
                                                userName: val.userName,
                                                email: val.email,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };
                                        request.post(optionsEmail, (error, res, body) => {
                                            if (error) {
                                                console.log("here notification sms error");
                                                console.log(error);
                                                result(null, "Promo asigned successfully but email has not been sent to user");
                                            }else {
                                                result(null, "Promo asigned successfully");
                                            }

                                        });
                                    }else if(promo_user.channel==='BOTH'){
                                        var options = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoSMS",
                                                priority: 1,
                                                userName: val.userName,
                                                number: val.mobileNumber,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };

                                        request.post(options, (error, res, body) => {
                                            if (error) {

                                                result(null, "Promo asigned successfully but sms/email has not been sent to user");
                                            }else {
                                                var optionsEmail = {
                                                    uri: config.notification.dispatcher,
                                                    method: 'POST',
                                                    json: {
                                                        notification_type: "assignPromoEmail",
                                                        priority: 1,
                                                        userName: val.userName,
                                                        email: val.email,
                                                        additionalMessage: [{
                                                            name: val.userName,
                                                            date:promo[0].valid_till,
                                                            discount:promo[0].discount,
                                                            promo: promo[0].code,
                                                            discount2:promo[0].discount
                                                        }]
                                                    },
                                                    strictSSL: false
                                                };
                                                request.post(optionsEmail, (error, res, body) => {
                                                    if (error) {

                                                        result(null, "Promo asigned successfully but email has not been sent to user");
                                                    }else {
                                                        result(null, "Promo asigned successfully");
                                                    }

                                                });
                                            }

                                        });


                                        var optionsEmail = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoEmail",
                                                priority: 1,
                                                userName: val.userName,
                                                email: val.email,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };
                                        request.post(optionsEmail, (error, res, body) => {
                                            if (error) {
                                                console.log("here notification sms error");
                                                console.log(error);
                                                result(null, "Promo asigned successfully but email has not been sent to user");
                                            }else {
                                                result(null, "Promo asigned successfully");
                                            }

                                        });
                                     /!*   var optionsBoth = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoEmail",
                                                priority: 1,
                                                userName: val.userName,
                                                email: val.email,
                                                number:val.mobileNumber,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };
                                        request.post(optionsBoth, (error, res, body) => {
                                            if (error) {
                                                result(null, "Promo asigned successfully but sms/email has not been sent to user");
                                            }else {
                                                result(null, "Promo asigned successfully");
                                            }

                                        });*!/
                                    }

                                }
                            }else {
                                result(null, "Promo asigned successfully but no user email/number not found.");
                            }


                        }

                    });

                    // console.log(userList);
                    //console.log(`SELECT * FROM  users WHERE user_id IN `+ userList`)`);
                    //return 0;


                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log(err);
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }*/
    static assign_user(req, result) {
        try {
            var promo_user = new Promo_User(req.body);

            if (promo_user.err) {
                result(promo_user.err, null);
                return;
            }

            var user_string = '';
            var i = 0;
            for (i = 0; i < promo_user.user_id.length; i++) {

                user_string = user_string + promo_user.user_id[i] + '|';
            }

            var promo_query = "CALL assign_promo(";
            promo_query = promo_query + promo_user.promo_id + ",'" + promo_user.status + "','" + promo_user.channel + "','" + user_string + "')";
            sql.sql_query(promo_query)
                .then(rows => {
                    var response=  JSON.stringify(rows[0]);
                    var promo=JSON.parse(response);
                    console.log(promo_user.user_id);

                    var  options = {
                        uri: config.authServer.bulkUserDetails,
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'app_key':'123456'
                        },
                        json: {
                            user_ids: promo_user.user_id
                        },
                        strictSSL: false
                    };
                    request.post(options, (error, res) => {
                        if (error) {
                            result(null, "Promo assigned but email/sms hasn't been sent ");
                        }else {
                            var userDetails=res.body.body.data;
                            var notification_count=0;


                            if(userDetails.length>0){
                                for(let val of userDetails) {
                                    console.log(val);
                                    if(promo_user.channel==='SMS'){
                                        let options = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoSMS",
                                                priority: 1,
                                                userName: val.userName,
                                                number: val.mobileNumber,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount_2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };

                                        request.post(options, (error, res, body) => {
                                            if (error) {

                                                console.log(error);
                                            }else {

                                                notification_count++;
                                            }

                                        });
                                    }
                                    else if(promo_user.channel==='EMAIL'){
                                        var optionsEmail = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoEmail",
                                                priority: 1,
                                                userName: val.userName,
                                                email: val.email,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount_2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };
                                        request.post(optionsEmail, (error, res, body) => {
                                            if (error) {
                                                console.log("here notification sms error");
                                                console.log(error);
                                            }else {
                                                notification_count++;
                                            }
                                        });
                                    }
                                    else if(promo_user.channel==='BOTH'){
                                        var options = {
                                            uri: config.notification.dispatcher,
                                            method: 'POST',
                                            json: {
                                                notification_type: "assignPromoSMS",
                                                priority: 1,
                                                userName: val.userName,
                                                number: val.mobileNumber,
                                                additionalMessage: [{
                                                    name: val.userName,
                                                    date:promo[0].valid_till,
                                                    discount:promo[0].discount,
                                                    promo: promo[0].code,
                                                    discount_2:promo[0].discount
                                                }]
                                            },
                                            strictSSL: false
                                        };

                                        request.post(options, (error, res, body) => {
                                            if (error) {
                                                console.log("here notification sms error");
                                                console.log(error);

                                            }else {
                                                var optionsEmail = {
                                                    uri: config.notification.dispatcher,
                                                    method: 'POST',
                                                    json: {
                                                        notification_type: "assignPromoEmail",
                                                        priority: 1,
                                                        userName: val.userName,
                                                        email: val.email,
                                                        additionalMessage: [{
                                                            name: val.userName,
                                                            date:promo[0].valid_till,
                                                            discount:promo[0].discount,
                                                            promo: promo[0].code,
                                                            discount_2:promo[0].discount
                                                        }]
                                                    },
                                                    strictSSL: false
                                                };
                                                request.post(optionsEmail, (error, res, body) => {
                                                    if (error) {
                                                        console.log("here notification sms error");
                                                        console.log(error);
                                                    }else {
                                                        notification_count++;
                                                    }

                                                });
                                                /*
                                                                                                result(null, "Promo asigned successfully");
                                                */
                                            }

                                        });
                                    }

                                }
                            }
                            result(null, "Promo asigned successfully");

                        }

                    });

                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log(err);
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    static check_promo(req, result) {
        try {
            var promo_Validity = new Promo_Validity(req.body);
            if (promo_Validity.err) {
                result(promo_Validity.err, null);
                return;
            }

            var promo_query = "SELECT promos.valid_till, promos.status promo_status, promos.discount,promo_user.status user_status, promo_user.channel FROM promos JOIN promo_user ON promos.id = promo_user.promo_id AND promos.code = '"+promo_Validity.code+"' AND promo_user.user_id = '"+promo_Validity.user_id+"'";
            console.log(promo_query);
            sql.sql_query(promo_query)
                .then(rows => {
                        result(null, rows[0], 1);
                        return;
                }, err => {
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled", err);
                    result(null, "", 0);
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    static update_promo(id, req, result) {
        try {
            var promo = new Promo(req.body);
            if (promo.err) {
                result(promo.err, null);
                return;
            }
            const codes = generateStrings(req.body.numberofpromo, 7);
            var codes_string = '';
            for (const value of codes.values()) {
                codes_string = codes_string + value + '|';
            }
            var promo_query = "update promos set discount = " + promo.discount + ", valid_till = '"+ promo.valid_till+"', name = '"+promo.name+"' where id =" + id;
            console.log(promo_query);
            sql.sql_query(promo_query)
                .then(rows => {
                    result(null, "promo successful");
                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    static delete_promo(id, req, result) {
        try {

            var promo_query = "delete from promos where id = " +id;
            console.log(promo_query);
            sql.sql_query(promo_query)
                .then(rows => {
                    result(null, "successful");
                }, err => {
                    result(null, "promo rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    static get_promo_by_criteria(req, result) {
        var resp = {};
        try {
            var query = require('url').parse(req.url, true).query;
            var criteria = query.criteria;
            var value = query.value;
            var limit = query.limit;
            var offset = query.offset;
            var search_params = {};

            var count = 0;

            if((typeof limit == "undefined" || typeof offset == "undefined") && typeof criteria !== "undefined"){
                var search_query = "select * from promos where "+ criteria + " = '" + value + "'";
                var search_count_query = "select count(*) records from promos where "+ criteria + " = '" + value + "'";

            }
            else if((typeof limit == "undefined" || typeof offset == "undefined")){
                var search_query = "select * from promos";
                var search_count_query = "select count(*) records from promos";

            }
            else if (typeof criteria == "undefined") {
                var search_query = "select * from promos limit " + offset + ", "+ limit;
                var search_count_query = "select count(*) records from promos";
            }
            else{
                var search_query = "select * from promos where "+ criteria + " = '" + value + "' limit " + offset + ", "+ limit;
                var search_count_query = "select count(*) records from promos where "+ criteria + " = '" + value + "'";
            }
            console.log(search_query);
            console.log(search_count_query);
            sql.sql_query(search_query)
                .then(rows => {
                    resp = rows;
                    return sql.sql_query(search_count_query);
                })
                .then(rows => {
                    console.log(rows[0].records);
                    result(null, resp, rows[0].records);
                }, err => {
                    result(null, "Failed", 0);
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled" + err);
                });
        }
        catch (e) {
            console.log(e);
        }
    }
}
const generateStrings = (numberOfStrings, stringLength) => {
    const randomstring = require('randomstring')
    const s = new Set()

    while (s.size < numberOfStrings) {
        s.add(randomstring.generate(stringLength))
    }

    return s
}

module.exports = Promo;
