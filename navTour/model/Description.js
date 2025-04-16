'user strict';
var sql = require('./db.js');
var joi = require('joi');
var Price = require('./price_matrix');
var Resource = require('./resource');
var package_hotel = require('./package_hotel');
const config = require('../config/config');

var DescriptionAddSchema = joi.object().keys({
    type: joi.string().required(''),
    description: joi.string().required('')


}).unknown(true);



class Description {
    constructor(type, description) {
        this.type = type;
        this.description = description;


        var err = DescriptionAddSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }
    static add_document(req, result) {
        try {
            var description = new Description(req.body.type,req.body.description);
            console.log(description);
            if (description.err) {

                result(description.err, null);

            }else {
                sql.query("INSERT INTO other_descriptions set ?", description, function (err, res) {

                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    } else {
                        console.log(res.insertId);
                        result(null, res.insertId);
                    }
                })
            }

        } catch (e) {
            console.log(e);
            result(err, null);

        }
    }


    static getDescription(req, result) {
        let query='';

        if(req.params.id){
            query ='SELECT * FROM other_descriptions WHERE id=' + req.params.id;
        }else {
            query ='SELECT * FROM other_descriptions';
        }
        sql.query(query, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }


    static updateDescriptionById(req, result) {
        try {

          let query = "UPDATE other_descriptions SET description=? ,type=? WHERE id=?";
            sql.sql_query(query,[req.body.decription,req.body.type,req.body.id])
                .then(rows => {
                    result(null, rows.insertId);
                }, err => {
                    console.log(err);
                    result(null, "update rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        } catch (e) {
            console.log(e);
        }
    }

    static delete_description(req, result) {
        if(req.params.id){
            var id=req.params.id;
            sql.query("DELETE FROM other_descriptions WHERE id = ?", [id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }else {
            result("No such description exists", null);
        }

    }


}

module.exports = Description;
