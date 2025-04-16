/**
 * Created by Shohanur on 3/16/2019.
 */
'user strict';
var joi = require('joi');
var sql = require('./db.js');

var TourSchema = joi.object().keys({
    tour_type: joi.string().required(),


});

var Tour = function (tour) {
    this.tour_type = tour.tour_type;

};



Tour.getAllTourTypes = function getAllTourTypes(result) {
    try{

        sql.query("Select * from tour_types ", function (err, res) {

            if (err) {
                // console.log("error: ", err);
                result(null, err);
            }
            else {
                // console.log('fixed_packages : ', res);

                result(null, res);
            }
        });
    }
    catch (e){
        console.log("exception handled");
    }


};



module.exports = Tour;