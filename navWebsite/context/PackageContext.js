import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { API_TRIP_URL } from "../config/index";
import axios from "axios";
import AuthContext from "./AuthContext";
import moment from "moment";
import Router from 'next/router'

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const [packageBooking, setPackageBooking] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState(null);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const [selectedDestination, setSelectedDestination] = useState({
    value: "",
    label: "",
  });
  const [destinations, setDestinations] = useState([]);

  const [primaryDataForPackages, setPrimaryDataForPackages] = useState([]);
  const [priceData, setPriceData] = useState({ min: 0, max: 100 });

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeValidity, setPromoCodeValidity] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [bookingData, setBookingData] = useState({
    journeyDate: moment(new Date()).format("yyyy-MM-DD"),
    returnDate: "",
    totalCost: 0,
    travelerName: "",
    tourType: "",
    totalTraveler: 1,
    adult: 1,
    noOfChildWithBed: 0,
    noOfChildOutBed: 0,
    email: "",
    mobileNo: "",
    paymentMode: "",
  });

  const [afterPackBookData, setAfterPackBookData] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const [foundPackages, setFoundPackages] = useState({
    loading: false,
    data: null,
    error: false,
  });

  const [packageDetails, setPackageDetails] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const getAllDestinations = async () => {
    const config = {
      headers: {
        app_key: "123456",
        Accept: "application/json",
      },
    };
  
    const res = await axios.get(`${API_TRIP_URL}/package`, config);
    
    // Extract unique countries from the response
    const uniqueCountries = Array.from(
      new Set(res.data.body.packages.map((item) => item.country))
    );
  
    // Separate Thailand and the rest of the countries
    const thailand = uniqueCountries.find(country => country === "Thailand");
    const otherCountries = uniqueCountries.filter(country => country !== "Thailand");
  
    // Sort other countries alphabetically
    otherCountries.sort();
  
    // Create the destinations list, placing Thailand first
    const dests = [];
    if (thailand) {
      dests.push({ value: thailand, label: thailand });
    }
    // Map other countries to the required format and add to the list
    dests.push(
      ...otherCountries.map((country) => ({
        value: country,
        label: country,
      }))
    );
  
    console.log("dests", dests);
    setDestinations(dests);
  };

  const searchPackages = async () => {
    setFoundPackages({ ...foundPackages, loading: true });

    try {
      const config = {
        headers: {
          app_key: "123456",
          Accept: "application/json",
        },
      };

      const res = await axios.get(
        `${API_TRIP_URL}/package?destination=${selectedDestination.value}`,
        config
      );
      const packData = res.data.body.packages;
      console.log("packData ", packData);
      const tempPriceData = packData.reduce(
        (acc, cur) => {
          if (cur.price < acc.min) {
            acc.min = cur.price;
          }
          if (cur.price > acc.max) {
            acc.max = cur.price;
          }
          return acc;
        },
        { min: Infinity, max: -Infinity }
      );
      setPriceData(tempPriceData);

      setFoundPackages({
        ...foundPackages,
        loading: false,
        data: packData,
      });
      setPrimaryDataForPackages(packData);
    } catch (e) {
      setFoundPackages({
        ...foundPackages,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  const getPackageDetails = async (id) => {
    console.log("fixedPackData", packageDetails);
    setPackageDetails({
      ...packageDetails,
      loading: true,
    });
    try {
      const res = await axios.get(`${API_TRIP_URL}/fixedpackage/${id}`);
      const fixedPackData = res.data.body[0];

      fixedPackData.tourTypeDetailsMain = JSON.parse(
        JSON.stringify(fixedPackData.tourTypeDetails)
      )
        ? JSON.parse(JSON.stringify(fixedPackData.tourTypeDetails))
        : [];
      const uniqueTourTypes = fixedPackData.tourTypeDetails.reduce(
        (accumulator, current) => {
          if (!accumulator[current.tour_type]) {
            accumulator[current.tour_type] = current;
          }
          return accumulator;
        },
        {}
      );
      const uniqueTourTypesArray = Object.values(uniqueTourTypes);
      fixedPackData.tourTypeDetails = uniqueTourTypesArray;
      setBookingData({
        ...bookingData,
        totalCost: fixedPackData.tourTypeDetails[0].price,
      });
      setPackageDetails({
        ...packageDetails,
        loading: false,
        data: fixedPackData,
      });
    } catch (e) {
      setPackageDetails({
        ...packageDetails,
        loading: false,
        error: "Something went wrong",
      });
    }
  };


  const assignPackage = async () => {
    //console.log(flight)
    setPackageBooking(packageDetails)
    try {
        // const sessResult = await axios.post('/api/sessionManager', {
        //     flight,
        //     sessStartTime,
        // })
        // const sessToken = sessResult.data.sessionToken
        // localStorage.setItem(
        //     'nav-session',
        //     JSON.stringify({ token: sessToken })
        // )
        Router.push('/package/booking')
    } catch (e) {
        console.log(e)
        alert('Flight checking out failed. Please try again.')
    }
}

  const searchByDestination = (keyword) => {
    const regex = new RegExp(keyword, "i");
    const result = primaryDataForPackages.filter((item) =>
      regex.test(item.destination)
    );

    console.log(primaryDataForPackages, result);

    setFoundPackages({
      ...foundPackages,
      data: result,
    });
  };

  const checkPromoCode = () => {
    if (promoCode == "") {
      alert("Please input promo code.");
      return;
    }

    var couponBody = {
      promoCode: promoCode,
      userId: user.email,
    };

    console.log(couponBody);

    var url = `${API_TRIP_URL}/promoCode/check`;

    console.log(url);

    console.log("Promo Code request sending.");

    fetch(url, {
      method: "POST",
      headers: {
        APP_KEY: "123456",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(couponBody),
    })
      .then(async (response) => {
        try {
          console.log("Promo Code request received.");

          const data = await response.json();

          console.log(data);

          if (data?.validityResult == "VALID") {
            setDiscount(Math.ceil(data?.discount));
            setPromoCodeValidity(true);
          } else {
            alert("Promo code not valid!");
            setPromoCodeValidity(false);
          }
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const bookPackage = async (user) => {
    setAfterPackBookData({
      ...afterPackBookData,
      loading: true,
    });

    try {
      if (!promoCodeValidity) {
        setPromoCode("");
      }

      let body = {
        userId: user.userId.toString(),
        userName: bookingData.travelerName,
        tourType: bookingData.tourType,
        travelDate: bookingData.journeyDate,
        roomType: [
          {
            type: "DOUBLE",
            count: 2,
          },
        ],
        peopleCount: bookingData.adult.toString(),
        children_count_bed: Number(bookingData.noOfChildWithBed),
        children_count_no_bed: Number(bookingData.noOfChildOutBed),
        email: bookingData.email,
        mobileNumber: bookingData.mobileNo,
        paymentMode: bookingData.paymentMode,
        packageId: Number(packageDetails.data.id),
        discount: discount,
        country: packageDetails.data.country,
        remark: "",
        promoCode: promoCode,
        price: bookingData.totalCost,
      };

      // console.log(JSON.stringify(body)); return;

      const res = await axios.post(`${API_TRIP_URL}/package/book`, body);
      const bookedData = res.data;
      setAfterPackBookData({
        ...afterPackBookData,
        loading: false,
        data: bookedData,
      });
    } catch (e) {
      setAfterPackBookData({
        ...afterPackBookData,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  const bookingSuccess = async (id) => {
    const res = await axios.get(`${API_TRIP_URL}/payment/ipn/${id}`);

    console.log(res);

    if (res.data.status == "200 OK") {
      router.push("/myBooking");
    }
  };

  const handlePriceRange = (value) => {
    const filteredData = primaryDataForPackages.filter(
      (item) => item.price <= value
    );
    setFoundPackages({
      ...foundPackages,
      loading: false,
      data: filteredData,
    });
  };

  // My Booking data
  const myPackageBooking = async (id) => {
    try {
      setLoading(false);
      const response = await fetch(
        `${API_TRIP_URL}/bookedpackage/search?limit=10&offset=1&user_id=39223`,
        {
          method: "GET",
          headers: {
            APP_KEY: "123456",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      console.log("package", data.body);
      setPackageBooking(data.body);
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendMailOne = async (customizedPac) => {
    var custData = Object.create({});
    custData.name = customizedPac.name;
    custData.phone_no = customizedPac.phone;
    custData.email = customizedPac.email;
    custData.service = customizedPac.service;
    custData.message = customizedPac.message;
    custData.status = "Requested";
    custData.notification_type = "contactEmail";

    console.log(custData);

    var url = `${API_TRIP_URL}/email/send`;

    console.log(url);

    console.log("Mail one request sending.");

    fetch(url, {
      method: "POST",
      headers: {
        APP_KEY: "123456",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(custData),
    })
      .then(async (response) => {
        try {
          console.log("Mail one request received.");

          const data = await response.json();

          console.log(data);

          if (data.code == "200 OK") {
            alert(
              "Your submission is successful. Thanks for your interest. We will contact with you soon."
            );
            router.push("/");
          }
        } catch (error) {}
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFeaturedPackage = async () => {
    try {
      const res = await axios.get(`${API_TRIP_URL}/packages/featured`);
      const resData = res.data.body.featuredPackages;
      setFeaturedPackages(resData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PackageContext.Provider
      value={{
        loading,
        msg,
        error,
        myPackageBooking,
        packageBooking,

        getAllDestinations,
        destinations,
        selectedDestination,
        setSelectedDestination,

        searchPackages,
        foundPackages,

        getPackageDetails,
        packageDetails,

        searchByDestination,

        setBookingData,
        bookingData,

        bookPackage,
        afterPackBookData,
        bookingSuccess,

        handlePriceRange,

        priceData,
        sendMailOne,
        promoCode,
        setPromoCode,
        discount,
        setDiscount,
        checkPromoCode,

        getFeaturedPackage,
        featuredPackages,
        assignPackage,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export default PackageContext;
