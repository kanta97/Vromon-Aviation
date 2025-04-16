"user strict";

var mysql = require("mysql");
var config = require("../config/config");

var connection = mysql.createPool({
  connectionLimit: config.db.connectionLimit,
  host: config.db.host,
  port: config.db.port,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
});
connection.sql_query = function sql_query(sql, args) {
  return new Promise((resolve, reject) => {
    this.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = connection;
