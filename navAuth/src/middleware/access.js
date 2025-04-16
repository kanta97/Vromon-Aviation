const db = require('./../models');
const Op = require('sequelize').Op;
class ApiAccess {
    constructor(request) {
        this._request = request;
    }

    checkAppKey() {
        if(this._request.headers.app_key === (process.env.APP_KEY || 123456)) {
            return true;
        }
        return false;
    }

    checkToken(auth_token) {
        return new Promise((resolve, reject) => {
            db.token.findOne({
                where: {token: this._request.headers.auth_token || auth_token, is_active:  '1'},
                attribute: ['userId']
            }).then((token) => {
                try {
                    resolve(token)
                }catch (exception) {
                    reject({success: false, message: 'Token not found'})
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
    checkTokenWithUser(auth_token, userid) {
        console.log(userid)
        return new Promise((resolve, reject) => {
            db.token.findOne({
                where: {token: this._request.headers.auth_token || auth_token, is_active:  '1', userId:  userid},
                attribute: ['userId'],
                order: [
                    ['id', 'DESC']
                ]
            }).then((token) => {
                try {
                    console.log(token)
                    if(token){

                        resolve(token)
                    } else {
                        reject({success: false, message: 'Invalid token'})
                    }

                }catch (exception) {
                    reject({success: false, message: 'Error found'})
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
    destroyToken(auth_token, userId){
        return new Promise((resolve, reject) => {
            db.token.findOne({
                where: {
                    token: this._request.headers.auth_token || auth_token,
                    userId: userId,
                    is_active: '1'
                },
                attribute: ['userId','token']
            }).then((session) => {
                if (session){
                    db.session.update({
                        is_active: '0',
                    }, {
                        where: {
                            token:  session.token,
                            userId: session.userId
                        }
                    }).then((check) =>{
                        if(check){
                            resolve(session.userId);
                        } else {
                            reject({success: false, message: 'Invalid token supplied'});
                        }
                    })
                    resolve(session.userId);
                }
                else {
                    reject('session not found');
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
}


module.exports = ApiAccess;