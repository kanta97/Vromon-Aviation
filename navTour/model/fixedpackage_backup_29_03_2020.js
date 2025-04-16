'user strict';
var sql = require('./db.js');
var joi = require('joi');
var Price = require('./price_matrix');
var Resource = require('./resource');
var package_hotel = require('./package_hotel');
const config = require('../config/config');

var FixedpackageSchema = joi.object().keys({
    origin: joi.string().allow(''),
    destination: joi.string(),
    description: joi.string().allow(''),
    start_date: joi.date(),
    end_date: joi.date(),
    status: joi.number().integer(),
    minimum_number_people: joi.number().integer(),
    isFeatured: joi.number().integer(),
    itinerary: joi.string().allow(''),
    inclusions: joi.string().allow(''),
    exclusions: joi.string().allow('')
}).unknown(true);

class FixedpackageReq {
    constructor(req, files) {
        try {
            let i = 0, j = 0, res_type = '', path = '';
            console.log("request oriign" + req.minimum_number_people);
            this.Fixedpackage = new Fixedpackage(req.origin, req.destination, req.description, req.vaidFrom, req.validTo, req.status, req.itinerary, req.inclusions, req.exclusions, req.minimum_number_people, req.isFeatured, req.name, req.summary, req.duration_day, req.duration_night, req.terms_conditions);
            console.log("request oriign" + this.Fixedpackage.minimum_number_people);
            this.price = [];
            this.resource = [];
            this.hotel = [];
            console.log(req.price);
            let price = JSON.parse(req.price);
            for (i = 0; i < price.length; i++) {
                this.price.push(new Price(price[i].tour_type, price[i].price, price[i].currency));
                for (j = 0; j < price[i].hotel.length; j++) {
                    this.hotel.push(new package_hotel(price[i].hotel[j].hotel_id, price[i].tour_type, price[i].hotel[j].duration));
                }
            }
            for (let item of files) {
                var regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$");
                //if(item.mimetype.contains("IMAGE")){
                if (regex.test(item.mimetype)) {
                    res_type = "IMAGE";
                }
                else {
                    res_type = "VIDEO";
                }
                //path = config.app.ip + ":" + config.app.port + "/" + item.filename;
                path = item.filename;
                this.resource.push(new Resource(path, res_type, 0));
            }
            if (typeof req.featuredresourceindex !== "undefined") {
                this.resource[req.featuredresourceindex].isFeatured = 1;
            }

        }
        catch (err) {
            this.err = err;
            return 0;
        }
    }
}
class Fixedpackage {
    constructor(origin, destination, description, start_date, end_date, status, itinerary, inclusions, exclusions, minimum_number_people, isFeatured, name, summary, duration_day, duration_night, terms_conditions) {
        this.origin = origin;
        this.destination = destination;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
        this.itinerary = itinerary;
        this.inclusions = inclusions;
        this.exclusions = exclusions;
        this.minimum_number_people = minimum_number_people;
        this.isFeatured = isFeatured;
        this.name = name;
        this.summary = summary;
        this.duration_day = duration_day;
        this.duration_night = duration_night;
        this.terms_conditions = terms_conditions;
        var err = FixedpackageSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }

