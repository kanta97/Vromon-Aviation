"use strict"

const checkController = require('express').Router()

const bodyParser = require('body-parser')

checkController.use(bodyParser.urlencoded({extended: true}))
checkController.use(bodyParser.json())

const db = require('./../models')
const useToken = require('../lib/usertoken')
const md5 = require('md5')
const Op = require('sequelize').Op
const ApiAccess = require('./../middleware/access')
const UserInputValidator = require("../lib/input_validation")


checkController.use(function (request, response, next) {
    response.append('Access-Control-Allow-Methods', 'POST, GET, PUT')
    response.append('Access-Control-Allow-Headers', ['auth_token'])
    next()
})

checkController.route('/').get((request, response) => {

    try {
        let Auth = new ApiAccess(request)
        Auth.checkToken(request.headers.auth_token).then((result) => {
            if (!result) {
                response.json({success: false, message: 'Token required or expired'})
            } else {
                try {
                    if (result.userId !== ''){
                        response.json({success: true, message: 'Valid token'})
                        /*let userId = result.userId
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
                        })*/
                    } else {
                        response.json({success: false, message: 'Invalid token supplied'});
                    }
                }catch (exception) {
                    response.json({success: false, message: 'Error a found'})
                }
            }
        }).catch((err) => {
            response.json({success: false, message: err.message})
        })
    }
    catch (exception) {
        response.json({success: false, message: exception.message})
    }
})

module.exports = checkController