"use strict"

const adminController = require('express').Router()

const bodyParser = require('body-parser')

adminController.use(bodyParser.urlencoded({extended: true}))
adminController.use(bodyParser.json())

const db = require('./../models')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')


adminController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['auth_token'])
    next()
})

/*
* Get All User
* */

adminController.route('/users/search').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
        console.log(result)
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            } else {
                let query = require('url').parse(request.url, true).query;
                let id = query.id
                let usernm = query.usernm
                let display_name = query.display_name
                let phone_no = query.phone_no
                let user_type = query.user_type
                let email = query.email
                let service_id = query.service_id
                let role = query.role
                let is_active = query.is_active
                let reference_one = query.reference_one
                let reference_two = query.reference_two
                let createdBy = query.createdBy
                let updatedBy = query.updatedBy
                let createdAt = query.createdAt
                let updatedAt = query.updatedAt
                let limit = query.limit
                let offset = query.offset

                let condition = 'select * from users '
                let count_query = 'select count(users.id) as count from users '
                let replace = []
                let replace_counter = []
                let flag = false

                if(id !== '' && id !== undefined && id !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.id = ? ';
                    count_query += ' users.id = ? ';
                    replace.push(id);
                    replace_counter.push(id);
                }

                if(usernm !== '' && usernm !== undefined && usernm !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.usernm = ? ';
                    count_query += ' users.usernm = ? ';
                    replace.push(usernm);
                    replace_counter.push(usernm);
                }

                if(display_name !== '' && display_name !== undefined && display_name !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.display_name = ? ';
                    count_query += ' users.display_name = ? ';
                    replace.push(display_name);
                    replace_counter.push(display_name);
                }

                if(phone_no !== '' && phone_no !== undefined && phone_no !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.phone_no = ? ';
                    count_query += ' users.phone_no = ? ';
                    replace.push(phone_no);
                    replace_counter.push(phone_no);
                }

                if(user_type !== '' && user_type !== undefined && user_type !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.user_type = ? ';
                    count_query += ' users.user_type = ? ';
                    replace.push(user_type);
                    replace_counter.push(user_type);
                }

                if(email !== '' && email !== undefined && email !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.email = ? ';
                    count_query += ' users.email = ? ';
                    replace.push(email);
                    replace_counter.push(email);
                }

                if(service_id !== '' && service_id !== undefined && service_id !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.service_id = ? ';
                    count_query += ' users.service_id = ? ';
                    replace.push(service_id);
                    replace_counter.push(service_id);
                }

                if(role !== '' && role !== undefined && role !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.role = ? ';
                    count_query += ' users.role = ? ';
                    replace.push(role);
                    replace_counter.push(role);
                }

                if(is_active !== '' && is_active !== undefined && is_active !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.is_active = ? ';
                    count_query += ' users.is_active = ? ';
                    replace.push(is_active);
                    replace_counter.push(is_active);
                }

                if(reference_one !== '' && reference_one !== undefined && reference_one !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.reference_one = ? ';
                    count_query += ' users.reference_one = ? ';
                    replace.push(reference_one);
                    replace_counter.push(reference_one);
                }

                if(reference_two !== '' && reference_two !== undefined && reference_two !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.reference_two = ? ';
                    count_query += ' users.reference_two = ? ';
                    replace.push(reference_two);
                    replace_counter.push(reference_two);
                }

                if(createdBy !== '' && createdBy !== undefined && createdBy !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.createdBy = ? ';
                    count_query += ' users.createdBy = ? ';
                    replace.push(createdBy);
                    replace_counter.push(createdBy);
                }

                if(updatedBy !== '' && updatedBy !== undefined && updatedBy !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.updatedBy = ? ';
                    count_query += ' users.updatedBy = ? ';
                    replace.push(updatedBy);
                    replace_counter.push(updatedBy);
                }

                if(createdAt !== '' && createdAt !== undefined && createdAt !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.createdAt > ? ';
                    count_query += ' users.createdAt > ? ';
                    replace.push(createdAt);
                    replace_counter.push(createdAt);
                }

                if(updatedAt !== '' && updatedAt !== undefined && updatedAt !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' users.updatedAt > ? ';
                    count_query += ' users.updatedAt > ? ';
                    replace.push(updatedAt);
                    replace_counter.push(updatedAt);
                }
                condition += ' order by users.id desc ';
                if(limit !== '' && limit !== undefined && limit !== null){
                    condition += ' limit ? ';
                    replace.push(parseInt(limit));
                }

                if(offset !== '' && offset !== undefined && offset !== null){
                    condition += ' offset ? ';
                    replace.push(parseInt(offset));
                }

                db.sequelize.query(condition,{
                    replacements: replace,
                    type: db.sequelize.QueryTypes.SELECT
                }).then((data) => {
                    try {
                        db.sequelize.query(count_query,{
                            replacements: replace_counter,
                            type: db.sequelize.QueryTypes.SELECT
                        }).then((records) => {
                            try {
                               if(records){
                                   response.json({success: true, data: data, records:records[0].count})
                               }

                            } catch (exception) {
                                response.json({success: false, message: exception.message})
                            }
                        }).catch((err) => {
                            response.json({success: false, message: err.errors})
                        })
                        //response.json({success: true, data: billboards, header:header})
                    } catch (exception) {
                        response.json({success: false, message: exception.message})
                    }
                }).catch((err) => {
                    response.json({success: false, message: err})
                })
                /*let condition = {

                }
                console.log(request.params.limit)
                console.log(request.params.offset)
                if(
                    request.params.limit !== '' &&
                    request.params.limit !== null &&
                    request.params.limit !== undefined &&
                    parseInt(request.params.limit) > 0 &&
                    parseInt(request.params.offset) > -1 &&
                    request.params.offset !== '' &&
                    request.params.offset !== null &&
                    request.params.offset !== undefined
                ){
                    console.log('123')
                    condition = {
                        attributes: ['id', 'usernm','display_name', 'phone_no', 'role','user_type', 'email','service_id','is_active','createdAt'],
                        order: [
                            ['id', 'ASC']
                        ],
                        limit: parseInt(request.params.limit),
                        offset: parseInt(request.params.offset)
                    }
                } else {
                    console.log('1234')
                    condition = {
                        attributes: ['id', 'usernm','display_name', 'phone_no', 'role','user_type', 'email','service_id','is_active','createdAt'],
                        order: [
                            ['id', 'ASC']
                        ]
                    }
                }
                console.log(condition)
                db.user.all(condition).then(users => {
                    try {
                        let query = `SELECT COUNT(id) AS total_count FROM users`
                        db.sequelize.query(query,{
                            type: db.sequelize.QueryTypes.SELECT
                        }).then((records) => {
                            try {
                                if(records){
                                    response.json({success: true, data: users, count: records})
                                } else {
                                    response.json({success: false, message: 'Error found'})
                                }
                            }
                            catch (exception) {
                                response.json({success: false, message: 'Error found'})
                            }
                        }).catch((err) => {
                            response.json({success: false, message: 'Error found'})
                        })

                    } catch (exception) {
                        response.json({success: false, message: 'Error found'})
                    }
                }).catch((err) => {
                    response.json({success: false, message: 'Error found'})
                })*/
            }
        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: 'Error found'})
    }
})

