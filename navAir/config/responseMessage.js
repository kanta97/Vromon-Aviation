"user strict";
var sql = require("../model/db");
var joi = require("joi");
const config = require("../config/config");

const responseMessageKey = {
  booking: {
    new: {
      success: "booking.success",
      fail: "booking.fail",
    },
    update: {
      success: "booking.update.request.success",
      fail: "booking.update.request.fail",
    },
    cancel: {
      success: "booking.cancel.request.success",
      fail: "booking.cancel.request.fail",
    },
  },
  payment: {
    success: "payment.success",
    fail: "payment.fail",
    cancel: "payment.cancel",
  },
  promo: {
    valid: "promo.code.valid",
    invalid: "promo.code.invalid",
  },
  package: {
    search: {
      fail: "package.search.request.fail",
      detail_fail: "pacakge.detail.load.error",
    },
  },
  generic: {
    error: "generic.error",
  },
};
var respMsg = new Map();
class responseMessage {
  static getAllRespMsg() {
    let query = "Select * from properties";
    let i = 0;
    // var respMsg = new Map();
    var resp = [];
    sql
      .sql_query(query)
      .then(
        (rows) => {
          resp = rows;
          for (i = 0; i < resp.length; i++) {
            respMsg.set(resp[i].tag, resp[i].value);
            console.log(resp[i].tag + resp[i].value);
          }
          return respMsg;
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        console.log("exception handled " + err);
      });
  }
}

module.exports = {
  responseMessage,
  responseMessageKey,
  respMsg,
};

// const responseMessage1 = {
//     booking: {
//         new: {
//             success: "The booking has been succesful. The invoice has been sent to your email.",
//             fail: "The booking has failed due to an error. Please try again or contact us."
//         },
//         update: {
//             success: "Your booking update request has been succesful. We will contact you soon.",
//             fail: "The booking update request failed due to an error. Please try again later or contact us."
//         },
//         cancel: {
//             success: "Your booking cancel request has been succesful. We will contact you soon.",
//             fail: "The booking cancel request failed due to an error. Please try again later or contact us."
//         }

//     },
//     payment: {
//         success: "The payment has been successful. The invoice has been sent to your email.",
//         fail: "The payment has been failed due to an error. Please try again or contact us.",
//         cancel:"The payment has been canceled."
//     },
//     generic:{
//         error: "An error occured. Please try again later."
//     }

// };
