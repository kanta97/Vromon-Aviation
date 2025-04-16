import PriceFactor from "../views/PriceFactor/PriceFactor";

export {
  FAILED_DESTINATION_DETAIL_URL,
  FAILED_COUNTRY_DETAIL_URL,
  FAILED_COUNTRY_URL,
  FAILED_HOTEL_DETAIL_URL,
  FAILED_HOTEL_URL,
  FAILED_DESTINATION_URL,
  TOUR_TYPE_URL,
  BOOKING_HISTORY,
  FIXED_PACKAGE_URL,
  BOOKED_PACKAGE_SEARCH,
  ACTIVITY_URL,
  GET_ALL_ACTIVITY_URL,
  HOTEL_URL,
  HOTEL_URL_S,
  PNR_URL_S,
  AIRLINES,
  AIRPORTS,
  CANCEL_PNR,
  USER_INFO_URL,
  ROLE_INFO_URL,
  COUPON_URL,
  COUPON_ASSIGN_URL,
  GET_ALL_USER,
  image_base_path,
  BOOKED_PACKAGE_STATUS_CHANGE,
  HOTEL_BOOKING_HISTORY,
  CURRENCY_URL,
  PRICEFACTOR_URL,
  GET_ALL_VISA_DOC,
  POST_VISA_DOC,
} from "./constants";
export {
  addActivity,
  getActivity,
  editActivity,
  deleteActivity,
} from "./activity";

export {
  addCoupon,
  getCoupon,
  editCoupon,
  deleteCoupon,
  statusCoupon,
} from "./coupon";

export { addUser, getUser, editUser, deleteUser, getAllUser } from "./user";

export {
  addHotel,
  getHotel,
  editHotel,
  getAllHotel,
  deleteHotel,
} from "./hotel";

export {
  addFixedPackage,
  getFixedPackage,
  editFixedPackage,
  deleteFixedPackage,
} from "./fixed-package";

export { changeStatus, viewLog } from "./bookingHistory";

export { tourType, loadtourTypeSession } from "./resource";

export { addRole, getRole, editRole, deleteRole } from "./role";

export { addCurrency, getCurrency, deleteCurrency } from "./currency";
export { deletePriceFactor } from "./priceFactor";
export {
  loadHotelData,
  refreshActivityHotel,
  loadDestinationData,
  refreshActivityDestination,
  loadCountryData,
  refreshActivityCountry,
} from "./FailedData";

export { getAllVisa, addVisa, getVisa, editVisa, deleteVisa } from "./visa";
