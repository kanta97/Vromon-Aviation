/**
 * Created by Shohanur on 3/11/2019.
 */

'use strict';

var Pnr = require('../model/pnr_records');
var Resp = require('../model/Resp.js');
var logger = require('../middleware/logger');
const sql = require('../model/db')

exports.list_all_pnr = function (req, res) {
    Pnr.getAllPnr(req, function (err, hotel) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(hotel, "200 OK");
        res.status(200).json(resp);
        logger.log(req,hotel,err);
    });
};

exports.getRecordByUser = function (req, res) {
    
    Pnr.getRecordByUser(req.params.userId, function (err, hotel) {
        if (err) {
            var resp = new Resp(req.body, "404 Not Found");
            res.status(400).json(resp);
        }
        var resp = new Resp(hotel, "200 OK");
        res.status(200).json(resp);
        logger.log(req,hotel,err);
    });
};

exports.getAirBookingHistroy = (req,res,next) =>{

    //name surname mobile email adultC childrenC infantC travelCost payment_status bookingDate
    const userId = req.params.userId;
    let limit,offset;
    if(!req.query.page || isNaN(req.query.page)){
        offset = 0
    }else{
        offset = parseInt(req.query.page) -1
    }
    if(!req.query.pageSize || isNaN(req.query.pageSize)){
        limit = 10
    }else{
        limit = parseInt(req.query.pageSize)
    }
    if(!userId || isNaN(userId)){
        res.status(200).json({success:false,payload:[],message:"Invalid customer id"})
    }else{
        sql.query(
            "Select * from pnr_records where customer_id = ? order by created_at desc LIMIT ? OFFSET ?",
            [userId,limit,offset],
            function (err, result) {
              if (err) {
                console.log("error: ", err);
                res.status(200).json({success:false,payload:[],message:err.sqlMessage})
              } else {
                let final = [];                
                for(let item in result){
                    let data = {
                        id : result[item].id,
                        surname : JSON.parse(result[item].customer).surname,
                        mobile : JSON.parse(result[item].customer).contact_number,
                        email : JSON.parse(result[item].customer).email,
                        adult : JSON.parse(result[item].requested).adultCount,
                        children : JSON.parse(result[item].requested).childrenCount,
                        infant : JSON.parse(result[item].requested).infantCount,
                        travelCost: result[item].to_be_paid,
                        payment_status: result[item].payment_status,
                        booking_date: result[item].created_at,
                        booking_ref: result[item].pnr_id
                    };
                    final.push(data)
                }
                sql.query("Select COUNT(id) from pnr_records where customer_id = ?",
                [userId],function (err, resultCount){
                    if(err){
                        res.status(200).json({success:false,payload:[],message:err.sqlMessage})
                    }else{
                        res.status(200).json({success:true,payload:{data:final,page:req.query.page,pageSize:req.query.pageSize,total:resultCount[0]["COUNT(id)"]},message:"Data retrieved"})
                    }
                })
              }
            }
          );
    }
}
// exports.create_hotel = function (req, res) {
//     var new_hotel = new Hotel(req.body);
//     // console.log(new_hotel);

//     Hotel.create_hotel(new_hotel, function (err, hotel) {

//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp({"msg":"insertion successful", "insertid" : hotel}, "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.update_hotel = function (req, res) {


//     Hotel.updateById(req.params.hotelid, (req.body), function (err, hotel) {
//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp("update successful", "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.delete_hotel = function (req,res) {

//     Hotel.remove(req.params.hotelid, function (err, hotel) {
//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             if(hotel.affectedRows == 0){
//                 var resp = new Resp("Hotel Not Available", "200 OK");
//                 res.status(200).json(resp);
//             }
//             else{
//                 var resp = new Resp("Delete successful", "200 OK");
//                 res.status(200).json(resp);
//             }

//         }
//         logger.log(req,hotel,err);

//     });
// };

// exports.read_hotel = function (req,res) {

//     Hotel.getHotelById(req.params.hotelid,function (err,hotel) {

//         if (err) {
//             var resp = new Resp(req.body, "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp(hotel, "200 OK");
//             res.status(200).json(resp);
//         }
//         logger.log(req,hotel,err);

//     });


// };