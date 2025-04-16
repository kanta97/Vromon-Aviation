const express = require("express");
const router = express.Router();
var fixedpackages = require("../controller/fixedpackageController");
var visa = require("../controller/visaController");

var bookpackage = require("../controller/bookingController");
var featuredPackage = require("../controller/featuredpackageController");
var custompackage = require("../controller/custompackageController");
var hotel = require("../controller/hotelController");
var transportation = require("../controller/transportationController");
var activity = require("../controller/activityController");
var payment = require("../controller/paymentController");
var promo = require("../controller/promoController");
var fileupload = require("../middleware/fileupload");
var tourType = require("../controller/tourController");
const querystring = require("querystring");
const url = require("url");
var notification = require("../controller/notificationController");
var uploadVisa = require("../middleware/fileupload_visa");
var user = require("../controller/UserController");
var customPackageLocation = require("../controller/CustomPackageLocationController");
var currencyController = require("../controller/currencyController");
var priceFactorController = require("../controller/priceFactorController");
var descriptionController = require("../controller/descriptionController");
const SslCommerz = require("../controller/sslcommerzController")

var home = require("../controller/homeController");

router
  .route("/currency")
  .get(currencyController.list_all_currencies)
  .post(currencyController.create_currencyRate);
router
  .route("/currency/:id")
  .put(currencyController.update_currencyRate)
  .delete(currencyController.delete_currencyRate);
router
  .route("/price-factor")
  .get(priceFactorController.list_all_priceFactor)
  .post(priceFactorController.create_priceFactor);
router
  .route("/price-factor/:id")
  .put(priceFactorController.update_priceFactor)
  .delete(priceFactorController.delete_priceFactor);

router
  .route("/currency/:toCurrency/:fromCurrency")
  .get(currencyController.search_currency_by_destination);

router
  .route("/description/:id?")
  .post(descriptionController.add_description)
  .get(descriptionController.get_description);

router
  .route("/description/:id")
  .put(descriptionController.updateDescription)
  .delete(descriptionController.delete_description);
router
  .route("/visa/document/:id?")
  .get(visa.list_of_visa_document)
  .put(uploadVisa, visa.UpdateuploadVisaDocumentByCountry)
  .post(uploadVisa, visa.uploadVisaDocumentByCountry)
  .delete(visa.delete_visa_document);
router
  .route("/visa/contact")
  .post(visa.checkVisaContactUs);

router
  .route("/contact")
  .post(home.contact_us);

router
  .route("/fixedpackage")
  .get(fixedpackages.list_all_fixedpackage)
  .post(fileupload.array("files", 20), fixedpackages.create_fixedpackage);
router
  .route("/fixedpackage/update")
  .put(fileupload.array("files", 20), fixedpackages.update_fixedpackage);
router.route("/configs").get(fixedpackages.list_all_configs);
router
  .route("/fixedpackage/:limit/:offset")
  .get(fixedpackages.get_package_by_limit);

router
  .route("/fixedpackage/:packageid")
  .get(fixedpackages.search_package_by_packageid)
  .put(fixedpackages.update_fixedpackage)
  .delete(fixedpackages.delete_fixedpackage);

router
  .route("/fixedpackagecount")
  .get(fixedpackages.get_package_count_by_country);

// router.route('/package/:destination/')
//     .get(fixedpackages.search_package_by_destination);
router.route("/package").get(fixedpackages.search_package_by_destination);
router.route("/bookedpackage/search").get(bookpackage.searchbookedpackage);

router
  .route("/upload")
  .post(fileupload.array("files", 20), fixedpackages.upload_file);

router.route("/package/book").post(bookpackage.book_fixedpackage);

router.route("/packageBooking/cancel").post(bookpackage.cancelBooking);

router
  .route("/packageBooking/update/:bookingReference")
  .put(bookpackage.update_fixedpackage);

router
  .route("/bookedPackage/statusUpdate")
  .put(bookpackage.update_booking_status);

router
  .route("/packages/featured/:limit?/:offset?")
  .get(featuredPackage.list_all_featuredpackage);

router.route("/hotel").post(hotel.create_hotel);

/*router.route('/user/profile')
    .post(user.create_profile);

router.route('/user/profile/:id')
    .put(user.update_profile);*/

router.route("/hotels/:limit?/:offset?").get(hotel.list_all_hotel);

router
  .route("/hotel/:hotelid")
  .get(hotel.read_hotel)
  .put(hotel.update_hotel)
  .delete(hotel.delete_hotel);

router.route("/transportation").post(transportation.create_transportation);

router
  .route("/transportations/:limit?/:offset?")
  .get(transportation.list_all_transportation);

router
  .route("/transportation/:transportationid")
  .get(transportation.read_transportation)
  .put(transportation.update_transportation)
  .delete(transportation.delete_transportation);

router
  .route("/activity")
  .post(fileupload.array("files", 20), activity.create_activity);

router.route("/activitys/:limit?/:offset?").get(activity.list_all_activity);

router
  .route("/activity/:activityid")
  .get(activity.read_activity)
  .put(activity.update_activity)
  .delete(activity.delete_activity);

router
  .route("/activity/location/:customlocationid")
  .get(activity.read_activity_customlocation);

router
  .route("/customPackageLocation")
  .post(customPackageLocation.create_customPackageLocation);

router
  .route("/customPackageLocations/:limit?/:offset?")
  .get(customPackageLocation.list_all_customPackageLocation);

router
  .route("/customPackageLocation/:id")
  .get(customPackageLocation.read_customPackageLocation)
  .put(customPackageLocation.update_customPackageLocation)
  .delete(customPackageLocation.delete_customPackageLocation);

router.route("/tour_types").get(tourType.list_all_tour_type);

router.route("/promo").post(promo.create_promo);

router.route("/promo/user").post(promo.assign_user);

router.route("/promoCode/check").post(promo.check_promo);

router.route("/notification").post(notification.create_notification);

router
  .route("/notification/dispatcher")
  .post(notification.dispatch_notification);

router
  .route("/email/send")
  .post(notification.sendEmail);

router.route("/promo/:id").put(promo.update_promo).delete(promo.delete_promo);
router.route("/promo/search").get(promo.get_promo_by_criteria);

router.route("/package/custom/build").post(custompackage.Build_Custom_Package);

router.route("/package/custom/book").post(custompackage.bookCustomPackage);
router.route("/package/custom/update").post(custompackage.updateCustomPackage);

router.route("/payment/ipn/:tran_id").get(payment.listen_ipn);
router.route("/payment/success").get(payment.payment_success);
router
  .route("/package/:destination")
  .get(fixedpackages.search_package_by_destination);

router.route("/ssl-request").get(SslCommerz.sslRequest);

router.route("/ssl-payment-success").post(SslCommerz.sslRequestSuccess);
  
router.route("/ssl-payment-fail").post(SslCommerz.sslRequestFail);
  
router.route("/ssl-payment-cancel").post(SslCommerz.sslRequestCancel);
  
router.route("/ssl-payment-ipn").post(SslCommerz.sslRequestIpn);

module.exports = router;
