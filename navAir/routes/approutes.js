const express = require('express')
const router = express.Router()
var pnr = require('../controller/pnrController')
var airlines = require('../controller/airlineController')
var logos = require('../controller/airlineLogoController')
var airport = require('../controller/airportController')
var sabre = require('../controller/sabreController')
const SslCommerz = require('../controller/sslcommerzController')
const nagad = require('../controller/nagadController')
const bkash = require('../controller/bkashController')
// const ebl = require('../controller/eblController')
const bbl = require('../controller/bblController')
const fileuploadcontroller = require('../controller/fileuploadcontroller')
const upload = require('../middleware/fileupload');


router.post('/upload', upload.single('file'), fileuploadcontroller.uploadTicket);

router.route('/pnr').get(pnr.list_all_pnr)

router.route('/airlines').get(airlines.list_all_airlines)

router.route('/discount').get(airlines.get_discount)

router.route('/offers').get(airlines.get_offers)

router.route('/logos').get(logos.list_all_airlines_logos)

router.route('/airports').get(airport.list_all_airports)

router.route('/token').get(sabre.get_token)

router.route('/get_flights').post(sabre.get_flights)

router.route('/get_flights_post').post(sabre.get_flights_post)

router.route('/create_pnr').post(sabre.create_pnr)

router.route('/my-pnr/:userId').get(pnr.getRecordByUser)

router.route('/hanlde-payment').post(sabre.listen_ipn)

router.route('/available-airports').get(sabre.airports)

router.route('/mock-payment').post(sabre.mock_payment)

router.route('/mock-sms').post(sabre.sms_flow)

router.route('/mock-email').post(sabre.email_flow)

router.route('/cancel-pnr').get(sabre.cancel_pnr)

router.route('/ssl-request').get(SslCommerz.sslRequest)

router.route('/ssl-payment-success').post(SslCommerz.sslRequestSuccess)

router.route('/ssl-payment-fail').post(SslCommerz.sslRequestFail)

router.route('/ssl-payment-cancel').post(SslCommerz.sslRequestCancel)
router.route('/ssl-payment-cancel').get(SslCommerz.sslRequestCancel)

router.route('/ssl-payment-ipn').post(SslCommerz.sslRequestIpn)

router.route('/booking-history/:userId').get(pnr.getAirBookingHistroy)

router.route('/pay_with_nagad').post(nagad.pay)
router.route('/nagad_callback').get(nagad.nagad_callback)

router.route('/pay_with_bkash').post(bkash.pay)
router.route('/bkash_callback').get(bkash.bkash_callback)

router.route('/pay_with_bbl').post(bbl.pay)
router.route('/bbl_inquiry').post(bbl.inquiry)
router.route('/bbl_callback').post(bbl.callback)
// router.route('/bbl_post_action').post(bbl.post_action)

// router.route('/ebl_callback').post(ebl.ebl_callback)

module.exports = router
