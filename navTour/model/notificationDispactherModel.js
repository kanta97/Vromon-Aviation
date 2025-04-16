/**
 * Created by Shohanur on 4/12/2019.
 */
/**
 * Created by Shohanur on 3/29/2019.
 */

/**
 * Created by Shohanur on 3/28/2019.
 */

"user strict";
var sql = require("./db.js");
var joi = require("joi");
var axios = require("axios");
const configuration = require("../config/config");
var request = require("request");
var FormData = require("form-data");
var fs = require("fs");
var NotificationDispactherSchema = joi
  .object()
  .keys({
    notification_type: joi.string().required(),
    priority: joi.number().integer().required(),
    userName: joi.string().allow(""),
    additionalMessage: joi.array().items().allow(""),
    email: joi.string().allow(""),
    number: joi.string().allow(""),
    file_location: joi.string().allow(""),
  })
  .unknown(true);

var NotificationDispactherReq = function (NotificationDispacther) {
  (this.notification_type = NotificationDispacther.notification_type),
    (this.priority = NotificationDispacther.priority),
    (this.userName = NotificationDispacther.userName),
    (this.additionalMessage = NotificationDispacther.additionalMessage),
    (this.email = NotificationDispacther.email),
    (this.number = NotificationDispacther.number),
    (this.file_location = NotificationDispacther.file_location);

  var err = NotificationDispactherSchema.validate(this).error;
  if (err) {
    throw new Error(err);
  }
};

