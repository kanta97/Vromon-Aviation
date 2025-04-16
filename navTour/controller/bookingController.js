"use strict";

var BookingResp = require("../model/bookingResp.js");

var UpdateBookingReq = require("../model/updatebookingReq");
var CancelBookingReq = require("../model/cancelBookingReq");
var UpdateBookingResp = require("../model/updatebookingResp");
var CancelBookingResp = require("../model/cancelBookingResp");
var RespWithLimit = require("../model/respWithLimit.js");
var BookingStatusUpdateReq = require("../model/bookingStautsUpdate");
var BookingReq = require("../model/bookingReq");
var Resp = require("../model/Resp.js");
var logger = require("../middleware/logger");
const {
  responseMessage,
  responseMessageKey,
  respMsg,
} = require("../config/responseMessage");

exports.book_fixedpackage = function (req, res) {
  BookingReq.book_fixedpackage(req, function (err, response) {
    if (err) {
      var bookingResp = new BookingResp("", "FAILED", "400 Bad Request");
      var resp = new Resp(bookingResp, "400 Bad Request");
      res.status(400).json(resp);
    } else {
      var resp = new Resp(response, "200 OK");
      res.status(200).json(resp);
    }
    logger.log(req, response, err);
  });
};

exports.update_fixedpackage = function (req, res) {
  UpdateBookingReq.update_fixedpackage(
    req.params.bookingReference,
    req.body,
    function (err, response) {
      if (err) {
        var updatebookingResp = new UpdateBookingResp(
          "FAILED",
          respMsg.get(responseMessageKey.booking.update.fail)
        );
        var resp = new Resp(updatebookingResp, "400 Bad Request");
        res.status(400).json(resp);
      } else {
        var updateresp = new UpdateBookingResp(
          response,
          respMsg.get(responseMessageKey.booking.update.success)
        );
        var resp_u = new Resp(updateresp, "200 Ok");
        res.status(200).json(resp_u);
      }
      logger.log(req, response, err);
    }
  );
};

exports.cancelBooking = function (req, res) {
  CancelBookingReq.cancel_booking(req.body, function (err, response) {
    if (err) {
      var cancelbookingResp = new CancelBookingResp(
        "FAILED",
        respMsg.get(responseMessageKey.booking.update.fail)
      );
      var resp = new Resp(cancelbookingResp, "400 Bad Request");
      res.status(400).json(resp);
    } else {
      var cancelbookingresp = new CancelBookingResp(
        "BOOKING_CANCEL_REQUESTED",
        respMsg.get(responseMessageKey.booking.cancel.success)
      );
      var resp_u = new Resp(cancelbookingresp, "200 Ok");
      res.status(200).json(resp_u);
    }
    logger.log(req, response, err);
  });
};

exports.searchbookedpackage = function (req, res) {
  BookingReq.searchbookedpackage(req, function (err, result, records) {
    if (err) {
      var resp = new Resp(err, "400 Bad Request");
      res.status(400).json(resp);
    } else {
      var respWithLimit = new RespWithLimit(result, "200 OK", records);
      res.status(200).json(respWithLimit);
    }
    logger.log(req, result, err);
  });
};
exports.update_booking_status = function (req, res) {
  var newBookingStatusUpdateReq = new BookingStatusUpdateReq(req.body);

  console.log(req.body);

  BookingStatusUpdateReq.statusUpdate(
    newBookingStatusUpdateReq,
    function (err, response, message) {
      console.log({ err });
      if (err) {
        var updatebookingResp = new UpdateBookingResp(
          "FAILED",
          respMsg.get(responseMessageKey.booking.update.fail)
        );
        var resp = new Resp(updatebookingResp, "400 Bad Request");
        res.status(400).json(resp);
      } else {
        var updateresp = new UpdateBookingResp(
          "BOOKING_STATUS _UPDATED",
          respMsg.get(responseMessageKey.booking.update.success)
        );
        var resp_u = new Resp(updateresp, "200 Ok");
        res.status(200).json(resp_u);
      }
      logger.log(req, response, err);
    }
  );
};
