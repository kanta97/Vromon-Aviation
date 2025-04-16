/**
 * Created by Shohanur on 3/28/2019.
 */
"user strict";

var mysql = require("mysql");

var auth_connection = mysql.createPool({
  connectionLimit: "10",
  host: "148.72.212.173",
  // user: 'prod_author',
  // password: 'pr0d@@uth0r@2019',
  // database: 'prod_auth_db',
  user: "nav_all",
  password: "Qwertyuiop@1233",
  database: "dev_auth_db",
  port: 33173,
});

auth_connection.sql_query = function sql_query(sql, args) {
  return new Promise((resolve, reject) => {
    this.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = auth_connection;
