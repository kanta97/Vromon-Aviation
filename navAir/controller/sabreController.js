'use strict'
const fs = require('fs')
var sql = require('../model/db.js')
var Resp = require('../model/Resp.js')
var logger = require('../middleware/logger')
const axios = require('axios')
const config = require('../config/config')
var Pnr = require('../model/pnr_records')
var Payment = require('../model/payment')
var request = require('request')

const { param } = require('../routes/approutes.js')

exports.get_token = function (req, res) {
    const basicToken = config.sabre_token_auth[config.sabre_mode]
    console.log(
        'get token = mode -> ' +
            config.sabre_mode +
            ' basicToken = ' +
            basicToken
    )
    axios
        .post(
            config.sabre[config.sabre_mode] + '/v2/auth/token',
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: basicToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then((response) => {
            console.log({
                sazzad: response.data,
            })
            // var resp = new Resp(response.data, "200 OK");
            res.status(200).json(response.data)
        })
        .catch((err) => {
            console.log(err)

            res.status(403).json({ err403: true })
        })
}

exports.get_flights = function (req, res) {
    console.log('req body : ', req.body)
    let adultCount = req.body.adultCount ? Number(req.body.adultCount) : 1
    let infantCount = req.body.infantCount ? Number(req.body.infantCount) : 0
    let childrenCount = req.body.childrenCount
        ? Number(req.body.childrenCount)
        : 0
    let passenger_count = req.body.passenger_count
        ? Number(req.body.passenger_count)
        : 1
    let return_date = req.body.return_date

    var mm = new Date(return_date)

    let base_req_body = {
        OTA_AirLowFareSearchRQ: {
            OriginDestinationInformation: [
                {
                    DepartureDateTime: `${req.body.journey_date}T00:00:00`,
                    OriginLocation: {
                        LocationCode: req.body.from,
                    },
                    DestinationLocation: {
                        LocationCode: req.body.to,
                    },
                    RPH: '0',
                },
            ],
            POS: {
                Source: [
                    {
                        PseudoCityCode: '1TTJ',
                        RequestorID: {
                            CompanyName: {
                                Code: 'TN',
                            },
                            ID: '1',
                            Type: '1',
                        },
                    },
                ],
            },
            TPA_Extensions: {
                IntelliSellTransaction: {
                    RequestType: {
                        Name: '200ITINS',
                    },
                },
            },
            TravelPreferences: {
                TPA_Extensions: {
                    DataSources: {
                        ATPCO: 'Enable',
                        LCC: 'Disable',
                        NDC: 'Disable',
                    },
                    NumTrips: {},
                },
                Baggage: {
                    Description: true,
                    RequestType: 'A',
                },
            },
            TravelerInfoSummary: {
                AirTravelerAvail: [
                    {
                        PassengerTypeQuantity: [
                            {
                                Code: 'ADT',
                                Quantity: adultCount,
                            },
                        ],
                    },
                ],
                SeatsRequested: [passenger_count],
            },
            Version: '4',
        },
    }

    if (mm != 'Invalid Date') {
        base_req_body.OTA_AirLowFareSearchRQ.OriginDestinationInformation.push({
            DepartureDateTime: `${req.body.return_date}T00:00:00`,
            OriginLocation: {
                LocationCode: req.body.to,
            },
            DestinationLocation: {
                LocationCode: req.body.from,
            },
            RPH: '0',
        })
    }

    if (childrenCount > 0) {
        var childs = {}
        childs['C02'] = req.body.C02 ? Number(req.body.C02) : 0

        childs['C03'] = req.body.C03 ? Number(req.body.C03) : 0
        childs['C04'] = req.body.C04 ? Number(req.body.C04) : 0
        childs['C05'] = req.body.C05 ? Number(req.body.C05) : 0
        childs['C06'] = req.body.C06 ? Number(req.body.C06) : 0
        childs['C07'] = req.body.C07 ? Number(req.body.C07) : 0
        childs['C08'] = req.body.C08 ? Number(req.body.C08) : 0
        childs['C09'] = req.body.C09 ? Number(req.body.C09) : 0
        childs['C10'] = req.body.C10 ? Number(req.body.C10) : 0
        childs['C11'] = req.body.C11 ? Number(req.body.C11) : 0

        for (var key in childs) {
            var value = childs[key]
            if (value > 0) {
                base_req_body.OTA_AirLowFareSearchRQ.TravelerInfoSummary.AirTravelerAvail[0].PassengerTypeQuantity.push(
                    {
                        Code: key,
                        Quantity: Number(value),
                    }
                )
            }
        }
    }

    if (infantCount > 0) {
        base_req_body.OTA_AirLowFareSearchRQ.TravelerInfoSummary.AirTravelerAvail[0].PassengerTypeQuantity.push(
            {
                Code: 'INF',
                Quantity: Number(infantCount),
            }
        )
    }

    let token = req.body.token
    if (typeof token == 'string') token = token.split(' ').join('')

    //res.status(200).json("ok");
    console.log(JSON.stringify(base_req_body))
    axios
        .post(
            config.sabre[config.sabre_mode] + '/v4/offers/shop',
            base_req_body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            // console.log({
            //     flights : response.data
            // })
            // var resp = new Resp(response.data, "200 OK");
            res.status(200).json(response.data)
        })
        .catch((err) => {
            console.log('flights error : ', err)

            res.status(403).json({ is_error: true })
        })
}

