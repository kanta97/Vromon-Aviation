import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import FlightContext from '../context/FlightContext'
import Loader from '../components/Loader'
import style from '../styles/Flight.module.css'
import SearchBar from './SearchBar'
import SearchBarMobile from './SearchBarMobile'
import Roundway from './Roundway'
import RoundwayMobile from './RoundwayMobile'
import 'react-datepicker/dist/react-datepicker.css'

const options = [
    {
        value: 'DAC, Hazrat Shahjalal International Airport Airliness',
        label: 'DAC, Hazrat Shahjalal International Airport Airliness'
    },
    {
        value: 'CGP, Shah Amanat International Airport airliness',
        label: 'CGP, Shah Amanat International Airport airliness'
    }
]
export default function FlightSearch() {
    const {
        loading,
        setFlightype,
        msg,
        error,
        multiCities,
        addMultiCity,
        trips,
        setTrips,
        addTrip,
        flightType,
        button2Ref,
        button1Ref
    } = useContext(FlightContext)
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
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedOption1, setSelectedOption1] = useState('')

    const [from, setFrom] = useState({
        name: 'Hazrat Shahjalal International Airport',
        city: 'Dhaka',
        iata: 'DAC',
        country: 'Bangladesh'
    })
    const [to, setTo] = useState({
        name: "Cox's Bazar Airport",
        city: 'Coxs Bazar',
        iata: 'CXB',
        country: 'Bangladesh'
    })

    const handleDestination = (airport, type) => {
        if (type == 'from') {
            setFrom(airport)
        } else {
            setTo(airport)
        }
    }

    const handleOptionClick = (option) => (e) => {
        e.preventDefault()
        setSelectedOption1(option)
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if the code is running in the browser
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        handleResize(); // Run on initial render

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [isMobiler, setIsMobiler] = useState(false);

    useEffect(() => {
        // Check if the code is running in the browser
        const handleResize = () => {
            setIsMobiler(window.innerWidth <= 991);
        };

        handleResize(); // Run on initial render

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div
            className="tab-pane fade show active flight_tab"
            id="nav-flight"
            role="tabpanel"
            aria-labelledby="nav-flight-tab"
            tabIndex="0">
            <ul
                className="nav nav-tabs flight_nav_tabs"
                id="myTab"
                role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            'nav-link ' +
                            (flightType == 'One Way' ? 'active' : '')
                        }
                        id="one-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#one-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="one-tab-pane"
                        aria-selected="true"
                        onClick={() => {
                            setFlightype('One Way')
                        }}>
                        <span className="oneyWay"></span> One Way
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                     ref={button2Ref}
                        className={
                            'nav-link ' +
                            (flightType == 'Round Way' ? 'active' : '')
                        }
                        id="round-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#round-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="round-tab-pane"
                        aria-selected="false"
                        onClick={() => {

                            setFlightype('Round Way')
                        }}>
                        <span className="oneyWay"></span> Round Way
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            'nav-link ' +
                            (flightType == 'Multi City' ? 'active' : '')
                        }
                        id="multi-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#multi-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="multi-tab-pane"
                        aria-selected="false"
                        onClick={() => {
                            setFlightype('Multi City')
                            if (trips.length < 2) {
                                addTrip()
                            }
                        }}>
                        <span className="oneyWay"></span> Multi City
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade  show active  "
                    id="one-tab-pane"
                    role="tabpanel"
                    aria-labelledby="one-tab"
                    tabIndex="0">
                    <div className="row g-3 mb-3">
                    {isMobile ? (
                    <SearchBarMobile
                        handleDestination={handleDestination}
                        trip={trips[0]}
                        index={0}
                    />
                ) : (
                    <SearchBar
                        handleDestination={handleDestination}
                        trip={trips[0]}
                        index={0}
                    />
                )}
                    </div>
                </div>
              
                <div
                    className="tab-pane fade"
                    id="round-tab-pane"
                    role="tabpanel"
                    aria-labelledby="round-tab"
                    tabIndex="0">
                    <div className="row g-3 mb-3">
                    {isMobiler ? (
                   <RoundwayMobile trip={trips[0]} index={0} />
                ) : (
                    <Roundway trip={trips[0]} index={0} />
                )}
                      
                    </div>
                </div>

                <div
                    className="tab-pane fade"
                    id="multi-tab-pane"
                    role="tabpanel"
                    aria-labelledby="multi-tab"
                    tabIndex="0">
                    <div className="row g-3 mb-3">
                        
                            {isMobile ? (
                                <>
                                 {trips &&
                                    trips.map((trip, index) => (
                    <SearchBarMobile
                    index={index} trip={trip} key={index}
                    />
                ))}</>
                ) : (
                    <>
                    {trips &&
                        trips.map((trip, index) => (
                            <SearchBar index={index} trip={trip} key={index} />
                        ))}</>
                )}
                    </div>
                    {/* <div className="row g-3">
                        <div className="col-lg-1 col-xl-1 col-md-1 col-sm-1">
                            <div className="d-flex align-items-center justify-content-start w-100 h-100">
                                <p
                                    className="add_another"
                                    onClick={addTrip}></p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