/*
* Get a User
* */

adminController.route('/users/:id').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            }
            db.user.find({
                where: {
                    id: request.params.id,
                    role: '1'
                },
                attributes: ['id', 'usernm','display_name', 'phone_no', 'role','user_type', 'email','service_id','is_active','createdAt'],
                order: [
                    ['id', 'ASC']
                ]
            }).then(user => {
                try {
                    response.json({success: true, message: user})
                  } catch (exception) {
                    response.json({success: false, message: exception.message})
                }
            }).catch((err) => {
                response.json({success: false, message: err.errors[0].message})
            })
        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
    })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})





/*
 * Update  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
adminController.route('/users/:id').patch((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Invalid token supplied'})
            } else {
                db.user.find({where: {id: request.params.id}})
                    .then(function (user) {
                        if (user) {
                            let update_data = request.body
                            if (update_data.hasOwnProperty('updated_by')) {
                                update_data.updatedBy = update_data.updated_by
                            }
                            user.updateAttributes(update_data)
                                .then(function (result) {
                                    if (result) {
                                        response.json({success: true, message: 'successfully updated'})
                                    }else{
                                        response.json({success: false, message: 'Not deleted'})
                                    }
                                })
                                .catch(function (err) {
                                    response.json({success: false, message: err.errors[0].message})
                                })
                        } else {
                            response.json({success: false, message: 'user not found'})
                        }
                    }).catch((err) => {
                    response.json({success: false, message: err.message})
                })
            }
        }).catch((err) => {
            response.json({success: false, message: err.message})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})

/*
 * Delete  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
adminController.route('/users/:id').delete((request, response) => {
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token, request.body.updated_by).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Session token required or expired'})
            } else {
                db.user.find({where: {id: request.params.id, is_active: '1'}})
                    .then(function (user) {
                        try {
                            if (user) {
                                user.updateAttributes({is_active: '0',updatedBy: request.body.updated_by})
                                    .then(function (result) {
                                        try {
                                            if (result) {
                                                response.json({success: true, message: 'successfully deleted'})
                                            }else{
                                                response.json({success: false, message: 'Not deleted'})
                                            }
                                        } catch (exception) {
                                            response.json({success: false, message: exception.message})
                                        }
                                    })
                                    .catch(function (err) {
                                        response.json({success: false, message: err.errors[0].message})
                                    })
                            } else {
                                response.json({success: false, message: 'user not found'})
                            }
                        } catch (exception) {
                            response.json({success: false, message: exception.message})
                        }
                    }).catch(function (err) {
                    response.json({success: false, message: err.message})
                })
            }

        }).catch((err) => {
            response.json({success: false, message: 'Session token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})



module.exports = adminController