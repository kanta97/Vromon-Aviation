const db = require('./../models');
const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('../token_key');
class UserToken {
    constructor() {

    }

    setAndSaveToken(user) {
        return new Promise((reslove, reject)=>{

            let token = jwt.sign(
                {
                    userId: user.id,
                    usernm: user.usernm,
                    phone_no: user.phone_no,
                    createdAt: user.createdAt
                },
                config.secret
            );
            let user_session = {
                userId: user.id,
                token: token,
                createdBy: user.id,
                updatedBy: user.id
            }
            db.token.create(user_session).then((session) => {
                //console.log(session)
                reslove(user_session.token)
            }).catch((err) => {
                //console.log(err)
                reject(err.message)
            }) ;
        })
    }

    getUser(auth_token) {
        return  new Promise((res,rej)=>{
            let qr_str = `SELECT users.* FROM tokens INNER JOIN users ON users.id = tokens.userId WHERE tokens.token =?`;
            db.sequelize.query(
                qr_str,
                {replacements: [auth_token], type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
                if (result) {
                    res(result[0]);
                } else {
                    rej('user not found');
                }
            }).catch((err) => {
                //console.log(err);
                rej(err);
            })
        })
    }
}

module.exports = UserToken;