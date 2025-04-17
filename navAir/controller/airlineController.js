'use strict'

var Airline = require('../model/airlines')
var Resp = require('../model/Resp.js')
var logger = require('../middleware/logger')
var config = require('../config/config')

exports.list_all_airlines = function (req, res) {
    Airline.getAllAirlines(req, function (err, hotel) {
        if (err) {
            var resp = new Resp(req.body, '404 Not Found')
            res.status(400).json(resp)
        }
        var resp = new Resp(hotel, '200 OK')
        res.status(200).json(resp)
        logger.log(req, hotel, err)
    })
}

exports.get_discount = function (req, res) {
    res.status(200).json({
                //it's only  for 7% discount
        // value: 0.05,
        // disDiff: 0.02,

        // it's for EBL 3k & 7% discount
        value: 0.07,
        disDiff: 0.00,
        flat:{
            generic:{
                dom: 0,
                int: 3000
            },
            airWise:{
                dom:[
                    {
                        "BS":0
                    },
                    {
                        "BG":0
                    }
                ],
                int:[
                    {
                        "BS":0
                    },
                    {
                        "BG":0
                    }
                ]
            }
        },
        airlinesDiscount: config.airlinesDiscount,
        discountAmount: config.airlinesDiscountAmount,
    })
}

exports.get_offers = function (req, res) {
    res.status(200).json([
      	// {
        //      title: `On Domestic Flight`,
        //     imgUrl: '/bkash.jpg',
		// 	description: 'Pay Online & Get FLAT 500 Tk Discount',
		// type: 'package'
        // },
	{
             title: `Direct Flight`,
            imgUrl: '/2000tk CXB Discount.jpg',
			description: 'Dhaka-Bangkok Round-Way Only BDT. 32000',
		type: 'flight'
        },
	{
             title: `Any International Flight`,
            imgUrl: '/ttttt.png',
			description: 'Enjoy Flat 10% Discount With City Bank',
		type: 'flight'
        },
	{
             title: `On Domestic Flight`,
            imgUrl: '/Tha Pkg 44K.png',
			description: `Enjoy Flat 2000 Tk Discount`,
		type: 'flight'
        },
       // {
       //      title: `Kashmir Package 4 Nights & 5 Days`,
       //     imgUrl: '/Prime2.jpg',
	//		description: 'Pay Online & Get FLAT 2,000 Tk Discount',
	//		type: 'package'
      //  },
	//	 {
         //    title: `Kashmir Package 5 Nights & 6 Days`,
         //   imgUrl: '/Prime.jpg',
	//		description: 'Pay Online & Get FLAT 2,000 Tk Discount',
	//		type: 'package'
      //  },
        //{
        //     title: `On International Flight`,
        //    imgUrl: '/ebl.jpg',
	//		description: 'Pay Online & Get FLAT 3,000 Tk Discount',
	//		type: 'hotel'
        // },

	// {
    //          title: `On Domestic Flight`,
    //         imgUrl: '/bkash.jpg',
	// 		description: 'Pay Online & Get FLAT 500 Tk Discount',
	// 	type: 'package'
    //     },
	{
             title: `Direct Flight`,
            imgUrl: '/2000tk CXB Discount.jpg',
			description: 'Dhaka-Bangkok Round-Way Only BDT. 32000',
		type: 'flight'
        },
	{
             title: `Any International Flight`,
            imgUrl: '/ttttt.png',
			description: 'Enjoy Flat 10% Discount With City Bank',
		type: 'flight'
        },
	{
             title: `On Domestic Flight`,
            imgUrl: '/Tha Pkg 44K.png',
			description: `Enjoy Flat 2000 Tk Discount`,
		type: 'flight'
        },
        //{
       //      title: `Kashmir Package 4 Nights & 5 Days`,
       //     imgUrl: '/Prime2.jpg',
	//		description: 'Pay Online & Get FLAT 2,000 Tk Discount',
	//		type: 'package'
       // },
		// {
         //    title: `Kashmir Package 5 Nights & 6 Days`,
         //   imgUrl: '/Prime.jpg',
	//		description: 'Pay Online & Get FLAT 2,000 Tk Discount',
	//		type: 'package'
       // },




    ])
}

// exports.create_hotel = function (req, res) {
//     var new_hotel = new Hotel(req.body);
//     console.log(new_hotel);

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
