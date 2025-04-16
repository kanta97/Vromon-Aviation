import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import Loader from '../components/Loader'
import style from '../styles/Hotel.module.css'

import 'react-datepicker/dist/react-datepicker.css'

const options = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Rajshahi', label: 'Rajshahi' }
]
export default function TransportSearch() {
    useEffect(() => {
        // console.log('airport print', airports)
        // console.log('airlinesb print', airlines)
    }, [])
    const [selectedOption, setSelectedOption] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }
    return (
        <div className={`${style.hotel_tab} row g-3 mt-1`}>
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
            <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 col-12">
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

            <div className="col-lg-12 col-xl-6 col-md-12 col-sm-12">
                <div
                    className="btn-group w-100 h-100 button-travel"
                    role="group"
                    aria-label="Basic example">
                    <button type="button" className="btn btn-primary-date">
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
                                            <h6 className=""> Select Date</h6>
                                            <button
                                                aria-label="Previous Month"
                                                className={
                                                    'react-datepicker__navigation react-datepicker__navigation--previous'
                                                }
                                                style={
                                                    customHeaderCount === 1
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
                                                    customHeaderCount === 0
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

                    {/* <button type="button" className="btn btn-primary-date">
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
                                            <h6 className=""> Select Date</h6>
                                            <button
                                                aria-label="Previous Month"
                                                className={
                                                    'react-datepicker__navigation react-datepicker__navigation--previous'
                                                }
                                                style={
                                                    customHeaderCount === 1
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
                                                    customHeaderCount === 0
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
        </div>
    )
}
