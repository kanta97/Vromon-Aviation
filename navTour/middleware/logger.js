const config = require('../config/config');
var log4js = require('log4js');
log4js.configure("config/log4js.json");
var logger = log4js.getLogger();

exports.log = function (req, res, err) {
    if (err) {
        logger.error('error: '+ err);
    }
    else{
        logger.debug("request params: " +  JSON.stringify(req.params) + " request body: "+  JSON.stringify(req.body) +" response status: 200 response : "+  JSON.stringify(res));
    }
};

exports.log = function (data) {
    
        logger.debug(data);
    
};