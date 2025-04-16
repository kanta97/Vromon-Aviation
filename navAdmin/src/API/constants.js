let BASE1 = "https://navigatortourism.com:8085";
let BASE = "https://navigatortourism.com:3000";
//let BASE = "http://localhost:3000";
//let BASE3 = 'http://localhost:3005'
let BASE3 = "https://navigatortourism.com:3005";

let HOTEL_SERVER_BASE_URL = "https://navigatortourism.com:3003";

export const image_base_path = "https://navigatortourism.com:3000/";

const local_path = "http://localhost:5000/";
/* for staging
let BASE1 = 'https://stage.navigatortourism.com:8083'
let BASE = 'https://stage.navigatortourism.com:4000'
let HOTEL_SERVER_BASE_URL='https://stage.navigatortourism.com:4003'

export const image_base_path='https://stage.navigatortourism.com:4000/'*/

/*=======
let BASE1 = 'https://stage.navigatortourism.com:4000'
// let BASE = 'http://navigatortourism.com:3000'
let BASE = 'https://stage.navigatortourism.com:4000'

>>>>>>> 30f4e560006b7a9a6781eb4889b4ed657e45fc75*/

export const ACTIVITY_URL = BASE + "/activity";
export const GET_ALL_ACTIVITY_URL = BASE + "/activitys";
export const HOTEL_URL_S = BASE + "/hotels";
export const PNR_URL_S = BASE3 + "/pnr";
export const AIRPORTS = BASE3 + "/airports";
export const AIRLINES = BASE3 + "/airlines";
export const CANCEL_PNR = BASE3 + "/cancel-pnr";
export const HOTEL_URL = BASE + "/hotel";
export const FIXED_PACKAGE_URL = BASE + "/fixedpackage";
export const BOOKING_HISTORY = BASE + "/activity";
export const TOUR_TYPE_URL = BASE + "/tour_types";
export const BOOKED_PACKAGE_SEARCH = BASE + "/bookedpackage/search";
export const BOOKED_PACKAGE_STATUS_CHANGE =
  BASE + "/bookedPackage/statusUpdate";

export const Customize_Package_URL = BASE + "/activity";
export const USER_URL = BASE1 + "/auth/user/login";
export const COUPON_URL = BASE + "/promo";
export const COUPON_ASSIGN_URL = BASE + "/promo/user";
export const GET_ALL_USER = BASE1 + "/auth/admin/users";
export const USER_INFO_URL = "/auth/admin/users/search";
export const ROLE_INFO_URL = "/auth/role/search";
export const HOTEL_BOOKING_HISTORY =
  HOTEL_SERVER_BASE_URL + "/hotel/api/user/booking/records/admin/null";

export const CURRENCY_URL = BASE + "/currency";
export const PRICEFACTOR_URL = BASE + "/price-factor";

export const FAILED_HOTEL_DETAIL_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/hotels/failedHote/hotelDetails";
export const FAILED_HOTEL_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/hotels/failedHotelList";
export const FAILED_DESTINATION_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/destination/failedDestinationsList";
export const FAILED_DESTINATION_DETAIL_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/destination/failedDestinations/getData";
export const FAILED_COUNTRY_DETAIL_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/country/failedCountries/getData";
export const FAILED_COUNTRY_URL =
  HOTEL_SERVER_BASE_URL + "/hotel/api/country/failedCountriesList";

//visa documents url
export const GET_ALL_VISA_DOC = image_base_path + "visa/document";

export const POST_VISA_DOC = local_path + "visa/document";
