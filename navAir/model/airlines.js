
'user strict';
var sql = require('./db.js');
var Airline = function (airline) {
    this.icao_code = airline.icao_code;
    this.iata_code = airline.iata_code;
    this.country = airline.country;
    this.name = airline.name;
    this.created_at = 'later';
    this.updated_at = 'later';
};


Airline.getAllAirlines = function getAllPnr(req,result) {
    var query="Select * from airlines ORDER BY id DESC";
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


module.exports = Airline;