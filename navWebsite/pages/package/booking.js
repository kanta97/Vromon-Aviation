import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../components/Layout'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'

import styles from '../../styles/Package.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquare, faStar, faExclamationCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/AuthContext'
import PackageContext from '../../context/PackageContext'
import { API_TRIP_URL } from '../../config'
import Modal from 'react-modal';
import moment from 'moment'

export default function booking() {
    const router = useRouter()
    const { user } = useContext(AuthContext)
    const {
        packageDetails,
        bookingData,
        setBookingData,
        bookPackage,
        afterPackBookData,
        promoCode, setPromoCode,
        discount, setDiscount,
        checkPromoCode
    } = useContext(PackageContext)

    const [mgsPopup, setMgsPopup] = useState(false)
    const [mgsPopupSuc, setMgsPopupSuc] = useState(false)
    const [reDr, setReDr] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push(`/login?redirectUrl=package/${packageDetails.data?.id}`)
        }
    }, [user])

    useEffect(() => {
        if (afterPackBookData.data) {
            if (afterPackBookData.data.status === '200 OK') {
                if (bookingData.paymentMode === 'CASH') {
                    setMgsPopupSuc(true)
                } else {
                    router.push(afterPackBookData.data.body.GatewayPageURL)
                }
            }
        }
    }, [afterPackBookData.data])

    useEffect(() => {
        if (reDr) {
            router.push('/myBooking?tab=package')
        }
    }, [reDr])

    const selfBookingHandler = (value) => {
        if (value) {
            setBookingData({
                ...bookingData,
                travelerName: user.display_name,
                email: user.email,
                mobileNo: user.phone_no
            })
        } else {
            setBookingData({
                ...bookingData,
                travelerName: '',
                email: '',
                mobileNo: ''
            })
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (packageDetails.data.minimum_number_people > bookingData.totalTraveler) {
            setMgsPopup(true)
            return
        }

        try {
            await bookPackage(user)
        } catch (error) {
            console.error('Booking error:', error)
        }
    }

    useEffect(() => {
        if (packageDetails.data?.tourTypeDetails?.[0]?.price) {
            setBookingData({
                ...bookingData,
                totalCost: (
                    packageDetails.data.tourTypeDetails[0].price * (
                        bookingData.adult * 1 +
                        0.75 * bookingData.noOfChildWithBed +
                        0.5 * bookingData.noOfChildOutBed
                    ) * (1 - discount / 100)
                )
            })
        }
    }, [discount, bookingData.adult, bookingData.noOfChildWithBed, bookingData.noOfChildOutBed, packageDetails.data?.tourTypeDetails])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            inset: "35% auto auto 50%",
            right: 'auto',
            bottom: 'auto',
            border: "1px solid rgb(16, 183, 177)",
            marginRight: '-50%',
            borderRadius: 10,
            transform: 'translate(-50%, -50%)',
        },
    }

    Modal.setAppElement('#__next')

    return (
        <Layout>

        <Modal

            isOpen={mgsPopup}
            style={customStyles}
        >

            <div style={{ minWidth: 150, maxWidth: "100%", textAlign: 'center' }}>

                <div style={{
                    fontSize: 45
                }}>
                    <FontAwesomeIcon
                        icon={
                            faExclamationCircle
                        }
                        style={{
                            color: 'red'
                        }}
                    />
                </div>

                <div style={{
                    fontSize: 23, fontWeight: "bold", display: 'none'
                }}>
                    Wrong!
                </div>

                <div style={{
                    marginBottom: 15,
                    fontSize: 16, fontWeight: "bold"
                }}>Minimum traveler required {packageDetails
                    .data
                    ?.minimum_number_people}</div>


                <button style={{
                    border: 1,
                    background: "#2e2d80",
                    borderRadius: 15,
                    color: 'white',
                    fontSize: 13,
                    paddingLeft: 15, paddingTop: 2, paddingRight: 15, paddingBottom: 2
                }}
                    onClick={() => {
                        setMgsPopup(false);
                    }}
                >
                    Close
                </button>


            </div>
        </Modal>

        <Modal
            isOpen={mgsPopupSuc}
            style={customStyles}
        >

            <div style={{ minWidth: 150, maxWidth: "100%", textAlign: 'center' }}>

                <div style={{
                    fontSize: 50
                }}>
                    <FontAwesomeIcon
                        icon={
                            faCircleCheck
                        }
                        style={{
                            color: '#2e2d80'
                        }}
                    />
                </div>

                <div style={{
                    fontSize: 23, fontWeight: "bold"
                }}>
                    Great!
                </div>


                <div style={{
                    marginBottom: 15,
                    fontSize: 16, fontWeight: "bold"
                }}>Package Booking successful</div>


                <button style={{
                    border: 1,
                    background: "#2e2d80",
                    borderRadius: 15,
                    color: 'white',
                    fontSize: 13,
                    paddingLeft: 15, paddingTop: 5, paddingRight: 15, paddingBottom: 5
                }}
                    onClick={() => {
                        setMgsPopupSuc(false);
                        setReDr(true);
                    }}
                >
                    Close
                </button>


            </div>
        </Modal>

        <form
            onSubmit={(e) => {
                submitHandler(e)
            }}>
            <div className={`${styles.hotel_Booking} row`}>
                <div className="col-lg-7 col-md-12 col-xl-7 col-sm-12">
                    <div  className={`${styles.left_card}`}>
                    <h4>COMPLETE YOUR BOOKING</h4>
                    <h5>Booking Details</h5>
                    <p className="mb-0">
                        Please fill up the below forms carefully to book
                        your tour successfully
                    </p>
                  
                    </div>
                    <div className={`${styles.left_card}`}>
                        <div className='d-flex justify-content-between align-items-center'>
                        <h6>Primary Contact</h6>
                        <div class="form-check" style={{marginTop:"-8px"}}>
                        <input
                        style={{border:"2px solid #2e2d80"}}
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                            onChange={(e) =>
                                selfBookingHandler(e.target.checked)
                            }
                        />
                        <label class="form-check-label pt-2" for="exampleCheck1">
                        <h6 className='mb-0'>This booking is for me</h6>
                            
                        </label></div>
                    </div>
                        <div className="mt-1 row passenger_de ">
                            <div class=" col-md-6 col-sm-12">
                                <label
                                    for="staticEmail"
                                    class=" col-form-label">
                                    Name
                                </label>
                                <div class="">
                                    <input
                                        required
                                        type="text"
                                        class="form-control form-control_pac form-control-cus "
                                        id="staticEmail"
                                        placeholder="Your Name"
                                        value={bookingData.travelerName}
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                travelerName: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div class=" col-md-6 col-sm-12">
                                <label
                                    for="staticEmail"
                                    class="col-form-label">
                                    Tour Type
                                </label>
                                <div class="">
                                    <select
                                     
                                        required
                                        class="form-select form-control_pac"
                                        aria-label="Default select example"
                                        value={bookingData.tourType}
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                tourType: e.target.value
                                            })
                                        }}>
                                        {/* <option value="">Select</option> */}
                                        {Array.isArray(packageDetails.data.tourTypeDetails) && packageDetails.data.tourTypeDetails.map(
                                            (item, index) => (
                                                <option
                                                    value={item.tour_type}>
                                                    {item.tour_type}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <label
                                    for="staticEmail"
                                    class="col-form-label">
                                    Email
                                </label>
                                <div class="">
                                    <input
                                        required
                                        type="text"
                                        class="form-control form-control_pac form-control-cus"
                                        id="staticEmail"
                                        placeholder="Your Email"
                                        value={bookingData.email}
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                email: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div class=" col-md-6 col-sm-12">
                                <label
                                    for="inputPassword"
                                    class=" col-form-label">
                                    Phone
                                </label>
                                <div class="">
                                    <input
                                        required
                                        type="text"
                                        class="form-control form-control_pac form-control-cus"
                                        id="inputPassword"
                                        placeholder="Your Phone"
                                        value={bookingData.mobileNo}
                                        onChange={(e) => {
                                            setBookingData({
                                                ...bookingData,
                                                mobileNo: e.target.value
                                            })
                                        }}
                                    />{' '}
                                    <small style={{fontSize:"12px"}}>
                                        {' '}
                                        {/* (Enter your mobile no. with country
                                        code. Example: 8801943XXXXXX) */}
                                           (Example: 8801943XXXXXX)
                                    </small>
                                </div>
                            </div>
                            {/* <h6>Number of Travelers</h6> */}
                          
                                <div className="col-md-6 col-sm-12">
                                    <label
                                        for="inputPassword"
                                        class=" col-form-label">
                                        Total Adults
                                    </label>
                                    <div class="">
                                        <input
                                            required
                                            type="number"
                                            class="form-control w-100 form-control_pac form-control-cus"
                                            id="inputPassword"
                                            placeholder="Travelers"
                                            onInvalid={(e) => {
                                                e.target.setCustomValidity("Minimum adult 1")
                                            }}
                                            onInput={(e) => {
                                                e.target.setCustomValidity("")
                                            }}
                                            min={1}
                                            value={
                                                bookingData.adult
                                            }
                                            onChange={(e) => {
                                                setBookingData({
                                                    ...bookingData,
                                                    totalTraveler: parseInt(e.target.value.trim() == "" ? 0 : e.target.value) +
                                                        parseInt(bookingData.noOfChildWithBed) +
                                                        parseInt(bookingData.noOfChildOutBed),
                                                    adult:
                                                        e.target.value,
                                                    totalCost:
                                                        (packageDetails.data
                                                            .tourTypeDetails[0]
                                                            .price * (e.target.value * 1 +
                                                                (0.75 * bookingData.noOfChildWithBed) +
                                                                (0.5 * bookingData.noOfChildOutBed)) *
                                                            (1 - discount / 100.00))

                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label
                                        for="inputPassword"
                                        class=" col-form-label">
                                        Children With Bed
                                    </label>
                                    <div class="">
                                        <input
                                            required
                                            type="number"
                                            class="form-control form-control_pac w-100 form-control-cus"
                                            id="inputPassword"
                                            min={0}
                                            placeholder="Children With Bed"
                                            value={
                                                bookingData.noOfChildWithBed
                                            }
                                            onChange={(e) => {
                                                setBookingData({
                                                    ...bookingData,
                                                    totalTraveler: parseInt(bookingData.adult) +
                                                        parseInt(e.target.value.trim() == "" ? 0 : e.target.value) +
                                                        parseInt(bookingData.noOfChildOutBed),
                                                    noOfChildWithBed:
                                                        e.target.value,
                                                    totalCost:
                                                        (packageDetails.data
                                                            .tourTypeDetails[0]
                                                            .price * (bookingData.adult * 1 +
                                                                (0.75 * e.target.value) +
                                                                (0.5 * bookingData.noOfChildOutBed)) *
                                                            (1 - discount / 100.00))
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label
                                        for="inputPassword"
                                        class=" col-form-label">
                                        Children Without Bed
                                    </label>
                                    <div class="">
                                        <input
                                            required
                                            type="number"
                                            class="form-control w-100 form-control_pac form-control-cus"
                                            id="inputPassword"
                                            min={0}
                                            placeholder="Children Without Bed"
                                            value={
                                                bookingData.noOfChildOutBed
                                            }
                                            onChange={(e) => {
                                                setBookingData({
                                                    ...bookingData,
                                                    totalTraveler: parseInt(bookingData.adult) +
                                                        parseInt(bookingData.noOfChildWithBed) +
                                                        parseInt(e.target.value.trim() == "" ? 0 : e.target.value),
                                                    noOfChildOutBed:
                                                        e.target.value,
                                                    totalCost:
                                                        (packageDetails.data
                                                            .tourTypeDetails[0]
                                                            .price * (bookingData.adult * 1 +
                                                                (0.75 * bookingData.noOfChildWithBed) +
                                                                (0.5 * e.target.value)) *
                                                            (1 - discount / 100.00))
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                           
                        </div>
                    </div>{' '}
                    <div className={`${styles.right_card}`}>
                        <p className="mt-2 mb-2">
                            *At most one child with bed can stay in a room
                        </p>
                        <p className="mt-2 mb-2">
                            *At most one child without bed can stay in a
                            room
                        </p>
                        <p className="mt-2 mb-2">
                            *Children aged from 0-1 years will bear no cost
                        </p>
                        <p className="mt-2 mb-2">
                            *Children aged from 2-5 years will bear 50% cost
                            of an adult and can stay in the same bed with
                            parents
                        </p>
                        <p className="mt-2 mb-2">
                            *Children aged from 6-10 years will bear 75%
                            cost of an adult and can stay in the same room
                            with parents in extra bed
                        </p>
                        <p className="mt-2 mb-2">
                            *People aged from 11 years and above will be
                            treated as adults
                        </p>
                    </div>
                </div>
                {/* {Object.keys(foundObject).map((key) => ( */}
                <div className="col-lg-5 col-md-12 col-xl-5 col-sm-12">
                    <div className={`${styles.right_card}`}>
                        <h6 className='mb-3'>Booking Summary</h6>
                        <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
    <img src="/assets/icons/travelWalk.png" className='mb-1' width={24} alt="..."/>
  </div>
  <div class="flex-grow-1 ms-3">
  <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <div className="d-flex">
                                    <span>
                                        {bookingData.tourType} Package
                                    </span>
                                </div>
                                <div>
                                    <h5 className='change_package_name'>{packageDetails.data.name}</h5>

                                    <span>
                                        {packageDetails.data.destination}
                                    </span>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-5">
                                <img
                                    className={`${styles.right_img} img-fluid`}
                                    src={`${API_TRIP_URL}/${packageDetails.data.media && packageDetails.data.media[0].path}`}
                                    alt={API_TRIP_URL}
                                />
                            </div>
                        </div>
  </div>
</div>
                       
                        
                        <div class="d-flex align-items-center ">
  <div class="flex-shrink-0">
  <img src="/assets/icons/calendar.svg" width={24} alt="..."/>
  </div>
  <div class="flex-grow-1 ms-3">
  <div className="d-flex justify-content-start  align-items-center">
                            <div className='me-2'>
                                {/* <small className={`${styles.fare_summary}`}>
                                    {' '}
                                    Start Date
                                </small> */}
                                <h6 className='mb-0'> {bookingData.journeyDate}</h6> 
                            </div>
                            <div className=''>
                                 -
                            </div>
                            <div className='ms-2'>
                                {/* <small className={`${styles.fare_summary}`}>
                                    {' '}
                                    End Date
                                </small> */}
                                <h6 className='mb-0'> {bookingData.returnDate == "" ?
                                    moment(bookingData.journeyDate).add(
                                        packageDetails
                                            .data
                                            .duration_day - 1, "days").format("yyyy-MM-DD")
                                    : bookingData.returnDate}
                                </h6>
                            </div>
                        </div>
  </div>
</div>
                      
                      
                        <div class="d-flex align-items-center mt-3">
  <div class="flex-shrink-0">
  <img src="/assets/icons/users.svg" width={24} alt="..."/>
  </div>
  <div class="flex-grow-1 ms-3">
  <div className="d-flex justify-content-between">
                            <h6>Total Travelers</h6>
                            <h6 className="ms-3">{bookingData.totalTraveler} </h6>
                        </div>
                        <div >
                            <span>
                                {bookingData.adult} Adult,{' '}
                                {bookingData.noOfChildWithBed} Children with
                                bed,
                            </span>{' '}
                            <br></br>
                            <span>
                                {bookingData.noOfChildOutBed} Children
                                without bed
                            </span>
                        </div>
  </div>
</div>
                       
                        <br />
                        <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <img src="/assets/icons/bfTaka.svg" width={24} alt="..."/>
  </div>
  <div class="flex-grow-1 ms-3">
  <div className="d-flex justify-content-between align-items-center">
                            <h6>Costs</h6>
                            <h6>BDT {bookingData.totalCost.toLocaleString()} </h6>
                        </div>
                        <p className='mb-0'>
                            BDT{' '}
                            {packageDetails && Array.isArray(packageDetails.data.tourTypeDetails) && packageDetails.data.tourTypeDetails[0].price.toLocaleString()} X
                            {bookingData.adult}
                        </p>
  </div>
</div>
                       
                        <br />
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control form-control_pac form-control-cus"
                                placeholder="Enter Promo Code"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={promoCode}
                                onChange={(e) => {
                                    setPromoCode(e.target.value)
                                }}
                            />
                            <span
                                class="input-group-text btn btn_primary"
                                id="basic-addon2"
                                onClick={() => {

                                    checkPromoCode();

                                }}
                            >
                                Verify
                            </span>
                        </div>{' '}
                        <br />
                        <p className="">Payment Method</p>
                        <select
                            required
                            class="form-select form-control_pac form-control-cus"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setBookingData({
                                    ...bookingData,
                                    paymentMode: e.target.value
                                })
                            }}>
                            <option value="">Select</option>
                            <option value="CASH">Cash</option>
                            <option value="SSLCOMMERZ">Online Payment</option>
                        </select>
                        <div className={`${styles.checkbox_bg} d-flex checkbox_container mt-3`}>
        <input
            required
            className={`${styles.checkbox} me-2`}
            type="checkbox"
            id="customCheckbox"
        />
        <label htmlFor="customCheckbox" className='arncor_color'>
            I agree to the <a href='/terms' title='Terms & Condition'>Terms & Condition</a>, <a href='/privacyPolicy' title='Privacy Policy'>Privacy Policy</a>
            {` and `} <a href='/refund' title='Refund Policy'>Refund Policy</a>
        </label>
    </div>
                    </div>
         


                    <button
                    style={{borderRadius:"12px"}}
                        type="submit"
                        class="btn btn_primary w-100 mb-4 mt-4">
                        Confirm Order 
                    </button>
                </div>{' '}
            </div>
        </form>
    </Layout >
    )
}
