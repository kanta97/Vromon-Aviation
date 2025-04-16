var request = require("request");
const config = require("./config/config");

function sendSMS(sendNumber, message) {
  var payload_data = {};
  payload_data["from"] = config.notification.from_sms;
  payload_data["to"] = sendNumber;
  payload_data["text"] = message;
  request.post(
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
        "cache-control": "no-cache",
      },
      url: config.notification.sms,
      body: JSON.stringify(payload_data),
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        console.log("sms response : ", obj);
      }
    }
  );
}

module.exports = sendSMS;
