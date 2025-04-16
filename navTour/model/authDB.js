/**
 * Created by Shohanur on 3/28/2019.
 */
'user strict';

var mysql = require('mysql');
var config = require('../config/config');


var auth_connection = mysql.createPool({
    connectionLimit : config.connectionLimit,
    host: config.host,
    user: config.username,
    password: config.password,
    database: "auth"
});


auth_connection.sql_query = function sql_query(sql, args) {
    return new Promise((resolve, reject) => {
        this.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
};

module.exports = auth_connection;