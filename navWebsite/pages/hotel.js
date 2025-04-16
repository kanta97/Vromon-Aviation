import React, { useEffect, useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import styles from '../styles/Hotel.module.css'
import HotelContext from '../context/HotelContext'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import Link from 'next/link'
import Loader from '../components/Loader'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import HotelSearch from '../components/HotelSearch'
import { API_HOTEL_URL } from '../config/index'
export default function hotel() {
    const router = useRouter()
    const { dest, pricePerNight } = router.query
    const [search, setSearch] = useState({})
    const [filter, setFilter] = useState([])
    const [filterVal, setFilterVal] = useState('')
    const [clicked, setClicked] = useState(false)
    const [ratingShow, setRatingShow] = useState([])
    // const [loading, setLoading1] = useState(true)
    const { loading, searchHotel, hotelData, getDestinationSuggestions } =
        useContext(HotelContext)

    useEffect(() => {
        getDestinationSuggestions()
        searchHotel()
    }, [])

    useEffect(() => {
        setFilter(hotelData)
        // setTimeout(() => {

        //     // setLoading1(false)
        // }, 2000)
    }, [hotelData])

    const handleFilter = (event) => {
        setFilterVal(event.target.value)

        if (event.target.value === '') {
            setFilter(hotelData)
        } else {
            const filterResult = hotelData.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            )
            setFilter(filterResult)
        }
        // console.log('filter', filter)

        // console.log('filtervalur', filterVal)
    }
    console.log('Filter data:', filter);

    const handleFilterrating = (rating) => {
        const filterResult = hotelData.filter(
            (product) => product.rating == rating
        )
        setFilter(filterResult)
        console.log('filter', filterResult)

        // console.log('filtervalur', filterVal)
    }

    function handleClick() {
        handleFilter({ target: { value: '' } })
    }

    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedOption1, setSelectedOption1] = useState('')

    const handleOptionClick = (option) => (e) => {
        e.preventDefault()
        setSelectedOption1(option)
    }

    return (
        <Layout>
            {/* modify search */}
            <div className={`${styles.custom_tabs}`}>
                <div className='row g-3'>
                    <div className='col-lg-12 col-xl-10 col-md-12 col-sm-12 mt-0'>
                        <HotelSearch />
                    </div>
                    <div className='col-lg-12 col-xl-2 col-md-12 col-sm-12'>
                        <div className='d-flex justify-content-end align-items-center'>
                            <button
                                onClick={searchHotel}
                                className='btn btn_primary btn_modify_search w-100 h-100 mt-1'
                            >
                                Modify Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modify search end */}
            <div className='row g-3' style={{ marginBottom: '40px' }}>
                <div className={`col-sm-3 ${styles.for_filter_hide}`}>
                    <div className={`card mt-3 ${styles.card_custom}`}>
                        <div className='card-header bg-transparent'>
                            Filters By
                        </div>
                        <div className='card-body  card-footer bg-transparent '>
                            <span className='pb-2'>Property Name</span>
                            <div class='input-group mb-3 mt-2'>
                                <input
                                    type='text'
                                    value={filterVal}
                                    onInput={(event) => handleFilter(event)}
                                    class='form-control'
                                    placeholder='Search Hotel'
                                />
                            </div>
                        </div>

                        <div className='card-body  card-footer bg-transparent'>
                            <span className='pb-2 mb-3'>Rating</span>
                            <br></br>

                            <div className=''>
                                <nav className=' d-flex justify-content-between mb-3 mt-2'>
                                    <div
                                        className='nav nav-tabs'
                                        id='nav-tab'
                                        role='tablist'
                                    >
                                        <button
                                            className='nav-link nav_link me-2'
                                            id='nav-flight-tab'
                                            data-bs-toggle='tab'
                                            data-bs-target='#nav-flight'
                                            type='button'
                                            role='tab'
                                            aria-controls='nav-flight'
                                            aria-selected='true'
                                            onClick={() =>
                                                handleFilterrating(1)
                                            }
                                        >
                                            {' '}
                                            <span className='rating_img1 '></span>{' '}
                                        </button>

                                        <button
                                            className='nav-link nav_link me-2'
                                            id='nav-hotel-tab'
                                            data-bs-toggle='tab'
                                            data-bs-target='#nav-hotel'
                                            type='button'
                                            role='tab'
                                            aria-controls='nav-hotel'
                                            aria-selected='false'
                                            onClick={() =>
                                                handleFilterrating(2)
                                            }
                                        >
                                            {' '}
                                            <span className='rating_img2 '></span>{' '}
                                        </button>
                                        <button
                                            className='nav-link nav_link me-2'
                                            id='nav-package-tab'
                                            data-bs-toggle='tab'
                                            data-bs-target='#nav-package'
                                            type='button'
                                            role='tab'
                                            aria-controls='nav-package'
                                            aria-selected='false'
                                        >
                                            <span
                                                className='rating_img3 '
                                                onClick={() =>
                                                    handleFilterrating(3)
                                                }
                                            ></span>{' '}
                                        </button>
                                        <button
                                            className='nav-link nav_link me-2'
                                            id='nav-visa-tab'
                                            data-bs-toggle='tab'
                                            data-bs-target='#nav-visa'
                                            type='button'
                                            role='tab'
                                            aria-controls='nav-visa'
                                            aria-selected='false'
                                        >
                                            <span
                                                className='rating_img4'
                                                onClick={() =>
                                                    handleFilterrating(4)
                                                }
                                            ></span>
                                        </button>
                                        <button
                                            className='nav-link nav_link me-2'
                                            id='nav-transport-tab'
                                            data-bs-toggle='tab'
                                            data-bs-target='#nav-transport'
                                            type='button'
                                            role='tab'
                                            aria-controls='nav-transport'
                                            aria-selected='false'
                                        >
                                            <span
                                                className='rating_img5'
                                                onClick={() =>
                                                    handleFilterrating(5)
                                                }
                                            ></span>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        {!loading &&
                            hotelData &&
                            hotelData.map(
                                (data, index) =>
                                    index < 1 && (
                                        <div
                                            className={`${styles.Facilities} card-footer bg-transparent `}
                                        >
                                            <div
                                                style={{ borderRadius: '0px' }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                    }}
                                                >
                                                    Facilities
                                                </div>
                                                <div className='card-body'>
                                                    {data.popularFacilities &&
                                                        data.popularFacilities.map(
                                                            (
                                                                facilities,
                                                                index
                                                            ) =>
                                                                index < 3 && (
                                                                    <div className='form-check'>
                                                                        <input
                                                                            className='form-check-input'
                                                                            type='checkbox'
                                                                            value=''
                                                                            id={`flexCheckDefault-${index}`}
                                                                        />
                                                                        <label
                                                                            className='form-check-label'
                                                                            style={{
                                                                                userSelect:
                                                                                    'none',
                                                                            }}
                                                                            for={`flexCheckDefault-${index}`}
                                                                        >
                                                                            {
                                                                                facilities.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                        )}
                                                </div>

                                                <div className='d-flex justify-content-end'>
                                                    {/* <span
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseExample"
                                                        aria-expanded="false"
                                                        aria-controls="collapseExample"
                                                        className="hover-overlay"
                                                        style={{
                                                            color: 'rgb(16, 183, 177)',
                                                            fontSize: '16px',
                                                            padding: '6px',
                                                            cursor: 'pointer'
                                                        }}>
                                                        More
                                                    </span> */}
                                                    <div
                                                        className='collapse'
                                                        id='collapseExample'
                                                    >
                                                        {' '}
                                                        {data.popularFacilities &&
                                                            data.popularFacilities.map(
                                                                (
                                                                    facilities,
                                                                    index
                                                                ) =>
                                                                    index <
                                                                        6 && (
                                                                        <div className='form-check'>
                                                                            <input
                                                                                className='form-check-input'
                                                                                type='checkbox'
                                                                                value=''
                                                                                id='flexCheckDefault'
                                                                            />
                                                                            <label
                                                                                style={{
                                                                                    userSelect:
                                                                                        'none',
                                                                                }}
                                                                                className='form-check-label'
                                                                                for='flexCheckDefault'
                                                                            >
                                                                                {
                                                                                    facilities.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                            )}{' '}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className=''
                                                style={{ borderRadius: '0px' }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                    }}
                                                >
                                                    Amenities
                                                </div>
                                                <div className='card-body  bg-transparent '>
                                                    {data.roomAmenities &&
                                                        data.roomAmenities.map(
                                                            (
                                                                amenities,
                                                                index
                                                            ) =>
                                                                index < 6 && (
                                                                    <div className='form-check'>
                                                                        <input
                                                                            className='form-check-input'
                                                                            type='checkbox'
                                                                            value=''
                                                                            id={`flexCheckDefault-amenities-${index}`}
                                                                        />
                                                                        <label
                                                                            style={{
                                                                                userSelect:
                                                                                    'none',
                                                                            }}
                                                                            className='form-check-label'
                                                                            for={`flexCheckDefault-amenities-${index}`}
                                                                        >
                                                                            {
                                                                                amenities.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                        )}
                                                </div>
                                                {/* <div className="d-flex justify-content-end">
                                                    <span
                                                        className="hover-overlay"
                                                        style={{
                                                            color: 'rgb(16, 183, 177)',
                                                            fontSize: '16px',
                                                            padding: '6px',
                                                            cursor: 'pointer'
                                                        }}>
                                                        More
                                                    </span>
                                                </div> */}
                                            </div>

                                            <div className='p-3 d-flex justify-content-center'>
                                                <button
                                                    onClick={handleClick}
                                                    className='btn btn_primary w-100'
                                                >
                                                    Reset Filters
                                                </button>
                                            </div>
                                        </div>
                                    )
                            )}
                    </div>
                </div>
                <div className='col-sm-9'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className=''>
                                <h6
                                    className={`bg-white mt-3 round-3 p-2 ${styles.card_header}`}
                                >
                                    Destination: {filter.length} properties
                                    found
                                </h6>
                            </div>
                            {/* {loading && <Loader />} */}

                            {loading ? (
                                <>
                                    <div
                                        className={`card mt-3 ${styles.card_custom}`}
                                    >
                                        <div class='row p-3'>
                                            <div class='col-12  col-lg-5 col-xl-5 '>
                                                <Skeleton height={230} />
                                            </div>
                                            <div class='col-12  col-lg-7 col-xl-7'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div
                                                        className={`${styles.mr_t} d-flex justify-content-between align-items-center`}
                                                    ></div>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <h4></h4>
                                                    </div>
                                                </div>

                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        {' '}
                                                        <Skeleton
                                                            height={20}
                                                            width={40}
                                                        />{' '}
                                                        &nbsp;
                                                        <Skeleton
                                                            height={20}
                                                            width={60}
                                                        />
                                                    </div>
                                                    <Skeleton
                                                        height={20}
                                                        width={60}
                                                    />
                                                </div>

                                                <div
                                                    className={`${styles.facilities} d-flex justify-content-between mt-2`}
                                                >
                                                    <Skeleton
                                                        height={20}
                                                        width={200}
                                                    />
                                                </div>
                                                <div
                                                    className={`${styles.facilities} d-flex justify-content-between mt-2`}
                                                >
                                                    <Skeleton
                                                        height={20}
                                                        width={220}
                                                    />
                                                    <Skeleton
                                                        height={20}
                                                        width={60}
                                                    />
                                                </div>

                                                <div className=' d-flex justify-content-start mt-3'>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;{' '}
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                </div>
                                                <div className=' d-flex justify-content-start mt-2'>
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={80}
                                                    />{' '}
                                                    &nbsp; &nbsp;{' '}
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                </div>
                                                <div className=' d-flex justify-content-end mt-3'>
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`card mt-3 ${styles.card_custom}`}
                                    >
                                        <div class='row p-3'>
                                            <div class='col-12  col-lg-5 col-xl-5 '>
                                                <Skeleton height={230} />
                                            </div>
                                            <div class='col-12  col-lg-7 col-xl-7'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div
                                                        className={`${styles.mr_t} d-flex justify-content-between align-items-center`}
                                                    ></div>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <h4></h4>
                                                    </div>
                                                </div>

                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex'>
                                                        {' '}
                                                        <Skeleton
                                                            height={20}
                                                            width={40}
                                                        />{' '}
                                                        &nbsp;
                                                        <Skeleton
                                                            height={20}
                                                            width={60}
                                                        />
                                                    </div>
                                                    <Skeleton
                                                        height={20}
                                                        width={60}
                                                    />
                                                </div>

                                                <div
                                                    className={`${styles.facilities} d-flex justify-content-between mt-2`}
                                                >
                                                    <Skeleton
                                                        height={20}
                                                        width={200}
                                                    />
                                                </div>
                                                <div
                                                    className={`${styles.facilities} d-flex justify-content-between mt-2`}
                                                >
                                                    <Skeleton
                                                        height={20}
                                                        width={220}
                                                    />
                                                    <Skeleton
                                                        height={20}
                                                        width={60}
                                                    />
                                                </div>

                                                <div className=' d-flex justify-content-start mt-3'>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;{' '}
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                </div>
                                                <div className=' d-flex justify-content-start mt-2'>
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                    <Skeleton
                                                        height={20}
                                                        width={80}
                                                    />{' '}
                                                    &nbsp; &nbsp;{' '}
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                </div>
                                                <div className=' d-flex justify-content-end mt-3'>
                                                    <Skeleton
                                                        height={20}
                                                        width={90}
                                                    />{' '}
                                                    &nbsp; &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                filter &&
                                filter.map((data) => (
                                    <div
                                        key={data.id}
                                        className={`card mt-3 ${styles.card_custom}`}
                                    >
                                        <div class='row p-3'>
                                            <div class='col-12  col-lg-5 col-xl-5 '>
                                                {data.thumbnail &&
                                                    data.thumbnail.map(
                                                        (img) => (
                                                            <img
                                                                className={`${styles.hotel_img} img-fluid`}
                                                                src={
                                                                    API_HOTEL_URL +
                                                                    img.url
                                                                }
                                                                alt='...'
                                                            />
                                                        )
                                                    )}
                                            </div>
                                            <div class='col-12  col-lg-7 col-xl-7'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div
                                                        className={`${styles.mr_t} d-flex justify-content-between align-items-center`}
                                                    >
                                                        <button
                                                            className={`${styles.btn_outline} btn  me-2`}
                                                        >
                                                            Hotel
                                                        </button>
                                                        <div className='d-flex'></div>

                                                        {data.rating == 1 ? (
                                                            <>
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                            </>
                                                        ) : data.rating == 2 ? (
                                                            <>
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                            </>
                                                        ) : data.rating == 3 ? (
                                                            <>
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />{' '}
                                                            </>
                                                        ) : data.rating == 4 ? (
                                                            <>
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />{' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                            </>
                                                        ) : data.rating == 5 ? (
                                                            <>
                                                                {' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />{' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />{' '}
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                    style={{
                                                                        color: '#10b7b1',
                                                                    }}
                                                                />{' '}
                                                            </>
                                                        ) : null}
                                                    </div>
                                                    <div className={`${styles.mr_t} d-flex  justify-content-between  align-items-center`}>
                                                        {data.room_avaibility && (
                                                            <h4 className='mr_t  mb-0'>
                                                                {' '}
                                                                <span>
                                                                    BDT
                                                                </span>{' '}
                                                                {data.pricePerNight.toLocaleString()}
                                                            </h4>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${styles.hotel_name} d-flex justify-content-between align-items-center`}
                                                >
                                                    <div>
                                                        <h4> {data.name}</h4>

                                                        <div className='d-flex'>
                                                            <img
                                                                src='assets/icons/location.svg'
                                                                className={`${styles.icon} me-1`}
                                                            />
                                                            <a
                                                                href='#'
                                                                class='location-link'
                                                            >
                                                                {data.address}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className='d-inline-block align-items-end text-end'>
                                                        <div
                                                            className={`${styles.note}`}
                                                        >
                                                            for 1 Night, per
                                                            room
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.facilities} mt-2`}
                                                >
                                                    {data.popularFacilities &&
                                                        data.popularFacilities.map(
                                                            (
                                                                facilities,
                                                                index
                                                            ) =>
                                                                index < 8 &&
                                                                facilities.value && (
                                                                    <span
                                                                        class={`${styles.facility_tag}`}
                                                                    >
                                                                        {
                                                                            facilities.name
                                                                        }
                                                                    </span>
                                                                )
                                                        )}
                                                </div>

                                                {data?.room_avaibility ==
                                                true ? (
                                                    <>
                                                        <div className='d-flex justify-content-end mt-3'>
                                                            <Link
                                                                href={
                                                                    '/hotelDetails?userId=' +
                                                                    data.userId
                                                                }
                                                            >
                                                                <button className='btn btn_primary text-right'>
                                                                    Book Now
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='d-flex justify-content-end mt-3'>
                                                            <p
                                                                style={{
                                                                    fontSize: 14,
                                                                    textAlign:
                                                                        'left',
                                                                }}
                                                            >
                                                                <img
                                                                    style={{
                                                                        width: 25,
                                                                        height: 25,
                                                                    }}
                                                                    src='/assets/icons/disclaimer.png'
                                                                />{' '}
                                                                Dear customer We
                                                                apologize! This
                                                                room is not
                                                                available. On
                                                                your selected
                                                                date.
                                                            </p>
                                                        </div>
                                                        <div className="d-flex flex-column align-items-end mt-2">
                                                        <Link
                                                            href={{
                                                            pathname: '/hotelContactus',
                                                            query: {
                                                                name: data?.name,
                                                                pricePerNight:
                                                                data?.name === "Hotel Sea Palace"
                                                                    ? ""
                                                                    : data?.name === "Hotel Kollol By J&Z Group"
                                                                    ? "BDT 5,500"
                                                                    : data?.name === "Hotel Star Pacific"
                                                                    ? ""
                                                                    : data?.name === "Hotel Sea Crown"
                                                                    ? "BDT 5,000"
                                                                    : data?.name === "Sea Pearl Beach Resort & Spa Coxs Bazar"
                                                                    ? "BDT 8,300"
                                                                    : data?.name === "Best Western Heritage"
                                                                    ? "BDT 5,500"
                                                                    : data?.name === "Seagull Hotels Ltd"
                                                                    ? ""
                                                                    : data?.name === "Hotel The Cox Today"
                                                                    ? "BDT 8,700"
                                                                    : "Default Price",
                                                            },
                                                            }}
                                                        >
                                                            <button className="btn btn_primary btn_modify_search">I'm interested</button>
                                                        </Link>
                                                        <div className="mt-2">
                                                            {
                                                            data?.name === "Hotel Sea Palace"
                                                                ? ""
                                                                : data?.name === "Hotel Kollol By J&Z Group"
                                                                ? "BDT 5,500"
                                                                : data?.name === "Hotel Star Pacific"
                                                                ? ""
                                                                : data?.name === "Hotel Sea Crown"
                                                                ? "BDT 5,000"
                                                                : data?.name === "Sea Pearl Beach Resort & Spa Coxs Bazar"
                                                                ? "BDT 8,300"
                                                                : data?.name === "Best Western Heritage"
                                                                ? "BDT 5,500"
                                                                : data?.name === "Seagull Hotels Ltd"
                                                                ? ""
                                                                : data?.name === "Hotel The Cox Today"
                                                                ? "BDT 8,700"
                                                                : "Default Price"
                                                            }
                                                        </div>
                                                        <button disabled className="btn mt-2">
                                                            Book Now
                                                        </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <button
                type='button'
                className={`btn  ${styles.scroll_btn}`}
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
            >
                <FontAwesomeIcon
                    icon={faFilter}
                    style={{
                        color: '#fff',
                    }}
                />{' '}
                Filter
            </button>

            <div
                className='modal fade mt-5'
                id='exampleModal'
                tabIndex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog modal-dialog-centered mt-5'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>
                                Filter
                            </h5>

                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <div className={`card  ${styles.card_custom}`}>
                                <div className=''>
                                    <h6
                                        className={`bg-white  round-3 p-2 ${styles.card_header}`}
                                    >
                                        Destination: {filter.length} properties
                                        found
                                    </h6>
                                </div>
                                <div className='card-body  card-footer bg-transparent '>
                                    <span className='pb-2'>Property Name</span>
                                    <div class='input-group mb-3 mt-2'>
                                        <input
                                            type='text'
                                            value={filterVal}
                                            onInput={(event) =>
                                                handleFilter(event)
                                            }
                                            class='form-control'
                                            placeholder='Search Hotel'
                                        />
                                    </div>
                                </div>

                                <div className='card-body  card-footer bg-transparent'>
                                    <span className='pb-2 mb-3'>Rating</span>
                                    <br></br>

                                    <div className=''>
                                        <nav className=' d-flex justify-content-between mb-3 mt-2'>
                                            <div
                                                className='nav nav-tabs'
                                                id='nav-tab'
                                                role='tablist'
                                            >
                                                <button
                                                    className='nav-link nav_link me-2'
                                                    id='nav-flight-tab'
                                                    data-bs-toggle='tab'
                                                    data-bs-target='#nav-flight'
                                                    type='button'
                                                    role='tab'
                                                    aria-controls='nav-flight'
                                                    aria-selected='true'
                                                    onClick={() =>
                                                        handleFilterrating(1)
                                                    }
                                                >
                                                    {' '}
                                                    <span className='rating_img1 '></span>{' '}
                                                </button>

                                                <button
                                                    className='nav-link nav_link me-2'
                                                    id='nav-hotel-tab'
                                                    data-bs-toggle='tab'
                                                    data-bs-target='#nav-hotel'
                                                    type='button'
                                                    role='tab'
                                                    aria-controls='nav-hotel'
                                                    aria-selected='false'
                                                    onClick={() =>
                                                        handleFilterrating(2)
                                                    }
                                                >
                                                    {' '}
                                                    <span className='rating_img2 '></span>{' '}
                                                </button>
                                                <button
                                                    className='nav-link nav_link me-2'
                                                    id='nav-package-tab'
                                                    data-bs-toggle='tab'
                                                    data-bs-target='#nav-package'
                                                    type='button'
                                                    role='tab'
                                                    aria-controls='nav-package'
                                                    aria-selected='false'
                                                >
                                                    <span
                                                        className='rating_img3 '
                                                        onClick={() =>
                                                            handleFilterrating(
                                                                3
                                                            )
                                                        }
                                                    ></span>{' '}
                                                </button>
                                                <button
                                                    className='nav-link nav_link me-2'
                                                    id='nav-visa-tab'
                                                    data-bs-toggle='tab'
                                                    data-bs-target='#nav-visa'
                                                    type='button'
                                                    role='tab'
                                                    aria-controls='nav-visa'
                                                    aria-selected='false'
                                                >
                                                    <span
                                                        className='rating_img4'
                                                        onClick={() =>
                                                            handleFilterrating(
                                                                4
                                                            )
                                                        }
                                                    ></span>
                                                </button>
                                                <button
                                                    className='nav-link nav_link me-2'
                                                    id='nav-transport-tab'
                                                    data-bs-toggle='tab'
                                                    data-bs-target='#nav-transport'
                                                    type='button'
                                                    role='tab'
                                                    aria-controls='nav-transport'
                                                    aria-selected='false'
                                                >
                                                    <span
                                                        className='rating_img5'
                                                        onClick={() =>
                                                            handleFilterrating(
                                                                5
                                                            )
                                                        }
                                                    ></span>
                                                </button>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                                {!loading &&
                                    hotelData &&
                                    hotelData.map(
                                        (data, index) =>
                                            index < 1 && (
                                                <div
                                                    className={`${styles.Facilities} card-footer bg-transparent `}
                                                >
                                                    <div
                                                        style={{
                                                            borderRadius: '0px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                padding: '10px',
                                                            }}
                                                        >
                                                            Facilities
                                                        </div>
                                                        <div className='card-body'>
                                                            {data.popularFacilities &&
                                                                data.popularFacilities.map(
                                                                    (
                                                                        facilities,
                                                                        index
                                                                    ) => (
                                                                        <div className='form-check'>
                                                                            <input
                                                                                className='form-check-input'
                                                                                type='checkbox'
                                                                                value=''
                                                                                id='flexCheckDefault'
                                                                            />
                                                                            <label
                                                                                className='form-check-label'
                                                                                for='flexCheckDefault'
                                                                            >
                                                                                {
                                                                                    facilities.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>

                                                    <div
                                                        className=''
                                                        style={{
                                                            borderRadius: '0px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                padding: '10px',
                                                            }}
                                                        >
                                                            Amenities
                                                        </div>
                                                        <div className='card-body  bg-transparent '>
                                                            {data.roomAmenities &&
                                                                data.roomAmenities.map(
                                                                    (
                                                                        amenities,
                                                                        index
                                                                    ) => (
                                                                        <div className='form-check'>
                                                                            <input
                                                                                className='form-check-input'
                                                                                type='checkbox'
                                                                                value=''
                                                                                id='flexCheckDefault'
                                                                            />
                                                                            <label
                                                                                className='form-check-label'
                                                                                for='flexCheckDefault'
                                                                            >
                                                                                {
                                                                                    amenities.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>

                                                    <div className='p-3 d-flex justify-content-center'>
                                                        <button
                                                            onClick={
                                                                handleClick
                                                            }
                                                            className='btn btn_primary w-100'
                                                        >
                                                            Reset Filters
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
