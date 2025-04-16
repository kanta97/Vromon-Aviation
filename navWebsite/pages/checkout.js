import React, { useEffect, useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import axios from "axios"
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Checkout.module.css'
import flight_air_logo from '../public/assets/img/flight_air_logo.png'
import flightico from '../public/assets/img/flight.png'
import Link from 'next/link'
import upsolid from '../public/assets/icons/upsolid.svg'
import upsolid1 from '../public/assets/icons/chevron.svg'

import Group from '../public/assets/img/Group.svg'
import calendar from '../public/assets/icons/calendar.svg'
import user from '../public/assets/icons/user.svg'
import adult1 from '../public/assets/img/adult1.png'

import Passenger_Details from '../components/Passenger_Details'
import CardPassengerView from '../components/CardPassengerView'
import passenger_data from '../data/passengerDetails.json'
import Pagebar from '../components/Pagebar'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import AuthContext from '../context/AuthContext'
import FlightContext from '../context/FlightContext'
import { flightDiscount } from '../config'
import moment from 'moment';
export default function checkout() {
    const [show_details, setshow_details] = useState(true)
    const [flight_details, setflight_details] = useState(false)
    const [show_pay, setshow_pay] = useState(false)
const initializeIndexes = (length) => {
    const obj = {};
    for (let i = 0; i < length; i++) {
      obj[i] = true;
    }
    return obj;
  };

  // Replace 10 with the total number of indexes you need
  const [folding, setFolding] = useState(initializeIndexes(20));
  const [folding1, setFolding1] = useState(initializeIndexes(20));
  const [folding2, setFolding2] = useState(initializeIndexes(20));

    const {
        adults,
        childCount,
        infants,
        selectedFlight,
        adultList,
        childrenList,
        infantList,
        setAdultList,
        setChildrenList,
        setInfantList,
        create_pnr,
        isLoading, setIsLoading,
        handleValidation,isOffcanvasOpen,canvashandleClose,
        setSelectedFlight,
        setSessStartTime,
        paymentMethod,get_transit_time,
        setPaymentMethod,errorMessage
    } = useContext(FlightContext)
    const { getProfileInfo, profileData, updateProfile } =
    useContext(AuthContext);
    console.log('selectedFlight',selectedFlight);
    const [cupon,setCupon]=useState('')
    const [total_amount, set_total_amount] = useState(0);
    const [common_discount, set_common_discount] = useState(0);
    const [show_cupon, set_show_cupon] = useState(0);
    // const [previousFlightState, setPreviousFlightState] = useState(null);
    const allPassengers = [
      ...adultList.map((passenger, idx) => ({
        ...passenger,
        pass_type: "adult",
        idx,
      })),
      ...childrenList.map((passenger, idx) => ({
        ...passenger,
        pass_type: "child",
        idx: adultList.length + idx,
      })),
      ...infantList.map((passenger, idx) => ({
        ...passenger,
        pass_type: "infant",
        idx: adultList.length + childrenList.length + idx,
      })),
    ];
const applyCupon=()=>{
console.log('cupon',cupon)
console.log(selectedFlight);
console.log('selectedFlight');

// selectedFlight.common_discount=2000


// const isCouponApplicable = departureLocation === 'DAC' && arrivalLocation === 'CXB' && total_amount > 15000;
// const discountAmount = isCouponApplicable=2000;

set_common_discount(selectedFlight.common_discount)
set_total_amount(selectedFlight.total_amount)
if(cupon ==='@#CORP2K$%' && (selectedFlight.legDescriptions[0].departureLocation === 'DAC' && selectedFlight.legDescriptions[0].arrivalLocation === 'CXB' && selectedFlight.total_amount+ selectedFlight.common_discount >= 13000)){
    set_show_cupon(true)
    setSelectedFlight((prevState) => ({
        ...prevState,
        total_amount: prevState.common_discount + prevState.total_amount - 2000,
        common_discount: 2000
      }));

}else[
    alert('Invalid Coupon Code!')
]
console.log(selectedFlight);
}

const removeCoupon = () => {
    set_show_cupon(false)
    setSelectedFlight((prevState) => ({
        ...prevState,
        total_amount: total_amount,
        common_discount: common_discount
      }));
  };

  useEffect(() => {
    console.log('Updated selectedFlight:', selectedFlight);
  }, [selectedFlight]);

    console.log("user",user)
    // useEffect(() => {
    //     getProfileInfo();
    //   }, []);
    //console.log(selectedFlight)

    const paymentMethods = [
        { value: 'bbl', label: 'Visa/Master Card', logo: "/assets/icons/visa-mastercard.jpg"  },
        { value: 'bkash', label: 'bKash', logo: "/assets/icons/bkash.svg"  },
        { value: 'Nagad', label: 'Nagad', logo: "/assets/icons/nogod.svg" },
        { value: 'SSLCommerz', label: 'Others', logo: "/assets/icons/s.png"  },

        //  { value: 'bbl', label: 'BRAC BANK', logo: "/assets/icons/bb.png"  },
    ];
    const handleButtonClick = (method) => {
        if (paymentMethod === method.value) {
            setPaymentMethod(''); // Unselect if double-clicked
        } else {
            setPaymentMethod(method.value);
        }
    };
    useEffect(() => {
        if (selectedFlight)
        {
            const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))

            adultList[0].email=userInfoFromStorage.email;
            adultList[0].contactNumber=userInfoFromStorage.phone_no;



            if (userInfoFromStorage && userInfoFromStorage.display_name) {
                const fullName = userInfoFromStorage.display_name;
                const [namef, surnamel] = fullName.split(' ');
                adultList[0].name = namef;
  adultList[0].surname = surnamel;
                console.log('Name:',  adultList[0].name);
                console.log('Surname:',  adultList[0].surname);
              } else {
                console.log('Display name not found in userInfoFromStorage or userInfoFromStorage is empty.');
              }
        }
        else{
            let sessToken = localStorage.getItem('nav-session')
            let sessJson = JSON.parse(sessToken)
            const verify = async (token) => {
                try {
                    const verificationRes = await axios.post(
                        '/api/sessionVerify',
                        token
                    )
                    console.log(verificationRes.data)
                    if (!verificationRes.data.success) {
                        alert("Session Timeout!!!")
                        Router.push("/")
                    } else {
                        setSelectedFlight(verificationRes.data.flightDetails.flight)
                        setSessStartTime(verificationRes.data.flightDetails.sessStartTime)
                    }

                } catch (e) {
                    console.log("Session Error: ", e)
                    alert("Something went wrong. Please try again.")
                }
            }
            verify(sessJson)
        }
    }, [])
    useEffect(() => {
        if (profileData && profileData.date_of_birth) {
            // Validate and format the date of birth
            const dob = profileData.date_of_birth;
            const formattedDate = moment(dob).toDate(); // Using moment.js to handle the date

            // Check if the formattedDate is valid
            if (!isNaN(formattedDate.getTime())) {
                // Update adultList with the formatted date
                setAdultList((prevList) => {
                    const updatedList = [...prevList];
                    updatedList[0].dateOfBirth = formattedDate; // Set the formatted date
                    return updatedList; // Return the updated list
                });
            } else {
                console.error('Received an invalid date from profile data:', dob);
            }
        } else {
            console.log('Date of birth not found in profile data.');
        }
    }, [profileData]);
    const onInputChanage = (e, index, field, type) => {
      let targetList;

      // Determine the correct list to update
      if (type === 'child') {
        targetList = [...childrenList];
      } else if (type === 'infant') {
        targetList = [...infantList];
      } else if (type === 'adult') {
        targetList = [...adultList];
      } else {
        console.error(`Unknown type: ${type}`);
        return;
      }

      // Ensure the index exists in the list
      if (index < 0 || index >= targetList.length) {
        console.error(`Invalid index ${index} for type ${type}.`);
        return;
      }

      // Update the specific field for the passenger
      if (field === 'nationality') {
        targetList[index][field] = e.target.value;
        targetList[index].countryOfIssue = e.target.value; // If linked field is needed
      } else if (
        field === 'dateOfBirth' ||
        field === 'passportIssueDate' ||
        field === 'passportExpireDate'
      ) {
        targetList[index][field] = e; // For date fields
      } else {
        targetList[index][field] = e.target.value; // For text fields
      }

      // Update the state of the correct list
      if (type === 'child') {
        setChildrenList(targetList);
      } else if (type === 'infant') {
        setInfantList(targetList);
      } else if (type === 'adult') {
        setAdultList(targetList);
      }
    };




    // const onInputChanage = (e, index, field, type) => {
    //     let newData = []
    //     if (type == 'child') {
    //         newData = [...childrenList]
    //     } else if (type == 'infant') {
    //         newData = [...infantList]
    //     } else {
    //         newData = [...adultList]
    //     }

    //     console.log(e)
    //     if (field == 'nationality') {
    //         newData[index][field] = e.target.value
    //         newData[index].countryOfIssue = e.target.value
    //     } else if (
    //         field == 'dateOfBirth' ||
    //         field == 'passportIssueDate' ||
    //         field == 'passportExpireDate'
    //     ) {
    //         newData[index][field] = e
    //     } else {
    //         newData[index][field] = e.target.value
    //     }

    //     if (type == 'child') {
    //         setChildrenList(newData)
    //     } else if (type == 'infant') {
    //         setInfantList(newData)
    //     } else {
    //         setAdultList(newData)
    //     }
    // }
    const toggleFold = (index) => {
        setFolding((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the specific index
        }));
    };
    const toggleFold1 = (index) => {
        setFolding1((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the specific index
        }));
    };
    const toggleFold2 = (index) => {
        setFolding2((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the specific index
        }));
    };
    return (
        <Layout>
            <Pagebar action={52} />
            <div
                className="row"
                style={{ marginTop: '28px', marginBottom: '20px' }}>
                {selectedFlight ? (
                    <div className="col-sm-8">
                        {/* <div className="card">
                        <div className="d-flex justify-content-between">
                            <div className={styles.page}></div>
                            <div className={styles.page}>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.page}>Flight section </div>
                                    <div className={styles.page}>Booking </div>
                                    <div className={styles.page}>Payment</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        <div className={` ${styles.boxshado}`}>
                            <div
                                className="d-flex justify-content-between  mb-3 flight_card"
                                onClick={() =>
                                    setshow_details(show_details ? false : true)
                                }>
                                <div className="">
                                    <h6 className={styles.taxtotall1}>
                                        Flight Summary
                                    </h6>
                                    {selectedFlight.legDescriptions.map(
                                        (legDesc) => (
                                            <div
                                                className={
                                                    styles.discount_info_my
                                                }>
                                                {legDesc.departureLocation} -{' '}
                                                {legDesc.arrivalLocation}
                                            </div>
                                        )
                                    )}
                                    <div>
                                        <span>
                                            <Image
                                                src={calendar}
                                                alt="Picture of the author2"
                                                width={15}
                                                height={20}
                                            />
                                            &nbsp;
                                            <span className={styles.check}>
                                                &nbsp;{' '}
                                                {
                                                    selectedFlight
                                                        .legDescriptions[0]
                                                        .departureDate
                                                }
                                            </span>
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>
                                            <Image
                                                src={user}
                                                alt="Picture of the author2"
                                                width={15}
                                                height={20}
                                            />
                                        </span>
                                        &nbsp;
                                        <span className={styles.check}>
                                            &nbsp;{' '}
                                            {adults + childCount + infants}{' '}
                                            Travellers(s)
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginRight: '10px',
                                        alignSelf: 'center'
                                    }}>
                                    {show_details ? (
                                        <Image
                                            src={upsolid}
                                            alt="Picture of the author"
                                            width={15}
                                            height={20}
                                        />
                                    ) : (
                                        <Image
                                            src={upsolid1}
                                            alt="Picture of the author2"
                                            width={15}
                                            height={20}
                                        />
                                    )}
                                </div>
                            </div>
                            {show_details && selectedFlight ? (
                                <>
                                    <div className="card-body">
                                        {/* ---------- this side rendr by call api----------------- */}
                                        <div className={styles.mycardok}>
                                            <div
                                                className="row width_notfix"
                                                style={{
                                                    alignItems: 'center',
                                                    textAlign: 'center',

                                                }}>
                                                {selectedFlight.legs.map(
                                                    (legDesc) => (
                                                        <div className="col-12">
                                                            <div
                                                                className="row align-items-center"
                                                                style={{
                                                                    marginTop:
                                                                        '10px',
                                                                    marginBottom:
                                                                        '10px'
                                                                }}>
                                                                <div className="col-3">
                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                    <div>
                {selectedFlight.logo && (
                    <Image
                        className="img-fluid air_img"
                        src={`/${selectedFlight.logo}`}
                        alt="Airline Logo"
                        width={80}
                        height={80}
                    />
                )}
                {selectedFlight.airlineName && (
                    <h6 className="air_log">
                        {selectedFlight.airlineName}
                    </h6>
                )}</div>
                </div>
            </div>
                                                                <div className="col-3">
                                                                    <div className='d-flex align-items-center '>

                                                                       
                                                                        <div

                                                                            style={
                                                                                {
                                                                                    // // textAlign: 'center',
                                                                                    // fontSize: '12px'
                                                                                }
                                                                            }>
                                                                            <div
                                                                                className={
                                                                                    styles.it2
                                                                                }>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext1
                                                                                    }>
                                                                                    Depart
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext2
                                                                                    }>
                                                                                    {
                                                                                        legDesc.departure.departureLocation
                                                                                    }
                                                                                     <strong className="ms-2 fnt-14">

{

    legDesc.departure.f_time
}


{/* {(legDesc.departure.time instanceof Date) ? legDesc.departure.time.toLocaleTimeString("en-us", options) : 'Invalid date'} */}
</strong>
                                                                                </div>
                                                                                {/* <div
                                                                                    className={
                                                                                        styles.oktext3
                                                                                    }>
                                                                                    {
                                                                                        legDesc.departure.airportName
                                                                                    }
                                                                                </div> */}
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext4
                                                                                    }>
                                                                                    {
                                                                                        legDesc.departure.date
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div></div>

                                                                </div>




                                                                    <div
                                                            className="col-3 for_transform"
                                                            style={{
                                                                alignSelf:
                                                                    'center',
                                                                textAlign:
                                                                    'center',
                                                                fontSize:
                                                                    '14px',
                                                                transform:
                                                                    'translateX(-28px)'
                                                            }}>
                                                            <div>
                                                                <span className={
                                                                    styles.elapsTime
                                                                } >
                                                                    {
                                                                        legDesc.elapsedTimeS
                                                                    }
                                                                </span>
                                                            </div>

                                                            {/* one stop */}

                                                            <div className="flight_stops_info">
                                                                <div className="flight_stop_names">
                                                                    {legDesc.stops.length > 0 ? legDesc.stops.map((value, index) => (
                                                                        <span className="flight_stop_text">
                                                                            {value}
                                                                        </span>
                                                                    )) : 'Non-Stop'}

                                                                </div>
                                                            </div>
                                                        </div>

                                                                <div className="col-3">
                                                                    <div
                                                                        style={
                                                                            {
                                                                                // // textAlign: 'center',
                                                                                // fontSize: '12px'
                                                                            }
                                                                        }>
                                                                        <div
                                                                            className={
                                                                                styles.it1
                                                                            }>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext1
                                                                                }>
                                                                                Arrive
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext2
                                                                                }>
                                                                                {
                                                                                    legDesc.arrival.arrivalLocation
                                                                                }
                                                                                 <strong className="ms-2 fnt-14">
                                                                            {
                                                                                legDesc.arrival.f_time
                                                                            }
                                                                        </strong>
                                                                            </div>
                                                                            {/* <div
                                                                                className={
                                                                                    styles.oktext3
                                                                                }>
                                                                                {
                                                                                    legDesc.arrival.airportName
                                                                                }
                                                                            </div> */}
                                                                            <div
                                                                                className={
                                                                                    styles.oktext4
                                                                                }>
                                                                                {
                                                                                    legDesc.arrival.date
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {/* --------------end rendering part------------------------- */}
                                    </div>
                                    <div
                                        className="card mb-3"
                                        style={{ borderRadius: '16px', border:"none" }}>
                                        <div
                                            className="card-body"
                                            onClick={() =>
                                                setflight_details(
                                                    flight_details
                                                        ? false
                                                        : true
                                                )
                                            }>
                                            <div className="d-flex justify-content-between">
                                                <div
                                                    className={
                                                        styles.discount_info_my
                                                    }>
                                                    Flight Details
                                                </div>
                                                <div
                                                    style={{
                                                        marginRight: '10px',
                                                        alignSelf: 'center'
                                                    }}>
                                                    {flight_details ? (
                                                        <Image
                                                            src={upsolid}
                                                            alt="Picture of the author"
                                                            width={15}
                                                            height={20}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={upsolid1}
                                                            alt="Picture of the author2"
                                                            width={15}
                                                            height={20}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {flight_details ? (
                                            <div
                                                className="row"
                                                style={{ fontSize: '14px' }}>
                                                <nav>
                                                    <div
                                                        className="nav nav-tabs check_out_1"
                                                        id="nav-tab"
                                                        role="tablist">
                                                             <button
                                                            className="nav-link active "
                                                            id="nav-flight-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#nav-flight"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="nav-flight"
                                                            aria-selected="false">
                                                            Flight Details
                                                        </button>
                                                        <button
                                                            className="nav-link "
                                                            id="nav-profile-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#nav-profile"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="nav-profile"
                                                            aria-selected="false">
                                                            BAGGAGE
                                                        </button>
                                                        <button
                                                            className="nav-link"
                                                            id="nav-contact-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#nav-contact"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="nav-contact"
                                                            aria-selected="false">
                                                            POLICY
                                                        </button>
                                                    </div>
                                                </nav>
                                                {/* flight details */}
                                                <div
                                                    className="tab-content"
                                                    id="nav-tabContent">
                                                        <div
                                                        className="tab-pane fade show active"
                                                        id="nav-flight"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-flight-tab">
                                                        <div
                                                            className="card"
                                                            style={{
                                                                border: 'none'
                                                            }}>
                                                            <div className="card-body">
                                                            {selectedFlight.legs.map(
                                                    (legDesc) => (
                                                        
                                                            legDesc.schedules.map((schedule, index) => (
                                                        <div className="col-12">
                                                            <div
                                                                className="row"
                                                                style={{
                                                                    marginTop:
                                                                        '10px',
                                                                    marginBottom:
                                                                        '10px'
                                                                }}>
                                                                {/* <div className="col-2">
                                                                    <Image
                                                                        className=""
                                                                        src={
                                                                            selectedFlight.logo
                                                                        }
                                                                        alt="Picture of the author"
                                                                        width={
                                                                            80
                                                                        }
                                                                        height={
                                                                            80
                                                                        }
                                                                    />
                                                                </div> */}
                                                                 <div  className={
                                                                  styles.oktext33
                                                                                }><h6>{schedule.carrier.airlineName}</h6></div>
                                                                <div className="col-4">
                                                                    <div className='d-flex align-items-center'>

                                                                        <div
                                                                            className=" me-2"
                                                                            style={{
                                                                                textAlign:
                                                                                    'center',
                                                                                fontSize:
                                                                                    '12px'
                                                                            }}>
                                                                            <Image
                                                                                src={
                                                                                    flightico
                                                                                }
                                                                                alt="Picture of the author"
                                                                                width={
                                                                                    20
                                                                                }
                                                                                height={
                                                                                    20
                                                                                }

                                                                            />
                                                                            <div>
                                                                                <span
                                                                                    className={
                                                                                        styles.icotext
                                                                                    }>
                                                                                    {
                                                                                         schedule.carrier.marketingFlightNumber
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div

                                                                            style={
                                                                                {
                                                                                    // // textAlign: 'center',
                                                                                    // fontSize: '12px'
                                                                                }
                                                                            }>
                                                                            <div
                                                                                className={
                                                                                    styles.it2
                                                                                }>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext1
                                                                                    }>
                                                                                    Depart
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext2
                                                                                    }>
                                                                                    {
                                                                                       schedule.departure.airport
                                                                                    }
                                                                                     &nbsp;
                                                                                     <strong className='fnt-14'>
                                                                                    {
                                                                                        schedule.departure.f_time
                                                                                   }
                                                                                    </strong>
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext33
                                                                                    }>
                                                                                        <h6>
                                                                                    {
                                                                                       schedule.departure.airportName
                                                                                    }</h6>
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        styles.oktext4
                                                                                    }>
                                                                                    {
                                                                                   schedule.departure.date
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div></div>

                                                                </div>




                                                              <div
                                                                                                                                                        className="col-4"
                                                                                                                                                        style={{
                                                                                                                                                            alignSelf:
                                                                                                                                                                'center',
                                                                                                                                                            textAlign:
                                                                                                                                                                'center',
                                                                                                                                                            fontSize:
                                                                                                                                                                '14px',
                                                                                                                                                            transform:
                                                                                                                                                                'translateX(-9px)'
                                                                                                                                                        }}>
                                                                                                                                                        <div>
                                                                                                                                                            <span className={
                                                                                                                                                                styles.elapsTime
                                                                                                                                                            }>
                                                                                                                                                                {
                                                                                                                                                                    schedule.elapsedTimeS
                                                                                                                                                                }
                                                                                                                                                            </span>
                                                                                                                                                        </div>
                                                                                                                                                        <div className="flight_stops_info">
                                                                                                                                                            <div className="flight_stop_names">
                                                            
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        <div className='d-flex justify-content-center '>
                                                                                                                                                            <span style={{marginTop:"-4px"}} className='me-1 flight_stop_names'>
                                                                                                                                                                {schedule.stopCount == 0
                                                                                                                                                                    ? 'Non Stop' : schedule.stopCount + ' stops'}
                                                                                                                                                            </span>
                                                                                                                                                            {/* <span className='me-1 stop_font'>via</span><span className='me-1 stop_font'>Kul</span> */}
                                                                                                                                                            {schedule.arrival.dateAdjustment && <div className='day_colr' style={{marginTop:"-4px"}}>{"+" + schedule.arrival.dateAdjustment + (schedule.arrival.dateAdjustment == 1 ? "day" : "days")}</div>}
                                                                                                                                                        </div>
                                                                                                                                                    </div>

                                                                <div className="col-4">
                                                                    <div
                                                                        style={
                                                                            {
                                                                                // // textAlign: 'center',
                                                                                // fontSize: '12px'
                                                                            }
                                                                        }>
                                                                        <div
                                                                            className={
                                                                                styles.it1
                                                                            }>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext1
                                                                                }>
                                                                                Arrive
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext2
                                                                                }>
                                                                                {
                                                                                  schedule.arrival.airport
                                                                                }
                                                                                 &nbsp;
                                                                                                        {/* {schedule.arrival.dateAdjustment && <div>{"+" + schedule.arrival.dateAdjustment + (schedule.arrival.dateAdjustment == 1 ? "day" : "days")}</div>} */}
                                                                                                        <strong className='fnt-14'>
                                                                                                            {
                                                                                                                schedule.arrival.f_time
                                                                                                            }
                                                                                                        </strong>
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext33
                                                                                }>
                                                                                    <h6>
                                                                                {
                                                                                    schedule.arrival.airportName
                                                                                }
                                                                                </h6>
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.oktext4
                                                                                }>
                                                                                {
                                                                                   schedule.arrival.date
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {legDesc.schedules.length > 1 && index != legDesc.schedules.length - 1 && <div className='text-center mt-3'><span className='flight_lay'>Layover time : {get_transit_time(schedule.arrival.date, schedule.arrival.time, legDesc.schedules[index + 1].departure.date, legDesc.schedules[index + 1].departure.time)}</span></div>}
                                                                                   
                                                            </div>
                                                        </div>
                                                    ))
                                                ))}
                                                            </div>
                                                            </div>
                                                            </div>
                                                    <div
                                                        className="tab-pane fade "
                                                        id="nav-profile"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-profile-tab">
                                                        <div
                                                            className="card"
                                                            style={{
                                                                border: 'none'
                                                            }}>
                                                            <div className="card-body">
                                                                <table className="table  table-hover">
                                                                    <thead>
                                                                        <tr
                                                                            className=" "
                                                                            style={{
                                                                                color: 'rgb(16, 183, 177)'
                                                                            }}>
                                                                            <th scope="col">
                                                                                Flight
                                                                            </th>
                                                                            <th scope="col">
                                                                                Cabin
                                                                            </th>
                                                                            <th scope="col">
                                                                                Check
                                                                                In
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {selectedFlight && selectedFlight.legs.map((legDesc, idx) => (
                                                                            <tr>
                                                                                <td>
                                                                                    {
                                                                                        legDesc.departure.departureLocation
                                                                                    }

                                                                                    -
                                                                                    {
                                                                                        legDesc.arrival.arrivalLocation
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    7KG
                                                                                </td>
                                                                                <td>
                                                                                    {selectedFlight.baggageInformation &&
                                                                                        selectedFlight
                                                                                            .baggageInformation
                                                                                            .weight
                                                                                        ? selectedFlight
                                                                                            .baggageInformation
                                                                                            .weight
                                                                                        : selectedFlight.baggageInformation &&
                                                                                            selectedFlight
                                                                                                .baggageInformation
                                                                                                .description1
                                                                                            ? selectedFlight
                                                                                                .baggageInformation
                                                                                                .description1
                                                                                            : ''}
                                                                                    {selectedFlight.baggageInformation &&
                                                                                        selectedFlight
                                                                                            .baggageInformation
                                                                                            .unit
                                                                                        ? selectedFlight
                                                                                            .baggageInformation
                                                                                            .unit
                                                                                        : ''}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="nav-contact"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-contact-tab">
                                                        <div
                                                            className="card"
                                                            style={{
                                                                border: 'none'
                                                            }}>
                                                            <div className="card-body">
                                                                <div>
                                                                    <div className="card-body">
                                                                        <div>
                                                                            <div>
                                                                                <div>
                                                                                    <h6
                                                                                        style={{
                                                                                            borderBottom:
                                                                                                '1px solid rgb(114, 141, 182)',
                                                                                            color: '#27266b'
                                                                                        }}>
                                                                                        {' '}
                                                                                        Cancellation{' '}
                                                                                    </h6>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 600,
                                                                                            color: 'rgb(51, 51, 51)'
                                                                                        }}>
                                                                                        Refund
                                                                                        Amount
                                                                                        =
                                                                                        Paid
                                                                                        Amount
                                                                                        -
                                                                                        Airline's
                                                                                        Cancellation
                                                                                        Fee
                                                                                        -
                                                                                        Admin
                                                                                        Fee{' '}
                                                                                    </p>
                                                                                    <br />
                                                                                    <h6
                                                                                        style={{
                                                                                            borderBottom:
                                                                                                '1px solid rgb(114, 141, 182)',
                                                                                            color: '#27266b'
                                                                                        }}>
                                                                                        {' '}
                                                                                        Re-issue
                                                                                    </h6>
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight: 600,
                                                                                            color: 'rgb(51, 51, 51)'
                                                                                        }}>
                                                                                        Re-issue
                                                                                        Fee
                                                                                        =
                                                                                        Airline's
                                                                                        Charge
                                                                                        Fee
                                                                                        +
                                                                                        Fare
                                                                                        Difference
                                                                                        (If
                                                                                        any)
                                                                                    </p>
                                                                                    <br />
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                'normal'
                                                                                        }}>
                                                                                        *The
                                                                                        airline's
                                                                                        fee
                                                                                        is
                                                                                        indicative
                                                                                        and
                                                                                        per
                                                                                        person.
                                                                                        Convenience
                                                                                        fee
                                                                                        is
                                                                                        non-refundable.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end flight details */}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </>
                            ) : (
                                ''
                            )}

                            <div className='pt-0'  style={{ border: 'none' }}>
                                <div className="card-body pt-0" >
                                <div className={`card ${styles.myfooter}`}>
                                <div
                                    className="card-body pr-0 pl-0"
                                    style={{ padding: '8px' ,paddingBottom:"12px"}}>
                                    <h6 className="mb-0">
                                        Passenger details
                                    </h6>
                                </div>
                            </div>
                                    {/* {selectedFlight.airline_iata === 'EK'&&<div className={styles.margin_bottom11}>
                                        <span
                                            className=" fw-bold"
                                            style={{ padding: '1px' }}>
                                           Your flight will be booked once you click the 'Continue' button. This booking will be valid for the next 20 minutes. Please make the payment and confirm your booking. Otherwise, this booking will be cancelled.
<br/>
For payment, please Call/WhatsApp: +880 1950-011102
Message us:  m.me/NavigatorToursTravel
                                        </span>
                                    </div>} */}
                                    <div className="list-group">
  {allPassengers?.length > 0 ? (
    (() => {
      // Initialize counters for each type
      let adultCount = 0;
      let childCount = 0;
      let infantCount = 0;

      return allPassengers.map((passenger, idx) => {
        if (!passenger || !passenger.pass_type) {
          console.error(`Invalid passenger at index ${idx}:`, passenger);
          return null; // Skip invalid entries
        }

        // Determine the type and increment the respective counter
        let travelerCount;
        if (passenger.pass_type === "adult") {
          travelerCount = ++adultCount;
        } else if (passenger.pass_type === "child") {
          travelerCount = ++childCount;
        } else if (passenger.pass_type === "infant") {
          travelerCount = ++infantCount;
        }

        return (
          <div key={`${passenger.pass_type}-${idx}`}>
            <div key={idx}>
              <a
                className="list-group-item list-group-item-action list-group-item-info travelr_list cgeckb_ox"
                style={{
                  marginTop: "16px",
                  backgroundColor: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <div
                  className="d-flex justify-content-between"
                  onClick={() => toggleFold1(idx)}
                >
                  <span style={{textTransform:"capitalize"}} className={styles.discount_info_my}>
                    {`Traveller ${travelerCount} ${passenger.pass_type}`}
                  </span>{" "}
                  <img
                    className={`${
                      folding1[idx] ? "fold" : "unfold"
                    }`}
                    src="/assets/icons/down_arrow.svg"
                  />
                </div>
              </a>
              {folding1[idx] && (
                <>
                  <div>
                    <Passenger_Details
                      key={`passenger-${idx}`}
                      idx={idx}
                      pass_type={passenger.pass_type}
                      country={selectedFlight.country}
                      passenger={{
                        ...passenger,
                        dateOfBirth: passenger.dateOfBirth,
                      }}
                      errors={errorMessage}
                      onInputChanage={(e, field) =>
                        onInputChanage(
                          e,
                          idx -
                            (passenger.pass_type === "child"
                              ? adultList.length
                              : passenger.pass_type === "infant"
                              ? adultList.length + childrenList.length
                              : 0),
                          field,
                          passenger.pass_type
                        )
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      });
    })()
  ) : (
    <p>No passengers available</p>
  )}
</div>

                                    {/* <div className="list-group">
                                        {adultList &&
                                            adultList.map((passenger, idx) => (
                                                <div key={idx}>
                                                    <a

                                                        className="list-group-item list-group-item-action list-group-item-info travelr_list cgeckb_ox"
                                                        style={{
                                                            marginTop: "16px",
                                                            backgroundColor: "#fff",
                                                            border: "1px solid #fff",
                                                            borderRadius:" 16px 16px 0 0",
                                                        }}>
                                                        <div className="d-flex justify-content-between"
                                                        onClick={() => toggleFold1(idx)}>
                                                            <span
                                                                className={
                                                                    styles.discount_info_my
                                                                }>
                                                                {`Travellers ${idx + 1} Adult`}
                                                            </span>{' '}
                                                            <img   className={`${folding1[idx] ? "fold" : "unfold"}`} src='/assets/icons/down_arrow.svg' />



                                                        </div>
                                                    </a>
                                                    {
                folding1[idx] &&(
                <>
                                                    <div>
                                                        <Passenger_Details
                                                            idx={idx}
                                                            pass_type='adult'
                                                            country={selectedFlight.country}
                                                            errors={errorMessage}
                                                            // passenger={{
                                                            //     ...adultList[0],
                                                            //     dateOfBirth: adultList[0].dateOfBirth // Ensure this is passed
                                                            // }}
                                                            passenger={{
                                                                ...passenger,
                                                                dateOfBirth: passenger.dateOfBirth // Ensure this is passed
                                                            }}
                                                            onInputChanage={(
                                                                e,
                                                                field
                                                            ) =>
                                                                onInputChanage(
                                                                    e,
                                                                    idx,
                                                                    field,
                                                                    'adult'
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    </>)}
                                                </div>
                                            ))}

                                        {childrenList &&
                                            childrenList.map(
                                                (passenger, idx) => (
                                                    <div key={idx}>
                                                        <a

                                                            className="list-group-item list-group-item-action list-group-item-info cgeckb_ox"
                                                            style={{
                                                                marginTop: "16px",
                                                                backgroundColor: "#fff",
                                                                border: "1px solid #fff",
                                                                borderRadius:" 16px 16px 0 0",
                                                            }}  >
                                                            <div className="d-flex justify-content-between"
                                                             onClick={() => toggleFold(idx)}

                                                                >
                                                                <span

                                                                    className={
                                                                        styles.discount_info_my
                                                                    }>
                                                                    {`Travellers ${idx + 1} Child`}
                                                                </span>{' '}
                                                                <img   className={`${folding[idx] ? "fold" : "unfold"}`} src='/assets/icons/down_arrow.svg' />

                                                            </div>
                                                        </a>
                                                        {
                folding[idx] &&(
                <>
                                                        <div>
                                                            <Passenger_Details
                                                                idx={idx}
                                                                pass_type='children'
                                                                country={selectedFlight.country}

                                                                passenger={
                                                                    passenger
                                                                }
                                                                onInputChanage={(
                                                                    e,
                                                                    field
                                                                ) =>
                                                                    onInputChanage(
                                                                        e,
                                                                        idx,
                                                                        field,
                                                                        'child'
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        </>)}
                                                    </div>
                                                )
                                            )}

                                        {infantList &&
                                            infantList.map((passenger, idx) => (
                                                <div key={idx}>
                                                    <a

                                                        className="list-group-item list-group-item-action list-group-item-info cgeckb_ox"
                                                        style={{
                                                            marginTop: "16px",
                                                            backgroundColor: "#fff",
                                                            border: "1px solid #fff",
                                                            borderRadius:" 16px 16px 0 0",
                                                        }}>
                                                        <div className="d-flex justify-content-between"
                                                         onClick={() => toggleFold2(idx)}>
                                                            <span
                                                                className={
                                                                    styles.discount_info_my
                                                                }>
                                                                {`Travellers ${idx + 1} Infant`}
                                                            </span>{' '}
                                                            <img   className={`${folding2[idx] ? "fold" : "unfold"}`} src='/assets/icons/down_arrow.svg' />

                                                        </div>
                                                    </a>
                                                    {
                folding2[idx] &&(
                <>
                                                    <div>
                                                        <Passenger_Details
                                                            idx={idx}
                                                            pass_type='infant'
                                                            country={selectedFlight.country}

                                                            passenger={
                                                                passenger
                                                            }
                                                            onInputChanage={(
                                                                e,
                                                                field
                                                            ) =>
                                                                onInputChanage(
                                                                    e,
                                                                    idx,
                                                                    field,
                                                                    'infant'
                                                                )
                                                            }
                                                        />
                                                    </div></>)}
                                                </div>
                                            ))}
                                    </div> */}
                                    <div
                                        className="card"
                                        style={{ border: 'none' ,backgroundColor:"unset"}}>
                                        <div
                                            className="card-body mb-3 mt-3"
                                            style={{ zIndex: '0',backgroundColor:"#fff", borderRadius:"16px", }}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="flexRadioDefault1">
                                                    I want to apply coupon code
                                                </label>
                                            </div>
                                            <div
                                                className={`input-group ${styles.my_input}`}>
                                                <input
                                                style={{height:"33px"

 }}

                                                    type="text"
                                                    className="form-control form-control-cus"
                                                    placeholder="Apply Promo Code"
                                                    aria-label="promo"
                                                    aria-describedby="button-addon2"
                                                    onChange={(e)=>{setCupon(e.target.value)}}
                                                />
                                                 {show_cupon == true &&
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    id="button-addon2"
                                                    onClick={()=>{removeCoupon()}}
                                                    >
                                                      <img className='img-fluid' width={20} src="/assets/icons/cross_wht.svg" alt="Active Check" />
                                                </button>}
                                                &nbsp;
                                                <button
                                                    className="  btn btn-success cup_btn"
                                                    type="button"
                                                    id="button-addon2"
                                                    onClick={()=>{applyCupon()}}>
                                                    Apply
                                                </button>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="payment-method-selector">

                                        <h6 className='payment_methode_head mb-0'>Payment Method</h6>
                                        <div className="payment-method-buttons gap-3">
                                            {paymentMethods.map(method => (
                                                <button
                                                key={method.value}
                                                className={`payment-method-button ${paymentMethod === method.value ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod(method.value)}
                                                onDoubleClick={() => handleButtonClick(method)}
                                                >
                                                <div className="button-content">
                                                    <div className="button-content">
                                                    <div className="payment-logo me-2">  <img src={method.logo} alt={method.label}   /></div>

                                                    <span>{method.label}</span></div>
                                                    {paymentMethod === method.value && (
                                                    <div className="active-indicator">
                                                    <img className='img_payment' width={20} src="/assets/icons/circle-check-solid (2).svg" alt="Active Check" />
                                                    </div>
                                                )}
                                                </div>

                                                </button>
                                            ))}
                                            </div>

                                        <input type="hidden" id="paymentMethod" value={paymentMethod} />
                                        </div>                                                                                                                     {/* {
                                                                                                                                                            selectedFlight.airline_iata !== 'EK'&& */}
                                                                                                                                                        <div>

                                    </div>
                                    {/* } */}



                                    <button

                                         type="button"
                                        className="login_btn btn w-100 mt-3 con_btn2">
                                        <button
                                            className="login_btn btn w-100"
                                            data-bs-toggle="offcanvas"
                                             data-bs-target="#offcanvasRight"
                                             aria-controls="offcanvasRight"
                                              onClick={handleValidation}          >
                                            {' '}
                                            Continue
                                        </button>
                                    </button>

                                    {isOffcanvasOpen && (
                                    <div
                                    className="offcanvas-backdrop fade show"
                                    onClick={canvashandleClose}
                                    style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        width: "100vw",
                                        height: "100vh",
                                        backgroundColor: "#00000066",
                                        zIndex: 1040,
                                    }}
                                    ></div>
                                )}
                                    <div
                                        className={`offcanvas offcanvas-end ${isOffcanvasOpen ? "show" : ""}`}
                                        data-bs-backdrop="true" tabindex="-1"
                                        style={{ zIndex: 1045 }}
                                        aria-labelledby="offcanvasRightLabel"
                                        tabIndex="-1"
                                    >
                                        <div className="offcanvas-header">
                                            <h5 id="offcanvasRightLabel">Confirm Passenger Details</h5>
                                            <button
                                                type="button"
                                                className="btn-close text-reset"
                                                onClick={canvashandleClose} data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="offcanvas-body">

                                            <div className='row '>
                                                    <div className='col-12'>

                                        {adultList &&
                                            adultList.map((passenger, idx) => {
                                                return (
                                                    <CardPassengerView
                                                        key={idx}
                                                        isFolding={idx === 0}
                                                        passenger={{ type: `Travellers ${idx + 1} Adult`, ...passenger }}
                                                        country={selectedFlight.country}
                                                    />
                                                );
                                            })
                                        }
                                {childrenList &&

                                        childrenList.map(
                                        (passenger, idx) => {
                                        return (
                                            <CardPassengerView
                                                key={idx}
                                                isFolding={idx === 0}
                                                passenger={{ type: `Travellers ${idx + 1} Child`, ...passenger }}
                                                country={selectedFlight.country}
                                            />
                                        );
                                    })
                                }
                                {infantList &&
                                                                            infantList.map((passenger, idx) => {
                                        return (
                                            <CardPassengerView
                                                key={idx}
                                                isFolding={idx === 0}
                                                passenger={{ type: ` Travellers ${idx + 1} Infant`, ...passenger }}
                                                country={selectedFlight.country}
                                            />
                                        );
                                    })
                                }

                                                   </div>
                                             </div>
                                        {isLoading && (
                                        <div className=" loadin_btn d-flex justify-content-center align-items-center">
                                              <br />
                                              <br />
                                        <div className="spinner-border" role="status">
                                        </div>
                                        <br />
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="login_btn btn w-100 mt-3">
                                        <button
                                            className="login_btn btn w-100"
                                            onClick={() => {
                                                create_pnr()
                                            }}
                                            // onClick={handleValidation}

                                            >
                                            {' '}
                                            Confirm & Pay
                                        </button>
                                    </button>
  </div>
</div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {selectedFlight && (
                    <div className="col-sm-4">
                        <div className={`card ${styles.boxshaddo}`}>
                            <div className="card-body">
                                <div className="d-flex justify-content-start">
                                    <div className={styles.image_box}>
                                        <Image
                                            src={selectedFlight.logo}
                                            alt="Picture of the author"
                                            width={80}
                                            height={80}
                                            className="ms-2 me-2"
                                            style={{ height: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <div className="d-flex flex-column ms-2">
                                            <div className="p-1">
                                                <span className={styles.dac1}>
                                                    <img
                                                        className="me-2"
                                                        src="/assets/icons/flight_active.svg"
                                                        alt="Flight"
                                                        width="25"
                                                        height="18"></img>
                                                    Flight
                                                </span>
                                            </div>
                                            <div className="p-1">
                                                <span
                                                    className={
                                                        styles.taxtotall1
                                                    }>
                                                    {
                                                        selectedFlight
                                                            .legDescriptions[0]
                                                            .departureLocation
                                                    }{' '}
                                                    -{' '}
                                                    {
                                                        selectedFlight
                                                            .legDescriptions[0]
                                                            .arrivalLocation
                                                    }
                                                </span>
                                            </div>
                                            <div className="p-1">
                                                <span className={styles.dac}>
                                                    {selectedFlight.tripType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() =>
                                        setshow_pay(show_pay ? false : true)
                                    }>
                                    <div
                                        className={`d-flex justify-content-between ${styles.nderline}`}>
                                        <div> </div>
                                        <div className="rounded-circle ">
                                            {show_pay ? (
                                                <Image
                                                    src={upsolid}
                                                    alt="Picture of the author"
                                                    width={15}
                                                    height={20}
                                                />
                                            ) : (
                                                <Image
                                                    src={upsolid1}
                                                    alt="Picture of the author2"
                                                    width={15}
                                                    height={20}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {show_pay ? (
                                        <div className={`${styles.insidepay}`}>
                                            <h5 className="font-weight-bold">
                                                Fare Summary
                                            </h5>
                                            <div style={{ color: 'darkgray' }}>
                                                <span>
                                                    Infant (
                                                    {
                                                        selectedFlight.infant
                                                            .count
                                                    }{' '}
                                                    Travellers)
                                                </span>
                                                <div className="d-flex justify-content-between">
                                                    <div>Base Fare</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;
                                                            {(
                                                                selectedFlight
                                                                    .infant
                                                                    .totalFare).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Tax</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;
                                                            {(
                                                                selectedFlight
                                                                    .infant
                                                                    .totalTax).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    color: 'darkgray',
                                                    marginTop: '8px'
                                                }}>
                                                <span>
                                                    Child (
                                                    {selectedFlight.child.count}{' '}
                                                    Travellers)
                                                </span>
                                                <div className="d-flex justify-content-between">
                                                    <div>Base Fare</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;{' '}
                                                            {(
                                                                selectedFlight
                                                                    .child
                                                                    .totalFare).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Tax</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;{' '}
                                                            {(
                                                                selectedFlight
                                                                    .child
                                                                    .totalTax).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    color: 'darkgray',
                                                    marginTop: '8px'
                                                }}>
                                                <span>
                                                    Adult ({' '}
                                                    {selectedFlight.adult.count}{' '}
                                                    Travellers)
                                                </span>
                                                <div className="d-flex justify-content-between">
                                                    <div>Base Fare</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;{' '}
                                                            {(
                                                                selectedFlight
                                                                    .adult
                                                                    .totalFare).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div>Tax</div>
                                                    <div>
                                                        <strong>BDT</strong>
                                                        <span>
                                                            {' '}
                                                            &nbsp;{' '}
                                                            {(
                                                                selectedFlight
                                                                    .adult
                                                                    .totalTax).toLocaleString()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.payinfo}>
                                            Sub-Total
                                        </div>
                                        <div className={`${styles.dis} d-flex justify-content-between`}>
                                            <strong>BDT</strong>{' '}
                                            <span className={styles.payinfo}>
                                                {selectedFlight.totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.payinfo}>
                                            Coupon Discount
                                        </div>
                                        <div className={`${styles.dis} d-flex justify-content-between`}>
                                            <strong>BDT</strong>
                                            <span className={styles.payinfo}>
                                                &nbsp; {''}

                                                 {/* {cupon==(selectedFlight.departureLocation === 'DAC' && selectedFlight.arrivalLocation === 'CXB' && total_amount >= 15000) ? Math.ceil(2000).toLocaleString() : selectedFlight.common_discount} */}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.payinfo}>
                                            Discount
                                        </div>
                                        <div className={`${styles.dis} d-flex justify-content-between`}>
                                            <strong>BDT</strong>
                                            {/* <span className={styles.payinfo}> */}
                                            {/* {selectedFlight.country==='BD' && selectedFlight.airline_iata!=='BS'&&<span className={styles.payinfo}> */}
                                                {/* &nbsp;{' '} */}
                                                {/* {(Math.ceil(selectedFlight.common_discount)).toLocaleString()} */}
                                                {/* {(Math.ceil(10)).toLocaleString()} */}
                                                {/* {(Math.ceil(600)).toLocaleString()} */}
                                            {/* </span> */}
                                          {/* </span>} */}

                                          {selectedFlight.country==='BD' &&
                                        //    selectedFlight.airline_iata==='BS' &&
                                            <div>

                                        <span>
                                            &nbsp;{' '}
                                            {/* {paymentMethod !== 'bkash' && paymentMethod !== 'SSLCommerz' ? Math.ceil(600).toLocaleString() : selectedFlight.common_discount} */}
                                            {/* {cupon==(selectedFlight.departureLocation === 'DAC' && selectedFlight.arrivalLocation === 'CXB' && total_amount >= 15000) ? Math.ceil(2000).toLocaleString() : selectedFlight.common_discount} */}
                                            {/* {(Math.ceil(600)).toLocaleString()} */}
                                            {selectedFlight.common_discount}
                                        </span>
                                    </div>}

                                    {
    selectedFlight.country === 'international' && (
        <span className={styles.payinfo}>
            &nbsp;{' '}
            {(
                Math.ceil(
                    // Calculate basefare based on airline
                    selectedFlight.basePrice *
                    (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR' ? 0.15 : 0.12)
                )
            ).toLocaleString()}
        </span>
    )
}
                                          {/* {selectedFlight.country==='international' && selectedFlight.airline_iata==='EK' &&<span className={styles.payinfo}>
                                              &nbsp;{' '}
                                              {(selectedFlight.total_amount+Math.ceil(selectedFlight.common_discount))<100000?5000+(Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )):7000+(Math.ceil(
                                                    selectedFlight.pgw_fee
                                                ))}
                                          </span>} */}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.payinfo}>
                                            NT Convenience Fee
                                        </div>
                                        <div className={`${styles.dis} d-flex justify-content-between`}>
                                            <strong>BDT</strong>
                                            <span className={styles.payinfo}>
                                                &nbsp;{' '}
                                                {
                        paymentMethod === 'bbl'? (Math.ceil(selectedFlight.pgw_fee -                        (selectedFlight.basePrice*0.007))).toLocaleString() :
                        (Math.ceil(selectedFlight.pgw_fee)).toLocaleString()
                                            }
                                                {/* {selectedFlight.country==='international' && selectedFlight.airline_iata==='EK'?<del>{(Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )).toLocaleString()}</del>:(Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )).toLocaleString()} */}
                                                {/* {selectedFlight.country==='international' && (Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )).toLocaleString()} */}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.payinfo}>
                                            AIT Fee
                                        </div>
                                        <div className={`${styles.dis} d-flex justify-content-between`}>
                                            <strong>BDT</strong>
                                            <span className={styles.payinfo}>
                                                &nbsp;{' '}
                                                {(Math.ceil(
                                                    selectedFlight.ait_fee
                                                )).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pay_footer}>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.payinfo}>
                                        <span className={styles.dis1}>
                                            You pay
                                        </span>{' '}
                                        (for {adults + childCount + infants}{' '}
                                        Travellers)
                                    </div>
                                    {/* <div className={styles.dis1}> */}
                                    {/* {selectedFlight.country==='BD' && selectedFlight.airline_iata!=='BS' &&<div className={styles.dis1}>
                                        <strong>BDT</strong> */}
                                        {/* <span>
                                            &nbsp;{' '} */}
                                            {/* {(selectedFlight.total_amount).toLocaleString()} */}
                                            {/* {(selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-10)).toLocaleString()}
                                        </span> */}
                                    {/* </div> */}
                                  {/* </div>} */}

                                  {selectedFlight.country==='BD' &&
                                //   selectedFlight.airline_iata==='BS' &&
                                  <div className={styles.dis1}>
                                      <strong>BDT</strong>
                                      <span>
                                          &nbsp;{' '}
                                          {/* {paymentMethod !== 'bkash' && paymentMethod !== 'SSLCommerz' ? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-600)).toLocaleString() :  (selectedFlight.total_amount).toLocaleString()} */}
                                          {/* {(selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-600)).toLocaleString()} */}
                                          {/* {((selectedFlight.total_amount)).toLocaleString()} */}
                                          {
                paymentMethod === 'bbl'? (Math.ceil(selectedFlight.total_amount -               (selectedFlight.basePrice*0.007))).toLocaleString() :
                (Math.ceil(selectedFlight.total_amount)).toLocaleString()
                                            }
                                      </span>
                                  </div>}

                                  {
    selectedFlight.country === 'international' && (
        <div className={styles.dis1}>
            <strong>BDT</strong>
            <span>
                &nbsp;{' '}
                {
                    paymentMethod === 'bbl'
                        ? (
                            Math.ceil(
                                selectedFlight.total_amount -
                                (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                    ? 0.04
                                    : 0.01) + selectedFlight.basePrice * 0.047)
                            ).toLocaleString()
                        )
                        : (
                            Math.ceil(
                                selectedFlight.total_amount -
                                (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                    ? 0.04
                                    : 0.01) + selectedFlight.basePrice * 0.04)
                            ).toLocaleString()
                        )
                }
            </span>
        </div>
    )
}

                                  {/* {selectedFlight.country==='international' && selectedFlight.airline_iata==='EK' && <div className={styles.dis1}>
                                      <strong>BDT</strong>
                                      <span>
                                          &nbsp;{' '}
                                          {(selectedFlight.total_amount-Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )).toLocaleString()}
                                      </span>
                                  </div>} */}
                                </div>
                                <div
                                    className="d-flex justify-content-between"
                                    style={{
                                        color: '#2e2d80',
                                        fontWeight: 'bold'
                                    }}>
                                    <div>You save</div>
                                    {/* <div> */}
                                    {/* {selectedFlight.country==='BD' &&
                                    selectedFlight.airline_iata!=='BS'&&
                                    <div>
                                        BDT
                                        <span>
                                            &nbsp;{' '} */}
                                            {/* {(Math.ceil(
                                                selectedFlight.common_discount
                                            )).toLocaleString()} */}
                                             {/* {(Math.ceil(
                                            selectedFlight.common_discount
                                            )).toLocaleString()} */}
                                             {/* {(Math.ceil(10)).toLocaleString()}
                                        </span> */}
                                        {/* </div> */}
                                    {/* </div> } */}

                                    {selectedFlight.country==='BD' &&
                                    // selectedFlight.airline_iata==='BS' &&
                                    <div>
                                        BDT
                                        <span>
                                            &nbsp;{' '}
                                            {/* {paymentMethod !== 'bkash' && paymentMethod !== 'SSLCommerz' ? Math.ceil(600).toLocaleString() : selectedFlight.common_discount} */}
                                            {
                paymentMethod === 'bbl'? (Math.ceil(selectedFlight.common_discount +
                (selectedFlight.basePrice*0.007))).toLocaleString() :
                (Math.ceil(selectedFlight.common_discount)).toLocaleString()
                                             }
                                            {/* {selectedFlight.common_discount} */}
                                        </span>
                                    </div>}


                                  {
    selectedFlight.country === 'international' && (
        <div>
            BDT
            <span>
                &nbsp;{' '}
                {
                    paymentMethod === 'bbl'
                        ? (
                            Math.ceil(
                                selectedFlight.basePrice *
                               (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                    ? 0.15
                                    : 0.12) +
                                (selectedFlight.basePrice * 0.007)
                            ).toLocaleString()
                        )
                        : (
                            Math.ceil(
                                selectedFlight.basePrice *
                              (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                    ? 0.15
                                    : 0.12)
                            ).toLocaleString()
                        )
                }
            </span>
        </div>
    )
}
                                    {/* {selectedFlight.country==='international' && selectedFlight.airline_iata==='EK' && <div>
                                        BDT
                                        <span>
                                            &nbsp;{' '}

                                            {selectedFlight.common_discount} + {Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )} = {selectedFlight.common_discount+Math.ceil(
                                                    selectedFlight.pgw_fee
                                                )}
                                        </span>
                                    </div>} */}
                                 </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='col-12 con_btn'>
                     <button

                    type="button"
                    className="login_btn w-100 btn mt-3  ">
                    <button
                    className="login_btn btn w-100"
                    data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        onClick={handleValidation}          >
                    {' '}
                    Continue
                    </button>
                    </button></div>
            </div>
        </Layout>
    )
}
