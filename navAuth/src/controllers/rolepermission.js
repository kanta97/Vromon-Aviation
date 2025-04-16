"use strict"

const rolePermissionController = require('express').Router()

const bodyParser = require('body-parser')

rolePermissionController.use(bodyParser.urlencoded({extended: true}))
rolePermissionController.use(bodyParser.json())

const db = require('./../models')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')


rolePermissionController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['auth_token'])
    next()
})

/*
* Get All Role Permission
* */

rolePermissionController.route('/search').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {

                let query = require('url').parse(request.url, true).query;

                let id = query.id
                let role = query.role
                let permission = query.permission
                let deletedAt = query.deletedAt
                let createdBy = query.createdBy
                let updatedBy = query.updatedBy
                let createdAt = query.createdAt
                let updatedAt = query.updatedAt
                let limit = query.limit
                let offset = query.offset


                let condition = 'SELECT permissions.action_permission AS permission_name,permissions.id AS permission_id, roles.id AS role_id, roles.role_name, roles.display_role_name FROM role_permissions INNER JOIN roles ON roles.id = role_permissions.role INNER JOIN permissions ON permissions .id = role_permissions.permission '
                let count_query = 'SELECT COUNT(role_permissions.id) AS count FROM role_permissions INNER JOIN permissions ON permissions .id = role_permissions.permission '
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
                    condition += ' role_permissions.id = ? ';
                    count_query += ' role_permissions.id = ? ';
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
                    condition += ' role_permissions.role = ? ';
                    count_query += ' role_permissions.role = ? ';
                    replace.push(role);
                    replace_counter.push(role);
                }

                if(permission !== '' && permission !== undefined && permission !== null){
                    if(flag){
                        condition += ' and ';
                        count_query += ' and ';
                    } else {
                        flag = true;
                        condition += ' where ';
                        count_query += ' where ';
                    }
                    condition += ' role_permissions.permission = ? ';
                    count_query += ' role_permissions.permission = ? ';
                    replace.push(permission);
                    replace_counter.push(permission);
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
                    condition += ' role_permissions.deletedAt = > ';
                    count_query += ' role_permissions.deletedAt = > ';
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
                    condition += ' role_permissions.createdBy = ? ';
                    count_query += ' role_permissions.createdBy = ? ';
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
                    condition += ' role_permissions.updatedBy = ? ';
                    count_query += ' role_permissions.updatedBy = ? ';
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
                    condition += ' role_permissions.createdAt > ? ';
                    count_query += ' role_permissions.createdAt > ? ';
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
                    condition += ' role_permissions.updatedAt > ? ';
                    count_query += ' role_permissions.updatedAt > ? ';
                    replace.push(updatedAt);
                    replace_counter.push(updatedAt);
                }
                condition += ' order by role_permissions.id desc ';
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
* Get A Role Permission
* */

rolePermissionController.route('/:id').get(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            //console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                const permission_sql = `SELECT permissions.action_permission AS permission_name,
permissions.id AS permission_id, roles.id AS role_id, roles.role_name, roles.display_role_name
FROM role_permissions
INNER JOIN roles ON roles.id = role_permissions.role
INNER JOIN permissions ON permissions .id = role_permissions.permission WHERE role_permissions.deletedAt IS NULL AND role_permissions.id = ? `;
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
* Add A Role Permission
* */

rolePermissionController.route('/').post(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    let new_role_menus = {
                        permission: request.body.permission,
                        role: request.body.role,
                        createdBy: request.body.created_by || null,
                        updatedBy: request.body.created_by || null,
                        createdAt: new Date() || null,
                        updatedAt: new Date() || null
                    }
                    //console.log(new_user)
                    db.role_permissions.create(new_role_menus).then(function (role_menus) {
                        try {
                            if (role_menus) {
                                response.json({success: true, message: 'Role applied successfully on permission'})
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
* Edit A Role Permission
* */

rolePermissionController.route('/:id').patch(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token, request.body.updated_by).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    db.role_permissions.find({where: {id: request.params.id, deletedAt:null}})
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
* Delete A Role Permission
* */

rolePermissionController.route('/:id').delete(function (request, response){
    try {
        let Auth = new ApiAccess(request)
        Auth.checkTokenWithUser(request.headers.auth_token,request.body.updatedBy).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                //response.status(200).json({message:request.params.id});
                try {
                    db.role_permissions.find({where: {
                        id: request.params.id,
                        deletedAt:null
                    }})
                        .then(function (role_permissions) {
                            if (role_permissions) {
                                let update_data = {
                                    updatedBy: request.body.updatedBy,
                                    deletedAt: new Date()
                                }
                                role_permissions.updateAttributes(update_data)
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

module.exports = rolePermissionController