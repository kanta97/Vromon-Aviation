"use strict";

const loginController = require("express").Router();

const bodyParser = require("body-parser");

loginController.use(bodyParser.urlencoded({ extended: true }));
loginController.use(bodyParser.json());

const db = require("./../models");
const useToken = require("../lib/usertoken");
const md5 = require("md5");
const Op = require("sequelize").Op;
const ApiAccess = require("./../middleware/access");
const UserInputValidator = require("../lib/input_validation");

loginController.use(function (request, response, next) {
  response.append("Access-Control-Allow-Methods", "POST, GET, PUT");
  response.append("Access-Control-Allow-Headers", ["auth_token"]);
  next();
});

/*
 * User Registration
 * */

loginController.route("/create").post((request, response) => {
  try {
    let password = request.body.password || "A12345687";
    let new_user = {
      usernm: request.body.usernm,
      password: password,
      phone_no: request.body.phone_no,
      display_name: request.body.display_name,
      email: request.body.email || null,
      role: request.body.role || 1,
      is_active: request.body.is_active || 0,
      user_type: request.body.user_type || 2,
      service_id: request.body.service_id || 0,
      createdBy: request.body.created_by || 1,
      updatedBy: request.body.created_by || 1,
      createdAt: new Date() || null,
      updatedAt: new Date() || null,
    };
    //console.log(new_user)
    db.user
      .create(new_user)
      .then(function (user) {
        //console.log(user)
        let user_token = new useToken();
        user_token
          .setAndSaveToken(user)
          .then((result) => {
            try {
              let new_role_menus = {
                user: user.id,
                role: request.body.role || 1,
                createdBy: request.body.created_by || user.id,
                updatedBy: request.body.created_by || user.id,
                createdAt: new Date() || null,
                updatedAt: new Date() || null,
              };
              //console.log(new_user)
              db.role_users
                .create(new_role_menus)
                .then(function (role_menus) {
                  try {
                    if (result) {
                      const permission_sql = `select permissions.action_permission from role_users inner join role_permissions on role_permissions.role = role_users.role inner join permissions on permissions.id = role_permissions.permission where role_users.user = ? `;
                      db.sequelize
                        .query(permission_sql, {
                          replacements: [user.id],
                          type: db.sequelize.QueryTypes.SELECT,
                        })
                        .then((permission) => {
                          if (permission) {
                            const menu_sql = `select menus.menu, menus.display_menu, menus.parent_id, menus.id, menus.display_menu, menus.menu_path, menus.menu_icon from role_users inner join role_menus on role_menus.role = role_users.role inner join menus on menus.id = role_menus.menu where role_users.user = ? `;
                            db.sequelize
                              .query(menu_sql, {
                                replacements: [user.id],
                                type: db.sequelize.QueryTypes.SELECT,
                              })
                              .then((menu) => {
                                let data = {};
                                if (menu) {
                                  response.json({
                                    success: true,
                                    userId: user.id,
                                    userRole: user.role,
                                    usernm: user.usernm,
                                    phone_no: user.phone_no,
                                    display_name: user.display_name,
                                    email: user.email,
                                    user_type: user.user_type,
                                    service_id: user.service_id,
                                    createdBy: user.created_by,
                                    createdAt: user.created_at,
                                    menu: menu,
                                    permission: permission,
                                    auth_token: result,
                                    message: "Successfully Logged In",
                                  });
                                } else {
                                  response.json({
                                    success: true,
                                    userId: user.id,
                                    userRole: user.role,
                                    usernm: user.usernm,
                                    phone_no: user.phone_no,
                                    display_name: user.display_name,
                                    email: user.email,
                                    user_type: user.user_type,
                                    service_id: user.service_id,
                                    createdBy: user.created_by,
                                    createdAt: user.created_at,
                                    menu: [],
                                    permission: permission,
                                    auth_token: result,
                                    message: "Successfully Logged In",
                                  });
                                }
                              });
                          } else {
                            response.json({
                              success: true,
                              userId: user.id,
                              userRole: user.role,
                              usernm: user.usernm,
                              phone_no: user.phone_no,
                              display_name: user.display_name,
                              email: user.email,
                              user_type: user.user_type,
                              service_id: user.service_id,
                              createdBy: user.created_by,
                              createdAt: user.created_at,
                              menu: [],
                              permission: [],
                              auth_token: result,
                              message: "Successfully Logged In",
                            });
                          }
                        });
                    } else {
                      response.json({
                        success: false,
                        data: {
                          userId: user.id,
                          userRole: user.role,
                          auth_token: null,
                          message: "Unable to create accounts",
                        },
                      });
                    }
                  } catch (exception) {
                    response.json({
                      success: false,
                      message: exception.message,
                    });
                  }
                })
                .catch(function (err) {
                  //let er = new ValidationError(message, [err])
                  response.json({ success: false, message: err.message });
                });
            } catch (exception) {
              response.json({ success: false, message: exception.message });
            }
          })
          .catch((err) => {
            response.json({ success: false, message: err.message });
          });
      })
      .catch(function (err) {
        //let er = new ValidationError(message, [err])
        response.json({ success: false, message: err.message });
      });
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
});

/*
 * User Login
 * */
loginController.route("/login").post(function (request, response) {
  try {
    /*  if ((UserInputValidator.isEmail(request.body.usernm)
            || UserInputValidator.isMobile(request.body.usernm))
            || UserInputValidator.isPassword(request.body.password)
        ) {*/
    let condition = {};
    if (UserInputValidator.isMobile(request.body.usernm)) {
      condition = {
        phone_no: request.body.usernm,
        password: request.body.password,
        is_active: "1",
      };
    } else if (UserInputValidator.isEmail(request.body.usernm)) {
      condition = {
        email: request.body.usernm,
        password: request.body.password,
        is_active: "1",
      };
    } else {
      condition = {
        usernm: request.body.usernm,
        password: request.body.password,
        is_active: "1",
      };
    }

    db.user
      .findOne({
        where: condition,
        attributes: [
          "id",
          "phone_no",
          "display_name",
          "role",
          "user_type",
          "email",
          "usernm",
          "service_id",
          "createdAt",
        ],
      })
      .then((user) => {
        console.log(user);
        if (user) {
          //if (user.password === request.body.password) {
          let user_token = new useToken();
          user_token
            .setAndSaveToken(user)
            .then((result) => {
              try {
                if (result) {
                  const permission_sql = `select permissions.action_permission from role_users inner join role_permissions on role_permissions.role = role_users.role inner join permissions on permissions.id = role_permissions.permission where role_users.user = ? `;
                  db.sequelize
                    .query(permission_sql, {
                      replacements: [user.id],
                      type: db.sequelize.QueryTypes.SELECT,
                    })
                    .then((permission) => {
                      if (permission) {
                        const menu_sql = `select menus.menu, menus.display_menu, menus.parent_id, menus.id, menus.display_menu, menus.menu_path, menus.menu_icon from role_users inner join role_menus on role_menus.role = role_users.role inner join menus on menus.id = role_menus.menu where role_users.user = ? `;
                        db.sequelize
                          .query(menu_sql, {
                            replacements: [user.id],
                            type: db.sequelize.QueryTypes.SELECT,
                          })
                          .then((menu) => {
                            let data = {};
                            if (menu) {
                              response.json({
                                success: true,
                                userId: user.id,
                                userRole: user.role,
                                usernm: user.usernm,
                                phone_no: user.phone_no,
                                display_name: user.display_name,
                                email: user.email,
                                user_type: user.user_type,
                                service_id: user.service_id,
                                createdBy: user.created_by,
                                createdAt: user.created_at,
                                menu: menu,
                                permission: permission,
                                auth_token: result,
                                message: "Successfully Logged In",
                              });
                            } else {
                              response.json({
                                success: true,
                                userId: user.id,
                                userRole: user.role,
                                usernm: user.usernm,
                                phone_no: user.phone_no,
                                display_name: user.display_name,
                                email: user.email,
                                user_type: user.user_type,
                                service_id: user.service_id,
                                createdBy: user.created_by,
                                createdAt: user.created_at,
                                menu: [],
                                permission: permission,
                                auth_token: result,
                                message: "Successfully Logged In",
                              });
                            }
                          });
                      } else {
                        response.json({
                          success: true,
                          userId: user.id,
                          userRole: user.role,
                          usernm: user.usernm,
                          phone_no: user.phone_no,
                          display_name: user.display_name,
                          email: user.email,
                          user_type: user.user_type,
                          service_id: user.service_id,
                          createdBy: user.created_by,
                          createdAt: user.created_at,
                          menu: [],
                          permission: [],
                          auth_token: result,
                          message: "Successfully Logged In",
                        });
                      }
                    });
                } else {
                  response.json({ success: false, message: "server err" });
                }
              } catch (exception) {
                response.json({ success: false, message: exception.message });
              }
            })
            .catch((err) => {
              response.json({ success: false, message: err.message });
            });
          /* } else {
                            response.json({success: false, message: 'Password doesn\'t match'})
                        }*/
        } else {
          response.json({
            success: false,
            message: "Invalid Credentials or User doesn't exist",
          });
        }
      })
      .catch((err) => {
        response.json({ success: false, message: err });
      });
    /* } else {
            response.json({success: false, message: 'Username or Password is invalid'})
        }*/
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
});

/*
 * get  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
loginController.route("/:id").get((request, response) => {
  try {
    let Auth = new ApiAccess(request);
    Auth.checkToken(request.headers.auth_token)
      .then((result) => {
        // console.log(result);
        // console.log(`sazzad ${request.params.id}`);
        if (!result) {
          response.json({
            success: false,
            message: "Token required or expired",
          });
        } else {
          try {
            console.log();
            if (result.userId !== "") {
              db.user
                .findOne({
                  where: {
                    id: request.params.id,
                    //is_active: "1",
                  },
                })
                .then(function (user) {
                  try {
                    if (user.id !== "") {
                      response.json({ success: true, message: user });
                    } else {
                      response.json({ success: false, message: "Error found" });
                    }
                  } catch (exception) {
                    response.json({ success: false, message: "Error found" });
                  }
                })
                .catch(function (err) {
                  response.json({ success: false, message: "Error found" });
                });
            } else {
              response.json({
                success: false,
                message: "Invalid token supplied",
              });
            }
          } catch (exception) {
            response.json({ success: false, message: "Error found" });
          }
        }
      })
      .catch((err) => {
        response.json({ success: false, message: err.message });
      });
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
});

/*
 * Update  A User
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
loginController.route("/:id").patch((request, response) => {
  try {
    let Auth = new ApiAccess(request);
    Auth.checkTokenWithUser(request.headers.auth_token, request.params.id)
      .then((result) => {
        //console.log(result)
        if (!result) {
          response.json({
            success: false,
            message: "Token required or expired",
          });
        } else {
          try {
            if (result.userId !== "") {
              db.user
                .findOne({
                  where: {
                    id: request.params.id,
                    // is_active: "1",
                  },
                })
                .then(function (user) {
                  try {
                    if (user.id !== "") {
                      let update_data = request.body;
                      user
                        .updateAttributes(update_data)
                        .then(function (result) {
                          response.json({
                            success: true,
                            message: "Updated Successfully",
                          });
                        })
                        .catch(function (err) {
                          response.json({
                            success: false,
                            message: "Not updated",
                          });
                        });
                    } else {
                      response.json({ success: false, message: "Error found" });
                    }
                  } catch (exception) {
                    response.json({ success: false, message: "Error found" });
                  }
                })
                .catch(function (err) {
                  response.json({ success: false, message: "Error found" });
                });
            } else {
              response.json({
                success: false,
                message: "Invalid token supplied",
              });
            }
          } catch (exception) {
            response.json({ success: false, message: "Error found" });
          }
        }
      })
      .catch((err) => {
        response.json({ success: false, message: err.message });
      });
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
});

/*
 * token validator
 * */
/*
loginController.route('/checker').get((request, response) => {

    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            console.log(request.headers.auth_token)
            console.log(result)
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    if (result.userId !== ''){
                        response.json({success: true, message: 'Valid token'})
                        /!*let userId = result.userId
                        let userRole = result.role
                        let userStatus = result.is_active
                        db.user.findOne({
                            where: {
                                id: userId,
                                role:userRole,
                                is_active:userStatus
                            }
                        })
                        .then(function (user) {
                            try {
                                if(user.id !== ''){
                                    response.json({success: true, message: 'Valid token'})
                                } else {
                                    response.json({success: false, message: 'Error found'})
                                }
                            }catch (exception) {
                                response.json({success: false, message: 'Error found'})
                            }

                        }).catch(function (err) {
                            response.json({success: false, message: 'Error found'})
                        })*!/
                    } else {
                        response.json({success: '15', message: 'Invalid token supplied'});
                    }
                }catch (exception) {
                    response.json({success: '14', message: 'Error a found'})
                }
            }
        }).catch((err) => {
            response.json({success: '13', message: err.message})
        })
    }
    catch (exception) {
        response.json({success: '12', message: exception.message})
    }
})*/

module.exports = loginController;
