"use strict"

const roleController = require('express').Router()

const bodyParser = require('body-parser')

roleController.use(bodyParser.urlencoded({extended: true}))
roleController.use(bodyParser.json())

const db = require('./../models')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')


roleController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['auth_token'])
    next()
})

/*
* Get All Role
* */

roleController.route('/search').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                let query = require('url').parse(request.url, true).query;

                let id = query.id
                let service_id = query.service_id
                let role_name = query.role_name
                let display_role_name = query.display_role_name
                let is_active = query.is_active
                let createdBy = query.createdBy
                let updatedBy = query.updatedBy
                let createdAt = query.createdAt
                let updatedAt = query.updatedAt
                let limit = query.limit
                let offset = query.offset


                let condition = 'select * from roles '
                let count_query = 'select count(roles.id) as count from roles '
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
                    condition += ' roles.id = ? ';
                    count_query += ' roles.id = ? ';
                    replace.push(id);
                    replace_counter.push(id);
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
                    condition += ' roles.service_id = ? ';
                    count_query += ' roles.service_id = ? ';
                    replace.push(service_id);
                    replace_counter.push(service_id);
                }

                if(role_name !== '' && role_name !== undefined && role_name !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' roles.role_name = ? ';
                    count_query += ' roles.role_name = ? ';
                    replace.push(role_name);
                    replace_counter.push(role_name);
                }

                if(display_role_name !== '' && display_role_name !== undefined && display_role_name !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' roles.display_role_name = ? ';
                    count_query += ' roles.display_role_name = ? ';
                    replace.push(display_role_name);
                    replace_counter.push(display_role_name);
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
                    condition += ' roles.is_active = ? ';
                    count_query += ' roles.is_active = ? ';
                    replace.push(is_active);
                    replace_counter.push(is_active);
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
                    condition += ' roles.createdBy = ? ';
                    count_query += ' roles.createdBy = ? ';
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
                    condition += ' roles.updatedBy = ? ';
                    count_query += ' roles.updatedBy = ? ';
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
                    condition += ' roles.createdAt > ? ';
                    count_query += ' roles.createdAt > ? ';
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
                condition += ' order by roles.id desc ';
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


            }

        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: 'Error found'})
    }
})



/*
* Get A Role
* */

roleController.route('/:id').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                db.roles.all({
                    where: {
                        id: request.params.id
                    },
                    attributes: ['id', 'role_name', 'display_role_name', 'is_active', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
                    order: [
                        ['id', 'ASC']
                    ]
                }).then(roles => {
                    try {
                        response.json({success: true, data: roles})
                    } catch (exception) {
                        response.json({success: false, message: exception.message})
                    }
                }).catch((err) => {
                    response.json({success: false, message: err.errors[0].message})
                })
            }

        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})


/*
* Add A Role
* */

roleController.route('/').post(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    let new_role = {
                        role_name: request.body.role_name,
                        display_role_name: request.body.display_role_name,
                        service_id: request.body.service_id || 0,
                        createdBy: request.body.created_by || null,
                        updatedBy: request.body.created_by || null,
                        createdAt: new Date() || null,
                        updatedAt: new Date() || null
                    }
                    //console.log(new_user)
                    db.roles.create(new_role).then(function (role) {
                        try {
                            if (role) {
                                response.json({success: true, message: 'Role added successfully'})
                            } else {
                                response.json({success: false, message: 'Role not added'})
                            }
                        } catch
                            (exception) {
                            response.json({success: false, message: exception.message})
                        }
                    })
                        .catch(function (err) {
                            //let er = new ValidationError(message, [err])
                            response.json({success: false, message: err.message})
                        })
                }
                catch
                    (exception) {
                    response.json({success: false, message: exception.message})
                }
            }

        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})

/*
* Edit A Role
* */

roleController.route('/:id').patch(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token, request.body.updated_by).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    db.roles.find({where: {id: request.params.id}})
                        .then(function (roles) {
                            if (roles) {
                                let update_data = request.body
                                if (update_data.hasOwnProperty('updated_by')) {
                                    update_data.updatedBy = update_data.updated_by
                                }
                                roles.updateAttributes(update_data)
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
                catch
                    (exception) {
                    response.json({success: false, message: exception.message})
                }
            }

        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})



/*
* Delete A Role Menu
* */

roleController.route('/:id').delete(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token, request.body.updatedBy).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                //response.status(200).json({message:request.params.id});
                try {
                    db.roles.find({where: {id: request.params.id, is_active: '1'}})
                        .then(function (roles) {
                            if (roles) {

                                db.role_users.findOne({
                                    where: {
                                        role: request.params.id
                                    }})
                                    .then(function (isAssigned) {
                                        if (isAssigned) {
                                            response.json({success: false, message: 'Role assigned'})
                                        } else {
                                            let update_data = {
                                                updatedBy: request.body.updatedBy,
                                                is_active: '0',
                                                updatedAt: new Date()
                                            }
                                            roles.updateAttributes(update_data)
                                                .then(function (result) {
                                                    if (result) {
                                                        response.json({success: true, message: 'Deleted successfully'})
                                                    }else{
                                                        response.json({success: false, message: 'Not deleted'})
                                                    }
                                                })
                                                .catch(function (err) {
                                                    response.json({success: false, message: err.errors[0].message})
                                                })

                                        }
                                    })




                            } else {
                                response.json({success: false, message: 'Record not found'})
                            }
                        }).catch((err) => {
                        response.json({success: false, message: err.message})
                    })
                }
                catch
                    (exception) {
                    response.json({success: false, message: exception.message})
                }
            }

        }).catch((err) => {
            response.json({success: false, message: 'Token required or expired'})
        })
    } catch (exception) {
        response.json({success: false, message: exception.message})
    }
})


module.exports = roleController