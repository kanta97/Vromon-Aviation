'user strict';
var sql = require('./db.js');

class Home {
    static submit_info(req, result) {
        try {
            if (!req.body) {
                result(null, null);
            }else {
                sql.query("INSERT INTO contact_details set ?", req.body, function (err, res) {

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

module.exports = Home;