    static create_fixedpackage(req, result) {
        try {
            let i = 0;

            var fixedpackage = new FixedpackageReq(req.body, req.files);
            if (fixedpackage.err) {
                console.log(fixedpackage.err);
                result(fixedpackage.err, null);
                return;
            }
            let price_string = '';
            for (i = 0; i < fixedpackage.price.length; i++) {
                price_string = price_string + fixedpackage.price[i].tour_type + "," + fixedpackage.price[i].price + "," + fixedpackage.price[i].currency;
                if (i < fixedpackage.price.length - 1)
                    price_string = price_string + "|";
            }
            console.log(price_string);
            let resource_string = '';
            for (i = 0; i < fixedpackage.resource.length; i++) {
                resource_string = resource_string + fixedpackage.resource[i].path + "," + fixedpackage.resource[i].res_type + "," + fixedpackage.resource[i].isFeatured;
                if (i < fixedpackage.resource.length - 1)
                    resource_string = resource_string + "|";
            }
            console.log(resource_string);
            let hotel_string = '';
            for (i = 0; i < fixedpackage.hotel.length; i++) {
                hotel_string = hotel_string + fixedpackage.hotel[i].hotel_id + "," + fixedpackage.hotel[i].tour_type + "," + fixedpackage.hotel[i].duration;
                if (i < fixedpackage.hotel.length - 1)
                    hotel_string = hotel_string + "|";
            }
            let package_query = "CALL insert_fixedpackage(";
            package_query = package_query + "'" + fixedpackage.Fixedpackage.origin + "','" + fixedpackage.Fixedpackage.destination + "','" + fixedpackage.Fixedpackage.description + "','" + fixedpackage.Fixedpackage.start_date + "','" + fixedpackage.Fixedpackage.end_date + "'," + fixedpackage.Fixedpackage.status + ",'" + fixedpackage.Fixedpackage.itinerary + "','" + fixedpackage.Fixedpackage.inclusions + "','" + fixedpackage.Fixedpackage.exclusions + "'," + fixedpackage.Fixedpackage.minimum_number_people + "," + fixedpackage.Fixedpackage.isFeatured + ",'" + fixedpackage.Fixedpackage.name + "','" + fixedpackage.Fixedpackage.summary + "'," + fixedpackage.Fixedpackage.duration_day + "," + fixedpackage.Fixedpackage.duration_night + ",'" + fixedpackage.Fixedpackage.terms_conditions + "','" + price_string + "','" + resource_string + "','" + hotel_string + "')";
            console.log(package_query);
            sql.sql_query(package_query)
                .then(rows => {
                    result("200", rows.insertId);
                }, err => {
                    result(null, "insertion rollbacked");
                    throw err;
                })
                .catch(err => {
                    console.log("exception handled");
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    static getPackageById(packageId, result) {
        sql.query("Select * from fixed_packages where id = ? ", packageId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static getPackageDetailsById(packageId, result) {
        var response = {};
        sql.query("Select * from fixed_packages where id = ? ", packageId, function (err, res) {
            //id packageId, start_date validFrom,end_date validTo, description, itinerary,inclusions,exclusions,minimum_number_people minimumPeopleCount
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                if (res.length != 0)
                    response = res;
                else {
                    result(true, response);
                    return;
                }
                console.log(response);
                sql.query("Select path,res_type  type, isFeatured from resources where source_id = ? ", packageId, function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    else {
                        console.log("res: ", res);
                        if (res.length != 0)
                            response[0].media = res;
                        else
                            response.media = [];
                        sql.query("  SELECT p.*, h.duration,h.hotel_id, hotels.* FROM price_matrix p LEFT JOIN package_hotel h ON p.tour_type = h.tour_type AND p.package_id = h.package_id JOIN hotels ON h.hotel_id = hotels.id WHERE p.package_id = ? ", packageId, function (err, res) {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                                return;
                            }
                            else {
                                if (res.length != 0)
                                    response[0].tourTypeDetails = res;
                                else
                                    response.tourTypeDetails = [];
                                console.log(response);
                                result(null, response);
                            }
                        });
                    }
                });
            }
        });
    }
    static getAllPackage(result) {
        sql.query("Select * from fixed_packages order by id desc", function (err, res) {
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
    static list_all_configs(result) {
        sql.query("Select * from configs", function (err, res) {
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
    static get_package_by_limit(limit, offset, result) {
        let query = "Select * from fixed_packages order by id desc limit " + offset + ", " + limit;
        sql.query(query, function (err, res) {
            if (err) {
                result(null, err);
            }
            else {
                let data = res;
                sql.query("Select count(*) records from fixed_packages", function (err, res) {
                    if (err) {
                        // console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        // console.log('fixed_packages : ', res);
                        result(null, data, res[0].records);
                    }
                });
            }
        });
    }
    static updateById(req, result) {
        try {
            let i = 0;
            var fixedpackage = new FixedpackageReq(req.body, req.files);
            if (fixedpackage.err) {
                console.log(fixedpackage.err);
                result(fixedpackage.err, null);
                return;
            }
            let price_string = '';
            for (i = 0; i < fixedpackage.price.length; i++) {
                price_string = price_string + fixedpackage.price[i].tour_type + "," + fixedpackage.price[i].price + "," + fixedpackage.price[i].currency;
                if (i < fixedpackage.price.length - 1)
                    price_string = price_string + "|";
            }
            console.log(price_string);

            if (typeof req.body.resource_url !== "undefined") {
                let resource_url = JSON.parse(req.body.resource_url);
                for (i = 0; i < resource_url.length; i++) {
                    fixedpackage.resource.push(new Resource(resource_url[i].path, 'IMAGE', resource_url[i].isFeatured));
                }
            }
            let resource_string = '';
            for (i = 0; i < fixedpackage.resource.length; i++) {
                resource_string = resource_string + fixedpackage.resource[i].path + "," + fixedpackage.resource[i].res_type + "," + fixedpackage.resource[i].isFeatured;
                if (i < fixedpackage.resource.length - 1)
                    resource_string = resource_string + "|";
            }
            console.log(resource_string);
            let hotel_string = '';
            for (i = 0; i < fixedpackage.hotel.length; i++) {
                hotel_string = hotel_string + fixedpackage.hotel[i].hotel_id + "," + fixedpackage.hotel[i].tour_type + "," + fixedpackage.hotel[i].duration;
                if (i < fixedpackage.hotel.length - 1)
                    hotel_string = hotel_string + "|";
            }
            let package_query = "CALL update_fixedpackage(";
            package_query = package_query + req.body.id + ",'" + fixedpackage.Fixedpackage.origin + "','" + fixedpackage.Fixedpackage.destination + "','" + fixedpackage.Fixedpackage.description + "','" + fixedpackage.Fixedpackage.start_date + "','" + fixedpackage.Fixedpackage.end_date + "'," + fixedpackage.Fixedpackage.status + ",'" + fixedpackage.Fixedpackage.itinerary + "','" + fixedpackage.Fixedpackage.inclusions + "','" + fixedpackage.Fixedpackage.exclusions + "'," + fixedpackage.Fixedpackage.minimum_number_people + "," + fixedpackage.Fixedpackage.isFeatured + ",'" + fixedpackage.Fixedpackage.name + "','" + fixedpackage.Fixedpackage.summary + "'," + fixedpackage.Fixedpackage.duration_day + "," + fixedpackage.Fixedpackage.duration_night + ",'" + fixedpackage.Fixedpackage.terms_conditions + "','" + price_string + "','" + resource_string + "','" + hotel_string + "')";
            console.log(package_query);
            sql.sql_query(package_query)
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
        }
        catch (e) {
            console.log(e);
        }
    }
    static remove(id, result) {
        sql.query("DELETE FROM fixed_packages WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    static removeAll(id, result) {
        sql.query("DELETE FROM fixed_packages", function (err, res) {
            if (err) {
                // console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    static getPackageByDestination(req, result) {
        if (typeof req.query.destination !== "undefined") {
            let destination = req.query.destination;

            let destinationPattern = "%" + destination + "%";
            let queryString = "CALL searchpackagebydestination( '" + destinationPattern + "')";
            //let queryString = "SELECT f.id packageId, f.name name, f.origin origin, f.destination, f.summary summary,f.duration duration, p.minimum_price, p.currency, r.path image FROM fixed_packages f LEFT JOIN (SELECT tmp.package_id, MIN(tmp.price) AS minimum_price, tmp.currency FROM price_matrix tmp GROUP BY tmp.package_id ORDER BY tmp.price ) p ON f.id = p.package_id LEFT JOIN resources r ON r.source_id = f.id AND r.res_type = 'IMAGE' and r.isFeatured = 1 WHERE  f.destination LIKE '" + destinationPattern + "'";
            console.log("queryString: ", queryString);
            sql.query(queryString, function (err, response) {
                if (err) {

                    result(null, err);
                }
                else {
                    var data = response[0];
                    sql.query("SELECT COUNT(fixed_packages.id) AS records FROM fixed_packages LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE fixed_packages.destination LIKE '%" + destination + "%' AND resources.isFeatured = 1", function (err, res) {
                        if (err) {
                            // console.log("error: ", err);
                            result(null, err);
                        }
                        else {
                            // console.log('fixed_packages : ', res);
                            result(null, data, res[0].records);
                        }

                    })
                }
            })
        }
        else {
            sql.query("SELECT fixed_packages.id AS id,origin ,destination,`name` AS name,summary, duration_night,duration_day,path, (SELECT MIN(price) FROM price_matrix WHERE price_matrix.package_id = fixed_packages.id) AS price,(SELECT currency FROM price_matrix WHERE price_matrix.package_id = fixed_packages.id ORDER BY price_matrix.price ASC  LIMIT 1) AS currency FROM fixed_packages LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE resources.isFeatured = 1 order by fixed_packages.id", function (err, response) {
                if (err) {

                    result(null, err);
                }
                else {
                    var data = response;
                    sql.query("SELECT COUNT(fixed_packages.id) AS records FROM fixed_packages LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE resources.isFeatured = 1", function (err, res) {
                        if (err) {
                            // console.log("error: ", err);
                            result(null, err);
                        }
                        else {
                            // console.log('fixed_packages : ', res);
                            result(null, data, res[0].records);
                        }

                    })
                }
            });
        }
    }
    static getAllFeaturedPackage(req, result) {

        if(req.params.limit && req.params.offset){
            var query="SELECT fixed_packages.id,origin,destination,description,vaidFrom,validTo,`status`,itinerary,exclusions,minimum_number_people,`name`,summary,duration_day,duration_night,terms_conditions,tour_type,price,currency,path,res_type FROM fixed_packages LEFT JOIN price_matrix ON fixed_packages.id = price_matrix.package_id LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE fixed_packages.isFeatured=1 AND resources.isFeatured=1 AND price_matrix.price=(SELECT MIN(price) FROM price_matrix WHERE price_matrix.package_id=fixed_packages.id) LIMIT " + req.params.offset + ", " + req.params.limit + "";

        }
        else {
            var query = "SELECT fixed_packages.id,origin,destination,description,vaidFrom,validTo,`status`,itinerary,exclusions,minimum_number_people,`name`,summary,duration_day,duration_night,terms_conditions,tour_type,price,currency,path,res_type FROM fixed_packages LEFT JOIN price_matrix ON fixed_packages.id = price_matrix.package_id LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE fixed_packages.isFeatured=1 AND resources.isFeatured=1 AND price_matrix.price=(SELECT MIN(price) FROM price_matrix WHERE price_matrix.package_id=fixed_packages.id)";

        }

        sql.query(query, function (err, res) {
            if (err) {
                // console.log("error: ", err);
                result(null, err);
            }
            else {
                let data = res;
                console.log(res);
                sql.query("SELECT COUNT(fixed_packages.id) records FROM fixed_packages LEFT JOIN price_matrix ON fixed_packages.id = price_matrix.package_id LEFT JOIN resources ON resources.source_id=fixed_packages.id WHERE fixed_packages.isFeatured=1 AND resources.isFeatured=1 AND price_matrix.price=(SELECT MIN(price) FROM price_matrix WHERE price_matrix.package_id=fixed_packages.id)", function (err, res) {
                    if (err) {
                        // console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        // console.log('fixed_packages : ', res);
                        result(null, data, res[0].records);
                    }
                });

            }
        });
    }
}
module.exports = Fixedpackage;