exports.get_flights_post = function (req, res) {
    console.log('req body : ', req.body)
    let adultCount = req.body.adult ? Number(req.body.adult) : 1
    let infantCount = req.body.infant ? Number(req.body.infant) : 0
    let infantWithSeatCount = req.body.ins ? Number(req.body.ins) : 0
    var childrenCount = 0
    req.body.children.forEach((child) => {
        childrenCount += child.count ? Number(child.count) : 0
    })

    let passenger_count = adultCount + childrenCount + infantWithSeatCount
    console.log(
        'adult = ' +
            adultCount +
            ', infant = ' +
            infantCount +
            ', ins = ' +
            infantWithSeatCount +
            ', children = ' +
            childrenCount,
        ', passengerCount = ' + passenger_count
    )

    var flightSegments = []
    req.body.flightSegment.forEach((segment) => {
        flightSegments.push({
            DepartureDateTime: `${segment.journey_date}T00:00:00`,
            OriginLocation: {
                LocationCode: segment.from,
            },
            DestinationLocation: {
                LocationCode: segment.to,
            },
            RPH: '0',
        })
    })

    console.log('processed flightSegments = ' + JSON.stringify(flightSegments))
    let base_req_body = {
        OTA_AirLowFareSearchRQ: {
            OriginDestinationInformation: flightSegments,
            POS: {
                Source: [
                    {
                        PseudoCityCode: '1TTJ',
                        RequestorID: {
                            CompanyName: {
                                Code: 'TN',
                            },
                            ID: '1',
                            Type: '1',
                        },
                    },
                ],
            },
            TPA_Extensions: {
                IntelliSellTransaction: {
                    RequestType: {
                        Name: '200ITINS',
                    },
                },
            },
            TravelPreferences: {
                TPA_Extensions: {
                    DataSources: {
                        ATPCO: 'Enable',
                        LCC: 'Disable',
                        NDC: 'Disable',
                    },
                    NumTrips: {},
                },
                Baggage: {
                    Description: true,
                    RequestType: 'A',
                },
                CabinPref: [
                    {
                        Cabin: req.body.seatClass,
                        PreferLevel: 'Only',
                    },
                ],
            },
            TravelerInfoSummary: {
                AirTravelerAvail: [
                    {
                        PassengerTypeQuantity: [
                            {
                                Code: 'ADT',
                                Quantity: adultCount,
                            },
                        ],
                    },
                ],
                SeatsRequested: [passenger_count],
            },
            Version: '4',
        },
    }

    if (childrenCount > 0) {
        req.body.children.forEach((child) => {
            let count = child.count ? Number(child.count) : 0
            let code = child.code
            base_req_body.OTA_AirLowFareSearchRQ.TravelerInfoSummary.AirTravelerAvail[0].PassengerTypeQuantity.push(
                {
                    Code: code,
                    Quantity: count,
                }
            )
        })
    }

    if (infantCount > 0) {
        base_req_body.OTA_AirLowFareSearchRQ.TravelerInfoSummary.AirTravelerAvail[0].PassengerTypeQuantity.push(
            {
                Code: 'INF',
                Quantity: infantCount,
            }
        )
    }

    if (infantWithSeatCount > 0) {
        base_req_body.OTA_AirLowFareSearchRQ.TravelerInfoSummary.AirTravelerAvail[0].PassengerTypeQuantity.push(
            {
                Code: 'INS',
                Quantity: infantWithSeatCount,
            }
        )
    }

    let token = req.body.token
    if (typeof token == 'string') token = token.split(' ').join('')

    console.log(JSON.stringify(base_req_body))
    let url = config.sabre[config.sabre_mode] + '/v4/offers/shop'
    axios
        .post(url, base_req_body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            res.status(200).json(response.data)
        })
        .catch((err) => {
            console.log('flights error : ', err)
            res.status(403).json({ err2: true })
        })
}

