import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Hotel.module.css'
import FsLightbox from 'fslightbox-react'
import HotelContext from '../context/HotelContext'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import Link from 'next/link'
import Loader from '../components/Loader'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { API_HOTEL_URL } from '../config/index'

import { faCheck, faSquare, faStar } from '@fortawesome/free-solid-svg-icons'
const options = [
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'india', label: 'India' },
    { value: 'malaysia', label: 'Malaysia' }
]
export default function hotelDetails() {
    const router = useRouter()
    // console.log('router obj', router.query)

    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState('')

    const [data, setData] = useState([])
    const [details, setDeatails] = useState([])

    const {
        searchHotel,
        hotelDetails,
        bookData,
        bookNow,
        hotelData,
        hotelSugg,
        hotelsearchBtn,
        startDate,
        endDate,
        onChange,
        destination,
        selectedOption,
        hotelSearchData
    } = useContext(HotelContext)

    useEffect(() => {
        hotelSearchData.userId = router.query.userId
        bookNow(router.query.userId)
    }, [router.query.userId])
    useEffect(() => {
        setTimeout(() => {
            setData(bookData)
            setLoading(false)
        }, 2000)
    }, [bookData])
    // console.log("data check ", data)
    useEffect(() => {
        setTimeout(() => {
            setDeatails(hotelDetails)
            setLoading(false)
        }, 2000)
    }, [hotelDetails])
    // console.log("details check ", details)
    const [toggler, setToggler] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedOption1, setSelectedOption1] = useState('')

    const [imageGallery, setImageGallery] = useState([])

    const handleOptionClick = (option) => (e) => {
        e.preventDefault()
        setSelectedOption1(option)
    }

    return (
        <Layout>
            {/* lightbox imagess */}
            {!loading &&
                hotelDetails &&

                <div className="row">
                    <FsLightbox
                        toggler={toggler}
                        sources={imageGallery}
                    />
                </div>
            }
            {/* View Room section */}

            {/* {loading && <Loader />} */}
            {loading ? (
                <div className={`${styles.hotel_details}  row`}>
                    <div className="col-lg-6 col-12 col-xl-6 col-sm-8 col-md-8">
                        <div>
                            <div
                                id="carouselExampleControls"
                                class="carousel slide"
                                data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div
                                        class="carousel-item active"
                                        data-bs-interval="5000">
                                        <Skeleton height={314} width={519} />
                                    </div>
                                    <div
                                        class="carousel-item"
                                        data-bs-interval="5000">
                                        <Skeleton height={314} width={519} />
                                    </div>
                                    <div
                                        class="carousel-item"
                                        data-bs-interval="5000">
                                        <Skeleton height={314} width={519} />
                                    </div>
                                </div>
                                <button
                                    class="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="prev">
                                    <span
                                        class="carousel-control-prev-icon"
                                        aria-hidden="true"></span>
                                    <span class="visually-hidden">
                                        Previous
                                    </span>
                                </button>
                                <button
                                    class="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleControls"
                                    data-bs-slide="next">
                                    <span
                                        class="carousel-control-next-icon"
                                        aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" col-12  col-lg-2  col-xl-2 col-sm-4 col-md-4">
                        <div className={`${styles.small_img}`}>
                            <>
                                <Skeleton height={100} width={150} />
                                <Skeleton height={100} width={150} />
                                <Skeleton height={100} width={150} />
                            </>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4  col-xl-4 col-sm-12 col-md-12">
                        {' '}
                        <div
                            className={`${styles.mr_t} d-flex justify-content-start align-items-center`}>
                            <button
                                className={`${styles.btn_outline} btn  me-2`}>
                                Hotel
                            </button>
                            <Skeleton height={20} width={100} />
                        </div>
                        <div
                            className={`${styles.hotel_name} d-flex justify-content-between align-items-center`}>
                            <div>
                                <h4 className="mt-1">
                                    <Skeleton height={20} width={150} />
                                </h4>
                                <div className="d-flex me-3 ">
                                    <img
                                        src="assets/icons/location.svg"
                                        className={`${styles.icon} me-1`}
                                    />
                                    <a href="#" class="location-link mb-2">
                                        <Skeleton height={20} width={150} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="map">
                            <Skeleton height={20} width={150} />
                        </div>
                        <div className={`${styles.facilities} mt-5`}>
                            <span class={`${styles.facility_tagvv} `}>
                                <Skeleton height={20} width={300} count={5} />
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                details &&
                details.map((data) => (
                    <div className={`${styles.hotel_details}  row`}>
                        <div className="col-lg-6 col-12 col-xl-6 col-sm-8 col-md-8">
                            <div>
                                <div
                                    id="carouselExampleControls"
                                    class="carousel slide"
                                    data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <div
                                            class="carousel-item active"
                                            data-bs-interval="5000">
                                            <img
                                                onClick={() => {

                                                    hotelDetails.map((data_, i) => {

                                                        var img = [];

                                                        data_.images.map((item) => {

                                                            img.push(<img
                                                                className="img-fluid"
                                                                src={API_HOTEL_URL + item.url}
                                                                alt="Logo"
                                                            />);
                                                        })

                                                        setImageGallery(img);
                                                    })

                                                    setToggler(!toggler)
                                                }}

                                                className={`${styles.big_img} img-fluid`}
                                                src={
                                                    API_HOTEL_URL +
                                                    data.images[0].url
                                                }
                                                alt="Logo"
                                            />
                                        </div>
                                        <div
                                            class="carousel-item"
                                            data-bs-interval="5000">
                                            <img
                                                onClick={() => {

                                                    hotelDetails.map((data_, i) => {

                                                        var img = [];

                                                        data_.images.map((item) => {

                                                            img.push(<img
                                                                className="img-fluid"
                                                                src={API_HOTEL_URL + item.url}
                                                                alt="Logo"
                                                            />);
                                                        })

                                                        setImageGallery(img);
                                                    })

                                                    setToggler(!toggler)
                                                }}
                                                className={`${styles.big_img} img-fluid`}
                                                src={
                                                    API_HOTEL_URL +
                                                    data.images[1].url
                                                }
                                                alt="Logo"
                                            />
                                        </div>
                                        <div
                                            class="carousel-item"
                                            data-bs-interval="5000">
                                            <img
                                                onClick={() => {

                                                    hotelDetails.map((data_, i) => {

                                                        var img = [];

                                                        data_.images.map((item) => {

                                                            img.push(<img
                                                                className="img-fluid"
                                                                src={API_HOTEL_URL + item.url}
                                                                alt="Logo"
                                                            />);
                                                        })

                                                        setImageGallery(img);
                                                    })

                                                    setToggler(!toggler)
                                                }}
                                                className={`${styles.big_img} img-fluid`}
                                                src={
                                                    API_HOTEL_URL +
                                                    data.images[0].url
                                                }
                                                alt="Logo"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        class="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="prev">
                                        <span
                                            class="carousel-control-prev-icon"
                                            aria-hidden="true"></span>
                                        <span class="visually-hidden">
                                            Previous
                                        </span>
                                    </button>
                                    <button
                                        class="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleControls"
                                        data-bs-slide="next">
                                        <span
                                            class="carousel-control-next-icon"
                                            aria-hidden="true"></span>
                                        <span class="visually-hidden">
                                            Next
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=" col-12  col-lg-2  col-xl-2 col-sm-4 col-md-4">
                            <div className={`${styles.small_img}`}>
                                <img
                                    onClick={() => setToggler(!toggler)}
                                    className={styles.package_img}
                                    src={API_HOTEL_URL + data.images[0].url}
                                    alt="Logo"
                                />
                                <img
                                    onClick={() => setToggler(!toggler)}
                                    className={styles.package_img}
                                    src={API_HOTEL_URL + data.images[1].url}
                                    alt="Logo"
                                />
                                <img
                                    onClick={() => setToggler(!toggler)}
                                    className={styles.package_img}
                                    src={API_HOTEL_URL + data.images[1].url}
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-4  col-xl-4 col-sm-12 col-md-12">
                            {' '}
                            <div
                                className={`${styles.mr_t} d-flex justify-content-start align-items-center`}>
                                <button
                                    className={`${styles.btn_outline} btn  me-2`}>
                                    Hotel
                                </button>
                                {data.rating == 1 ? (
                                    <>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                    </>
                                ) : data.rating == 2 ? (
                                    <>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                    </>
                                ) : data.rating == 3 ? (
                                    <>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />{' '}
                                    </>
                                ) : data.rating == 3 ? (
                                    <>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />{' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                    </>
                                ) : data.rating == 5 ? (
                                    <>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />{' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />{' '}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            style={{
                                                color: '#fec620'
                                            }}
                                        />{' '}
                                    </>
                                ) : null}
                            </div>
                            <div
                                className={`${styles.hotel_name} d-flex justify-content-between align-items-center`}>
                                <div>
                                    <h4 className="mt-1">{data.name}</h4>
                                    <div className="d-flex me-3 ">
                                        <img
                                            src="assets/icons/location.svg"
                                            className={`${styles.icon} me-1`}
                                        />
                                        <a href="#" class="location-link mb-2">
                                            {data.address}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="map">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.271654499815!2d${data.lng}!3d${data.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1672573425608!5m2!1sen!2sbd`}
                                    width="100%"
                                    height="100"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            {/* <h6 className="mb-2">What's Nearby</h6>
                            <div className={`d-flex me-3 ${styles.hotel_name}`}>
                                <img
                                    src="assets/icons/location.svg"
                                    className={`${styles.icon} me-1`}
                                />
                                <a href="#" class="location-link">
                                    {data.address}
                                </a>
                            </div> */}
                            {/* <div className={`${styles.hotel_name}`}>
                                <img
                                    src="assets/icons/location.svg"
                                    className={`${styles.icon} me-1`}
                                />
                                <a href="#" class="location-link">
                                    Ukhia, Cox's Bazar
                                </a>
                            </div> */}
                            <div className={`${styles.facilities} mt-2`}>
                                {data.popularFacilities &&
                                    data.popularFacilities.map(
                                        (facilities, index) =>
                                            index < 6 && (
                                                <span
                                                    class={`${styles.facility_tag}`}>
                                                    {facilities.name}
                                                </span>
                                            )
                                    )}
                            </div>
                        </div>
                    </div>
                ))
            )}
            {/* Room Details Section */}

            <div>
                {/* {loading && <Loader />} */}

                {loading ? (
                    <div className={`${styles.custom_Details}`}>
                        <div className=" row g-3 mt-2 mb-2">
                            <div className="col-lg-4 col-xl-4  col-sm-12 col-12">
                                {/* images */}

                                <div>
                                    <div className={`${styles.room_img_big}`}>
                                        <Skeleton height={126} width={340} />
                                    </div>

                                    <div
                                        className={`${styles.room_img} d-flex`}>
                                        <>
                                            <Skeleton height={70} width={165} />
                                            &nbsp;&nbsp;
                                            <Skeleton height={70} width={170} />
                                        </>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8 col-xl-8  col-sm-12 col-12">
                                <div className="d-flex justify-content-between">
                                    <h4>
                                        {' '}
                                        <Skeleton height={20} width={200} />
                                    </h4>

                                    <button
                                        className={`btn ${styles.btn_outlineihj2v} `}
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        {' '}
                                        <Skeleton height={20} width={100} />
                                    </button>
                                </div>
                                <h6>
                                    {' '}
                                    <Skeleton height={20} width={200} />{' '}
                                </h6>

                                <div className={` row ${styles.table_box} `}>
                                    <div className="col-lg-3 col-xl-3 col-md-3 col-12">
                                        <div
                                            className={` ${styles.table_head} `}>
                                            {' '}
                                            <Skeleton height={20} width={100} />
                                        </div>
                                        <ul className={`${styles.table_list}`}>
                                            <li>
                                                <span>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-3 col-xl-3 col-md-3 col-12 text-md-center text-sm-start">
                                        <div
                                            className={` ${styles.table_head} `}>
                                            {' '}
                                            <Skeleton height={20} width={100} />
                                        </div>
                                        &nbsp;{' '}
                                        <Skeleton height={20} width={100} />
                                    </div>
                                    <div className="text-md-center col-lg-3 col-xl-3 col-md-3 col-12 text-sm-start">
                                        <div
                                            className={` ${styles.table_head} `}>
                                            {' '}
                                            <Skeleton height={20} width={100} />
                                        </div>

                                        <small>
                                            <Skeleton height={20} width={100} />
                                        </small>
                                        <div className="d-flex  justify-content-sm-start justify-content-md-end">
                                            <h5
                                                className={`${styles.table_text} `}>
                                                <Skeleton
                                                    height={20}
                                                    width={100}
                                                />
                                            </h5>{' '}
                                            <h6
                                                className={`${styles.table_text2} ms-1 text-decoration-line-through`}>
                                                <Skeleton
                                                    height={20}
                                                    width={100}
                                                />
                                            </h6>
                                        </div>
                                        <h4>
                                            <Skeleton height={20} width={100} />
                                        </h4>
                                    </div>
                                    <div className="col-lg-3 col-xl-3 col-md-3 col-12 d-flex align-items-end  justify-content-end">
                                        <Link href="">
                                            <Skeleton height={20} width={100} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    data &&
                    data.map((data) => (

                        <div className={`${styles.custom_Details}`}>
                            <div className=" row g-3 ">
                                <div className="col-lg-4 col-xl-4  col-sm-12 col-12">
                                    {/* images */}

                                    <div>
                                        <div
                                            className={`${styles.room_img_big}`}>
                                            <img
                                                onClick={() => {

                                                    var img = [];

                                                    data.images.map((item) => {

                                                        img.push(<img
                                                            className="img-fluid"
                                                            src={API_HOTEL_URL + item.url}
                                                            alt="Logo"
                                                        />);
                                                    })

                                                    setImageGallery(img);

                                                    setToggler(!toggler)

                                                }}
                                                className="img-fluid mb-2 "
                                                src={
                                                    data.images && data.images[0] ? API_HOTEL_URL + data.images[0].url : API_HOTEL_URL + data.images[0].url
                                                }

                                            />
                                        </div>

                                        <div
                                            className={`${styles.room_img} d-flex`}>
                                            <img
                                                onClick={() => {

                                                    var img = [];

                                                    data.images.map((item) => {

                                                        img.push(<img
                                                            className="img-fluid"
                                                            src={API_HOTEL_URL + item.url}
                                                            alt="Logo"
                                                        />);
                                                    })

                                                    setImageGallery(img);

                                                    setToggler(!toggler)

                                                }}
                                                className="img-fluid mb-2 me-2"
                                                src={
                                                    data.images && data.images[1] ? API_HOTEL_URL + data.images[1].url : API_HOTEL_URL + data.images[0].url
                                                }

                                            />
                                            <img
                                                onClick={() => {

                                                    var img = [];

                                                    data.images.map((item) => {

                                                        img.push(<img
                                                            className="img-fluid"
                                                            src={API_HOTEL_URL + item.url}
                                                            alt="Logo"
                                                        />);
                                                    })

                                                    setImageGallery(img);

                                                    setToggler(!toggler)

                                                }}
                                                className="img-fluid mb-2 "
                                                src={
                                                    data.images && data.images[2] ? API_HOTEL_URL + data.images[2].url : API_HOTEL_URL + data.images[0].url
                                                }

                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-8 col-xl-8  col-sm-12 col-12">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='hotel_head'>{data.roomName}</h4>

                                        <button
                                            className={`btn ${styles.btn_outlineihj2} btn-outline-info`}
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                            {' '}
                                            Facilities & Aminities
                                        </button>
                                    </div>
                                    <h6 className='hotel_head'>{data.noOfGuest} Person 1 Child </h6>

                                    <div
                                        className={` row ${styles.table_box} `}>
                                        <div className="col-lg-3 col-xl-3 col-md-3 col-12">
                                            <div
                                                className={` ${styles.table_head} `}>
                                                {' '}
                                                Benefits
                                            </div>
                                            <ul
                                                className={`${styles.table_list}`}>
                                                <li>
                                                    Smoking Allowed:{' '}
                                                    <span>
                                                        {data.haveSmokingPolicy}
                                                    </span>
                                                </li>
                                                <li>
                                                    Parking Allowed:{' '}
                                                    <span>
                                                        {data.haveParking}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3 col-xl-3 col-md-3 col-12 text-md-center text-sm-start">
                                            <div
                                                className={` ${styles.table_head} `}>
                                                {' '}
                                                Room(s)
                                            </div>
                                            {data.roomNumber} &nbsp;rooms
                                        </div>
                                        <div className="text-md-center col-lg-3 col-xl-3 col-md-3 col-12 text-sm-start">
                                            {
                                                data?.room_availability == true ?
                                                    <>
                                                        <div
                                                            className={` ${styles.table_head} `}>
                                                            {' '}
                                                            Price per night
                                                        </div>

                                                        <small>
                                                            Price per night as low as
                                                        </small>
                                                        {data.discount > 0 && (
                                                            <div className="d-flex  justify-content-sm-start justify-content-md-end">
                                                                <h5
                                                                    className={`${styles.table_text} `}>
                                                                    {data.discount}% OFF
                                                                </h5>{' '}
                                                                <h6
                                                                    className={`${styles.table_text2} ms-1 text-decoration-line-through`}>
                                                                    BDT{' '}
                                                                    {(data && data.discount > 0
                                                                        ? data &&
                                                                        data.pricePerNight
                                                                        : data && data.totalPrice).toLocaleString()}
                                                                </h6>
                                                            </div>)}
                                                        {/* {data.totalPricediscounted} */}
                                                        <h4>BDT &nbsp;
                                                            {(data && data.discount > 0
                                                                ? data &&
                                                                data.pricePerNightdiscounted
                                                                : data && data.totalPrice).toLocaleString()}


                                                        </h4>
                                                    </>
                                                    :
                                                    <>


                                                        <p
                                                            style={{
                                                                fontSize: 14,
                                                                textAlign: 'left'
                                                            }}
                                                        >
                                                            <img
                                                                style={{ width: 25, height: 25 }}
                                                                src='/assets/icons/disclaimer.png' /> Dear customer We apologize! This room is not available. On your selected date.
                                                        </p>
                                                    </>
                                            }

                                            {/* {data && data.discount > 0
                                                    ? data && data.pricePerNightdiscounted
                                                    : data && data.totalPrice !== 0 && data.totalPrice
                                                } */}
                                        </div>

                                        {
                                            data?.room_availability == true ?
                                                <>
                                                    <div className="col-lg-3 col-xl-3 col-md-3 col-12 d-flex align-items-end  justify-content-end">
                                                        <Link
                                                            href={
                                                                '/hotelBooking?id=' +
                                                                data.id
                                                            }>
                                                            <button className="btn btn_primary">
                                                                Reserve
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="col-lg-3 col-xl-3 col-md-3 col-12 d-flex align-items-end  justify-content-end">

                                                        <button
                                                            disabled
                                                            style={{ backgroundColor: "#f5f5f5", color: "#000" }} className="btn"
                                                        >
                                                            Reserve
                                                        </button>
                                                    </div>
                                                </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div
                className="modal fade bd-example-modal-lg mt-5"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className=" modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-4">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Amenities & Facilities
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        {!loading &&
                            bookData &&
                            bookData.map(
                                (data, index) =>
                                    index < 1 && (
                                        <div className="modal-body">
                                            <h5 className="m-0 ml-3 mt-1">
                                                Facilities
                                            </h5>
                                            <div className="container modal_details">
                                                <div className="row">
                                                    {data.popularFacilities &&
                                                        data.popularFacilities.map(
                                                            (
                                                                facilities,
                                                                index
                                                            ) => (
                                                                <div className="col-md-3 col-sm-6 mt-3">
                                                                    <span>
                                                                        <FontAwesomeIcon
                                                                            className="me-2"
                                                                            icon={
                                                                                faCheck
                                                                            }
                                                                            style={{
                                                                                color: '#10b7b1'
                                                                            }}
                                                                        />
                                                                        {
                                                                            facilities.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                            <h5 className="m-0 ml-3  mt-3">
                                                Amenities
                                            </h5>
                                            <div className="container modal_details">
                                                <div className="row">
                                                    {data.roomAmenities &&
                                                        data.roomAmenities.map(
                                                            (
                                                                roomAmenities,
                                                                index
                                                            ) => (
                                                                <div className="col-md-3 col-sm-6 mt-3">
                                                                    <span>
                                                                        <FontAwesomeIcon
                                                                            className="me-2"
                                                                            icon={
                                                                                faCheck
                                                                            }
                                                                            style={{
                                                                                color: '#10b7b1'
                                                                            }}
                                                                        />
                                                                        {
                                                                            roomAmenities.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                            <h5 className="m-0 ml-3 mt-3">
                                                Room Size
                                            </h5>
                                            <div className="container modal_details">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-6 mt-3">
                                                        <span>
                                                            <FontAwesomeIcon
                                                                className="me-2"
                                                                icon={faSquare}
                                                                style={{
                                                                    color: '#10b7b1'
                                                                }}
                                                            />
                                                            {data.roomSize}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="m-0 ml-3 mt-3">
                                                Meals
                                            </h5>
                                            <div className="container modal_details">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-6 mt-2">
                                                        {data.mealData &&
                                                            data.mealData.map(
                                                                (
                                                                    mealData,
                                                                    index
                                                                ) => (
                                                                    <table className="table table-striped table-bordered table-hover w-100">
                                                                        <tr>
                                                                            <th>
                                                                                Meal
                                                                                Name
                                                                            </th>
                                                                            <th>
                                                                                Meal
                                                                                Type
                                                                            </th>
                                                                            <th>
                                                                                Meal
                                                                                Available
                                                                            </th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                {
                                                                                    mealData.mealName
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    mealData.mealType
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    mealData.isMealAvailable
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn_primary"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
