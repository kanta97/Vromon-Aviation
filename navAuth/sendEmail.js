var request = require("request");
const config = require("./config/config");

function sendEmail(customer_info) {
  let mail_payload_data = {
    from: config.notification.from_email,
    to: customer_info.email,
    subject: "Navigator Travels",
    html: `Hello ${customer_info.name}, Your password reset otp is ${customer_info.otp}`,
  };
  var contentLength = mail_payload_data.length;
  console.log(mail_payload_data);
  request.post(
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Length": contentLength,
        Authorization: "Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==",
        "cache-control": "no-cache",
      },
      url: config.notification.email,
      formData: mail_payload_data,
      method: "POST",
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);

        console.log("Email successfully sent : ", obj);
      } else {
        console.log("Email api response without 200");
      }
    }
  );
}

module.exports = sendEmail;
