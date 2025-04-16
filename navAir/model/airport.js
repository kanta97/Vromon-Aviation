
'user strict';
var sql = require('./db.js');
var Airport = function (airline) {
    this.airline = airline.airline;
    this.logo = airline.logo;
};


Airport.getAllAirport = (req,result) => {
    var query="Select * from airports ORDER BY id DESC";
    sql.query(query, (err, res) => {

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


module.exports = Airport;