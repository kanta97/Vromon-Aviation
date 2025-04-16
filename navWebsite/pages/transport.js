import React, { useEffect, useState, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import styles from '../styles/Transport.module.css'
import HotelContext from '../context/HotelContext'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import Link from 'next/link'
import Loader from '../components/Loader'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const options = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Rajshahi', label: 'Rajshahi' }
]
export default function transportPage() {
    const [selectedOption, setSelectedOption] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [toggler, setToggler] = useState(false)

    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const router = useRouter()

    return (
        <Layout>
            {/* modify search */}
            <div className={`${styles.custom_tabs}`}>
                <div className="row g-3">
                    <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 col-12">
                        <div className="form_secelct_option me-2 w-100">
                            <div className="form_select">
                                <level className="text-uppercase">
                                    Pick-up Location
                                </level>
                                <div className="marge active">
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />
                                    {/* <div className="value">Dhaka</div> */}
                                    <div className="sub-value">Bangladesh</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12">
                        <div className="form_secelct_option me-2 w-100">
                            <div className="form_select">
                                <level className="text-uppercase">
                                    Drop-off Location
                                </level>
                                <div className="marge active">
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />
                                    {/* <div className="value">Dhaka</div> */}
                                    <div className="sub-value">Bangladesh</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-4 col-md-12 col-sm-12">
                        <div
                            className="btn-group w-100 h-100 button-travel"
                            role="group"
                            aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-primary-date">
                                <div className="form_select_btn w-100 h-100 text-start">
                                    <level className="text-uppercase">
                                        Pick-up Date & Drop-off Date
                                    </level>
                                    <div className="">
                                        <DatePicker
                                            renderCustomHeader={({
                                                monthDate,
                                                customHeaderCount,
                                                decreaseMonth,
                                                increaseMonth
                                            }) => (
                                                <div>
                                                    <h6 className="">
                                                        {' '}
                                                        Select Date
                                                    </h6>
                                                    <button
                                                        aria-label="Previous Month"
                                                        className={
                                                            'react-datepicker__navigation react-datepicker__navigation--previous'
                                                        }
                                                        style={
                                                            customHeaderCount ===
                                                                1
                                                                ? {
                                                                    visibility:
                                                                        'hidden'
                                                                }
                                                                : null
                                                        }
                                                        onClick={decreaseMonth}>
                                                        <span
                                                            className={
                                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                                            }>
                                                            {'<'}
                                                        </span>
                                                    </button>
                                                    <span className="react-datepicker__current-month">
                                                        {monthDate.toLocaleString(
                                                            'en-US',
                                                            {
                                                                month: 'long',
                                                                year: 'numeric'
                                                            }
                                                        )}
                                                    </span>
                                                    <button
                                                        aria-label="Next Month"
                                                        className={
                                                            'react-datepicker__navigation react-datepicker__navigation--next'
                                                        }
                                                        style={
                                                            customHeaderCount ===
                                                                0
                                                                ? {
                                                                    visibility:
                                                                        'hidden'
                                                                }
                                                                : null
                                                        }
                                                        onClick={increaseMonth}>
                                                        <span
                                                            className={
                                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                                                            }>
                                                            {'>'}
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                            selected={startDate}
                                            monthsShown={2}
                                            selectsRange
                                            onChange={onChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            dateFormat="MMM d, yyyy"
                                        />
                                        <div className="sub-value">Sunday</div>
                                    </div>
                                </div>
                            </button>

                            {/* <button
                                type="button"
                                className="btn btn-primary-date">
                                <div className="form_select_btn w-100 h-100 text-start">
                                    <level className="text-uppercase">
                                        Drop-off Date
                                    </level>
                                    <div className="">
                                        <DatePicker
                                            renderCustomHeader={({
                                                monthDate,
                                                customHeaderCount,
                                                decreaseMonth,
                                                increaseMonth
                                            }) => (
                                                <div>
                                                    <h6 className="">
                                                        {' '}
                                                        Select Date
                                                    </h6>
                                                    <button
                                                        aria-label="Previous Month"
                                                        className={
                                                            'react-datepicker__navigation react-datepicker__navigation--previous'
                                                        }
                                                        style={
                                                            customHeaderCount ===
                                                            1
                                                                ? {
                                                                      visibility:
                                                                          'hidden'
                                                                  }
                                                                : null
                                                        }
                                                        onClick={decreaseMonth}>
                                                        <span
                                                            className={
                                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                                            }>
                                                            {'<'}
                                                        </span>
                                                    </button>
                                                    <span className="react-datepicker__current-month">
                                                        {monthDate.toLocaleString(
                                                            'en-US',
                                                            {
                                                                month: 'long',
                                                                year: 'numeric'
                                                            }
                                                        )}
                                                    </span>
                                                    <button
                                                        aria-label="Next Month"
                                                        className={
                                                            'react-datepicker__navigation react-datepicker__navigation--next'
                                                        }
                                                        style={
                                                            customHeaderCount ===
                                                            0
                                                                ? {
                                                                      visibility:
                                                                          'hidden'
                                                                  }
                                                                : null
                                                        }
                                                        onClick={increaseMonth}>
                                                        <span
                                                            className={
                                                                'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                                                            }>
                                                            {'>'}
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                            selected={startDate}
                                            monthsShown={2}
                                            selectsRange
                                            onChange={onChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            dateFormat="MMM d, yyyy"
                                        />

                                        <div className="sub-value">Sunday</div>
                                    </div>
                                </div>
                            </button> */}
                        </div>
                    </div>
                    <div className="col-lg-12 col-xl-2 col-md-12 col-sm-12 ">
                        <div className=" d-flex justify-content-end align-items-center">
                            <button
                                onClick={() => modifySearch()}
                                className="btn btn_primary btn_modify_search w-100 h-100">
                                Modify Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* modify search end */}
            <div className="row g-3" style={{ marginBottom: '40px' }}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            {/* {loading && <Loader />} */}

                            <>
                                {/* <div
                                    className={`card mt-3 ${styles.card_custom}`}>
                                    <div class="row p-3">
                                        <div class="col-12  col-lg-5 col-xl-5 ">
                                            <Skeleton height={230} />
                                        </div>
                                        <div class="col-12  col-lg-7 col-xl-7">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div
                                                    className={`${styles.mr_t} d-flex justify-content-between align-items-center`}></div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h4></h4>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    {' '}
                                                    <Skeleton
                                                        height={20}
                                                        width={350}
                                                    />{' '}
                                                </div>
                                                <Skeleton
                                                    height={20}
                                                    width={60}
                                                />
                                            </div>

                                            <div
                                                className={`${styles.facilities} d-flex justify-content-between mt-2`}>
                                                <Skeleton
                                                    height={20}
                                                    width={200}
                                                />
                                            </div>
                                            <div
                                                className={`${styles.facilities} d-flex justify-content-between mt-5`}>
                                                <Skeleton
                                                    height={20}
                                                    width={220}
                                                />
                                                <Skeleton
                                                    height={20}
                                                    width={60}
                                                />
                                            </div>
                                            <div
                                                className={`${styles.facilities} d-flex justify-content-between mt-3`}>
                                                <Skeleton
                                                    height={20}
                                                    width={150}
                                                />
                                            </div>

                                            <div className=" d-flex justify-content-end mt-3">
                                                <Skeleton
                                                    height={20}
                                                    width={90}
                                                />{' '}
                                                &nbsp; &nbsp;
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </>

                            <div className={`card mt-3 ${styles.card_custom}`}>
                                <div className="row ">
                                    <div className="col-md-12">
                                        <div className="card  p-4">
                                            <div className="row g-3">
                                                <div className="col-md-4 col-sm-12">
                                                    <img
                                                        style={{
                                                            width: '280px'
                                                        }}
                                                        className={` ${styles.img} img-fluid  card-img`}
                                                        src="assets/img/toyota.jpg"
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="col-md-5 col-sm-12 align-items-center h-100 mt-3">
                                                    <div
                                                        className="card-body"
                                                        style={{
                                                            padding: 'unset'
                                                        }}>
                                                        <h5
                                                            className={`${styles.transport_title} card-title text-uppercase  mb-2`}>
                                                            Toyota noah hybrid X
                                                        </h5>
                                                        <p className="card-text mb-4">
                                                            Despription
                                                        </p>
                                                        <div className="transport_feature">
                                                            <h6 className="font-weight-bold mb-2">
                                                                Feature of
                                                                Vehicles
                                                            </h6>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-sm-12">
                                                                    <span className="card-text">
                                                                        <i className="fas fa-user mr-2"></i>
                                                                        Total
                                                                        Seat: 7
                                                                    </span>
                                                                </div>
                                                                <div className="col-lg-6 col-sm-12">
                                                                    <span className="card-text">
                                                                        <i className="fas fa-fan mr-2"></i>
                                                                        Air
                                                                        Conditioning:
                                                                        Yes
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-lg-6 col-sm-12">
                                                                    <span className="card-text">
                                                                        <i className="fas fa-suitcase-rolling mr-2"></i>
                                                                        TotalBaggage:
                                                                        8
                                                                    </span>
                                                                </div>
                                                                <div className="col-lg-6 col-sm-12">
                                                                    <span className="card-text">
                                                                        <i className="fas fa-robot mr-2"></i>
                                                                        Gear
                                                                        Type:
                                                                        Auto
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-sm-12 mt-3">
                                                    <div className="price text-right">
                                                        {/* <span
                                                            type="submit"
                                                            className="btn btn_primary green mb-3">
                                                            Price
                                                        </span> */}
                                                        <h3 className="font-weight-bold mb-5">
                                                            BDT 5000
                                                        </h3>
                                                        {/* <button className="w-50 btn btn-success">
                                                            Book
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