NotificationDispactherReq.process_notification = function process_notification(
  new_notification,
  result
) {


  var notification_type = new_notification["notification_type"];

  if (new_notification["additionalMessage"] !== undefined) {
    var values = new_notification["additionalMessage"];
    var dynamicData = values[0];
  }

  sql.query(
    "SELECT * FROM notification_properties WHERE notification_type= ?",
    [notification_type],
    function (err, res) {
      if (err) {
        result(err, false, null);
      } else {
        var data = res[0];
        console.log(data);
        var notificationBody = data["notification_body"];
        if (dynamicData !== undefined) {
          for (var key in dynamicData) {
            if (dynamicData.hasOwnProperty(key)) {
              var place = "$$" + key + "$$";

              var rest = notificationBody.replace(place, dynamicData[key]);

              notificationBody = rest;
            }
          }
        }
        if (dynamicData !== undefined && dynamicData["link"]) {
          var html_link =
            "<a href='" +
            dynamicData["link"] +
            "'>Click here to verify your account</a>";
          var html_data =
            "<h1>Navigator Tourism</h1><p>" +
            notificationBody +
            "</p>" +
            html_link;
        } else {
          var html_data =
            "<h1>Navigator Tourism</h1><p>" + notificationBody + "</p>";
        }
        if (new_notification["priority"] == 1) {
          var email = new_notification["email"];
          var mobile_number = new_notification["number"];

          if (email && mobile_number) {
            if (new_notification["file_location"] !== undefined) {
              console.log("file location check inside");

              if (
                fs.existsSync(
                  configuration.notification.file_base_path +
                    new_notification["file_location"]
                )
              ) {
                console.log("here file found ");

                var payload_data = {
                  from: configuration.notification.from_email,
                  to: email,
                  subject: "Navigator Tourism",
                  html: html_data,
                  attachment: {
                    value: fs.createReadStream(
                      configuration.notification.file_base_path +
                        new_notification["file_location"]
                    ),
                    options: {
                      filename: "Navigator_travels.pdf",
                      contentType: "application/pdf",
                    },
                  },
                };
              } else {
                console.log("here file not found ");
                var payload_data = {
                  from: configuration.notification.from_email,
                  to: email,
                  subject: "Navigator Tourism",
                  html: html_data,
                };
              }
            } else {
              var payload_data = {
                from: configuration.notification.from_email,
                to: new_notification["email"],
                subject: "Navigator Tourism",
                html: html_data,
              };
            }

            var contentLength = payload_data.length;
            console.log(payload_data);
            request.post(
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Content-Length": contentLength,
                  Authorization:
                    "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                  "cache-control": "no-cache",
                },
                url: configuration.notification.email,
                formData: payload_data,
                method: "POST",
              },
              function (error, response, body) {
                console.log(error + JSON.stringify(response));
                if (!error && response.statusCode == 200) {
                  var obj = JSON.parse(body);
                  var messages = obj.messages;
                  var messageData = messages[0];
                  var status = messageData["status"];
                  if (status.name === "PENDING_ENROUTE") {
                    var query =
                      "INSERT INTO notifications (body,emails,status) VALUES(" +
                      "'" +
                      notificationBody +
                      "'," +
                      "'" +
                      new_notification["email"] +
                      "','IN_PROGRESS')";
                    sql.query(query, function (err, res) {
                      if (err) {
                        console.log(
                          "Email :error occur inserting into notification table"
                        );
                      } else {
                        console.log(" Email successfully done");
                      }
                    });
                  } else {
                    console.log("email not sent yet");
                  }
                } else {
                  console.log("Email api response without 200");
                }
              }
            );

            var payload_data = {};
            payload_data["from"] = configuration.notification.from_sms;
            payload_data["to"] = new_notification["number"];
            payload_data["text"] = notificationBody;
            request.post(
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                  "cache-control": "no-cache",
                },
                url: configuration.notification.sms,
                body: JSON.stringify(payload_data),
              },
              function (error, response, body) {
                console.log(error + JSON.stringify(response));
                if (!error && response.statusCode == 200) {
                  var obj = JSON.parse(body);
                  var messages = obj.messages;
                  var messageData = messages[0];
                  var status = messageData["status"];
                  if (status.name === "PENDING_ACCEPTED") {
                    var query =
                      "INSERT INTO notifications (body,msisdn,status) VALUES(" +
                      "'" +
                      notificationBody +
                      "'," +
                      "'" +
                      new_notification["number"] +
                      "','IN_PROGRESS')";
                    sql.query(query, function (err, res) {
                      if (err) {
                        result(err, false, "you request has been processing");
                      } else {
                        result(null, true, "you request has been processing");
                      }
                    });
                  } else {
                    result(null, false, "you request has completed");
                  }
                } else {
                  result(null, false, "something went wrong");
                }
              }
            );
          } else if (new_notification["email"]) {
            if (new_notification["file_location"] !== undefined) {
              if (
                fs.existsSync(
                  configuration.notification.file_base_path +
                    new_notification["file_location"]
                )
              ) {
                var payload_data = {
                  from: configuration.notification.from_email,
                  to: email,
                  subject: "Navigator Tourism",
                  html: html_data,
                  attachment: {
                    value: fs.createReadStream(
                      configuration.notification.file_base_path +
                        new_notification["file_location"]
                    ),
                    options: {
                      filename: "Notification.pdf",
                      contentType: "application/pdf",
                    },
                  },
                };
              } else {
                var payload_data = {
                  from: configuration.notification.from_email,
                  to: email,
                  subject: "Navigator Tourism",
                  html: html_data,
                };
              }
            } else {
              var payload_data = {
                from: configuration.notification.from_email,
                to: new_notification["email"],
                subject: "Navigator Tourism",
                html: html_data,
              };
            }

            console.log(payload_data);
            var contentLength = payload_data.length;
            request.post(
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Content-Length": contentLength,
                  Authorization:
                    "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                  "cache-control": "no-cache",
                },
                url: configuration.notification.email,
                formData: payload_data,
                method: "POST",
              },
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  var obj = JSON.parse(body);
                  var messages = obj.messages;
                  var messageData = messages[0];
                  var status = messageData["status"];
                  if (status.name === "PENDING_ENROUTE") {
                    var query =
                      "INSERT INTO notifications (body,emails,status) VALUES(" +
                      "'" +
                      notificationBody +
                      "'," +
                      "'" +
                      new_notification["email"] +
                      "','IN_PROGRESS')";
                    sql.query(query, function (err, res) {
                      if (err) {
                        result(err, false, "you request has been processing");
                      } else {
                        result(err, true, "you request has been processing");
                      }
                    });
                  } else {
                    result(err, false, "you request has been completed");
                  }
                } else {
                  result(err, false, "something went wrong");
                }
              }
            );
          } else if (new_notification["number"]) {
            var payload_data = {};
            payload_data["from"] = configuration.notification.from_sms;
            payload_data["to"] = new_notification["number"];
            payload_data["text"] = notificationBody;
            request.post(
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
                  "cache-control": "no-cache",
                },
                url: configuration.notification.sms,
                body: JSON.stringify(payload_data),
              },
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  var obj = JSON.parse(body);
                  var messages = obj.messages;
                  var messageData = messages[0];
                  var status = messageData["status"];
                  if (status.name === "PENDING_ACCEPTED") {
                    var query =
                      "INSERT INTO notifications (body,msisdn,status) VALUES(" +
                      "'" +
                      notificationBody +
                      "'," +
                      "'" +
                      new_notification["number"] +
                      "','IN_PROGRESS')";
                    sql.query(query, function (err, res) {
                      if (err) {
                        result(err, false, "you request has been processing");
                      } else {
                        result(null, true, "you request has been processing");
                      }
                    });
                  } else {
                    result(null, false, "you request has completed");
                  }
                } else {
                  result(null, false, "something went wrong");
                }
              }
            );
          }
        } else if (new_notification["priority"] == 2) {
          var query =
            "INSERT INTO notifications (body,msisdn,emails,status) VALUES(" +
            "'" +
            notificationBody +
            "'," +
            "'" +
            new_notification["number"] +
            "'," +
            "'" +
            new_notification["email"] +
            "','INITIATEDD')";

          sql.query(query, function (err, res) {
            if (err) {
              result(err, false, null);
            } else {
              result(
                null,
                true,
                "you request will be processed within 2 minutes."
              );
            }
          });
        } else {
          result(null, false, "There is no such priority options");
        }
      }
    }
  );
};

module.exports = NotificationDispactherReq;
