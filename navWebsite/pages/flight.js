import React, { useEffect, useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFilter, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import _ from 'underscore'
import Image from 'next/image'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import Roundway from '../components/Roundway'
import SearchBarMobile from '../components/SearchBarMobile'
import RoundwayMobile from '../components/RoundwayMobile'
import styles from '../styles/Flight.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import flightico from '../public/assets/img/flight.png'
import eco from '../public/assets/icons/economy-new.svg'
import refund from '../public/assets/icons/refundable.svg'
import upsolid from '../public/assets/icons/arrow_up.svg'
import upsolid2 from '../public/assets/icons/arrow_down.svg'
 //import upsolid2 from '../public/assets/icons/down_arrow.svg'

import upsolid3 from '../public/assets/icons/bag.svg'
import che from '../public/assets/icons/che.svg'
import fas from '../public/assets/icons/fas.svg'
import Group from '../public/assets/img/Group.svg'
// import Group2 from '../public/assets/img/Group2.svg'
import Link from 'next/link'
import Pagebar from '../components/Pagebar'
import CustomSlider from '../components/CustomSlider'
import FlightContext from '../context/FlightContext'
import moment from "moment";
import AuthContext from '../context/AuthContext'
import Loader from '../components/Loader'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { flightDiscount } from '../config'
import passenger from '../data/passengerDetails.json'
import cabin_type from '../data/cabinType.json'


export default function flight() {
    const dt = new Date()
    const ISODate = dt.toISOString().split('T')[0]

    console.log(ISODate)

    //const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [show_details, setshow_details] = useState(false)

    const [airlines, setAirlines] = useState([])
    const [minMax, setMinMax] = useState([0, 0])

    const [maxValue, setMaxValue] = useState(0)

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

    let min_max_value

    const [stops, setStops] = useState([
        {
            text: 'Direct',
            value: 0,
            checked: false
        },
        {
            text: '1 Stop',
            value: 1,
            checked: false
        },
        {
            text: '1+ Stop',
            value: 2,
            checked: false
        }
    ])

    const {
        loading,
        getFlights,
        flights,
        assignFlight,
        setSelectedFlight,
        flightType,
        setFlightype,
        multiCities,
        addMultiCity,
        trips,
        setTrips,
        addTrip,
        cabin,
        get_transit_time,
        button2Ref,

        timeFilterArr, seTtimeFilterArr,
        selectedFlight,
        initialFlights, setInitialFlights,
        timeFilterDep, seTtimeFilterDep
    } = useContext(FlightContext)

    const { user } = useContext(AuthContext)

    // useEffect(() => {
    //     setTimeout(() => {

    // minMax[0] = temp_flights[0].totalPrice
    // minMax[1] = temp_flights[temp_flights.length - 1].totalPrice

    useEffect(() => {
        let temp_airlines = _.uniq(
            flights,
            false /* array already sorted */,
            function (item) {
                return item.airlineName
            }
        )
        let airlines_list = []

        for (let i = 0; i < temp_airlines.length; i++) {
            let airline = {
                airlineName: temp_airlines[i].airlineName,
                checked: false
            }
            airlines_list.push(airline)
        }
        //console.log(flights)
        let temp_flights = [...flights]
        temp_flights.sort(function (a, b) {
            return a.totalPrice - b.totalPrice
        })

        let removeUndefined = temp_flights.filter((flight) => {
            return flight.totalPrice
        })

        if (removeUndefined.length != 0) {
            let min_v = Math.ceil(
                removeUndefined[0].totalPrice - removeUndefined[0].common_discount
            )
            let max_v = Math.ceil(
                removeUndefined[removeUndefined.length - 1].totalPrice - removeUndefined[removeUndefined.length - 1].common_discount
            )
            setMinMax([min_v, max_v])
            setMaxValue(max_v)
        }

        setAirlines(airlines_list)
        setData(flights)
        setInitialFlights(flights)
        //setLoading(false)
    }, [flights])

    //     }, 4000)
    // }, [flights])

    useEffect(() => {
        //console.log('marge data print', flights)
        try {
            getFlights()
        } catch (e) {
            console.log(e)
        }
    }, [])
    const [activeFilter, setActiveFilter] = useState('cheapest');
    const filterFlight = (value) => {
        //setLoading(true)
        //console.log(value)
        let sortedData = [...data]
        if (value == 'reset') {
            sortedData = [...initialFlights]
            let tmp_airlines = [...airlines]
            for (let i = 0; i < tmp_airlines.length; i++) {
                tmp_airlines[i].checked = false
            }
            setAirlines(tmp_airlines)
            let tmp_stops = stops.map(stop => ({ ...stop, checked: false }));
            setStops(tmp_stops);
            setMaxValue(minMax[1])
            seTtimeFilterDep("");
            seTtimeFilterArr("");
        } else if (value == 'cheapest') {
            sortedData.sort(function (a, b) {
                return a.totalPrice - b.totalPrice
            })
        } else if (value == 'fastest') {
            sortedData.sort(function (a, b) {
                return a.elapsedTime - b.elapsedTime
            })
        }


        setData(sortedData)
        setActiveFilter(value);
        //setLoading(false)
    }




    const filterAvailableFlights = (e, idx, type) => {
        let availableFlights = [...initialFlights]
        let filteredFlights = []

        let availableAirlines = [...airlines]
        let temp_stops = [...stops]

        if (type == 'airline') {
            availableAirlines[idx].checked = e.target.checked
            setAirlines(availableAirlines)
        } else if (type == 'stop') {
            temp_stops[idx].checked = e.target.checked
            setStops(temp_stops)
        } else if (type == 'min_max') {
            min_max_value = e.target.value
            setMaxValue(min_max_value)
        }

        ////////////////////////////

        /////////////airline filter///////////////

        for (let i = 0; i < availableAirlines.length; i++) {
            if (availableAirlines[i].checked == true) {
                for (let j = 0; j < availableFlights.length; j++) {
                    if (
                        availableAirlines[i].airlineName ==
                        availableFlights[j].airlineName
                    ) {
                        filteredFlights.push(availableFlights[j])
                    }
                }
            }
        }

        if (filteredFlights.length == 0) {
            filteredFlights = availableFlights
        }


    // useEffect(() => {

    //     filterAvailableFlights(
    //         timeFilterArr,
    //         null,
    //         'ArrivalDateTime'
    //     );

    // }, [timeFilterArr])

    // useEffect(() => {

    //     filterAvailableFlights(
    //         timeFilterDep,
    //         null,
    //         'DepartureDateTime'
    //     );

    // }, [timeFilterDep])




        /////////////stop filter//////////////////
        let stop_filter = []

        if (
            temp_stops[0].checked ||
            temp_stops[1].checked ||
            temp_stops[2].checked
        ) {
            for (let i = 0; i < filteredFlights.length; i++) {
                if (
                    filteredFlights[i].stopCount == 0 &&
                    temp_stops[0].checked
                ) {
                    stop_filter.push(filteredFlights[i])
                } else if (
                    filteredFlights[i].stopCount == 1 &&
                    temp_stops[1].checked
                ) {
                    stop_filter.push(filteredFlights[i])
                } else if (
                    filteredFlights[i].stopCount > 1 &&
                    temp_stops[2].checked
                ) {
                    stop_filter.push(filteredFlights[i])
                }
            }

            filteredFlights = stop_filter
        }
        /////////////min_max filter///////////////

        if (type != 'min_max') {
            min_max_value = maxValue
        }

        let min_max_flights = filteredFlights.filter((flight) => {
            let flight_cost = Math.ceil(
                flight.totalPrice - flight.common_discount
            )
            return flight_cost >= minMax[0] && flight_cost <= min_max_value
        })

        filteredFlights = min_max_flights

        //console.log(filteredFlights)

        /////////////set filtered data///////////////


        if (timeFilterDep != "") {

            var st = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + timeFilterDep.split('-')[0]).getTime();
            var et = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + timeFilterDep.split('-')[1]).getTime();


            let departure_time_flight = filteredFlights.filter((departure_time) => {

                var itinerary = departure_time;


                var dt = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + itinerary.legs[0].departure.f_time).getTime();

                return st <= dt && et >= dt;

            });

            filteredFlights = departure_time_flight;
        }

        // filter by arrival time

        if (timeFilterArr != "") {

            var st = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + timeFilterArr.split('-')[0]).getTime();
            var et = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + timeFilterArr.split('-')[1]).getTime();


            let arrival_time_flight = filteredFlights.filter((arrival_time) => {

                var itinerary = arrival_time;

                var dt = new Date(moment(new Date()).format("yyyy-MM-DD") + "T" + itinerary.legs[0].arrival.f_time).getTime();

                return st <= dt && et >= dt;

            });


            filteredFlights = arrival_time_flight;

        }

        setData(filteredFlights)
    }

    useEffect(() => {

        filterAvailableFlights(
            timeFilterArr,
            null,
            'arrival_time'
        );

    }, [timeFilterArr])

    useEffect(() => {

                filterAvailableFlights(
                    timeFilterDep,
                    null,
                    'departure_time'
                );

            }, [timeFilterDep])



    // const handle_show_details = (index) => {
    //     const temp_data = [...data]
    //     temp_data[index].show_details = !temp_data[index].show_details
    //     temp_data[index].show_flight_details = temp_data[index].show_details
    //     setData(temp_data)
    // }
    const handle_show_details = (index) => {
        setData(prevData =>
            prevData.map((flight, i) =>
                i === index
                    ? { ...flight, show_details: !flight.show_details, show_flight_details: !flight.show_details }
                    : flight
            )
        );
    };
    
    const handleBookNow = (flight) => {
        console.log(flight);

        if (user) {
            console.log(user)
            assignFlight(flight)
        } else {
            Router.push('/login?redirectUrl=/checkout')
            setSelectedFlight(flight)
        }
    }

    const handle_flight_details = (index) => {
        const temp_data = [...data]
        temp_data[index].show_flight_details = true
        temp_data[index].show_baggage_details = false
        temp_data[index].show_policy_details = false
        setData(temp_data)
    }

    const handle_baggage_details = (index) => {
        const temp_data = [...data]
        temp_data[index].show_flight_details = false
        temp_data[index].show_baggage_details = true
        temp_data[index].show_policy_details = false
        setData(temp_data)
    }

    const handle_policy_details = (index) => {
        const temp_data = [...data]
        temp_data[index].show_flight_details = false
        temp_data[index].show_baggage_details = false
        temp_data[index].show_policy_details = true
        setData(temp_data)
    }



    // let options = {
    //     weekday: "long", year: "numeric", month: "short",
    //     day: "numeric", hour: "2-digit", minute: "2-digit"
    // };

    // const dateString = legDesc.departure.time;
    // const date = new Date(dateString);

    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const time = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + (hours >= 12 ? 'PM' : 'AM');

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
        <Layout>
            <Pagebar />
            <div className="row  align-items-center justify-content-center mt-3 ">
                <div className="col-12">
                    <div
                        className="tab-content custom_tabs custom_tab_flight"
                        id="nav-tabContent">
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
                                            (flightType == 'One Way'
                                                ? 'active'
                                                : '')
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
                                        <span className="oneyWay"></span> One
                                        Way
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button  ref={button2Ref}
                                        className={
                                            'nav-link ' +
                                            (flightType == 'Round Way'
                                                ? 'active'
                                                : '')
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
                                        <span className="oneyWay"></span> Round
                                        Way
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={
                                            'nav-link ' +
                                            (flightType == 'Multi City'
                                                ? 'active'
                                                : '')
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
                                        <span className="oneyWay"></span> Multi
                                        City
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                {flightType == 'One Way' && (
                                    <div
                                        className="tab-pane fade  show active"
                                        id="one-tab-pane"
                                        role="tabpanel"
                                        aria-labelledby="one-tab"
                                        tabIndex="0">
                                        <div className="row g-3">
                                          
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
                                            <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
                                                <div className=" d-flex justify-content-center align-items-center">
                                                    {/* <button
                                                        className="btn btn_primary btn_modify_search w-25 h-100"
                                                        onClick={() => {
                                                            getFlights()
                                                        }}>
                                                        Modify Search
                                                    </button> */}
                                                    <button
                                                        className={`btn w-25 mt-2 h-100 btn_modify_search ${loading ? 'btn_disabled' : 'btn_primary'}`}
                                                        // onClick={() => {
                                                        //     if (!loading) getFlights(); 
                                                        // }}
                                                        onClick={() => {
                                                            if (!loading) {
                                                                console.log("Modify Search Clicked!"); // Debugging
                                                        
                                                                // Reset Airlines Filter
                                                                setAirlines(prevAirlines => prevAirlines.map(airline => ({ ...airline, checked: false })));
                                                        
                                                                // Reset Stops Filter
                                                                setStops(prevStops => prevStops.map(stop => ({ ...stop, checked: false })));
                                                        
                                                                // Reset Price Filter
                                                                setMaxValue(minMax[1]);
                                                        
                                                                // Reset Time Filters
                                                                seTtimeFilterDep("");
                                                                seTtimeFilterArr("");
                                                        
                                                                filterFlight('cheapest')
                                                                if(filterFlight==='fastest'){
                                                                    filterFlight('')
                                                                }
                                                                console.log("Filters Reset!"); // Debugging
                                                        
                                                                // Fetch new flights AFTER state updates
                                                                setTimeout(() => {
                                                                    getFlights();
                                                                    console.log("Flights Updated!");
                                                                }, 100); 
                                                            }
                                                        }}
                                                        
                                                        disabled={loading} // Disable button when loading
                                                        style={{
                                                            backgroundColor: loading ? '#2e2d8054' : '#007bff', // Change background color dynamically
                                                            color: loading ? 'white' : 'inherit', // Change text color to white when loading
                                                            cursor: loading ? 'not-allowed' : 'pointer', // Change cursor
                                                        }}
                                                    >
                                                        {loading ? 'Searching...' : 'Modify Search'}
                                                    </button>



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* one portion */}

                                {flightType == 'Round Way' && (
                                    <div
                                        className="tab-pane fade  show active"
                                        id="round-tab-pane"
                                        role="tabpanel"
                                        aria-labelledby="round-tab"
                                        tabIndex="0">
                                        <div className="row g-3">
                                           
                                              {isMobiler ? (
                                                               <RoundwayMobile trip={trips[0]} index={0} />
                                                            ) : (
                                                                <Roundway trip={trips[0]} index={0} />
                                                            )}
                                            <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
                                                <div className=" d-flex justify-content-center align-items-center">
                                                <button
                                                            className={`btn w-25 mt-2 h-100 btn_modify_search ${loading ? 'btn_disabled' : 'btn_primary'}`}
                                                            // onClick={() => {
                                                            //     if (!loading) getFlights(); // Prevent click when loading
                                                            // }}
                                                            onClick={() => {
                                                                if (!loading) {
                                                                    console.log("Modify Search Clicked!"); // Debugging
                                                            
                                                                    // Reset Airlines Filter
                                                                    setAirlines(prevAirlines => prevAirlines.map(airline => ({ ...airline, checked: false })));
                                                            
                                                                    // Reset Stops Filter
                                                                    setStops(prevStops => prevStops.map(stop => ({ ...stop, checked: false })));
                                                            
                                                                    // Reset Price Filter
                                                                    setMaxValue(minMax[1]);
                                                            
                                                                    // Reset Time Filters
                                                                    seTtimeFilterDep("");
                                                                    seTtimeFilterArr("");
                                                                    filterFlight('cheapest')
                                                                    if(filterFlight==='fastest'){
                                                                        filterFlight('')
                                                                    }
                                                                    
                                                            
                                                                    console.log("Filters Reset!"); // Debugging
                                                            
                                                                    // Fetch new flights AFTER state updates
                                                                    setTimeout(() => {
                                                                        getFlights();
                                                                        console.log("Flights Updated!");
                                                                    }, 100); 
                                                                }
                                                            }}
                                                            disabled={loading} // Disable button when loading
                                                            style={{
                                                                backgroundColor: loading ? '#2e2d8054' : '#007bff', // Change background color dynamically
                                                                color: loading ? 'white' : 'inherit', // Change text color to white when loading
                                                                cursor: loading ? 'not-allowed' : 'pointer', // Change cursor
                                                            }}
                                                        >
                                                            {loading ? 'Searching...' : 'Modify Search'}
                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {flightType == 'Multi City' && (
                                    <div
                                        className="tab-pane fade  show active"
                                        id="multi-tab-pane"
                                        role="tabpanel"
                                        aria-labelledby="multi-tab"
                                        tabIndex="0">
                                        <div className="row g-3 ">
                                            {/* {trips &&
                                                trips.map((trip, index) => (
                                                    <SearchBar
                                                        index={index}
                                                        trip={trip}
                                                    />
                                                ))} */}
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

                                        <div className="row g-3">
                                            {/* <div className="col-lg-1 col-xl-1 col-md-1 col-sm-1">
                                                <div className="d-flex align-items-center justify-content-start w-100 h-100">
                                                    <p
                                                        className="add_another"
                                                        onClick={addTrip}></p>
                                                </div>
                                            </div> */}
                                            <div className="col-lg-12 col-xl-11 col-md-12 col-sm-12 ">
                                                <div className=" d-flex justify-content-center align-items-center">
                                                <button
                                            className={`btn w-25 h-100 mt-4 btn_modify_search ${loading ? 'btn_disabled' : 'btn_primary'}`}
                                            // onClick={() => {
                                            //     if (!loading) getFlights(); // Prevent click when loading
                                            // }}
                                            onClick={() => {
                                                if (!loading) {
                                                    console.log("Modify Search Clicked!"); // Debugging
                                            
                                                    // Reset Airlines Filter
                                                    setAirlines(prevAirlines => prevAirlines.map(airline => ({ ...airline, checked: false })));
                                            
                                                    // Reset Stops Filter
                                                    setStops(prevStops => prevStops.map(stop => ({ ...stop, checked: false })));
                                            
                                                    // Reset Price Filter
                                                    setMaxValue(minMax[1]);
                                            
                                                    // Reset Time Filters
                                                    seTtimeFilterDep("");
                                                    seTtimeFilterArr("");
                                            
                                                    filterFlight('cheapest')
                                                    if(filterFlight==='fastest'){
                                                        filterFlight('')
                                                    }
                                                    console.log("Filters Reset!"); // Debugging
                                            
                                                    // Fetch new flights AFTER state updates
                                                    setTimeout(() => {
                                                        getFlights();
                                                        console.log("Flights Updated!");
                                                    }, 100); 
                                                }
                                            }}
                                            disabled={loading} // Disable button when loading
                                            style={{
                                                backgroundColor: loading ? '#2e2d8054' : '#007bff', // Change background color dynamically
                                                color: loading ? 'white' : 'inherit', // Change text color to white when loading
                                                cursor: loading ? 'not-allowed' : 'pointer', // Change cursor
                                            }}
                                        >
                                            {loading ? 'Searching...' : 'Modify Search'}
                                        </button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row " style={{ marginBottom: '40px' }}>
                {/* filter Side */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Flight Filter</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style={{backgroundColor:"#eaeff3"}}>


                            <div>
                        <div className="">
                            <div
                                className={`mt-0 d-flex depart_bg justify-content-between align-items-center ${styles.searchitem2}`}>
                              <h6 className='mb-0'>Sort & Filter</h6>
                                <span
                                    className="hover-overlay rounded-2 py-2 px-3"
                                    onClick={() => {
                                        filterFlight('reset')
                                    }}
                                    style={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        backgroundColor:"#2e2d80"
                                    }}>
                                    RESET
                                </span>
                            </div>
                            <button
                                type="button"
                                className={`depart_bg w-100 d-flex align-items-center ${styles.searchitem} ${activeFilter === 'cheapest' ? 'bg_red text-white' : ''}`}
                                onClick={() => {
                                    filterFlight('cheapest')
                                }}>
                                <Image

                                    style={{ marginRight: '20px' ,filter: activeFilter === 'cheapest' ? 'brightness(0) saturate(100%) invert(100%)' : 'none', }}
                                    src={che}
                                    alt="Picture of the author"
                                    width={25}
                                    height={25}
                                />
                              <h6 className='mb-0'> Cheapest Flights</h6>
                            </button>
                            <button
                                type="button"
                                className={`depart_bg w-100 d-flex align-items-center ${styles.searchitem} ${activeFilter === 'fastest' ? 'bg_red text-white' : ''}`}
                                onClick={() => {
                                    filterFlight('fastest')
                                }}>
                                <Image
                                    style={{ marginRight: '20px', filter: activeFilter === 'fastest' ? 'brightness(0) saturate(100%) invert(100%)' : 'none', }}
                                    src={fas}
                                    alt="Picture of the author"
                                    width={25}
                                    height={25}
                                />{' '}
                              <h6 className='mb-0'>Fastest Flights</h6>
                            </button>
                        </div>

                            <div
                                style={{
                                    marginTop: '11px',
                                    marginBottom: '11px',

                                }}
                                className='depart_bg'>
                              <h6> Number of Stops</h6>

                            <div className=" ">
                                {stops &&
                                    stops.map((stop, idx) => (
                                        <div className="form-check" key={idx}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={stop.checked}

                                               id={`checkbox-m-${idx}`}
                                                onChange={(e) => {
                                                    filterAvailableFlights(
                                                        e,
                                                        idx,
                                                        'stop'
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label mt-1"
                                                htmlFor={`checkbox-m-${idx}`} >
                                                {stop.text}
                                            </label>
                                        </div>
                                    ))}
                            </div></div>

                        <div
                            className={` ${styles.searchitem1}`}>
                            <div className="depart_bg ">
                              <h6 className='mb-3'>Price Range</h6>

                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className={styles.discount_info1}>
                                        Minimum price
                                    </div>
                                    <div className={styles.discount_info1}>
                                        Maximum price
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.taxtotall}>
                                        {minMax[0].toLocaleString()}
                                    </div>
                                    <div className={styles.taxtotall}>
                                        {maxValue.toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min={minMax[0]}
                                        max={minMax[1]}
                                        id="customRange2"
                                        value={maxValue}
                                        onChange={(e) => {
                                            filterAvailableFlights(
                                                e,
                                                null,
                                                'min_max'
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            </div>
                            <div className="depart_bg ">
                              <h6>Airlines</h6>

                            <div  style={{ borderRadius: '0px' }}>
                                <div>
                                    {airlines &&
                                        airlines.map((airline, idx) => (
                                            <div className="form-check" key={idx}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    checked={airline.checked}
                                                    id={`checkbox-${idx}`}
                                                    onChange={(e) => {
                                                        filterAvailableFlights(
                                                            e,
                                                            idx,
                                                            'airline'
                                                        )
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label mt-1"
                                                    htmlFor={`checkbox-${idx}`} >
                                                    {airline.airlineName}
                                                </label>
                                            </div>
                                        ))}

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
                                    See More
                                </span>
                            </div> */}
                            </div></div>

                            {/* <div>
                              <FilterByArrivalTime/>
                            </div>
                            <div>
                               <FilterByDepartureTime/>
                            </div> */}
                            <div className="depart_bg ">
            <h6 className='mb-3'>Departure from</h6>


            <div
                className="tab-pane fade show active flight_tab"
                id="nav-flight"
                role="tabpanel"
                aria-labelledby="nav-flight-tab"
                tabIndex="0">
                <div >

                    <ul
                        className="nav nav-tabs flight_time d-inline"
                        id="myTab"
                        role="tablist">
                        <li className="nav-item tab_dep_arr nav_link_de mb-2"   onClick={() => {
                            if (timeFilterDep == "00:00-04:59") {
                                seTtimeFilterDep("");

                            } else {
                                seTtimeFilterDep("00:00-04:59");
                            }

                            }} role="presentation">
                            <button
                                className={`nav-link ${timeFilterDep == "00:00-04:59" ? "active" : ""}`}
                                id="dmor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dmor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dmor-tab-pane"
                                aria-selected="true"
                            >


                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="emorning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Early Morning <br></br>00:00 - 04:59
                                    </div>
                                </div>

                            </button>
                        </li>
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                        onClick={() => {

                            if (timeFilterDep == "05:00-11:59") {
                                seTtimeFilterDep("");

                            } else {
                                seTtimeFilterDep("05:00-11:59");
                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterDep == "05:00-11:59" ? "active" : ""}`}
                                id="dearly-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dearly-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dearly-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="morning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Morning <br></br>05:00 - 11:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                        onClick={() => {

                            if (timeFilterDep == "12:00-17:59") {

                                seTtimeFilterDep("");

                            } else {

                                seTtimeFilterDep("12:00-17:59");

                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterDep == "12:00-17:59" ? "active" : ""}`}
                                id="dafter-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dafter-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dafter-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="afternoon  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Afternoon <br></br>12:00 - 17:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de " role="presentation"  onClick={() => {


                                if (timeFilterDep == "18:00-23:59") {

                                    seTtimeFilterDep("");

                                } else {

                                    seTtimeFilterDep("18:00-23:59");

                                }


                                }}>
                            <button
                                className={`nav-link ${timeFilterDep == "18:00-23:59" ? "active" : ""}`}
                                id="deve-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#deve-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="deve-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="evening  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Evening <br></br>18:00 - 23:59
                                    </div>
                                </div>
                            </button>
                        </li>


                    </ul>

                </div>

            </div>
            </div>
                            <div className="depart_bg">
             <h6 className='mb-3'>Arrival in</h6>

            <div
                className="tab-pane fade show active flight_tab"
                id="nav-flight"
                role="tabpanel"
                aria-labelledby="nav-flight-tab"
                tabIndex="0">
                <div >

                    <ul
                        className="nav nav-tabs flight_time d-inline"
                        id="myTab"
                        role="tablist">
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation" onClick={() => {


                            if (timeFilterArr == "00:00-04:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("00:00-04:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "00:00-04:59" ? "active" : ""}`}
                                id="earmor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#earmor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="earmor-tab-pane"
                                aria-selected="true"
                            >


                                <div class="d-flex "


                                >
                                    <div class="flex-shrink-0">
                                        <span className="emorning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Early Morning <br></br>00:00 - 04:59
                                    </div>
                                </div>

                            </button>
                        </li>
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"   onClick={() => {

                            if (timeFilterArr == "05:00-11:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("05:00-11:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "05:00-11:59" ? "active" : ""}`}
                                id="mor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#mor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="mor-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="morning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Morning <br></br>05:00 - 11:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                          onClick={() => {

                            if (timeFilterArr == "12:00-17:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("12:00-17:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "12:00-17:59" ? "active" : ""}`}
                                id="after-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#after-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="after-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="afternoon  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Afternoon <br></br>12:00 - 17:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item nav_link_de" role="presentation"
                          onClick={() => {


                            if (timeFilterArr == "18:00-23:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("18:00-23:59");
                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterArr == "18:00-23:59" ? "active" : ""}`}
                                id="eve-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#eve-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="eve-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="evening  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Evening <br></br>18:00 - 23:59
                                    </div>
                                </div>
                            </button>
                        </li>


                    </ul>

                </div>


            </div>
            </div>

                            {/* <div className="card" style={{ borderRadius: '0px' }}>
                            <div
                                style={{
                                    marginTop: '11px',
                                    marginBottom: '11px',
                                    padding: '10px'
                                }}>
                                Number of Stops
                            </div>
                            <div className="card-body card-footer bg-transparent ">
                                {stops &&
                                    stops.map((stop, idx) => (
                                        <div className="form-check" key={idx}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={stop.checked}
                                                id="flexCheckDefault"
                                                onChange={(e) => {
                                                    filterAvailableFlights(
                                                        e,
                                                        idx,
                                                        'stop'
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault">
                                                {stop.text}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div> */}
                        </div></div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className=" mt-2 " >
                    <button type="button" className={` ${styles.scroll_btn} `} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='d-flex justify-content-between'> <div>FLIGHT FILTER </div>
                            <div><FontAwesomeIcon icon={faCaretSquareDown} /></div></div>
                    </button>

                </div>
                <div className={`col-sm-3 mt-3 ${styles.for_filter_hide}`}>

                    <div>
                        <div className="">
                            <div
                                className={`mt-0 d-flex depart_bg justify-content-between align-items-center ${styles.searchitem2}`}>
                              <h6 className='mb-0'>Sort & Filter</h6>
                                <span
                                    className="hover-overlay rounded-2 py-2 px-3"
                                    onClick={() => {
                                        filterFlight('reset')
                                    }}
                                    style={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        backgroundColor:"#2e2d80"
                                    }}>
                                    RESET
                                </span>
                            </div>
                            <button
                                type="button"
                                className={`depart_bg w-100 d-flex align-items-center ${styles.searchitem} ${activeFilter === 'cheapest' ? 'bg_red text-white' : ''}`}
                                onClick={() => {
                                    filterFlight('cheapest')
                                }}>
                                <Image

                                    style={{ marginRight: '20px' ,filter: activeFilter === 'cheapest' ? 'brightness(0) saturate(100%) invert(100%)' : 'none', }}
                                    src={che}
                                    alt="Picture of the author"
                                    width={25}
                                    height={25}
                                />
                              <h6 className='mb-0'> Cheapest Flights</h6>
                            </button>
                            <button
                                type="button"
                                className={`depart_bg w-100 d-flex align-items-center ${styles.searchitem} ${activeFilter === 'fastest' ? 'bg_red text-white' : ''}`}
                                onClick={() => {
                                    filterFlight('fastest')
                                }}>
                                <Image
                                    style={{ marginRight: '20px', filter: activeFilter === 'fastest' ? 'brightness(0) saturate(100%) invert(100%)' : 'none', }}
                                    src={fas}
                                    alt="Picture of the author"
                                    width={25}
                                    height={25}
                                />{' '}
                              <h6 className='mb-0'>Fastest Flights</h6>
                            </button>
                        </div>

                            <div
                                style={{
                                    marginTop: '11px',
                                    marginBottom: '11px',

                                }}
                                className='depart_bg'>
                              <h6> Number of Stops</h6>

                            <div className=" ">
                                {stops &&
                                    stops.map((stop, idx) => (
                                        <div className="form-check" key={idx}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={stop.checked}

                                               id={`checkbox-m-${idx}`}
                                                onChange={(e) => {
                                                    filterAvailableFlights(
                                                        e,
                                                        idx,
                                                        'stop'
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label mt-1"
                                                htmlFor={`checkbox-m-${idx}`} >
                                                {stop.text}
                                            </label>
                                        </div>
                                    ))}
                            </div></div>

                        <div
                            className={` ${styles.searchitem1}`}>
                            <div className="depart_bg ">
                              <h6 className='mb-3'>Price Range</h6>

                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className={styles.discount_info1}>
                                        Minimum price
                                    </div>
                                    <div className={styles.discount_info1}>
                                        Maximum price
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.taxtotall}>
                                        {minMax[0].toLocaleString()}
                                    </div>
                                    <div className={styles.taxtotall}>
                                        {maxValue.toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min={minMax[0]}
                                        max={minMax[1]}
                                        id="customRange2"
                                        value={maxValue}
                                        onChange={(e) => {
                                            filterAvailableFlights(
                                                e,
                                                null,
                                                'min_max'
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            </div>
                            <div className="depart_bg ">
                              <h6>Airlines</h6>

                            <div  style={{ borderRadius: '0px' }}>
                                <div>
                                    {airlines &&
                                        airlines.map((airline, idx) => (
                                            <div className="form-check" key={idx}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    checked={airline.checked}
                                                    id={`checkbox-${idx}`}
                                                    onChange={(e) => {
                                                        filterAvailableFlights(
                                                            e,
                                                            idx,
                                                            'airline'
                                                        )
                                                    }}
                                                />
                                                <label
                                                    className="form-check-label mt-1"
                                                    htmlFor={`checkbox-${idx}`} >
                                                    {airline.airlineName}
                                                </label>
                                            </div>
                                        ))}

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
                                    See More
                                </span>
                            </div> */}
                            </div></div>

                            {/* <div>
                              <FilterByArrivalTime/>
                            </div>
                            <div>
                               <FilterByDepartureTime/>
                            </div> */}
                            <div className="depart_bg ">
            <h6 className='mb-3'>Departure from</h6>


            <div
                className="tab-pane fade show active flight_tab"
                id="nav-flight"
                role="tabpanel"
                aria-labelledby="nav-flight-tab"
                tabIndex="0">
                <div >

                    <ul
                        className="nav nav-tabs flight_time d-inline"
                        id="myTab"
                        role="tablist">
                        <li className="nav-item tab_dep_arr nav_link_de mb-2"   onClick={() => {
                            if (timeFilterDep == "00:00-04:59") {
                                seTtimeFilterDep("");

                            } else {
                                seTtimeFilterDep("00:00-04:59");
                            }

                            }} role="presentation">
                            <button
                                className={`nav-link ${timeFilterDep == "00:00-04:59" ? "active" : ""}`}
                                id="dmor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dmor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dmor-tab-pane"
                                aria-selected="true"
                            >


                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="emorning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Early Morning <br></br>00:00 - 04:59
                                    </div>
                                </div>

                            </button>
                        </li>
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                        onClick={() => {

                            if (timeFilterDep == "05:00-11:59") {
                                seTtimeFilterDep("");

                            } else {
                                seTtimeFilterDep("05:00-11:59");
                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterDep == "05:00-11:59" ? "active" : ""}`}
                                id="dearly-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dearly-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dearly-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="morning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Morning <br></br>05:00 - 11:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                        onClick={() => {

                            if (timeFilterDep == "12:00-17:59") {

                                seTtimeFilterDep("");

                            } else {

                                seTtimeFilterDep("12:00-17:59");

                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterDep == "12:00-17:59" ? "active" : ""}`}
                                id="dafter-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#dafter-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="dafter-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="afternoon  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Afternoon <br></br>12:00 - 17:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de " role="presentation"  onClick={() => {


                                if (timeFilterDep == "18:00-23:59") {

                                    seTtimeFilterDep("");

                                } else {

                                    seTtimeFilterDep("18:00-23:59");

                                }


                                }}>
                            <button
                                className={`nav-link ${timeFilterDep == "18:00-23:59" ? "active" : ""}`}
                                id="deve-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#deve-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="deve-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="evening  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Evening <br></br>18:00 - 23:59
                                    </div>
                                </div>
                            </button>
                        </li>


                    </ul>

                </div>

            </div>
            </div>
                            <div className="depart_bg">
             <h6 className='mb-3'>Arrival in</h6>

            <div
                className="tab-pane fade show active flight_tab"
                id="nav-flight"
                role="tabpanel"
                aria-labelledby="nav-flight-tab"
                tabIndex="0">
                <div >

                    <ul
                        className="nav nav-tabs flight_time d-inline"
                        id="myTab"
                        role="tablist">
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation" onClick={() => {


                            if (timeFilterArr == "00:00-04:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("00:00-04:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "00:00-04:59" ? "active" : ""}`}
                                id="earmor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#earmor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="earmor-tab-pane"
                                aria-selected="true"
                            >


                                <div class="d-flex "


                                >
                                    <div class="flex-shrink-0">
                                        <span className="emorning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Early Morning <br></br>00:00 - 04:59
                                    </div>
                                </div>

                            </button>
                        </li>
                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"   onClick={() => {

                            if (timeFilterArr == "05:00-11:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("05:00-11:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "05:00-11:59" ? "active" : ""}`}
                                id="mor-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#mor-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="mor-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="morning  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Morning <br></br>05:00 - 11:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item tab_dep_arr nav_link_de mb-2" role="presentation"
                          onClick={() => {

                            if (timeFilterArr == "12:00-17:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("12:00-17:59");
                            }

                            }}>
                            <button
                                className={`nav-link ${timeFilterArr == "12:00-17:59" ? "active" : ""}`}
                                id="after-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#after-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="after-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="afternoon  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Afternoon <br></br>12:00 - 17:59
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li className="nav-item nav_link_de" role="presentation"
                          onClick={() => {


                            if (timeFilterArr == "18:00-23:59") {
                                seTtimeFilterArr("");

                            } else {
                                seTtimeFilterArr("18:00-23:59");
                            }

                        }}>
                            <button
                                className={`nav-link ${timeFilterArr == "18:00-23:59" ? "active" : ""}`}
                                id="eve-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#eve-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="eve-tab-pane"
                                aria-selected="false"
                            >
                                <div class="d-flex "

                                >
                                    <div class="flex-shrink-0">
                                        <span className="evening  mt-2"></span>
                                    </div>
                                    <div class="flex-grow-1  text-left time_text">
                                        Evening <br></br>18:00 - 23:59
                                    </div>
                                </div>
                            </button>
                        </li>


                    </ul>

                </div>


            </div>
            </div>

                            {/* <div className="card" style={{ borderRadius: '0px' }}>
                            <div
                                style={{
                                    marginTop: '11px',
                                    marginBottom: '11px',
                                    padding: '10px'
                                }}>
                                Number of Stops
                            </div>
                            <div className="card-body card-footer bg-transparent ">
                                {stops &&
                                    stops.map((stop, idx) => (
                                        <div className="form-check" key={idx}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                checked={stop.checked}
                                                id="flexCheckDefault"
                                                onChange={(e) => {
                                                    filterAvailableFlights(
                                                        e,
                                                        idx,
                                                        'stop'
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault">
                                                {stop.text}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div> */}
                        </div></div>
                </div>
                <div className="col-sm-9 ">
               
                    {loading ? (
                        <>
                              <div className='mt-3'>
                                 <CustomSlider />
                             </div> 
                            <div className={`card mt-3 p-3 ${styles.Each_row}`}>
                                <div className="row">
                                    <div
                                        className="col-sm-10"
                                        style={{ display: 'flex' }}>
                                        <div
                                            className="row"
                                            style={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: '100%'
                                            }}>
                                            <div className="col-sm-3">
                                                <Skeleton
                                                    height={80}
                                                    width={80}
                                                />
                                                <h6
                                                    style={{
                                                        fontSize: '10px',
                                                        marginTop: '5px'
                                                    }}>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />
                                                </h6>
                                            </div>
                                            <div className="col-sm-9">
                                                <div
                                                    className="row"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px'
                                                    }}>
                                                    <div className="col-sm-5">
                                                        <div className="d-flex">
                                                            <div
                                                                className=""
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    fontSize:
                                                                        '12px'
                                                                }}>
                                                                <Skeleton
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <div className="mt-2 me-2">
                                                                    <span
                                                                        className={
                                                                            styles.icotext
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                100
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div
                                                                    className={
                                                                        styles.it2
                                                                    }>
                                                                    <div
                                                                        className={
                                                                            styles.oktext1
                                                                        }></div>
                                                                    <div
                                                                        className={`${styles.oktext2}  `}>
                                                                        <strong className="mb-2">
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </strong>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext3
                                                                        }>
                                                                        <h6 className="mt-2">
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </h6>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext4
                                                                        }></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-sm-3"
                                                        style={{
                                                            alignSelf: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            transform:
                                                                'translateX(-9px)'
                                                        }}>
                                                        <div>
                                                            <span></span>
                                                        </div>

                                                        <div>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div>
                                                            <div
                                                                className={
                                                                    styles.it1
                                                                }>
                                                                <div
                                                                    className={
                                                                        styles.oktext1
                                                                    }></div>
                                                                <div
                                                                    className={
                                                                        styles.oktext2
                                                                    }>
                                                                    <strong className="ms-2"></strong>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.oktext3
                                                                    }>
                                                                    <h6></h6>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.oktext4
                                                                    }></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="row"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px'
                                                    }}>
                                                    <div className="col-sm-5">
                                                        <div className="d-flex">
                                                            <div
                                                                className="me-2"
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    fontSize:
                                                                        '12px'
                                                                }}>
                                                                <Skeleton
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <div>
                                                                    <span
                                                                        className={
                                                                            styles.icotext
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                100
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div
                                                                    className={
                                                                        styles.it2
                                                                    }>
                                                                    <div
                                                                        className={
                                                                            styles.oktext1
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={`${styles.oktext2}  `}>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                        <strong className="ms-2"></strong>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext3
                                                                        }>
                                                                        <h6>
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </h6>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext4
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-sm-3"
                                                        style={{
                                                            alignSelf: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            transform:
                                                                'translateX(-9px)'
                                                        }}>
                                                        <div>
                                                            <span></span>
                                                        </div>

                                                        <div>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* --------------end rendering part------------------------- */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------- Thhis is left side part ----------------- */}
                                    <div
                                        className={`col-sm-2 ${styles.cardleftjj}`}>
                                        <div
                                            className={`${styles.flight_card}`}>
                                            <div
                                                style={{
                                                    textAlign: 'center'
                                                }}>
                                                <div
                                                    className={`card-body ${styles.card_body}`}>
                                                    <div
                                                        className={
                                                            styles.flight_card_right
                                                        }>
                                                        <Skeleton
                                                            height={15}
                                                            width={20}
                                                        />
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    '8px',
                                                                marginBottom:
                                                                    '7px'
                                                            }}>
                                                            <span
                                                                className={
                                                                    styles.discount_info1
                                                                }></span>
                                                        </div>

                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                            &nbsp;
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                        </div>
                                                    </div>

                                                    <span
                                                        className={
                                                            styles.discount_info4gg
                                                        }
                                                        style={{
                                                            marginTop: '10px'
                                                        }}>
                                                        <Link
                                                            href=""
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                                color: '#f8f9fa'
                                                            }}>
                                                            {' '}
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------- end left side part ----------------- */}
                                </div>
                            </div>
                            <div className={`card mt-3 p-3 ${styles.Each_row}`}>
                                <div className="row">
                                    <div
                                        className="col-sm-10"
                                        style={{ display: 'flex' }}>
                                        <div
                                            className="row"
                                            style={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: '100%'
                                            }}>
                                            <div className="col-sm-3">
                                                <Skeleton
                                                    height={80}
                                                    width={80}
                                                />
                                                <h6
                                                    style={{
                                                        fontSize: '10px',
                                                        marginTop: '5px'
                                                    }}>
                                                    <Skeleton
                                                        height={20}
                                                        width={100}
                                                    />
                                                </h6>
                                            </div>
                                            <div className="col-sm-9">
                                                {/* ---------- this side rendr by call api----------------- */}
                                                <div
                                                    className="row"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px'
                                                    }}>
                                                    <div className="col-sm-5">
                                                        <div className="d-flex">
                                                            <div
                                                                className=""
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    fontSize:
                                                                        '12px'
                                                                }}>
                                                                <Skeleton
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <div className="mt-2 me-2">
                                                                    <span
                                                                        className={
                                                                            styles.icotext
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                100
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className=""
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
                                                                        }></div>
                                                                    <div
                                                                        className={`${styles.oktext2}  `}>
                                                                        <strong className="mb-2">
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </strong>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext3
                                                                        }>
                                                                        <h6 className="mt-2">
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </h6>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext4
                                                                        }></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-sm-3"
                                                        style={{
                                                            alignSelf: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            transform:
                                                                'translateX(-9px)'
                                                        }}>
                                                        <div>
                                                            <span></span>
                                                        </div>

                                                        <div>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
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
                                                                    }></div>
                                                                <div
                                                                    className={
                                                                        styles.oktext2
                                                                    }>
                                                                    <strong className="ms-2"></strong>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.oktext3
                                                                    }>
                                                                    <h6></h6>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.oktext4
                                                                    }></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* --------------end rendering part------------------------- */}
                                                {/* ---------- Round Trip Part----------------- */}
                                                <div
                                                    className="row"
                                                    style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px'
                                                    }}>
                                                    <div className="col-sm-5">
                                                        <div className="d-flex">
                                                            <div
                                                                className="me-2"
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    fontSize:
                                                                        '12px'
                                                                }}>
                                                                <Skeleton
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <div>
                                                                    <span
                                                                        className={
                                                                            styles.icotext
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                100
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className=""
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
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={`${styles.oktext2}  `}>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                        <strong className="ms-2"></strong>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext3
                                                                        }>
                                                                        <h6>
                                                                            <Skeleton
                                                                                height={
                                                                                    20
                                                                                }
                                                                                width={
                                                                                    250
                                                                                }
                                                                            />
                                                                        </h6>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktext4
                                                                        }>
                                                                        <Skeleton
                                                                            height={
                                                                                20
                                                                            }
                                                                            width={
                                                                                250
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-sm-3"
                                                        style={{
                                                            alignSelf: 'center',
                                                            textAlign: 'center',
                                                            fontSize: '14px',
                                                            transform:
                                                                'translateX(-9px)'
                                                        }}>
                                                        <div>
                                                            <span></span>
                                                        </div>

                                                        <div>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* --------------end rendering part------------------------- */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------- Thhis is left side part ----------------- */}
                                    <div
                                        className={`col-sm-2 ${styles.cardleftjj}`}>
                                        <div
                                            className={`${styles.flight_card}`}>
                                            <div
                                                style={{
                                                    textAlign: 'center'
                                                }}>
                                                <div
                                                    className={`card-body ${styles.card_body}`}>
                                                    <div
                                                        className={
                                                            styles.flight_card_right
                                                        }>
                                                        <Skeleton
                                                            height={15}
                                                            width={20}
                                                        />
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    '8px',
                                                                marginBottom:
                                                                    '7px'
                                                            }}>
                                                            <span
                                                                className={
                                                                    styles.discount_info1
                                                                }></span>
                                                        </div>

                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                            &nbsp;
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                        </div>
                                                    </div>

                                                    <span
                                                        className={
                                                            styles.discount_info4gg
                                                        }
                                                        style={{
                                                            marginTop: '10px'
                                                        }}>
                                                        <Link
                                                            href=""
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                                color: '#f8f9fa'
                                                            }}>
                                                            {' '}
                                                            <Skeleton
                                                                height={20}
                                                                width={100}
                                                            />
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------- end left side part ----------------- */}
                                </div>
                            </div>
                            {/* Skeleton part end */}
                        </>
                    ) : data.length != 0 ? (
                        data &&
                        data.map((flight, idx) => (
                            // flight.country === 'BD' && flight.airline_iata === 'BG' ? null : (
                            <div
                                className={`card mt-3 p-3 ${styles.Each_row}`}
                                key={idx}>
                                <div className="row">
                                    <div
                                        className="col-md-10 col-sm-12"
                                        style={{ display: 'flex' }}
                                    >
                                        <div
                                            className="row"
                                            style={{
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                width: '100%'

                                            }}
                                        >
                                            {flight.legs.map(
                                                (legDesc) => (
                                                    <>
                                                        {/* {legDesc.dateAdjustment && <div>{"+" + legDesc.dateAdjustment + (legDesc.dateAdjustment == 1 ? "day" : "days")}</div>} */}
                                                        <div className="col-3">
                                                            <Image
                                                                className="img-fluid air_img"
                                                                src={
                                                                    '/' +
                                                                    flight.logo
                                                                }
                                                                alt="Picture of the author"
                                                                width={80}
                                                                height={80}
                                                            />
                                                            <h6
                                                                className='air_log'>
                                                                {
                                                                    flight.airlineName
                                                                }
                                                            </h6>
                                                        </div>

                                                        {/* ---------- this side rendr by call api----------------- */}

                                                        <div className="col-3">

                                                            {/* <div
                                                                            className="me-2"
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
                                                                                style={{
                                                                                    marginTop:
                                                                                        '20px'
                                                                                }}
                                                                            />
                                                                            <div>
                                                                                <span
                                                                                    className={
                                                                                        styles.icotext
                                                                                    }>
                                                                                    {
                                                                                        flight
                                                                                            .carrier
                                                                                            .marketingFlightNumber
                                                                                    }

                                                                                </span>
                                                                            </div>
                                                                        </div> */}
                                                            <div
                                                                className=""
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
                                                                        className={`${styles.oktext2}  `}>
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
                                                                        <h6>
                                                                            {
                                                                                legDesc.departure.airportFrom
                                                                            }
                                                                        </h6>
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
                                                            </div>

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
                                                            {legDesc.dateAdjustment && <div className='day_colr'>{"+" + legDesc.dateAdjustment + (legDesc.dateAdjustment == 1 ? "day" : "days")}</div>}
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
                                                                            styles.oktextmal
                                                                        }>
                                                                        Arrive
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.oktextnor
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
                                                                        <h6>
                                                                            {
                                                                                legDesc.arrival.airportTo
                                                                            }
                                                                        </h6>
                                                                    </div> */}
                                                                    <div
                                                                        className={
                                                                            styles.oktextvv
                                                                        }>
                                                                        {
                                                                            legDesc.arrival.date
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {/* --------------- Thhis is left side part ----------------- */}
                                    <div
                                        className={`col-md-2 col-sm-12 ${styles.cardleft}`}>
                                        <div
                                            className={`${styles.flight_card}`}>
                                            <div
                                                style={{
                                                    textAlign: 'center'
                                                }}>
                                                <div
                                                    className={`card-body ${styles.card_body}`}>
                                                    <div
                                                        className={
                                                            styles.flight_card_right
                                                        }>
                                                        <div className='d-flex justify-content-center  margin_flight_btm'>
                                                            <Image
                                                                src={upsolid3}
                                                                alt="Picture of the author"
                                                                width={15}
                                                                height={20}
                                                            />
                                                            <div

                                                                style={{
                                                                    marginLeft:
                                                                        '8px', marginBottom:
                                                                        '7px',

                                                                }}>
                                                                <span
                                                                    className={
                                                                        styles.discount_info1
                                                                    }>
                                                                    {flight.weight}{' '}
                                                                    {flight.unit}
                                                                </span>
                                                            </div></div>
                                                            {/* <div> */}

                                                        {/* {flight.country==='BD' && flight.airline_iata!=='BS' &&
                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            {flight.currency}{' '}
                                                            &nbsp;
                                                            {(Math.ceil(
                                                                // flight.totalPrice - flight.common_discount
                                                                (flight.totalPrice - 10)
                                                                // flight.totalPrice - 600
                                                            )).toLocaleString()}
                                                        </div>
                                                        } */}

                                                    {flight.country==='BD' &&
                                                    // flight.airline_iata==='BS'&&
                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            {flight.currency}{' '}
                                                            &nbsp;
                                                            {(Math.ceil(
                                                                // flight.totalPrice>2000?flight.totalPrice-600: flight.totalPrice - flight.common_discount
                                                                flight.totalPrice - flight.common_discount
                                                            )).toLocaleString()}
                                                        </div>}

                                                        {
    flight.country === 'international' &&
    <div className={`${styles.discount_info3}`}>
        {flight.currency}{' '}
        &nbsp;
        {(
            Math.ceil(
                flight.totalPrice - flight.basePrice *
                (flight.airline_iata === 'EK' || flight.airline_iata === 'TK' || flight.airline_iata === 'QR' ? 0.15 : 0.12)
            )
        ).toLocaleString()}
    </div>
}

                                                        {/* {flight.totalPrice > 20000 ?
                                                            (Math.ceil(flight.totalPrice - 4000)).toLocaleString() :
                                                            (Math.ceil(flight.totalPrice - flight.common_discount)).toLocaleString()
                                                        } */}
                                                        {/* {flight.country==='international' && flight.airline_iata==='EK'&&
                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            {flight.currency}{' '}
                                                            &nbsp;
                                                            {(Math.ceil(
                                                                flight.totalPrice<100000?flight.totalPrice-5000: flight.totalPrice-7000
                                                            )).toLocaleString()}
                                                        </div>} */}
                                                        <div
                                                            className='mid_font'>
                                                            {
                                                                flight.currency
                                                            }{' '}
                                                            &nbsp;
                                                            {
                                                                flight.totalPrice.toLocaleString()
                                                            }
                                                        </div>
                                                    </div>

                                                    <button
                                                        className="btn btn_book"
                                                        onClick={() => {
                                                            handleBookNow(
                                                                flight
                                                            )
                                                        }}>
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* --------------- end left side part ----------------- */}
                                </div>
                                <div style={{cursor:"context-menu"}}
                                    className={`card ${styles.myfooter}`}
                                    >
                                    <div className={styles.myfooter_child}>
                                        {/* <span
                                            className={styles.myfooter_child1}>
                                            <Image
                                                src={refund}
                                                alt="Picture of the author"
                                                width={20}
                                                height={20}
                                            />
                                            &nbsp; Partially Refundable
                                        </span> */}
                                        <span
                                           className={styles.hidedetails}>
                                            <Image
                                                src={eco}
                                                alt="Picture of the author"
                                                width={25}
                                                height={25}
                                            />
                                            &nbsp; {cabin_type[cabin]}
                                        </span>
                                    </div>

                                    <div className={styles.hidedetails1}
                                    onClick={() => handle_show_details(idx)}>
                                        {/* <span
                                            className={styles.hidedetails}
                                            data-bs-toggle="collapse"
                                            data-bs-target=".multi-collapse"
                                            aria-expanded="false"
                                            aria-controls="multiCollapseExample1 multiCollapseExample2">
                                            {flight.show_details
                                                ? 'HIDE DETAILS'
                                                : 'SHOW DETAILS'}
                                        </span> */}
                                        <span
                                            className={styles.hidedetails}
                                            // data-bs-toggle="collapse"
                                            // data-bs-target=".multi-collapse"
                                            // aria-expanded={flight.show_details ? 'true' : 'false'}
                                            // aria-controls="multiCollapseExample1 multiCollapseExample2"
                                            >
                                         {flight.show_details ? 'Hide Details' : 'Show Details'}
                                        </span>
                                        <Image
        src={flight.show_details ? upsolid2 : upsolid2}
        alt="Toggle Arrow"
        width={15}
        height={20}
      style={{
            marginRight: '15px',
            transition: 'transform 0.3s',
            transform: flight.show_details ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
    />
                                        {/* {flight.show_details ? (
                                            <Image
                                                src={upsolid}
                                                alt="Picture of the author"
                                                width={15}
                                                height={20}
                                                style={{
                                                    marginRight: '15px'
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src={upsolid2}
                                                alt="Picture of the author2"
                                                width={15}
                                                height={20}
                                                style={{
                                                    marginRight: '15px'
                                                }}
                                            />
                                        )} */}
                                    </div>
                                </div>

                                <div className={`details-container ${flight.show_details ? 'show' : ''}`}>
                                    {flight.show_details ? (
                                        <div
                                            className="row"
                                            style={{
                                                fontSize: '14px',  transition: "0.4s ease-out"

                                            }}>
                                            <nav>
                                                <div
                                                    className="nav nav-tabs flight_deta"
                                                    id="nav-tab"
                                                    role="tablist">
                                                    <button
                                                        className={`nav-link ${styles.no
                                                            } ${flight.show_flight_details
                                                                ? 'active'
                                                                : ''
                                                            }`}
                                                        id="nav-home-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-home"
                                                        aria-selected="true"
                                                        onClick={() =>
                                                            handle_flight_details(
                                                                idx
                                                            )
                                                        }>
                                                        FLIGHT DETAILS
                                                    </button>
                                                    <button
                                                        className={`nav-link   ${styles.no
                                                            } ${flight.show_baggage_details
                                                                ? 'active'
                                                                : ''
                                                            }`}
                                                        id="nav-profile-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-profile"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-profile"
                                                        aria-selected="false"
                                                        onClick={() =>
                                                            handle_baggage_details(
                                                                idx
                                                            )
                                                        }>
                                                        BAGGAGE
                                                    </button>
                                                    <button
                                                        className={`nav-link ${styles.no
                                                            } ${flight.show_policy_details
                                                                ? 'active'
                                                                : ''
                                                            }`}
                                                        id="nav-contact-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-contact"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-contact"
                                                        aria-selected="false"
                                                        onClick={() =>
                                                            handle_policy_details(
                                                                idx
                                                            )
                                                        }>
                                                        POLICY
                                                    </button>
                                                </div>
                                            </nav>
                                            {/* flight details */}
                                            <div
                                                className="tab-content"
                                                id="nav-tabContent">

                                                {flight.show_flight_details && (
                                                    <div className='row align-items-center'>
                                                        <div className='col-md-8 col-sm-12'>
                                                            <div>
                                                                {flight.legs.map((legDesc) => (
                                                                    legDesc.schedules.map((schedule, index) => (

                                                                        <div
                                                                            className={
                                                                                'tab-pane fade show active'
                                                                            }
                                                                            id="nav-home"
                                                                            role="tabpanel"
                                                                            aria-labelledby="nav-home-tab">

                                                                            <div
                                                                                className="row "
                                                                                style={{
                                                                                    marginLeft: '0px'
                                                                                }}>
                                                                                <div className="col-12">
                                                                                    {/* ---------- this side rendr by call api----------------- */}
                                                                                    <div
                                                                                        className="row justify-content-center align-items-center"
                                                                                        style={{
                                                                                            marginTop:
                                                                                                '15px',
                                                                                            marginBottom:
                                                                                                '15px'
                                                                                        }}>
                                                                                            <div  className={
                                                                                                                styles.oktext33
                                                                                                            }>
                                                                                                               <h6> {schedule.carrier.airlineName}</h6></div>
                                                                                        <div className="col-4 text-left">
                                                                                            <div className="d-flex me-2">
                                                                                                <div
                                                                                                    className='me-2'

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
                                                                                                        style={{
                                                                                                            marginTop:
                                                                                                                '20px'
                                                                                                        }}
                                                                                                    />
                                                                                                    <div>
                                                                                                        <span
                                                                                                            className={
                                                                                                                styles.icotext1
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
                                                                                                                }
                                                                                                            </h6>
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
                                                                                                </div>
                                                                                            </div>
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
                                                                                                <span className='me-1 flight_stop_names'>
                                                                                                    {schedule.stopCount == 0
                                                                                                        ? 'Non Stop' : schedule.stopCount + ' stops'}
                                                                                                </span>
                                                                                                {/* <span className='me-1 stop_font'>via</span><span className='me-1 stop_font'>Kul</span> */}
                                                                                                {schedule.arrival.dateAdjustment && <div className='day_colr'>{"+" + schedule.arrival.dateAdjustment + (schedule.arrival.dateAdjustment == 1 ? "day" : "days")}</div>}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-4 text-left">
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

                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ))}</div>
                                                        </div>
                                                        <div className='col-md-4 col-sm-10 p-0 mt-2 mb-3 justify-content-center'>
                                                            <div
                                                                className={` ${styles.mycolumn3}`}>
                                                                <div
                                                                    className={` row ${styles.mysum}`}>
                                                                    <div className='col-6'>
                                                                        <div
                                                                            className={
                                                                                styles.mysum1
                                                                            }>
                                                                            <div>
                                                                                Class:
                                                                            </div>
                                                                            <div>
                                                                                {' '}
                                                                                Base
                                                                                Fare:
                                                                            </div>
                                                                            <div>
                                                                                {' '}
                                                                                Tax:
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-6'>
                                                                        <div>
                                                                            <div
                                                                                className={
                                                                                    styles.mysum4
                                                                                }>
                                                                                {' '}
                                                                                ({cabin_type[cabin]})
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.mysum2
                                                                                }>
                                                                                {
                                                                                    flight.currency
                                                                                }{' '}
                                                                                &nbsp;
                                                                                {(flight.basePrice).toLocaleString()}
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    styles.mysum3
                                                                                }>
                                                                                {' '}
                                                                                {
                                                                                    flight.currency
                                                                                }{' '}
                                                                                &nbsp;
                                                                                {
                                                                                    flight.totalTaxAmount.toLocaleString()
                                                                                }
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`  ${styles.mysumBorder}`}>
                                                                </div>


                                                                <div
                                                                    className=" row ">

                                                                    <div className='col-6'>

                                                                        <div
                                                                            className={
                                                                                styles.mysum1
                                                                            }>
                                                                            <div>
                                                                                {' '}
                                                                                Sub
                                                                                Total:
                                                                            </div>
                                                                            <div>
                                                                                {' '}
                                                                                Total
                                                                                (inc.Tax):{' '}
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className='col-6'>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                textDecorationLine:
                                                                                    'line-through', fontWeight: 600
                                                                            }}>
                                                                            {
                                                                                flight.currency
                                                                            }{' '}
                                                                            &nbsp;
                                                                            {
                                                                                flight.totalPrice.toLocaleString()
                                                                            }
                                                                        </div>
                                                                        {/* {flight.country==='BD' && flight.airline_iata!=='BS' &&<div style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                            color: "#0c0f1"
                                                                        }}>
                                                                            {
                                                                                flight.currency
                                                                            }{' '}
                                                                            &nbsp;
                                                                            {(Math.ceil(
                                                                // flight.totalPrice - flight.common_discount
                                                                (flight.totalPrice - 10)
                                                                // flight.totalPrice - 600
                                                            )).toLocaleString()}
                                                                        </div>} */}


                                                                        {flight.country==='BD' &&
                                                                        // flight.airline_iata==='BS'&&
                                                        <div
                                                            className={`${styles.discount_info3}`}>
                                                            {flight.currency}{' '}
                                                            &nbsp;
                                                            {(Math.ceil(
                                                                // flight.totalPrice>2000?flight.totalPrice-600: flight.totalPrice -
                                                                //  flight.common_discount
                                                                flight.totalPrice - flight.common_discount
                                                            )).toLocaleString()}
                                                        </div>}


                                                        {
    flight.country === 'international' &&
    <div className={`${styles.discount_info3}`}>
        {flight.currency}{' '}
        &nbsp;
        {(
            Math.ceil(
                flight.totalPrice - flight.basePrice *
                (flight.airline_iata === 'EK' || flight.airline_iata === 'TK' || flight.airline_iata === 'QR' ? 0.15 : 0.12)
            )
        ).toLocaleString()}
    </div>
}
                                                                        {/* {flight.country==='international' && flight.airline_iata==='EK'&&
                                                                        <div style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                            color: "#0c0f1"
                                                                        }}>
                                                                            {
                                                                                flight.currency
                                                                            }{' '}
                                                                            &nbsp;
                                                                            {(Math.ceil(
                                                                flight.totalPrice<100000?flight.totalPrice-5000: flight.totalPrice-7000
                                                            )).toLocaleString()}
                                                                        </div>} */}
                                                                    </div>

                                                                </div>
                                                                <div
                                                                    className={`${styles.mysum_after}`}>
                                                                    {/* <div
                                                                        className={
                                                                            styles.mysum1
                                                                        }>
                                                                        <div>
                                                                            {' '}
                                                                            Sub
                                                                            Total:
                                                                        </div>
                                                                        <div>
                                                                            {' '}
                                                                            Total
                                                                            (inc.Tax):{' '}
                                                                        </div>
                                                                    </div> */}
                                                                    <div>
                                                                        {/* <div
                                                              className={
                                                                  styles.mysum2
                                                              }>
                                                              <del>
                                                                  {
                                                                      data.fareCurrency
                                                                  }{' '}
                                                                  &nbsp;
                                                                  {data.publishedFareAmount +
                                                                      data.taxAmount}
                                                              </del>
                                                          </div> */}
                                                                        {/* <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                textDecorationLine:
                                                                                    'line-through', fontWeight: 600
                                                                            }}>
                                                                            {
                                                                                flight.currency
                                                                            }{' '}
                                                                            &nbsp;
                                                                            {
                                                                                flight.totalPrice.toLocaleString()
                                                                            }
                                                                        </div>
                                                                        <div style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 700,
                                                                            color: "#0c0f1"
                                                                        }}>
                                                                            {
                                                                                flight.currency
                                                                            }{' '}
                                                                            &nbsp;
                                                                            {(Math.ceil(
                                                                                flight.totalPrice - flight.common_discount
                                                                            )).toLocaleString()}
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                )}






                                                {flight.show_baggage_details && (
                                                    <div
                                                        className={
                                                            'tab-pane fade show active'
                                                        }
                                                        id="nav-profile"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-profile-tab">
                                                        <div className="card border-0">
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
                                                                        {flight.legDescriptions.map((legDesc) => (
                                                                            <tr>
                                                                                <td>
                                                                                    {
                                                                                        legDesc.departureLocation
                                                                                    }
                                                                                    -
                                                                                    {
                                                                                        legDesc.arrivalLocation
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        '7'
                                                                                    }
                                                                                    {flight.unit
                                                                                        ? flight.unit
                                                                                        : 'KG'}
                                                                                </td>
                                                                                <td>
                                                                                    {/* {flight.baggageInformation
                                                                            ? flight.baggageInformation.weight
                                                                            : 20}
                                                                        {flight.unit
                                                                            ? flight.unit
                                                                            : 'KG'} */}

                                                                                    {flight.baggageInformation &&
                                                                                        flight
                                                                                            .baggageInformation
                                                                                            .weight
                                                                                        ? flight
                                                                                            .baggageInformation
                                                                                            .weight
                                                                                        : flight.baggageInformation &&
                                                                                            flight
                                                                                                .baggageInformation
                                                                                                .description1
                                                                                            ? flight
                                                                                                .baggageInformation
                                                                                                .description1
                                                                                            : //   '\n' +
                                                                                            //   flight
                                                                                            //       .baggageInformation
                                                                                            //       .description2 +
                                                                                            //   '\n' +
                                                                                            //   flight
                                                                                            //       .baggageInformation
                                                                                            //       .pieceCount
                                                                                            // : flight.baggageInformation &&
                                                                                            //   flight
                                                                                            //       .baggageInformation
                                                                                            //       .pieceCount
                                                                                            // ? flight
                                                                                            //       .baggageInformation
                                                                                            //       .pieceCount
                                                                                            ''}
                                                                                    {flight.baggageInformation &&
                                                                                        flight
                                                                                            .baggageInformation
                                                                                            .unit
                                                                                        ? flight
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
                                                )}
                                                {flight.show_policy_details && (
                                                    <div
                                                        className={
                                                            'tab-pane fade show active'
                                                        }
                                                        id="nav-contact"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-contact-tab">
                                                        <div className="card border-0">
                                                            <div className="card-body">
                                                                <div>
                                                                    <div className="">
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
                                                                                    <br />
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                'normal'
                                                                                        }}>
                                                                                        *NT Convenience fee is non-refundable.


                                                                                    </p>

                                                                                    <br />
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                'normal'
                                                                                        }}>
                                                                                        *Vromon Aviation does not guarantee the accuracy of refund/date change fees.

                                                                                    </p>
                                                                                    <br />
                                                                                    <p
                                                                                        style={{
                                                                                            fontWeight:
                                                                                                'normal'
                                                                                        }}>
                                                                                        *The airline refund/date change fee is an estimation and can be changed without any prior notice by the airlines.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* end flight details */}
                                        </div>
                                    ) : (
                                        ''
                                    )}</div>
                            </div>
                        ))
                    // )
                    ) : (
                        <div className="no_flight_avail mt-2">
                            No Flight Available
                        </div>
                    )}
                </div>
            </div>
        </Layout >
    )
}
