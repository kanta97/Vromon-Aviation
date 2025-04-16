"use strict"

const roleUserController = require('express').Router()

const bodyParser = require('body-parser')

roleUserController.use(bodyParser.urlencoded({extended: true}))
roleUserController.use(bodyParser.json())

const db = require('./../models')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')


roleUserController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['auth_token'])
    next()
})

/*
* Get All Role User
* */

roleUserController.route('/search').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                const permission_sql = `SELECT users.display_name AS user_name,
                    users.id AS user_id, roles.id AS role_id, roles.role_name, roles.display_role_name
                    FROM role_users
                    INNER JOIN roles ON roles.id = role_users.role
                    INNER JOIN users ON users .id = role_users.user WHERE role_users.deletedAt IS NULL limit ? offset ?`;

                let query = require('url').parse(request.url, true).query;

                let id = query.id
                let role = query.role
                let user = query.user
                let deletedAt = query.deletedAt
                let createdBy = query.createdBy
                let updatedBy = query.updatedBy
                let createdAt = query.createdAt
                let updatedAt = query.updatedAt
                let limit = query.limit
                let offset = query.offset


                let condition = 'SELECT users.display_name AS user_name, users.id AS user_id, roles.id AS role_id, roles.role_name, roles.display_role_name FROM role_users INNER JOIN roles ON roles.id = role_users.role INNER JOIN users ON users.id = role_users.user '
                let count_query = 'SELECT COUNT(role_users.id) as count FROM role_users INNER JOIN roles ON roles.id = role_users.role INNER JOIN users ON users.id = role_users.user '
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
                    condition += ' role_users.id = ? ';
                    count_query += ' role_users.id = ? ';
                    replace.push(id);
                    replace_counter.push(id);
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
                    condition += ' role_users.role = ? ';
                    count_query += ' role_users.role = ? ';
                    replace.push(role);
                    replace_counter.push(role);
                }

                if(user !== '' && user !== undefined && user !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' role_users.user = ? ';
                    count_query += ' role_users.user = ? ';
                    replace.push(user);
                    replace_counter.push(user);
                }

                if(deletedAt !== '' && deletedAt !== undefined && deletedAt !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' role_users.deletedAt = > ';
                    count_query += ' role_users.deletedAt = > ';
                    replace.push(deletedAt);
                    replace_counter.push(deletedAt);
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
                    condition += ' role_users.createdBy = ? ';
                    count_query += ' role_users.createdBy = ? ';
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
                    condition += ' role_users.updatedBy = ? ';
                    count_query += ' role_users.updatedBy = ? ';
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
                    condition += ' role_users.createdAt > ? ';
                    count_query += ' role_users.createdAt > ? ';
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
                    condition += ' role_users.updatedAt > ? ';
                    count_query += ' role_users.updatedAt > ? ';
                    replace.push(updatedAt);
                    replace_counter.push(updatedAt);
                }
                condition += ' order by role_users.id desc ';
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
        response.json({success: false, message: exception.message})
    }
})

/*
* Get A Role User
* */

roleUserController.route('/:id').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                const permission_sql = `SELECT users.display_name AS user_name,
                users.id AS user_id, roles.id AS role_id, roles.role_name, roles.display_role_name
                FROM role_users
                INNER JOIN roles ON roles.id = role_users.role
                INNER JOIN users ON users .id = role_users.user WHERE role_users.deletedAt IS NULL AND role_users.id = ? `;
                db.sequelize.query(
                    permission_sql,
                    {
                        replacements: [request.params.id],
                        type: db.sequelize.QueryTypes.SELECT
                    }).then(role_menus => {
                    try {
                        response.json({success: true, data: role_menus})
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
* Add A Role User
* */

roleUserController.route('/').post(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    let new_role_menus = {
                        user: request.body.user,
                        role: request.body.role,
                        createdBy: request.body.created_by || null,
                        updatedBy: request.body.created_by || null,
                        createdAt: new Date() || null,
                        updatedAt: new Date() || null
                    }
                    //console.log(new_user)
                    db.role_users.create(new_role_menus).then(function (role_menus) {
                        try {
                            if (role_menus) {
                                response.json({success: true, message: 'Role applied successfully on user'})
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
* Edit A Role User
* */

roleUserController.route('/:id').patch(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token, request.body.updated_by).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    db.role_users.find({where: {id: request.params.id, deletedAt:null}})
                        .then(function (role_menus) {
                            if (role_menus) {
                                let update_data = request.body
                                if (update_data.hasOwnProperty('updated_by')) {
                                    update_data.updatedBy = update_data.updated_by
                                }
                                role_menus.updateAttributes(update_data)
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

roleUserController.route('/:id').delete(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token,request.body.updatedBy).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                //response.status(200).json({message:request.params.id});
                try {
                    db.role_users.find({where: {id: request.params.id, deletedAt:null}})
                        .then(function (role_users) {
                            if (role_users) {
                                let update_data = {
                                    updatedBy: request.body.updatedBy,
                                    deletedAt: new Date()
                                }
                                role_users.updateAttributes(update_data)
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

module.exports = roleUserController