exports.create_pnr = async function (req, res) {
    console.log('pnr body original = ' + JSON.stringify(req.body))

    let adultCount = req.body.adultCount ? Number(req.body.adultCount) : 1
    let infantCount = req.body.infantCount ? Number(req.body.infantCount) : 0
    let childrenCount = req.body.childrenCount
        ? Number(req.body.childrenCount)
        : 0
    let source = req.body.source ? req.body.source : 'web'

    let to_be_saved = {
        adultCount,
        infantCount,
        childrenCount,
        legs: req.body.legs,
    }

    let new_pnr = new Pnr({
        customer: req.body.customer,
        customer_id: req.body.customer_id,
        price: req.body.price,
        journey_type: req.body.journey_type,
        requested: to_be_saved,
        to_be_paid: req.body.to_be_paid,
        payment_status: 'NOT_PAID',
        pnr_status: 'PENDING',
        coupon_discount: req.body.coupon_discount,
        used_coupon: req.body.used_coupon,
        payment_mode: req.body.payment_mode,
        pnr_body: JSON.stringify(req.body),
        pnr_response: '{}',
        pnr_id: 'TempPNR' + Date.now(),
        payment_mode: req.body.payment_mode,
        flight_details: req.body.flight_details,
    })

    let pnrRowId = await Pnr.save_pnr(new_pnr)
    console.log('pnrRowId = ' + pnrRowId)

    if (source == 'mobile') {
        res.status(200).json({
            success: true,
            payment: {
                msg: {
                    status: 'SUCCESS',
                    total_amount: new_pnr.to_be_paid,
                    booking_ref: new_pnr.pnr_id,
                },
            },
        })
    } else {
        Payment.do_transaction(
            {
                booking_ref: new_pnr.pnr_id,
                userName: req.body.customer.name,
                email: req.body.customer.email,
                mobile_no: req.body.customer.contact_number,
                to_be_paid: req.body.to_be_paid,
            },
            function (err, response2) {
                if (err) {
                    var resp = new Resp(
                        { paymentError: err },
                        '400 Bad Request'
                    )
                    console.log('payment url error : ', resp)
                    res.status(200).json({
                        success: false,
                    })
                } else {
                    var resp = new Resp({ msg: response2 }, '200 OK')
                    console.log('payment success response : ', resp)
                    res.status(200).json({
                        success: true,
                        payment: resp.body,
                    })
                }
            }
        )
    }
}

//=============== this code usse initial comment====================
//{
// exports.airports = function (req, res) {
//   const params = new URLSearchParams();
//   console.log(req.param("city"))
//   params.append("country", "ALL");
//   params.append("db", "airports");
//   params.append("dst", "U");
//   params.append("action", "SEARCH");
//   if (req.param("city")) {
//     //console.log(req.param('city'))
//     if (req.param("city").trim().length === 3) {
//       // console.log('iata added')
//       params.append("iata", req.param("city").toUpperCase());
//     } else params.append("country", req.param("city"));
//   }
// var vv="81cbceef-d3a1-4296-bf45-66c31d418967"
// const p=port.filter((x)=>{
//   var input=req.param("city").toUpperCase();
//   var inlength=input.length;
//   var c=x.city.toUpperCase()
//   console.log(c)
//   if(c==input){
//     console.log(c)
//   }
// })
// axios
// .post(config.airport_source, params, {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// })
// .then((response) => {
//   // console.log({
//   //     airports : response.data
//   // })
//   // var resp = new Resp(response.data, "200 OK");
//   res.status(200).json(response.data);
// })
// .catch((err) => {
//   console.log(err);
//   res.status(403).json({ err: true });
// });
//};
//============================================================

exports.airports = function (req, res) {
    const params = new URLSearchParams()
    console.log(req.param('city'))
    params.append('country', 'ALL')
    params.append('db', 'airports')
    params.append('dst', 'U')
    params.append('action', 'SEARCH')
    if (req.param('city')) {
        //console.log(req.param('city'))
        if (req.param('city').trim().length === 3) {
            // console.log('iata added')
            params.append('iata', req.param('city').toUpperCase())
        } else params.append('country', req.param('city'))
    }

    var arr = []
    axios
        .get(config.url, { params: { name: req.param('city') } })
        .then((response) => {
            arr.push(response.data.response)
            var air = {
                airports: [],
            }

            for (var i = 0; i < response.data.response.length; i++) {
                air.airports.push({
                    name: response.data.response[i].name
                        .split(',')[1]
                        .split('(')[0]
                        .replace(/^\s+|\s+$/gm, ''),
                    city: response.data.response[i].city,
                    iata: response.data.response[i].iata,
                    country: response.data.response[i].name.split(',')[0],
                })
            }
            res.status(202).json(air)
        })
        .catch((error) => {
            res.status(202).json(arr)
        })
}

