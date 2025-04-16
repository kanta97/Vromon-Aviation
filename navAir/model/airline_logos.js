
'user strict';
var sql = require('./db.js');
var Logo = function (airline) {
    this.airline = airline.airline;
    this.logo = airline.logo;
};


Logo.getAllAirline_logos = function getAllLogos(req,result) {
    var query="Select * from airline_logos ORDER BY id DESC";
    sql.query(query, function (err, res) {

        if (err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else {

            // console.log('fixed_packages : ', res);

            result(null, res);
        }
    });
};


module.exports = Logo;