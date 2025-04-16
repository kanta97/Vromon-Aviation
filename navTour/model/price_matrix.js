'user strict';
var joi = require('joi');

var PriceSchema = joi.object().keys({
    tour_type: joi.string().allow(''),
    price: joi.number().integer(),
    currency: joi.string().allow(''),
});

class Price {
    constructor(tour_type, price, currency, hotel_id) {
        this.tour_type = tour_type;
        this.price = price;
        this.currency = currency;
        var err = PriceSchema.validate(this).error;
        if (err) {
            // handle error and abort
            return err;
        }
    }
}
module.exports = Price;