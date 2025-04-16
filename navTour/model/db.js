'user strict';

var mysql = require('mysql');
var config = require('../config/config');

var connection = mysql.createPool({
    connectionLimit : config.db_LOCAL.connectionLimit,
    host: config.db_LOCAL.host,  
    port: config.db_LOCAL.port,
    user: config.db_LOCAL.username,
    password: config.db_LOCAL.password,
    database: config.db_LOCAL.database
});
connection.sql_query = function sql_query(sql, args) {
    return new Promise((resolve, reject) => {
        this.query(sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
};



module.exports = connection;