exports.mock_payment = function (req, res) {
    Payment.do_transaction(
        {
            booking_ref: 'LMAFSR',
            userName: 'sazzad',
            email: 'sazzadurrahman88@gmail.com',
            mobile_no: '456547567567',
        },
        function (err, response2) {
            if (err) {
                var resp = new Resp({ paymentError: err }, '400 Bad Request')
                console.log('mock payment url error : ', resp)
                res.status(200).json({
                    pnr: [],
                })
            } else {
                var resp = new Resp({ msg: response2 }, '200 OK')
                //console.log('mock payment success response : ' , resp)
                res.status(200).json({
                    pnr: [],
                    payment: resp.body,
                })
            }
        }
    )
}

exports.sms_flow = function (req, res) {
    var payload_data = {}
    payload_data['from'] = config.notification.from_sms
    payload_data['to'] = '+8801766534536'
    payload_data['text'] =
        'Your ticket issue is in process. we will keep you updated'
    request.post(
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                'cache-control': 'no-cache',
            },
            url: config.notification.sms,
            body: JSON.stringify(payload_data),
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body)
                console.log('sms response : ', obj)

                res.status(200).json({
                    sms_response: obj,
                })
            } else {
                res.status(200).json({
                    sms_response: false,
                })
            }
        }
    )
}

exports.email_flow = function (req, res) {
    var payload_data = {
        from: config.notification.from_email,
        to: 'sazzadurrahman88@gmail.com',
        subject: 'Navigator Travels',
        html: `<h3>everything ok</h3>`,
    }

    var contentLength = payload_data.length
    console.log(payload_data)
    request.post(
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Length': contentLength,
                Authorization: 'Basic TmF2aWdhdG9yMTIzNDpOYXZpZ2F0b3JAMTk1Nw==',
                'cache-control': 'no-cache',
            },
            url: config.notification.email,
            formData: payload_data,
            method: 'POST',
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body)
                res.status(200).json({
                    email_response: obj,
                })
            } else {
                console.log('Email api response without 200')
                res.status(200).json({
                    email_response: obj,
                })
            }
        }
    )
}

exports.listen_ipn = function (req, res) {
    let tempObj = {
        booking_ref: req.body.tran_id,
        bank_tran_id: req.body.bank_tran_id,
        currency: req.body.currency,
    }
    req.body = tempObj
    Payment.listen_ipn(req, function (err, response) {
        if (err) {
            var resp = new Resp(
                respMsg.get(responseMessageKey.generic.error),
                '400 Bad Request'
            )
            res.status(400).json(resp)
        } else {
            var resp = new Resp({ msg: response }, '200 OK')
            //res.status(200).json(resp);
            res.redirect('https://navigatortourism.com/myBooking?tab=flight')
        }
        logger.log(req, response, err)
    })
}

exports.cancel_pnr = async function (req, res) {
    // console.log(
    //   config.pnr_api_url + `/sabre/cancel_itenarary?pnrRef=${req.param("pnrRef")}`
    // );

    try {
        let pnr_id = req.query.pnrRef

        const token_data = await axios.get(
            config.server_url[config.sabre_mode] + '/token'
        )
        const cancel_token = token_data.data.access_token

        const cancel_url =
            config.sabre[config.sabre_mode] + '/v1/trip/orders/cancelBooking'
        const cancel_body = {
            confirmationId: pnr_id,
            retrieveBooking: true,
            cancelAll: true,
            errorHandlingPolicy: 'ALLOW_PARTIAL_CANCEL',
        }
        const cancel_header = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cancel_token,
        }

        const cancel_resp = await axios.post(cancel_url, cancel_body, {
            headers: cancel_header,
        })
        if (!cancel_resp.data.errors) {
            let cancel_query =
                "update pnr_records set pnr_status = 'CANCELLED' where pnr_id='" +
                pnr_id +
                "'"
            sql.query(cancel_query, function (error, results, fields) {
                if (error) throw error

                res.status(200).json({
                    message: 'pnr cancelled',
                    status: 'ok',
                })
            })
        } else {
            res.status(403).json({ err4: true })
        }
    } catch (err) {
        console.log('cancel pnr error : ', err)
        res.status(403).json({ err4: true })
    }

    // axios
    //   .get(
    //     config.pnr_api_url +
    //       `/sabre/cancel_itenarary?pnrRef=${req.param("pnrRef")}`
    //   )
    //   .then((response) => {
    //     // var resp = new Resp(response.data, "200 OK");
    //     console.log(req.param("pnrRef"));

    //     let query =
    //       "update pnr_records set pnr_status = 'CANCELLED' where pnr_id='" +
    //       req.param("pnrRef") +
    //       "'";

    //     console.log(query);
    //     sql.sql_query(query);
    //     console.log(response.data.applicationResults);
    //     res.status(200).json(response.data);
    //   })
    //   .catch((err) => {
    //     console.log("cancel pnr error : ", err);
    //     res.status(403).json({ err4: true });
    //   });
}
