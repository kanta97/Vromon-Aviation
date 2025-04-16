'user strict';
var sql = require('./db.js');
var joi = require('joi');
var Price = require('./price_matrix');
var Resource = require('./resource');
var VisaResource = require('./resource');
var package_hotel = require('./package_hotel');
const config = require('../config/config');

var VisaDocumentAddSchema = joi.object().keys({
    country_name: joi.string().required(''),
    status: joi.number().integer(),
    created_by: joi.string().allow(''),
    updated_by: joi.string().allow('')

}).unknown(true);

class VisaDocumentReq {
    constructor(req, files) {
        try {
            let i = 0, j = 0, res_type = '', path = '';
            this.Visa = new Visa(req.country_name ,req.status,'','');

           let resource = [];



            for (let item of files) {

                var regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$");
                //if(item.mimetype.contains("IMAGE")){
                if (regex.test(item.mimetype)) {
                    res_type = "IMAGE";
                } else {
                    res_type = "VIDEO";
                }
                //path = config.app.ip + ":" + config.app.port + "/" + item.filename;
                path = item.filename;
               resource.push(path);
            }

            this.Visa.document_path = 'https://navigatortourism.com:3000/visaDocument/' + resource[0];
            this.Visa.flag_path = 'https://navigatortourism.com:3000/visaDocument/' + resource[1];



        } catch (err) {
            this.err = err;
            return 0;
        }
    }
}

class Visa {
    constructor(country, status, created_by,updated_by) {
        this.country_name = country;
        this.status = status;
        this.created_by = created_by;
        this.updated_by = updated_by;
        var err = VisaDocumentAddSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }

    static add_visa_document(req, result) {
        try {

            let i = 0;

            var visa = new VisaDocumentReq(req.body, req.files);
            if (visa.err) {
                result(visa.err, null);
            }else {
                sql.query("INSERT INTO visa_document set ?", visa.Visa, function (err, res) {

                    if (err) {
                        result(err, null);
                    } else {
                        result(null, res.insertId);
                    }
                })
            }

        } catch (e) {
            result(err, null);

        }
    }

    static getVisaDocument(req, result) {
        let query='';

        if(req.params.id){
            query ='SELECT * FROM visa_document WHERE id='+req.params.id;
        }else {
            query ='SELECT * FROM visa_document order by country_name';
        }
        sql.query(query, function (err, res) {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }






    static remove(req, result) {
        if(req.params.id){
            var id=req.params.id;
            sql.query("DELETE FROM visa_document WHERE id = ?", [id], function (err, res) {
                if (err) {
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }else {
            result(null, err);
        }

    }




    static update_add_visa_document(req, result) {
        try {

            let i = 0;

            var visa = new VisaDocumentReq(req.body, req.files);
            console.log(visa);
            if (visa.err) {
                result(visa.err, null);
            }else {
                sql.query("UPDATE  visa_document set ? WHERE id =?", [visa.Visa,req.params.id], function (err, res) {

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

    static check_visa_contact_us(req, result) {
        try {
            if (!req.body) {
                result(visa.err, null);
            }else {
                sql.query("INSERT INTO visa_booking set ?", req.body, function (err, res) {

                    if (err) {
                        result(err, null);
                    } else {
                        result(null, res.insertId);
                    }
                })
            }

        } catch (e) {
            result(e, null);

        }
    }

}

module.exports = Visa;
