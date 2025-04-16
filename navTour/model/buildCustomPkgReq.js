
'user strict';
var sql = require('./db.js');
var joi = require('joi');
const config = require('../config/config');

var BuildCustomPackageReqSchema = joi.object().keys({
    location: joi.string().required(),
    travelDate: joi.date().required(),
    travelEndDate: joi.date(),
    tourType: joi.string(),
    peopleCount: joi.number().integer(),
    childrenCount: joi.number().integer(),
    infantCount: joi.number().integer(),
    numberOfDays: joi.number().integer(),
    roomType: Joi.array().items({
        type: Joi.string().required(),
        count: Joi.number().required(),
      }),
    activityIds: Joi.array().items(Joi.string().required())
}).unknown(true);

class BuildCustomPackageReq {
    constructor(req) {
        this.location = req.location;
        this.travelDate = req.travelDate;
        this.travelEndDate = req.travelEndDate;
        this.tourType = req.tourType;
        this.peopleCount = req.peopleCount;
        this.childrenCount = req.childrenCount;
        this.infantCount = req.infantCount;
        this.numberOfDays = req.numberOfDays;
        this.roomType = req.roomType;
        this.activityIds = req.activityIds;
        
        var err = BuildCustomPackageReqSchema.validate(this).error;
        if (err) {
            throw new Error(err);
        }
    }
    static Build_Custom_Package(req, result) {
        try {
            var buildCustomPackageReq = new BuildCustomPackageReq(req.body);
            if (buildCustomPackageReq.err) {
                result(buildCustomPackageReq.err, null);
                return;
            }
            const custom_ref = generateStrings(1, 7);
            let room_string = '';
            for (i = 0; i < buildCustomPackageReq.roomType.length; i++) {
                room_string = room_string + custom_ref + "," + buildCustomPackageReq.roomType[i].type + "," + buildCustomPackageReq.roomType[i].count;
                if (i < buildCustomPackageReq.roomType.length - 1)
                    room_string = room_string + "|";
            }
            console.log(room_string);
            let activity_string = '';
            for (i = 0; i < buildCustomPackageReq.activityIds.length; i++) {
                activity_string = activity_string + buildCustomPackageReq.activityIds[i];                
                if (i < buildCustomPackageReq.resource.length - 1)
                activity_string = activity_string + "|";
            }
            console.log(activity_string);
            var query = "CALL BuildCustomPackage(";
            query = query + "'" + buildCustomPackageReq.location + "','" + buildCustomPackageReq.travelDate + "','" + buildCustomPackageReq.travelEndDate 
            + "','" + buildCustomPackageReq.tourType + "'," +buildCustomPackageReq.peopleCount + ","+buildCustomPackageReq.childrenCount+","+buildCustomPackageReq.infantCount
            +",'" +custom_ref+"','"+room_string +"','"+activity_string+ "')";
            console.log(query);
            sql.sql_query(query)
                .then(rows => {
                    result(null, "promo successful");
                }, err => {
                    result(null, "promo rollbacked");
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
}
module.exports = BuildCustomPackageReq;