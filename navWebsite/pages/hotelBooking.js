import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import styles from '../styles/Hotel.module.css'
import HotelContext from '../context/HotelContext'
import AuthContext from '../context/AuthContext'
import { API_HOTEL_URL } from '../config/index'
import 'react-datepicker/dist/react-datepicker.css'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
const options = [
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'india', label: 'India' },
    { value: 'malaysia', label: 'Malaysia' }
]
export default function hotelBooking() {
    const router = useRouter()
    const { id } = router.query
    const [reserve, setReserve] = useState({})
    const [loading, setLoading] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState('')
    const {
        reserveData,
        searchHotel,
        hotelDetails,
        bookData,
        bookingObj,
        bookNow,
        hotelSearchData
    } = useContext(HotelContext)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        bookNow()
    }, [])

    useEffect(() => {
        console.log('bookData', bookData, router.query.id)
        setTimeout(() => {
            const foundObject = bookData.find(
                (item) => item.id == router.query.id
            )
            console.log('foundObject', foundObject)
            setReserve(foundObject)
            console.log('reserve', reserve)
            setLoading(false)
        }, 2000)
    }, [bookData, router.query.id])
    const [selectedOption, setSelectedOption] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [toggler, setToggler] = useState(false)

    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const [isChecked, setIsChecked] = useState(false)
    const [error, setError] = useState('')

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked)
        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isChecked) {
            setError('Please check the box to continue.')
        } else {
            let tranId = Math.floor(Math.random() * 900000) + 100000
            function formatDate(date) {
                const originalDate = new Date(date)
                const day = originalDate.getDate()
                const month = originalDate.getMonth() + 1
                const year = originalDate.getFullYear()
                const convertedDate = `${year}-${month < 10 ? '0' + month : month
                    }-${day < 10 ? '0' + day : day}`
                return convertedDate
            }

            let reqBody = {
                name: user.display_name,
                email: user.email,
                phone: user.phone_no,
                propertyName: reserve.propertyName,
                roomName: reserve.roomName,
                totalRoom: reserve.roomNumber,
                totalDays: reserve.totalDays,
                totalAmount: reserve && reserve.discount > 0
                ? reserve &&
                reserve.totalPricediscounted
                : reserve && reserve.totalfinalPrice,
                checkInDate: formatDate(reserve.check_in_date),
                checkOutDate: formatDate(reserve.check_out_date),
                id: router.query.id,
                partnerId: hotelSearchData.userId,
                noOfRoom: reserve.noOfRoom - reserve.roomNumber,
                transactionId: tranId
            }
            if (paymentMethod === 'Cash') {
                reqBody.paymentMethod = 'Cash'
                fetch(`${API_HOTEL_URL}/ws/bookProperty`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqBody)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if ((data[0][0].resule = '+success')) {
                            alert('Booking successful!')
                            router.push('/myBooking?tab=hotel')
                        }
                    })
                    .catch((error) => console.error(error))
            } else if (paymentMethod === 'Online') {
                reqBody.paymentMethod = 'Online'
                fetch(`${API_HOTEL_URL}/ws/bookProperty`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqBody)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if ((data[0][0].result = '+success')) {
                            let body = {
                                name: user.display_name,
                                paymentMethod: paymentMethod,
                                email: user.email,
                                phone: user.phone_no,
                                propertyName: reserve.propertyName,
                                roomName: reserve.roomName,
                                totalRoom: reserve.roomNumber,
                                totalDays: reserve.totalDays,
                                totalAmount: reserve && reserve.discount > 0
                                ? reserve &&
                                reserve.totalPricediscounted
                                : reserve && reserve.totalfinalPrice,
                                checkInDate: formatDate(reserve.check_in_date),
                                checkOutDate: formatDate(
                                    reserve.check_out_date
                                ),
                                id: router.query.id,
                                partnerId: hotelSearchData.userId,
                                noOfRoom: reserve.noOfRoom - reserve.roomNumber,
                                transactionId: tranId,
                                refId: data[0][0].lastBookId
                            }

                            fetch(`${API_HOTEL_URL}/pay`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(body)
                            })
                                .then((response) => response.json())
                                .then((data) => router.push(data.pmUrl))
                                .catch((error) => console.error(error))
                        }
                    })
            }
        }
    }
    return (
        <Layout>
            {/* Modify Search section */}
            <div className={`${styles.hotel_Booking}  row`}>
                <div className="col-lg-7 col-md-12 col-xl-7 col-sm-12">
                    <div className={`${styles.left_card}`}>
                        <h6>Primary Contact</h6>
                        <form className="mt-4">
                            <div class=" margin_b row">
                                <label
                                    for="staticEmail"
                                    class="col-sm-2 col-form-label">
                                    Name
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        value={user.display_name}
                                        type="text"
                                        class="form-control"
                                        id="staticEmail"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>
                            <div class="margin_b  row">
                                <label
                                    for="staticEmail"
                                    class="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        value={user.email}
                                        type="text"
                                        class="form-control"
                                        id="staticEmail"
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>
                            <div class="margin_b  row">
                                <label
                                    for="inputPassword"
                                    class="col-sm-2 col-form-label">
                                    Phone
                                </label>
                                <div class="col-sm-10">
                                    <input
                                        value={user.phone_no}
                                        type="text"
                                        class="form-control"
                                        id="inputPassword"
                                        placeholder="Your Phone"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5 col-md-12 col-xl-5 col-sm-12">
                    {loading ? (
                        <div className={`${styles.right_card}`}>
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <Skeleton height={20} width={100} />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <div className="d-flex">
                                        <h6>
                                            <Skeleton height={20} width={100} />
                                        </h6>
                                    </div>
                                    <div>
                                        <h5>
                                            {' '}
                                            <Skeleton height={20} width={100} />
                                        </h5>

                                        <span>
                                            <Skeleton height={20} width={100} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h6>
                                {' '}
                                <Skeleton height={20} width={100} />
                            </h6>
                            <div className="d-flex justify-content-between text-center">
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </small>
                                    <h6>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h6>
                                </div>
                            </div>

                            <hr />
                            <p className="mt-3">
                                <Skeleton height={20} width={100} />
                            </p>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={100} />
                                </h6>
                                <h5>
                                    {' '}
                                    <small>
                                        {' '}
                                        <Skeleton
                                            height={20}
                                            width={100}
                                        />{' '}
                                        &nbsp;
                                    </small>
                                    <Skeleton height={20} width={100} />
                                </h5>
                            </div>
                            <hr />
                            <p className="mt-3">
                                {' '}
                                <Skeleton height={20} width={100} />
                            </p>
                            <div className="d-flex ">
                                <div className="d-flex me-4">
                                    <Skeleton height={20} width={100} />
                                    <h5>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h5>
                                </div>
                                <div className="d-flex">
                                    <Skeleton height={20} width={100} />
                                    <h5>
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.right_card}`}>
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    {/* <img
                                    src={
                                        'https://extranet.navigatortechnologies.io' +
                                            reserve && reserve.images
                                    }
                                    alt="..."
                                /> */}
                                    <img
                                        className={`${styles.right_img} img-fluid`}
                                        src="assets/icons/hotel_active.svg"
                                        alt="..."
                                    />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <div className="d-flex">
                                        <h6>Hotel</h6>
                                    </div>
                                    <div>
                                        <h5>
                                            {reserve && reserve.propertyName}
                                        </h5>

                                        <span>
                                            {reserve && reserve.addressLine}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h6>Fare Summary</h6>
                            <div className={`${styles.position_for_responsive} d-flex justify-content-between text-center`}>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        Check In Date and Time
                                    </small>
                                    <h6>
                                        {' '}
                                        {reserve && reserve.check_in_date}
                                        <br></br>{' '}
                                        {reserve && reserve.checkInTime}
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        Check Out Date and Time
                                    </small>
                                    <h6>
                                        {' '}
                                        {reserve && reserve.check_out_date}
                                        <br></br>
                                        {reserve && reserve.checkOutTime}
                                    </h6>
                                </div>
                                <div>
                                    <small className={`${styles.fare_summary}`}>
                                        {' '}
                                        Num of rooms
                                    </small>
                                    <h6>
                                        {reserve && reserve.roomNumber} rooms
                                    </h6>
                                </div>
                            </div>

                            <hr />
                            <p className="mt-3">
                                {reserve && reserve.roomName} (
                                {reserve && reserve.noOfGuest} Adults )
                            </p>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h6>Total Days:</h6>
                                <h6>{reserve && reserve.totalDays} Days</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6>Total Amount:</h6>
                                <h5>
                                    {' '}
                                    <small>BDT &nbsp;</small>
                                    {(reserve && reserve.discount > 0
                                        ? reserve &&
                                        reserve.totalPricediscounted
                                        : reserve && reserve.totalfinalPrice).toLocaleString()}
                                </h5>
                            </div>
                            <hr />
                            <p className="mt-3">Payment Method</p>
                            <div className="d-flex ">
                                {/* <div className="d-flex me-4">
                                    <img
                                        className={`${styles.takaicon} img-fluid me-2`}
                                        src="assets/icons/taka.png"
                                        alt="..."
                                    />{' '}
                                    <h5>Cash</h5>
                                </div>
                                <div className="d-flex">
                                    <img
                                        className={`${styles.takaicon} img-fluid me-2`}
                                        src="assets/icons/favicon.png"
                                        alt="..."
                                    />{' '}
                                    <h5>Online</h5>
                                </div> */}
                                <select
                                    className="form-control"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }>
                                    <option value="">Select</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className={`${styles.checkbox_bg} d-flex`}>
                            <input
                                className={`${styles.checkbox}  me-2`}
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label className={`${styles.level_color}`}>
                                I agree to the <a href='/terms' title='Terms & Condition'>Terms & Condition</a>, <a href='/privacyPolicy' title='Privacy Policy'>Privacy Policy</a>
                                {` and `} <a href='/refund' title='Refund Policy'>Refund Policy</a>
                            </label>
                        </div>
                        {error && (
                            <div className="error text-danger m-2">{error}</div>
                        )}
                        <button
                            type="submit"
                            class="btn btn_primary w-100 mb-4 mt-3">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
