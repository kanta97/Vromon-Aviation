const SSLCommerz = require("sslcommerz-nodejs");
var Payment = require("../model/payment");
var Resp = require("../model/Resp.js");
var logger = require("../middleware/logger");
require("dotenv").config();

exports.sslRequest = (req, res, next) => {
  const data = {
    total_amount: parseFloat(req.query.total_amount), //
    currency: req.query.currency, //
    tran_id: req.query.tran_id, //
    success_url: `${
      process.env.NODE_ENV === "production"
        ? process.env.ROOT_PRODUCTION + "ssl-payment-success"
        : process.env.ROOT_LOCAL + "ssl-payment-success"
    }`,
    fail_url: `${
      process.env.NODE_ENV === "production"
        ? process.env.ROOT_PRODUCTION + "ssl-payment-fail"
        : process.env.ROOT_LOCAL + "ssl-payment-fail"
    }`,
    cancel_url: `${
      process.env.NODE_ENV === "production"
        ? process.env.ROOT_PRODUCTION + "ssl-payment-cancel"
        : process.env.ROOT_LOCAL + "ssl-payment-cancel"
    }`,
    emi_option: 0,
    shipping_method: "NO",
    multi_card_name: "",
    num_of_item: 1,
    product_name: "Test",
    product_category: "Test Category",
    product_profile: "general",
    cus_name: req.query.cus_name, //
    cus_email: req.query.cus_email, //
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: req.query.cus_country, //
    cus_phone: req.query.cus_phone, //
  };

  let setting = {
    // isSandboxMode: process.env.NODE_ENV === "production" ? false : true, //false if live version
    isSandboxMode: true, //false if live version
    store_id: process.env.STORE_ID,
    store_passwd: process.env.STORE_PASSWORD,
  };

  const sslcommer = new SSLCommerz(setting);
  sslcommer.init_transaction(data).then((response) => {
    console.log("response", response);
    if (response.status === "SUCCESS") {
      console.log("gateway", response.GatewayPageURL);
      return res.status(200).redirect(response.GatewayPageURL);
    } else {
      res.status(400).json({
        message: "Ssl session was not successful",
      });
    }
  });
};

exports.sslRequestSuccess = (req, res, next) => {
  console.log("req body", req.body);
  console.log("req query", req.query);

  Payment.listen_ipn(req, function (err, response) {
    if (err) {
      // var resp = new Resp(
      //   respMsg.get(responseMessageKey.generic.error),
      //   "400 Bad Request"
      // );
      //   res.status(400).json(resp);
      return res.render("pages/ssl-payment-fail");
    } else {
      // var resp = new Resp({ msg: response }, "200 OK");
      //   res.status(200).json(resp);
      return res.render("pages/ssl-payment-success");
    }
    logger.log(req, response, err);
  },req.body.tran_id);
};

exports.sslRequestFail = (req, res, next) => {
  return res.render("pages/ssl-payment-fail");
};

exports.sslRequestCancel = (req, res, next) => {
  return res.render("pages/ssl-payment-cancel");
};

exports.sslRequestIpn = (req, res, next) => {
  return res.render("pages/ssl-payment-ipn");
};
