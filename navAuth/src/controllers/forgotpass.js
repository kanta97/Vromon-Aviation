"use strict";

const forgotController = require("express").Router();

const bodyParser = require("body-parser");

forgotController.use(bodyParser.urlencoded({ extended: true }));
forgotController.use(bodyParser.json());

const db = require("./../models");
const useToken = require("../lib/usertoken");
const md5 = require("md5");
const Op = require("sequelize").Op;
const ApiAccess = require("./../middleware/access");
const UserInputValidator = require("../lib/input_validation");

const sendSMS = require("../../sendSMS");
const sendEmail = require("../../sendEmail");

forgotController.use(function (request, response, next) {
  response.append("Access-Control-Allow-Methods", "POST, GET, PUT");
  response.append("Access-Control-Allow-Headers", ["auth_token"]);
  next();
});

/*
 * Sending Otp
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */

function getOtp(request, response) {
  const emailOrPhone = request.body.emailOrPhone;

  try {
    //checking input type
    let where = {
      phone_no: emailOrPhone,
      is_active: "1",
    };
    if (UserInputValidator.isEmail(emailOrPhone)) {
      where = {
        email: emailOrPhone,
        is_active: "1",
      };
    }
    db.user
      .findOne({
        where: where,
        attributes: ["id", "display_name", "phone_no", "email"],
      })
      .then((user) => {
        console.log(user);
        if (user) {
          let key = 100000 + Math.floor(Math.random() * 900000);

          let forgot = {
            user_id: user.id,
            v_code: key,
            is_active: "1",
            createdAt: new Date() || null,
            updatedAt: new Date() || null,
          };
          db.forgot
            .create(forgot)
            .then(function (forgot) {
              if (forgot) {
                sendSMS(user.phone_no, `Your password reset otp is ${key}`);
                sendEmail({
                  email: user.email,
                  name: user.display_name,
                  otp: key,
                });
                response.json({ success: true, message: "Otp Sent to you." });
              } else {
                response.json({
                  success: false,
                  message: "Unable to generate code",
                });
              }
            })
            .catch((err) => {
              console.log("error in 11", err);
              response.json({ success: false, message: err });
            });
        } else {
          response.json({ success: false, message: "User Not found" });
        }
      })
      .catch((err) => {
        console.log("error in 22", err);
        response.json({ success: false, message: err });
      });
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
}

forgotController.route("/get-otp").post((request, response) => {
  getOtp(request, response);
});

/*
 * Match Otp
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */

forgotController.route("/match-otp").post((request, response) => {
  const emailOrPhone = request.body.emailOrPhone;

  try {
    let where = {
      phone_no: emailOrPhone,
      is_active: "1",
    };
    if (UserInputValidator.isEmail(emailOrPhone)) {
      where = {
        email: emailOrPhone,
        is_active: "1",
      };
    }
    db.user
      .findOne({
        where: where,
        attributes: ["id", "phone_no", "role", "email", "usernm", "createdAt"],
      })
      .then((user) => {
        if (user) {
          try {
            db.forgot
              .findOne({
                where: {
                  v_code: request.body.v_code,
                  user_id: user.id,
                  is_active: "1",
                },
                attributes: ["id", "v_code", "user_id"],
              })
              .then((v_code) => {
                // console.log(v_code)
                if (v_code) {
                  let update_data = {
                    is_active: "0",
                  };
                  v_code
                    .updateAttributes(update_data)
                    .then(function (result) {
                      if (result) {
                        let user_token = new useToken();
                        user_token
                          .setAndSaveToken(user)
                          .then((result) => {
                            response.json({ success: true, message: result });
                          })
                          .catch(function (err) {
                            response.json({
                              success: false,
                              message: "Invalid verification code",
                            });
                          });
                      } else {
                        response.json({
                          success: true,
                          message: "Invalid verification code",
                        });
                      }
                    })
                    .catch(function (err) {
                      response.json({
                        success: false,
                        message: "Invalid verification code",
                      });
                    });
                } else {
                  response.json({
                    success: false,
                    message: "Invalid verification code",
                  });
                }
              })
              .catch((err) => {
                response.json({ success: false, message: err });
              });
          } catch (exception) {
            response.json({ success: false, message: exception.message });
          }
        } else {
          response.json({ success: false, message: "User Not found" });
        }
      })
      .catch((err) => {
        response.json({ success: false, message: err });
      });
  } catch (exception) {
    response.json({ success: false, message: exception.message });
  }
});

/*
 * Update  User Password
 * @params  password, firstName, lastName, email
 * Response Created UserID
 * */
forgotController.route("/reset-pass").post((request, response) => {
  try {
    let Auth = new ApiAccess(request);
    Auth.checkToken(request.headers.auth_token)
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
                    id: result.userId,
                    is_active: "1",
                  },
                })
                .then(function (user) {
                  try {
                    if (user.id !== "") {
                      let update_data = {
                        password: request.body.password,
                      };
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

module.exports = forgotController;
