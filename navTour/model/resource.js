'user strict';
var joi = require('joi');

var ResourceSchema = joi.object().keys({
    path: joi.string().allow(''),
    res_type: joi.string().allow(''),
    isFeatured:joi.number().integer()
});

var Resource = function (path,res_type,isFeatured) {
    this.path = path;
    this.res_type = res_type;
    this.isFeatured = isFeatured;
    var err = ResourceSchema.validate(this).error;
    if (err) {
        // handle error and abort
        return err;

    }
};
module.exports = Resource;