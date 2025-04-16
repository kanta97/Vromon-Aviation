import { createContext, useState, useEffect,useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { API_AIR_URL, pgw_fee, ait_fee, sslDiscount } from '../config/index'
import { API_TRIP_URL } from '../config/index'
import { API_HOTEL_URL } from '../config/index'
import { excludedAirlines } from '../config/index'
import axios from 'axios'

import passenger_data from '../data/passengerDetails.json'
import cabin_type from '../data/cabinType.json'
import moment from 'moment/moment'

const FlightContext = createContext()
const MyBookingContext = createContext()

export const FlightProvider = ({ children }) => {
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425

    const [journeyDate, setJourneyDate] = useState(new Date())
    //const ISODate = dt.toISOString().split('T')[0]
    const button1Ref = useRef(null);
    const button2Ref = useRef(null);
    const [showDatePicker, setShowDatePicker] = useState(false); 
    const [paymentMethod, setPaymentMethod] = useState('bbl')
    const [flights, setFlights] = useState([])
    const [roundFlight, setRoundflights] = useState([])
    const [flightType, setFlightype] = useState('One Way')
    const [offersData, setOffersData] = useState()
    const [isLoading, setIsLoading] = useState(false);
    // const [airports, setAirports] = useState([])
    // const [airlines, setAirlines] = useState([])
    // const [logos, setLogos] = useState([])
    // const [journeyDate, setJourneyDate] = useState(new Date(moment(new Date()).add(0, 'days').format("yyyy-MM-DD")))
    const [returnDate, setReturnDate] = useState();
    const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const canvashandleOpen = () => setOffcanvasOpen(true);
    const canvashandleClose = () => setOffcanvasOpen(false);
    const [activeTab, setActiveTab] = useState('flight');
    const [currentSearch, setCurrentSearch] = useState('flight')
    const [trips, setTrips] = useState([
        {
            from: 'DAC',
            fromName: 'Hazrat Shahjalal International Airport',
            cityfrom:"Dhaka",
            journey_date: journeyDate,
            to: 'CXB',
            cityto:"Cox's Bazar",
            toName: "Cox's Bazar Airport",
            // from: 'DAC',
            // fromName: 'Hazrat Shahjalal International Airport',
            // fromCity: "Dhaka",
            // journey_date: new Date(),
            // to: 'CXB',
            // toName: "Cox's Bazar Airport",
            // toCity: "Cox's Bazar"



        },

    ])

    const [margeData, setMargeData] = useState([])

    const [myBookingData, setMybookingdata] = useState([])

    const [packageBooking, setPackageBooking] = useState([])
    const [hotelBooking, setHotelBooking] = useState([])

    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectedFlight, setSelectedFlight] = useState()

    const [multiCities, setMultiCitites] = useState([
        {
            from: null,
            fromName: null,
            journey_date: null,
            to: null,
            toName: null,
        },
    ])

    const [fromDestination, setFromDestination] = useState({
        name: 'Hazrat Shahjalal International Airport',
        city: 'Dhaka',
        cityfrom:"Dhaka",
        iata: 'DAC',
        country: 'Bangladesh',
    })
    const [toDestination, setToDestination] = useState({
        name: 'Austin Bergstrom International Airport',
        city: 'Austin',
        iata: 'AUS',
        cityto:"Cox's Bazar",
        country: 'United States',
    })

    const [adults, setAdults] = useState(1)
    const [_children, set_Children] = useState([])
    const [infants, setInfants] = useState(0)
    const [childCount, setChildCount] = useState(0)

    const [adultList, setAdultList] = useState([
        {
            who: 'Mr',
            title: 'ADT',
            dateOfBirth: '',
            passportIssueDate: '',
            passportExpireDate: '',
            name: '',
            surname: '',
            gender: 'male',
            passportNumber: '',
            contactNumber: '',
            email: '',
            countryOfIssue: 'Bangladesh',
            nationality: 'Bangladesh',
        },
    ])
    const [childrenList, setChildrenList] = useState([])
    const [infantList, setInfantList] = useState([])
    const [cabin, setCabin] = useState('Y')
    const [sessStartTime, setSessStartTime] = useState(null)

    const [timeFilterDep, seTtimeFilterDep] = useState("");
    const [initialFlights, setInitialFlights] = useState([]);
    const [timeFilterArr, seTtimeFilterArr] = useState("");

    ///////////////start new code////////////////////////////////////

    // const [version, setVersion] = useState()
    // const [messages, setMessages] = useState()
    const [statistics, setStatistics] = useState()
    // const [scheduleDescs, setScheduleDescs] = useState([])
    // const [taxDescs, setTaxDescs] = useState([])
    // // const [taxSummaryDescs] = useState()
    // // const [obFeeDescs] = useState()
    // // const [fareComponentDescs] = useState()
    // const [baggageAllowanceDescs, setBaggageAllowanceDescs] = useState([])
    // const [legDescs, setLegDescs] = useState([])
    // const [itineraryGroups, setItineraryGroups] = useState([])

    const [maxPrice, setMaxPrice] = useState(0)

    const [roundTripDate, setRoundTripDate] = useState({
        startDate: moment().format('yyyy-MM-DD'),
        endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
    })
    ///////////////end new code////////////////////////////////////

    // useEffect(() => {
    //     getFlights()
    // }, [adults, childCount, infants])

    const formatTime = (time) => {
        let split = time.split(':')
        return split[0] + ':' + split[1]
    }

    const handleSwapper = (index) => {
        let temp_trip = [...trips]
        let from = temp_trip[index].from
        let fromName = temp_trip[index].fromName
        let cityfrom =temp_trip[index].cityfrom
        let cityto =temp_trip[index].cityto
        temp_trip[index].from = temp_trip[index].to
        temp_trip[index].fromName = temp_trip[index].toName
        temp_trip[index].to = from
        temp_trip[index].toName = fromName
        temp_trip[index].cityfrom = temp_trip[index].cityto
        // temp_trip[index].fromName = temp_trip[index].toName
        temp_trip[index].cityto = cityfrom
        // temp_trip[index].toName = fromName
        setTrips(temp_trip)
    }

    const assignFromDestination = (dest, index) => {

        const temp_trip = [...trips]
        temp_trip[index].from = dest.iata
        temp_trip[index].fromName = dest.name
        temp_trip[index].cityfrom = dest.city
        setTrips(temp_trip)
    }
    const assignToDestination = (dest, index) => {
        const temp_trip = [...trips]
        temp_trip[index].to = dest.iata
        temp_trip[index].toName = dest.name
        temp_trip[index].cityto = dest.city
        setTrips(temp_trip)
    }
    const assignJourneyDate = (date, index) => {
        const temp_trip = [...trips];
        
        // Update selected index
        temp_trip[index].journey_date = new Date(date);
    
        // Update all later indexes with the new date
        for (let idx = index + 1; idx < temp_trip.length; idx++) {
            temp_trip[idx].journey_date = new Date(date);
        }
    
        // Special case: If index 0 is changed, update returnDate
        if (index === 0 && date > new Date(returnDate)) {
            setReturnDate(new Date(moment(date).add(3, 'days')));
        }
    
        setTrips(temp_trip);
        setSelectedFlight({ ...selectedFlight, init: true, trips: temp_trip });
  
    
        // const temp_trip = [...trips];

        // temp_trip[index].journey_date = new Date(date);
        // setTrips(temp_trip)

        // if (index == 0) {


        //     if (date > new Date(returnDate)) {

        //         setReturnDate(new Date(moment(date).add(1, 'days')));
        //         // selectedFlight.returnDate = new Date(moment(date).add(1, 'days'));

        //     }

        //     for (let idx = 0; idx < temp_trip.length; idx++) {

        //         temp_trip[idx].journey_date = new Date(date);

        //     }

        // } else {


        //     let reset = false;

        //     for (let idx = index; idx < temp_trip.length; idx++) {


        //         if (new Date(date) > new Date(temp_trip[idx].journey_date)) {

        //             reset = true;
        //             break;

        //         }

        //     }

        //     if (reset) {

        //         for (let idx = index; idx < temp_trip.length; idx++) {

        //             temp_trip[idx].journey_date = new Date(date);

        //         }

        //     } else {

        //         temp_trip[index].journey_date = new Date(date);

        //     }

        // }

        // setSelectedFlight({ ...selectedFlight, init: true, trips: temp_trip });



    }


    const assignFlight = async (flight) => {
        //console.log(flight)
        setSelectedFlight(flight)
        try {
            const sessResult = await axios.post('/api/sessionManager', {
                flight,
                sessStartTime,
            })
            const sessToken = sessResult.data.sessionToken
            localStorage.setItem(
                'nav-session',
                JSON.stringify({ token: sessToken })
            )
            Router.push('/checkout')
        } catch (e) {
            console.log(e)
            alert('Flight checking out failed. Please try again.')
        }
    }

    const get_time_string = (minutes) => {
        let hours = Math.floor(minutes / 60)
        minutes %= 60
        return `${hours}hr ${minutes}min`
    }

    const get_airport_name = (airport, airports) => {
        for (let i2 = 0; i2 < airports.length; i2++) {
            if (airport === airports[i2].iata) {
                return airports[i2].name
            }
        }
    }

    const get_airlines_name = (operating, airlines) => {
        for (let i2 = 0; i2 < airlines.length; i2++) {
            if (operating === airlines[i2].iata_code) {
                return {
                    icaoCode: airlines[i2].icao_code,
                    airlineName: airlines[i2].name,
                }
            }
        }
        return {
            icaoCode: null,
            airlineName: null,
        }
    }

    const get_airline_logo = (icaoCode, logos) => {
        for (let i2 = 0; i2 < logos.length; i2++) {
            if (icaoCode === logos[i2].airline) {
                return logos[i2].logo
            }
        }
    }

    const get_transit_time = (start_date, start_time, end_date, end_time) => {
        let start_string = start_date + 'T' + start_time
        let end_string = end_date + 'T' + end_time

        let flight_start_time = new Date(start_string)
        let flight_end_time = new Date(end_string)

        const diffInMilliseconds = Math.abs(flight_end_time - flight_start_time)

        const diffInMinutes = diffInMilliseconds / (1000 * 60)

        const hours = Math.floor(diffInMinutes / 60)
        const minutes = diffInMinutes % 60

        return hours + 'hr, ' + minutes + 'min'
    }

    const getFlights = async () => {
        setLoading(true)
        let discountData = await getDiscount()
        let defaultDiscount = discountData.value
        let airlinesDiscount = discountData.airlinesDiscount
        let flightDiscount = 0

        let scheduleDescs
        let taxDescs
        let baggageAllowanceDescs
        let legDescs
        let itineraryGroups

        const tokenRes = await fetch(`${API_AIR_URL}/token`)
        const tokenData = await tokenRes.json()
        //console.log('all airports', tokenRes)
        let flightSegment = []
        //console.log(flightType)
        if (flightType == 'One Way') {
            let temp_trip = { ...trips[0] }

            const localeDate = temp_trip.journey_date
                .toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })
                .split('/')

            const formattedDate =
                localeDate[2] + '-' + localeDate[1] + '-' + localeDate[0]

            temp_trip.journey_date = formattedDate

            flightSegment = [temp_trip]
        } else if (flightType == 'Round Way') {
            if (!roundTripDate.endDate) {
                alert('Please add return date')
                setFlights([])
                setLoading(false)
                return
            }

            let temp_trip = { ...trips[0] }
            flightSegment = [
                {
                    from: temp_trip.from,
                    fromName: temp_trip.fromName,
                    journey_date: roundTripDate.startDate,
                    to: temp_trip.to,
                    toName: temp_trip.toName,
                },
                {
                    from: temp_trip.to,
                    fromName: temp_trip.toName,
                    journey_date: roundTripDate.endDate,
                    to: temp_trip.from,
                    toName: temp_trip.fromName,
                },
            ]
        } else if (flightType == 'Multi City') {
            flightSegment = [...trips]
            for (let fs = 0; fs < flightSegment.length; fs++) {
                const jd = new Date(flightSegment[fs].journey_date)
                const localeDate = jd
                    .toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })
                    .split('/')

                const formattedDate =
                    localeDate[2] + '-' + localeDate[1] + '-' + localeDate[0]

                flightSegment[fs].journey_date = formattedDate
            }
        }

        let child_list = []

        for (let c = 0; c < childrenList.length; c++) {
            const dateNow = new Date()
            const dateThen = new Date(childrenList[c].dateOfBirth)
            let years = Math.ceil(
                (dateNow.getTime() - dateThen.getTime()) / MS_PER_YEAR
            )
            let newCode = ''

            if (years == 2) {
                newCode = 'C02'
            } else if (years == 3) {
                newCode = 'C03'
            } else if (years == 4) {
                newCode = 'C04'
            } else if (years == 5) {
                newCode = 'C05'
            } else if (years == 6) {
                newCode = 'C06'
            } else if (years == 7) {
                newCode = 'C07'
            } else if (years == 8) {
                newCode = 'C08'
            } else if (years == 9) {
                newCode = 'C09'
            } else if (years == 10) {
                newCode = 'C10'
            } else if (years == 11) {
                newCode = 'C11'
            } else {
                newCode = 'C12'
            }

            let found = false

            for (let c_i = 0; c_i < child_list.length; c_i++) {
                if (child_list[c_i].code === newCode) {
                    child_list[c_i].count++
                    found = true
                    break
                }
            }

            if (!found) {
                child_list.push({ code: newCode, count: 1 })
            }
        }

        let flightBody = {
            flightSegment: flightSegment,
            return_date: null,
            adult: adults,
            infant: infants,
            ins: 0,
            children: child_list,
            seatClass: cabin,
            token: tokenData.access_token,
        }

        console.log('flightBody', JSON.stringify(flightBody))

        const flightRes = await fetch(`${API_AIR_URL}/get_flights_post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flightBody),
        })

        const flightData = await flightRes.json()
        if (
            flightData.groupedItineraryResponse &&
            flightData.groupedItineraryResponse.statistics.itineraryCount != 0
        ) {
            scheduleDescs = flightData.groupedItineraryResponse.scheduleDescs
            taxDescs = flightData.groupedItineraryResponse.taxDescs
            baggageAllowanceDescs =
                flightData.groupedItineraryResponse.baggageAllowanceDescs
            legDescs = flightData.groupedItineraryResponse.legDescs
            itineraryGroups =
                flightData.groupedItineraryResponse.itineraryGroups
        } else {
            setError('Flight Error')
            setFlights([])
            setLoading(false)
            return new Error('Flight Error')
        }
        //console.log('one trip Print', flights)

        //   Airport API

        const res_airports = await fetch(`${API_AIR_URL}/airports`, {
            method: 'GET',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json',
            },
        })
        const airport_data = await res_airports.json()
        // console.log('want to see airports', data1.body)
        //setAirports(airport_data)
        let airports = airport_data.body
        // Airlines API

        const res_airlines = await fetch(`${API_AIR_URL}/airlines`, {
            method: 'GET',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json',
            },
        })
        const airlines_data = await res_airlines.json()

        let airlines = airlines_data.body
        //    Logos API
        const res_logos = await fetch(`${API_AIR_URL}/logos`, {
            method: 'GET',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json',
            },
        })
        const logo_data = await res_logos.json()

        let logos = logo_data.body
        //console.log(baggageAllowanceDescs)
        var itineraries = itineraryGroups[0].itineraries
        var groupDescription =
            itineraryGroups[0].groupDescription.legDescriptions

        let flgiht_descs = []
        for (let i = 0; i < itineraries.length; i++) {
            try {
                let new_flight = {}

                let international_flag = false
                let itinerary = itineraries[i]
                let totalFare = itinerary
                    ? itinerary.pricingInformation[0].fare.totalFare
                    : 0
                let passengerInfoList = itinerary
                    ? itinerary.pricingInformation[0].fare.passengerInfoList
                    : []

                new_flight.show_details = false
                new_flight.show_flight_details = false
                new_flight.show_baggage_details = false
                new_flight.show_policy_details = false

                new_flight.legDescriptions = groupDescription

                new_flight.adult = { count: 0, totalFare: 0, totalTax: 0 }
                new_flight.child = { count: 0, totalFare: 0, totalTax: 0 }
                new_flight.infant = { count: 0, totalFare: 0, totalTax: 0 }

                //new_flight.bookingCode = passengerInfoList[0].passengerInfo.fareComponents[0].segments[0].segment.bookingCode
                for (let k = 0; k < passengerInfoList.length; k++) {
                    let passengerInfo = passengerInfoList[k].passengerInfo
                    //console.log(passengerInfo)
                    let tmp = {}
                    if (passengerInfo.passengerType == 'ADT') {
                        tmp.totalFare =
                            passengerInfo.passengerTotalFare.equivalentAmount
                        tmp.totalTax =
                            passengerInfo.passengerTotalFare.totalTaxAmount
                        tmp.count = passengerInfo.passengerNumber
                        new_flight.adult = tmp
                    } else if (passengerInfo.passengerType == 'INF') {
                        tmp.totalFare =
                            passengerInfo.passengerTotalFare.equivalentAmount
                        tmp.totalTax =
                            passengerInfo.passengerTotalFare.totalTaxAmount
                        tmp.count = passengerInfo.passengerNumber
                        new_flight.infant = tmp
                    } else {
                        tmp.totalFare =
                            passengerInfo.passengerTotalFare.equivalentAmount
                        tmp.totalTax =
                            passengerInfo.passengerTotalFare.totalTaxAmount
                        tmp.count = passengerInfo.passengerNumber
                        new_flight.child = tmp
                    }
                }
                //console.log(new_flight)
                let baggageRef
                if (passengerInfoList.length > 0) {
                    baggageRef =
                        passengerInfoList[0].passengerInfo.baggageInformation[0]
                            .allowance.ref

                    new_flight.baggageInformation =
                        baggageAllowanceDescs[baggageRef - 1]
                }

                let fareSegments = []
                for (
                    let fc = 0;
                    fc <
                    passengerInfoList[0].passengerInfo.fareComponents.length;
                    fc++
                ) {
                    let fareComponent =
                        passengerInfoList[0].passengerInfo.fareComponents[fc]
                    for (let fs = 0; fs < fareComponent.segments.length; fs++) {
                        fareSegments.push(fareComponent.segments[fs])
                    }
                }

                new_flight.currency = totalFare?.currency
                new_flight.equivalentAmount = totalFare?.currency

                new_flight.totalPrice = totalFare?.totalPrice
                new_flight.basePrice = totalFare?.equivalentAmount

                new_flight.weight = baggageRef
                    ? baggageAllowanceDescs[baggageRef - 1].weight
                        ? baggageAllowanceDescs[baggageRef - 1].weight
                        : ''
                    : ''
                new_flight.unit = baggageRef
                    ? baggageAllowanceDescs[baggageRef - 1].unit
                        ? baggageAllowanceDescs[baggageRef - 1].unit
                        : ''
                    : ''
                new_flight.way = flightType

                new_flight.legs = []
                new_flight.elapsedTime = 0
                new_flight.stopCount = 0

                itinerary?.legs?.map((item, idx) => {
                    let ref = item.ref
                    let leg = {}

                    leg.elapsedTime = legDescs[ref - 1].elapsedTime
                    leg.elapsedTimeS = get_time_string(
                        legDescs[ref - 1].elapsedTime
                    )
                    new_flight.elapsedTime =
                        new_flight.elapsedTime + leg.elapsedTime

                    leg.schedules = []
                    leg.stops = []
                    let schedule_ref = [...legDescs[ref - 1].schedules]

                    schedule_ref?.map((schedule, index) => {
                        let route = JSON.parse(
                            JSON.stringify(scheduleDescs[schedule.ref - 1])
                        )

                        route.elapsedTimeS = get_time_string(route.elapsedTime)

                        route.bookingCode =
                            fareSegments[index].segment.bookingCode

                        route.departure.airportName = get_airport_name(
                            route.departure.airport,
                            airports
                        )
                        route.arrival.airportName = get_airport_name(
                            route.arrival.airport,
                            airports
                        )

                        route.departure.f_time = formatTime(
                            route.departure.time
                        )
                        route.arrival.f_time = formatTime(route.arrival.time)

                        let airline_data = get_airlines_name(
                            route.carrier.operating,
                            airlines
                        )
                        route.carrier.icaoCode = airline_data.icaoCode
                        route.carrier.airlineName = airline_data.airlineName

                        route.carrier.logo = get_airline_logo(
                            airline_data.icaoCode,
                            logos
                        )

                        if (index == 0) {
                            new_flight.airlineName = route.carrier.airlineName
                            new_flight.airline_code = route.carrier.operating
                            new_flight.airline_iata = route.carrier.operating
                            new_flight.logo = route.carrier.logo
                            route.departure.date =
                                groupDescription[idx].departureDate
                        } else {
                            //route.departure.date = leg.schedules[index - 1].arrival.date
                            leg.stops.push(route.departure.airport)
                        }

                        if (schedule.departureDateAdjustment) {
                            let initialDate = new Date(
                                groupDescription[idx].departureDate
                            )
                            let nextDay = new Date(
                                initialDate.setDate(
                                    initialDate.getDate() +
                                        schedule.departureDateAdjustment
                                )
                            )
                            route.departure.date = nextDay
                                .toISOString()
                                .slice(0, 10)
                        } else {
                            //route.departure.date = leg.schedules[index - 1].arrival.date
                            route.departure.date =
                                groupDescription[idx].departureDate
                        }

                        if (route.arrival.dateAdjustment) {
                            let initialDate = new Date(route.departure.date)
                            let nextDay = new Date(
                                initialDate.setDate(
                                    initialDate.getDate() +
                                        route.arrival.dateAdjustment
                                )
                            )
                            route.arrival.date = nextDay
                                .toISOString()
                                .slice(0, 10)
                        } else {
                            route.arrival.date = route.departure.date
                        }

                        leg.schedules.push(route)

                        if (route.arrival.dateAdjustment) {
                            leg.dateAdjustment = leg.dateAdjustment
                                ? leg.dateAdjustment +
                                  route.arrival.dateAdjustment
                                : route.arrival.dateAdjustment
                        }

                        if (
                                route.arrival.country != 'BD' ||
                                route.departure.country != 'BD'
                            //  && (route.arrival.country != 'IN'  || route.departure.country != 'BD' ) && (route.arrival.country != 'IN'  || route.departure.country != 'IN')
                        ) {
                            international_flag = true
                        }
                    })

                    leg.departure = {}
                    leg.arrival = {}

                    leg.departure.time =
                        scheduleDescs[schedule_ref[0].ref - 1].departure.time
                    leg.departure.f_time = formatTime(leg.departure.time)
                    leg.departure.date = leg.schedules[0].departure.date //groupDescription[idx].departureDate
                    leg.departure.departureLocation =
                        groupDescription[idx].departureLocation
                    leg.departure.airportName = get_airport_name(
                        groupDescription[idx].departureLocation,
                        airports
                    )

                    leg.arrival.time =
                        scheduleDescs[
                            schedule_ref[schedule_ref.length - 1].ref - 1
                        ].arrival.time
                    leg.arrival.f_time = formatTime(leg.arrival.time)

                    // if (leg.dateAdjustment) {
                    //     let initialDate = new Date(groupDescription[idx].departureDate);
                    //     let nextDay = new Date(initialDate.setDate(initialDate.getDate() + leg.dateAdjustment));
                    //     leg.arrival.date = nextDay.toISOString().slice(0, 10)
                    // } else {
                    //     leg.arrival.date = leg.departure.date
                    // }

                    leg.arrival.date =
                        leg.schedules[leg.schedules.length - 1].arrival.date

                    leg.arrival.arrivalLocation =
                        groupDescription[idx].arrivalLocation
                    leg.arrival.airportName = get_airport_name(
                        groupDescription[idx].arrivalLocation,
                        airports
                    )

                    leg.stopCount = leg.schedules.length - 1

                    new_flight.stopCount = new_flight.stopCount + leg.stopCount

                    if (international_flag) {
                        new_flight.country = 'international'
                    } else {
                        new_flight.country = 'BD'
                    }

                    new_flight.legs.push(leg)
                })

                //////////////////changes for airlines based discount --- start////////////////////

                flightDiscount = defaultDiscount
                // if(new_flight.airline_code==='EK') {
                //     new_flight.common_discount = Math.floor(
                //         new_flight.basePrice * airlinesDiscount['EK']
                //     )
                // }
                // else{
                //     new_flight.common_discount = Math.floor(
                //         new_flight.basePrice * flightDiscount
                //     )
                // }
                new_flight.common_discount = Math.floor(
                    new_flight.basePrice * flightDiscount
                )

                new_flight.ait_fee = Math.ceil(new_flight.totalPrice * ait_fee)
                new_flight.pgw_fee = Math.ceil(
                    (new_flight.totalPrice +
                        new_flight.ait_fee -
                        new_flight.common_discount) *
                        pgw_fee
                )
                new_flight.total_amount =
                    new_flight.totalPrice +
                    new_flight.ait_fee +
                    new_flight.pgw_fee -
                    new_flight.common_discount

                // let discountAmount = discountData.discountAmount[new_flight?.airline_code];

                // if (discountAmount > 0 && new_flight.country == "BD") {

                //     flightDiscount = discountAmount;

                //     new_flight.common_discount = Math.floor(new_flight.basePrice * flightDiscount)
                //     new_flight.ait_fee = Math.ceil(new_flight.totalPrice * ait_fee)
                //     new_flight.pgw_fee = Math.ceil((new_flight.totalPrice + new_flight.ait_fee - new_flight.common_discount) * pgw_fee)
                //     new_flight.total_amount = (new_flight.totalPrice + new_flight.ait_fee + new_flight.pgw_fee) - new_flight.common_discount

                // } else {

                //     if (airlinesDiscount[new_flight.airline_code]) {
                //         console.log(airlinesDiscount[new_flight.airline_code])
                //         flightDiscount = airlinesDiscount[new_flight.airline_code]
                //     } else {
                //         flightDiscount = defaultDiscount
                //     }

                //     new_flight.common_discount = Math.floor(new_flight.basePrice * flightDiscount)
                //     new_flight.ait_fee = Math.ceil(new_flight.totalPrice * ait_fee)
                //     new_flight.pgw_fee = Math.ceil((new_flight.totalPrice + new_flight.ait_fee - new_flight.common_discount) * pgw_fee)
                //     new_flight.total_amount = (new_flight.totalPrice + new_flight.ait_fee + new_flight.pgw_fee) - new_flight.common_discount;
                // }

                if (new_flight.totalPrice > maxPrice) {
                    setMaxPrice(new_flight.totalPrice)
                }

                new_flight.totalTaxAmount = totalFare?.totalTaxAmount

                //////////////////changes for airlines based discount --- end////////////////////

                for (let ld = 0; ld < new_flight.legs.length; ld++) {
                    new_flight.legDescriptions[ld].airportFrom =
                        get_airport_name(
                            new_flight.legDescriptions[ld].departureLocation,
                            airports
                        )
                    new_flight.legDescriptions[ld].airportTo = get_airport_name(
                        new_flight.legDescriptions[ld].arrivalLocation,
                        airports
                    )
                }

                if (excludedAirlines.includes(new_flight.airline_code)) {
                    continue
                } else {
                    flgiht_descs.push(new_flight)
                }
            } catch (e) {
                console.log(e)
            }
        }
        //console.log(flgiht_descs)
        let sessTime = new Date()
        setSessStartTime(sessTime.getTime())
        setFlights(flgiht_descs)
        setLoading(false)
    }

    const handleCabin = (c_type) => {
        setCabin(c_type)
    }

    // My Booking data
    const myBooking = async (id) => {
        try {
            setLoading(false)
            const response = await fetch(
                `${API_AIR_URL}/my-pnr/${
                    JSON.parse(localStorage.getItem('userInfo')).userId
                }`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()

            //console.log('want to see response', data.body)
            let customers = ''
            for (let i = 0; i < data.body.length; i++) {
                data.body[i].customer = JSON.parse(data.body[i].customer)
            }
            for (let i = 0; i < data.body.length; i++) {
                data.body[i].pnr_body = JSON.parse(data.body[i].pnr_body)
            }
            // const customerData = JSON.parse(customers)
            // console.log('customer data', customerData)
            // console.log('customer data', customerData.contact_number)

            setMybookingdata(data.body)
        } catch (error) {
            console.log('error', error)
        }
    }

    const myPackageBooking = async (id) => {
        try {
            setLoading(false)
            const response = await fetch(
                `${API_TRIP_URL}/bookedpackage/search?limit=10&offset=1&user_id=${
                    JSON.parse(localStorage.getItem('userInfo')).userId
                }`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()

            //console.log('package', data.body)
            let customers = ''
            // for (let i = 0; i < data.body.length; i++) {
            //     data.body[i].customer = JSON.parse(data.body[i].customer)
            // }
            // for (let i = 0; i < data.body.length; i++) {
            //     data.body[i].pnr_body = JSON.parse(data.body[i].pnr_body)
            // }
            // const customerData = JSON.parse(customers)
            // console.log('customer data', customerData)
            // console.log('customer data', customerData.contact_number)

            setPackageBooking(data.body)
        } catch (error) {
            console.log('error', error)
        }
    }

    const myHotelBooking = async (id) => {
        try {
            setLoading(false)
            const response = await fetch(
                `${API_HOTEL_URL}/ws/getAllBookingListForCustomer?userId=${
                    JSON.parse(localStorage.getItem('userInfo')).userId
                }`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()

            //console.log('Hotel', data.body)
            let customers = ''
            // for (let i = 0; i < data.body.length; i++) {
            //     data.body[i].customer = JSON.parse(data.body[i].customer)
            // }
            // for (let i = 0; i < data.body.length; i++) {
            //     data.body[i].pnr_body = JSON.parse(data.body[i].pnr_body)
            // }
            // const customerData = JSON.parse(customers)
            // console.log('customer data', customerData)
            // console.log('customer data', customerData.contact_number)

            setHotelBooking(data.body)
        } catch (error) {
            console.log('error', error)
        }
    }

    // const addTraveler = (type, dob) => {
    //     let newPassenger = {
    //         dateOfBirth: '',
    //         passportIssueDate: '',
    //         passportExpireDate: '',
    //         name: '',
    //         surname: '',
    //         gender: 'male',
    //         passportNumber: '',
    //         contactNumber: '',
    //         email: '',
    //         countryOfIssue: 'Bangladesh',
    //         nationality: 'Bangladesh',
    //     }
    //     if (type == 'children') {
    //         const dob = new Date(
    //             new Date().setFullYear(new Date().getFullYear() - 2)
    //         )

    //         newPassenger.who = 'Mr'
    //         newPassenger.title = 'child'
    //         newPassenger.dateOfBirth = dob
    //         setChildCount((count) => count + 1)
    //         let tempChdlist = [...childrenList, newPassenger]
    //         setChildrenList(tempChdlist)
    //     } else if (type == 'infant') {
    //         if (adultList.length >= 7) {
    //             return;
    //         }
    //         newPassenger.who = 'Mr'
    //         newPassenger.title = 'infant'

    //         setInfants((count) => count + 1)
    //         let tempInflist = [...infantList, newPassenger]
    //         setInfantList(tempInflist)
    //     } else {
           
    //         newPassenger.who = 'Mr'
    //         newPassenger.title = 'adult'
    //         setAdults((count) => count + 1)
    //         let tempAdtlist = [...adultList, newPassenger]
    //         setAdultList(tempAdtlist)
    //     }
    // }
    const addTraveler = (type) => {
        let totalAdultsAndChildren = adultList.length + childrenList.length;
        let totalTravelers = totalAdultsAndChildren + infantList.length;
    
        if (type === 'children') {
            if (totalAdultsAndChildren >= 7 || totalTravelers >= 14) {
                return; // Prevent adding more children if max limit reached
            }
            let newPassenger = {
                dateOfBirth: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
                passportIssueDate: '',
                passportExpireDate: '',
                name: '',
                surname: '',
                gender: 'male',
                passportNumber: '',
                contactNumber: '',
                email: '',
                countryOfIssue: 'Bangladesh',
                nationality: 'Bangladesh',
                who: 'Mr',
                title: 'child'
            };
    
            setChildCount((count) => count + 1);
            setChildrenList([...childrenList, newPassenger]);
        } else if (type === 'infant') {
            if (infantList.length >= 7 || totalTravelers >= 14) {
                return; // Prevent adding more infants if max limit reached
            }
    
            let newPassenger = {
                dateOfBirth: '',
                passportIssueDate: '',
                passportExpireDate: '',
                name: '',
                surname: '',
                gender: 'male',
                passportNumber: '',
                contactNumber: '',
                email: '',
                countryOfIssue: 'Bangladesh',
                nationality: 'Bangladesh',
                who: 'Mr',
                title: 'infant'
            };
    
            setInfants((count) => count + 1);
            setInfantList([...infantList, newPassenger]);
        } else {
            if (totalAdultsAndChildren >= 7 || totalTravelers >= 14) {
                return; // Prevent adding more adults if max limit reached
            }
    
            let newPassenger = {
                dateOfBirth: '',
                passportIssueDate: '',
                passportExpireDate: '',
                name: '',
                surname: '',
                gender: 'male',
                passportNumber: '',
                contactNumber: '',
                email: '',
                countryOfIssue: 'Bangladesh',
                nationality: 'Bangladesh',
                who: 'Mr',
                title: 'adult'
            };
    
            setAdults((count) => count + 1);
            setAdultList([...adultList, newPassenger]);
        }
    };
    
    const removeTraveler = (type) => {
        if (type == 'children') {
            if (childCount - 1 < 0) {
                setChildCount(0)
            } else {
                setChildCount((count) => count - 1)
                let tempChdlist = [...childrenList]
                tempChdlist.pop()
                setChildrenList(tempChdlist)
            }
        } else if (type == 'infant') {
            if (infants - 1 < 0) {
                setInfants(0)
            } else {
                setInfants((count) => count - 1)
                let tempInflist = [...infantList]
                tempInflist.pop()
                setInfantList(tempInflist)
            }
        } else {
            if (adults - 1 < 1) {
                setAdults(1)
            } else {
                setAdults((count) => count - 1)
                let tempAdtlist = [...adultList]
                tempAdtlist.pop()
                setAdultList(tempAdtlist)
            }
        }
    }

    const addMultiCity = () => {
        const newTravel = {
            from: null,
            fromName: null,
            journey_date: null,
            to: null,
            toName: null,
        }
        const temp = [...multiCities, newTravel]

        if (temp.length > 4) {
            return
        }
        setMultiCitites(temp)
    }
    // const addTrip = () => {
    //     const newTravel = {
    //         from: trips[trips.length - 1].to,
    //         cityfrom:trips[trips.length - 1].cityto,
    //         cityto:"Select",
    //         fromName: trips[trips.length - 1].toName,
    //         journey_date: new Date(),
    //         to: null,
    //         toName: null,
    //     }
    //     const temp = [...trips, newTravel]

    //     if (temp.length > 4) {
    //         return
    //     }
    //     setTrips(temp)
    // }
    const addTrip = () => {
        if (trips.length >= 4) {
            return; // Prevent adding more than 4 trips
        }
    
        const lastTrip = trips[trips.length - 1]; // Get the last trip
        const newTravel = {
            from: lastTrip.to,
            cityfrom: lastTrip.cityto,
            cityto: "Select",
            fromName: lastTrip.toName,
            journey_date: new Date(lastTrip.journey_date), // Set new trip date to last trip's date
            to: null,
            toName: null,
        };
    
        const temp = [...trips, newTravel]; // Add new trip to the list
        setTrips(temp);
    };
    
    const formate_date_pnr = (date) => {
        const dt = new Date(date)
        const formattedDate = dt
            .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })
            .split(' ')
            .join('-')

        return formattedDate
    }

    // const validate_customer_data = (customers) => {
    //     for (let i = 0; i < customers.length; i++) {
    //         let customer = customers[i]
    //         if (
    //             customer.dateOfBirth == null ||
    //             customer.dateOfBirth.length == 0 ||
    //             customer.dateOfBirth == undefined
    //         ) {
    //             return 'Date of birth'
    //         }

    //         else if (
    //             customer.name == null ||
    //             customer.name.length == 0 ||
    //             customer.name == undefined
    //         ) {
    //             return 'Name'
    //         } else if (
    //             customer.surname == null ||
    //             customer.surname.length == 0 ||
    //             customer.surname == undefined
    //         ) {
    //             return 'Surname'
    //         } else if (
    //             customer.gender == null ||
    //             customer.gender.length == 0 ||
    //             customer.gender == undefined
    //         ) {
    //             return 'Gender'
    //         } else if (
    //             selectedFlight.country != 'BD' &&
    //             (customer.passportNumber == null ||
    //                 customer.passportNumber.length == 0 ||
    //                 customer.passportNumber == undefined)
    //         ) {
    //             return 'Passport number'
    //         }
    //         else if (
    //             selectedFlight.country != 'BD' &&
    //             (customer.passportIssueDate == null ||
    //                 customer.passportIssueDate.length == 0 ||
    //                 customer.passportIssueDate == undefined)
    //         ) {
    //             return 'Passport issue date'
    //         }
    //         else if (
    //             selectedFlight.country != 'BD' &&
    //             (customer.passportExpireDate == null ||
    //                 customer.passportExpireDate.length == 0 ||
    //                 customer.passportExpireDate == undefined)
    //         ) {
    //             return 'Passport expire date'
    //         }

    //         else if (
    //             customer.email == null ||
    //             customer.email.length == 0 ||
    //             customer.email == undefined
    //         ) {
    //             return 'email'
    //         }
    //         else if (
    //             // selectedFlight.airline_iata !== 'EK'&&
    //             !paymentMethod
    //         ) {
    //             return 'Payment Method'
    //         }
    //         else if (
    //             customer.contactNumber == null ||
    //             customer.contactNumber.length == 0 ||
    //             customer.contactNumber == undefined
    //         ) {
    //             return 'Contact number'
    //         }
    //         // else if (
    //         //     selectedFlight.country != 'BD' &&
    //         //     (customer.countryOfIssue == null ||
    //         //         customer.countryOfIssue.length == 0 ||
    //         //         customer.countryOfIssue == undefined)
    //         // ) {
    //         //     return 'Country'
    //         // }
    //         //  else if (
    //         //     selectedFlight.country != 'BD' &&
    //         //     (customer.nationality == null ||
    //         //         customer.nationality.length == 0 ||
    //         //         customer.nationality == undefined)
    //         // ) {
    //         //     return 'Country'
    //         // }
    //         else {
    //             return 'OK'
    //         }
    //     }
    // }
    //new validation code start
    // const validate_customer_data = (customers, selectedFlight) => {
    //     let errors = [];

    //     customers.forEach(customer => {
    //         if (
    //             customer.dateOfBirth == null ||
    //             customer.dateOfBirth.length == 0 ||
    //             customer.dateOfBirth == undefined
    //         ) {
    //             errors.push('Date of birth');
    //         } else if (
    //             selectedFlight && selectedFlight.country != 'BD' &&
    //             (customer.passportIssueDate == null ||
    //                 customer.passportIssueDate.length == 0 ||
    //                 customer.passportIssueDate == undefined)
    //         ) {
    //             errors.push('Passport issue date');
    //         } else if (
    //             selectedFlight && selectedFlight.country != 'BD' &&
    //             (customer.passportExpireDate == null ||
    //                 customer.passportExpireDate.length == 0 ||
    //                 customer.passportExpireDate == undefined)
    //         ) {
    //             errors.push('Passport expire date');
    //         } else if (
    //             customer.name == null ||
    //             customer.name.length == 0 ||
    //             customer.name == undefined
    //         ) {
    //             errors.push('Given Name');
    //         } else if (
    //             customer.surname == null ||
    //             customer.surname.length == 0 ||
    //             customer.surname == undefined
    //         ) {
    //             errors.push('Surname');
    //         } else if (
    //             customer.gender == null ||
    //             customer.gender.length == 0 ||
    //             customer.gender == undefined
    //         ) {
    //             errors.push('Gender');
    //         } else if (
    //             selectedFlight && selectedFlight.country != 'BD' &&
    //             (customer.passportNumber == null ||
    //                 customer.passportNumber.length == 0 ||
    //                 customer.passportNumber == undefined)
    //         ) {
    //             errors.push('Passport number');
    //         } else if (
    //             customer.contactNumber == null ||
    //             customer.contactNumber.length == 0 ||
    //             customer.contactNumber == undefined
    //         ) {
    //             errors.push('Contact number');
    //         } else if (
    //             customer.email == null ||
    //             customer.email.length == 0 ||
    //             customer.email == undefined
    //         ) {
    //             errors.push('Email');
    //         }
    //     });

    //     if (errors.length > 0) {
    //         return errors.join(', ');
    //     } else {
    //         return 'OK';
    //     }
    // }
     //new validation code end

     const validate_customer_data = (customers, selectedFlight) => {
      let errors = {};

      customers.forEach((customer, index) => {
        const { title } = customer || {};
        const { dateOfBirth } = customer || {};
        const { name } = customer || {};
        const { surname } = customer || {};
        const { email } = customer || {};
        const { contactNumber } = customer || {};
        const { passportNumber } = customer || {};
        const { passportIssueDate } = customer || {};
        const { passportExpireDate } = customer || {};
        // const { nationality } = customer || "Bangladesh";

        if (title === "ADT" || title === "adult") {
          // Full validation for Adults

          if (!name) errors[`${index}_name`] = "Given name is required";
          if (!surname) errors[`${index}_surname`] = "Surname is required";


          if (selectedFlight && selectedFlight.country !== "BD") {
            if (!passportNumber)
              errors[`${index}_passportNumber`] = "Passport Number is required";
            if (!passportIssueDate)
              errors[`${index}_passportIssueDate`] =
                "Passport issue date is required";
            if (!passportExpireDate)
              errors[`${index}_passportExpireDate`] =
                "Passport expire date is required";

                    //   if (!nationality)
                    //     errors[`${index}_nationality`] =
                    //       "Nationality is required";
          }
          if (!email) errors[`${index}_email`] = "Email is required";
          if (!contactNumber)
            errors[`${index}_contactNumber`] = "Contact number is required";
          if (!dateOfBirth)
            errors[`${index}_dateOfBirth`] = "Date of birth is required";
        }
         else if (title === "child" || title === "infant") {
          // Limited validation for Children and Infants
          if (!name) errors[`${index}_name`] = "Given name is required";
          if (!surname) errors[`${index}_surname`] = "Surname is required";
          if (!dateOfBirth)
            errors[`${index}_dateOfBirth`] = "Date of birth is required";

        }
      });

      return Object.keys(errors).length === 0 ? "OK" : errors;
    };


    const calculatePrice = (equivalentAmount, tax, discount, disDiff) => {
        var grose = parseInt(equivalentAmount) + parseInt(tax)

        var dis = Math.ceil(equivalentAmount * discount)
        let disDiffAmount = Math.ceil(equivalentAmount * disDiff)

        var disPrice = equivalentAmount - dis

        var ait = Math.ceil(grose * ait_fee)

        var subTotal = Math.ceil(
            equivalentAmount - equivalentAmount * discount + ait + tax
        )

        var pgw = Math.ceil(subTotal * pgw_fee)

        var total = subTotal + pgw

        return {
            dis: dis,
            disPrice: disPrice,
            ait: ait,
            subTotal: subTotal,
            pgw: pgw,
            total: total,
            disDiffAmount,
        }
    }

    const create_pnr = async () => {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()

        if (
            currentHour >= 23 ||
            currentHour < 9 ||
            (currentHour === 9 && currentMinute < 30)
        ) {
            // It is after 11:59 PM (hour >= 0) or before 9 AM (hour < 9)
            alert(
                'You can book the ticket only this time period (9:31 AM to 11:29 PM)'
            )
        } else {
            const tokenRes = await fetch(`${API_AIR_URL}/token`)
            const tokenData = await tokenRes.json()
            const userId = JSON.parse(localStorage.getItem('userInfo')).userId
            // console.log(tokenData)
            // console.log(userId)
            let payment_ref
            const [, ...temp_adultList] = adultList
            const customers = [
                ...temp_adultList,
                ...childrenList,
                ...infantList,
            ]

            for (let i = 0; i < customers.length; i++) {
                customers[i].dateOfBirth = formate_date_pnr(
                    customers[i].dateOfBirth
                )
                customers[i].passportIssueDate = formate_date_pnr(
                    customers[i].passportIssueDate
                )
                customers[i].passportExpireDate = formate_date_pnr(
                    customers[i].passportExpireDate
                )
            }



            let fl_legs = []

            for (let n = 0; n < selectedFlight.legs.length; n++) {
                for (
                    let m = 0;
                    m < selectedFlight.legs[n].schedules.length;
                    m++
                ) {
                    let leg = selectedFlight.legs[n].schedules[m]
                    let new_leg = {}

                    new_leg.ArrivalDateTime =
                        leg.arrival.date + 'T' + leg.arrival.f_time + ':00'
                    new_leg.DepartureDateTime =
                        leg.departure.date + 'T' + leg.departure.f_time + ':00'
                    new_leg.FlightNumber = leg.carrier.marketingFlightNumber
                    new_leg.baggageInfo = selectedFlight.baggageInformation
                    new_leg.DestinationLocationCode = leg.arrival.airport
                    new_leg.OriginLocationCode = leg.departure.airport
                    new_leg.MarketingAirlineCode = leg.carrier.marketing
                    new_leg.ResBookDesigCode = leg.bookingCode
                    new_leg.operatingCarrierCode = leg.carrier.operating
                    new_leg.operatingFlightNumber =
                        leg.carrier.operatingFlightNumber

                    fl_legs.push(new_leg)
                }
            }

            var total_amount = 0
            var discount_amount = 0
            let disDiffAmount = 0

            let discountData = await getDiscount()
            let defaultDiscount = discountData.value
            let discountAmount = discountData.discountAmount

            if (discountAmount[selectedFlight?.airline_iata] > 0) {
                var c_price = calculatePrice(
                    selectedFlight?.basePrice,
                    selectedFlight?.totalTaxAmount,
                    discountAmount[selectedFlight?.airline_iata],
                    discountData.disDiff
                )

                discount_amount = c_price?.dis
                disDiffAmount = c_price?.disDiffAmount

                total_amount = selectedFlight.total_amount + discount_amount
            } else {
                var c_price = calculatePrice(
                    selectedFlight?.basePrice,
                    selectedFlight?.totalTaxAmount,
                    defaultDiscount,
                    discountData.disDiff
                )

                discount_amount = c_price?.dis
                disDiffAmount = c_price?.disDiffAmount

                total_amount = selectedFlight.total_amount + discount_amount
            }

            // var total_amount = 0;
            // var discount_amount = 0;

            // if (selectedFlight?.country == "BD") {

            //     if (selectedFlight?.airline_iata == "BS" || selectedFlight?.airline_iata == "BG") {

            //         let discountData = await getDiscount()
            //         let defaultDiscount = discountData.value
            //         let discountAmount = discountData.discountAmount

            //         var c_price = calculatePrice(selectedFlight?.basePrice,
            //             selectedFlight?.totalTaxAmount,
            //             (discountAmount[selectedFlight?.airline_iata] - defaultDiscount)
            //         );

            //         discount_amount = c_price?.dis;

            //         total_amount = selectedFlight.total_amount;

            //     } else {
            //         total_amount = selectedFlight.total_amount;
            //     }

            // }
            // else {

            //     total_amount = selectedFlight.total_amount;

            // }

            // for (let n = 0; n < selectedFlight.legs.length; n++) {
            //     let leg = selectedFlight.legs[n]
            //     let new_leg = {}

            //     new_leg.ArrivalDateTime = leg.arrival.date + "T" + leg.arrival.f_time + ":00"
            //     new_leg.DepartureDateTime = leg.departure.date + "T" + leg.departure.f_time + ":00"
            //     new_leg.FlightNumber = leg.schedules[0].carrier.marketingFlightNumber
            //     new_leg.baggageInfo = selectedFlight.baggageInformation
            //     new_leg.DestinationLocationCode = leg.arrival.arrivalLocation
            //     new_leg.OriginLocationCode = leg.departure.departureLocation
            //     new_leg.MarketingAirlineCode = leg.schedules[0].carrier.marketing
            //     new_leg.ResBookDesigCode = selectedFlight.bookingCode
            //     new_leg.operatingCarrierCode = leg.schedules[0].carrier.operating
            //     new_leg.operatingFlightNumber = leg.schedules[0].carrier.operatingFlightNumber

            //     fl_legs.push(new_leg)
            // }

            let pnr_data = {
                // price: 'BDT ' + selectedFlight.total_amount.toLocaleString(),
                // price: 'BDT ' + selectedFlight.country==='BD' ? selectedFlight.total_amount.toLocaleString():(selectedFlight.total_amount+selectedFlight.common_discount).toLocaleString(),
                // price: 'BDT ' + selectedFlight.country==='BD' ? selectedFlight.total_amount.toLocaleString():selectedFlight.airline_iata === 'EK'?(selectedFlight.total_amount+Math.ceil(selectedFlight.common_discount))<100000?(selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-5000-(Math.ceil(
                //     selectedFlight.pgw_fee
                // )))).toLocaleString():(selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-7000-(Math.ceil(
                //     selectedFlight.pgw_fee
                // )))).toLocaleString():(selectedFlight.total_amount+selectedFlight.common_discount).toLocaleString(),

                price: 'BDT ' + selectedFlight.country==='BD' ? (selectedFlight.total_amount-600).toLocaleString():
                // selectedFlight.airline_iata === 'EK'?(selectedFlight.total_amount+selectedFlight.common_discount-selectedFlight.pgw_fee).toLocaleString():
                (selectedFlight.total_amount+selectedFlight.common_discount).toLocaleString(),
                legs: fl_legs,
                source: 'web',
                payment_mode: null,
                customer: {
                    who: adultList[0].who,
                    name: adultList[0].name,
                    surname: adultList[0].surname,
                    contact_number: adultList[0].contactNumber,
                    email: adultList[0].email,
                    passport_number: adultList[0].passportNumber,
                    country_of_issue: adultList[0].countryOfIssue,
                    passport_issue_date: adultList[0].passportIssueDate
                        ? formate_date_pnr(adultList[0].passportIssueDate)
                        : null,
                    passport_expire_date: adultList[0].passportIssueDate
                        ? formate_date_pnr(adultList[0].passportExpireDate)
                        : null,
                    date_of_birth: formate_date_pnr(adultList[0].dateOfBirth),
                    nationality: adultList[0].nationality,
                    others: customers,
                },
                journey_type: flightType,
                // to_be_paid: selectedFlight.total_amount,
                to_be_paid: selectedFlight.country==='BD' ? selectedFlight.total_amount:selectedFlight.total_amount+selectedFlight.common_discount,
                adultCount: adults,
                childrenCount: childCount,
                infantCount: infants,
                used_coupon: null,
                coupon_discount: 0,
                seatClass: cabin,
                customer_id: userId,
                token: tokenData.access_token,
                payment_mode: paymentMethod,
                flight_details: selectedFlight,
            }

            // pnr_data = JSON.stringify(pnr_data); console.log(pnr_data); return;
            setIsLoading(true);
            const url = API_AIR_URL + '/create_pnr' //'http://localhost:3005/create_pnr'
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pnr_data),
            })
                .then(async (response) => {
                    try {
                        //console.log('PNR create request received.')

                        const data = await response.json()

                        if (data?.success === true) {
                            payment_ref = data?.payment?.msg?.booking_ref
                        }

                        const payment_data = {
                            // total_amount:(selectedFlight.total_amount),
                             total_amount: selectedFlight.country==='BD'?
                             selectedFlight.total_amount
                             : Math.ceil(
                                selectedFlight.total_amount -
                                (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                        ? 0.08
                                        : 0.05))
                            ),
                            // total_amount: selectedFlight.country==='BD'? (selectedFlight.total_amount):
                            // selectedFlight.legDescriptions[0].departureLocation !== 'CCU' && selectedFlight.legDescriptions[0].arrivalLocation !== 'CCU' ? (selectedFlight.total_amount + selectedFlight.common_discount) : (selectedFlight.total_amount),
                            // (selectedFlight.total_amount + Math.ceil(selectedFlight.common_discount)),

                            // total_amount: selectedFlight.country==='BD' && selectedFlight.airline_iata==='BS'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))-600) : selectedFlight.country==='international'?(selectedFlight.total_amount):
                            // (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-10)),

        //                     total_amount: selectedFlight.country==='BD'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))):
        //                     selectedFlight.total_amount > 20000 ?
        // ((selectedFlight.total_amount + Math.ceil(selectedFlight.common_discount))) :
        // (selectedFlight.total_amount),

        campaign_code: selectedFlight.country==='BD'?'DOM_AIR_01':'INT_AIR_01',

                            product_profile:'airline-tickets',
                            hours_till_departure:'2 hrs',
                            flight_type: selectedFlight.country==='BD'?'BD':'international',
                            pnr: payment_ref,
                            journey_from_to:selectedFlight.country,
                            third_party_booking:'No',


                            currency: selectedFlight.currency,
                            tran_id: payment_ref,
                            success_url: `${API_AIR_URL}/hanlde-payment`,
                            fail_url: `${API_AIR_URL}/ssl-payment-fail`,
                            cancel_url: `${API_AIR_URL}/ssl-payment-cancel`,
                            shipping_method: 'No',
                            product_name: 'Flight',
                            product_category: 'Flight',
                            product_profile: 'general',
                            cus_name: adultList[0].name,
                            cus_email: adultList[0].email,
                            cus_add1: 'Dhaka',
                            cus_add2: 'Dhaka',
                            cus_city: 'Dhaka',
                            cus_state: 'Dhaka',
                            cus_postcode: '1000',
                            cus_country: 'Bangladesh',
                            cus_phone: adultList[0].contactNumber,
                            // discount_amount: disDiffAmount,
                            discount_amount: selectedFlight.country!=='BD' && selectedFlight.legDescriptions[0].departureLocation !== 'CCU' && selectedFlight.legDescriptions[0].arrivalLocation !== 'CCU' && paymentMethod === 'SSLCommerz' ? Math.ceil(selectedFlight.basePrice*0.10) : 0,
                            cus_fax: '',
                            value_a: 'ref001_A',
                            value_b: 'ref002_B',
                            value_c: 'ref003_C',
                            value_d: 'ref004_D',
                            ipn_url: `${API_AIR_URL}/ssl-payment-notification`,
                        }

                        const payment_data_nagad=
                        {
                            order_id:payment_ref,
                            // amount:"5.00"
                            // amount:selectedFlight.country==='BD' && selectedFlight.airline_iata==='BS'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))-600) : selectedFlight.country==='international'?(selectedFlight.total_amount):
                            // (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-10))

                            // amount:selectedFlight.country==='BD'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))-600):
                            // (selectedFlight.total_amount)

                            amount:selectedFlight.country==='BD'?
                            selectedFlight.total_amount
                            : Math.ceil(
                                selectedFlight.total_amount -
                                (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                        ? 0.08
                                        : 0.05))
                            )
                        }

                        const payment_data_bkash=
                        {
                            order_id:payment_ref,
                            // amount:selectedFlight.country==='BD' &&selectedFlight.airline_iata==='BS'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))-600):
                            // (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-10))

                            // amount:selectedFlight.country==='BD' && selectedFlight.airline_iata==='BS'? (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount))-600) : selectedFlight.country==='international'?(selectedFlight.total_amount):
                            // (selectedFlight.total_amount+(Math.ceil(selectedFlight.common_discount)-600))

                            amount:selectedFlight.country==='BD'?
                             selectedFlight.total_amount
                            : Math.ceil(
                                selectedFlight.total_amount -
                                (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                        ? 0.08
                                        : 0.05))
                            )

                        }

                        const  payment_data_bbl=
                        {
                            order_id: payment_ref,
                            amount: selectedFlight.country === 'BD'
                                ? Math.ceil(selectedFlight.total_amount - (selectedFlight.basePrice * 0.007))
                                : Math.ceil(
                                    selectedFlight.total_amount -
                                    (selectedFlight.basePrice *
                             (selectedFlight.airline_iata === 'EK' || selectedFlight.airline_iata === 'TK' || selectedFlight.airline_iata === 'QR'
                                            ? 0.087
                                            : 0.057))
                                )
                        }
                        try {
                            let result;
                            let redURL;

                             if (paymentMethod === "Nagad") {
                                result = await
                                axios.post(`${API_AIR_URL}/pay_with_nagad`,
                                payment_data_nagad);
                                redURL = result.data.callBackUrl;
                                Router.push(redURL);
                            }

                            else if (paymentMethod === "bkash") {
                                result = await
                                axios.post(`${API_AIR_URL}/pay_with_bkash`,
                                payment_data_bkash);
                                redURL = result.data.bkashURL;
                                Router.push(redURL);
                            }
                            else if (paymentMethod === "ebl") {
                                result = await axios.post(`${API_AIR_URL}/pay_with_ebl`,
                                payment_data_ebl);
                                redURL = result.data.result;
                                Router.push(redURL);
                            }
                            else if (paymentMethod === "SSLCommerz") {
                                result = await axios.post("/api/payment", payment_data);
                                redURL = result.data.redirectURL;
                                Router.push(redURL);
                            }
                            else if (paymentMethod === "bbl") {
                            //     alert("Visa & Master Card payment method is now under construction ");
                            //     Router.push('/');
                                result = await axios.post(`${API_AIR_URL}/pay_with_bbl`,
                                payment_data_bbl);
                                // console.log(result.data)
                                // redURL = result.data.result;
                                // Router.push(redURL);
                                const htmlContent = result.data;
                                document.open();
                                document.write(htmlContent);
                                document.close();
                            }

                            // else{
                            //     let tempBody={
                            //         tran_id: payment_ref,
                            //         bank_tran_id: `DUE_${Math.floor(10000000 + Math.random() * 90000000)}`,
                            //         currency: 'BDT',
                            //     }
                            //     redURL='/myBooking?tab=flight'
                            //     try{
                            //         result = await axios.post(`${API_AIR_URL}/hanlde-payment`, tempBody);
                            //         setIsLoading(true)
                            //         console.log(result)

                            //     }
                            //     catch(e){
                            //         console.log(e)
                            //     }
                            //     setTimeout(()=>{
                            //         Router.push(redURL);
                            //     }, 100)
                            // }
                          } catch (error) {
                            console.log(error);
                          }
                    } catch (error) {
                        console.log(err)
                    }
                })
                .catch((error) => {
                    console.error('There was an error!', error)
                })
        }


    // Simulate async operation or integrate actual API call logic
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Example delay for 3 seconds

    setIsLoading(false); // Stop loading after operation
    }
    let v_data = validate_customer_data([
        ...adultList,
        ...childrenList,
        ...infantList,
    ])
    const inputRefs = useRef({});
    const handleValidation = () => {
        const v_data = validate_customer_data(
          [...adultList, ...childrenList, ...infantList],
          selectedFlight
        );

        if (v_data !== "OK") {
          console.log("Validation Errors:", v_data);
          setErrorMessage(v_data);

          const firstErrorKey = Object.keys(v_data)[0];
          console.log("First Error Key:", firstErrorKey);
          console.log("Input Ref:", inputRefs.current[firstErrorKey]);

          const inputElement = inputRefs.current[firstErrorKey];

          if (inputElement) {
            let scrollTarget;


            if (inputElement instanceof HTMLElement) {
              scrollTarget = inputElement;
            } else if (inputElement?.parentNode) {

              scrollTarget = inputElement.parentNode.querySelector(".date_birth") || inputElement.parentNode;
            }


            if (scrollTarget && typeof scrollTarget.scrollIntoView === "function") {
              console.log("Scrolling to target...");
              scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
              console.warn("scrollIntoView is not supported on this target.");
            }


            let targetInputElement;


            if (inputElement && inputElement.tagName === "INPUT") {
              targetInputElement = inputElement;
            } else if (inputElement.querySelector("input")) {
              targetInputElement = inputElement.querySelector("input");
            }

            if (targetInputElement && typeof targetInputElement.focus === "function") {
              console.log("Focusing on input field...");
              targetInputElement.focus();


              targetInputElement.classList.add("border-focus");
            } else if (inputElement && inputElement.classList.contains("react-datepicker__input-container")) {

              console.log("Focus on DatePicker container...");


              const datepickerContainer = inputElement.closest(".react-datepicker-wrapper");
              if (datepickerContainer) {
                datepickerContainer.scrollIntoView({ behavior: "smooth", block: "center" });


                datepickerContainer.classList.add("border-focus");
              }
            } else {
              console.error("Focus method is not available on the input element.");
            }
          } else {
            console.error("Error: Reference is invalid or undefined.");
          }

          // Clear error messages after 5 seconds
          setTimeout(() => {
            setErrorMessage({});
          }, 5000);
        } else {
          setErrorMessage({});
          canvashandleOpen();
        }
      };


    // const handleValidation = () => {
    //   let v_data = validate_customer_data([
    //     ...adultList,
    //     ...childrenList,
    //     ...infantList,

    //   ]);

    //   if (v_data !== 'OK') {
    //     alert(v_data + ' is required');
    //   } else {
    //     // create_pnr();
    //     canvashandleOpen();
    //   }

    // };
    const removeTrip = () => {
        if (trips.length > 2) {
            let temp = [...trips]
            temp.pop()
            setTrips(temp)
        } else {
            return
        }
    }

    const getDiscount = async () => {
        try {
            const discount = await fetch(`${API_AIR_URL}/discount`)
            const discountData = await discount.json()
            return discountData
        } catch (e) {
            return 0
            console.log(e)
        }
    }

    const loadOffersData = async () => {
        try {
            var url = `${API_AIR_URL}/offers`

            console.log(url)

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async (of_res) => {
                    try {
                        const o_data = await of_res.json()

                        setOffersData(o_data)
                    } catch (error) {}
                })
                .catch((error) => {
                    // console.log(url, error);
                })
        } catch (error) {}
    }
console.log("roundTripDate",roundTripDate)
const [isOffcanvasOpenCal, setIsOffcanvasOpenCal] = useState(false);
const [isOffcanvasOpend, setIsOffcanvasOpen] = useState(false); 
const [isOffcanvasOpenTo, setIsOffcanvasOpenTo] = useState(false);
const [showDropdownr, setShowDropdownr] = useState(false)
    return (
        <FlightContext.Provider
            value={{
                loading,
                msg,
                flights,
                error,
                getFlights,
                myBooking,
                loadOffersData,
                offersData,
                myPackageBooking,
                myBookingData,
                packageBooking,
                margeData,
                selectedFlight,
                assignFlight,
                myHotelBooking,
                hotelBooking,
                assignFromDestination,
                assignToDestination,
                assignJourneyDate,
                adults,handleValidation,
                setAdults,
                _children,
                set_Children,
                infants,
                setInfants,
                childCount,
                setChildCount,
                flightType,
                setFlightype,
                adultList,
                childrenList,
                infantList,
                setAdultList,
                setChildrenList,
                setInfantList,
                roundTripDate,
                setRoundTripDate,
                addTraveler,
                removeTraveler,
                multiCities,
                setMultiCitites,
                addMultiCity,
                fromDestination,
                toDestination,
                journeyDate,
                create_pnr,
                trips,
                setTrips,
                addTrip,
                handleSwapper,
                cabin,
                handleCabin,
                removeTrip,
                get_transit_time,
                setSelectedFlight,
                sessStartTime,
                setSessStartTime,
                timeFilterDep, seTtimeFilterDep,
                initialFlights, setInitialFlights,
                timeFilterArr, seTtimeFilterArr,
                button1Ref,isOffcanvasOpen,canvashandleClose,
                button2Ref,showDatePicker, setShowDatePicker,
                setPaymentMethod,isOffcanvasOpenCal, setIsOffcanvasOpenCal,isOffcanvasOpend, setIsOffcanvasOpen,isOffcanvasOpenTo, setIsOffcanvasOpenTo,
                paymentMethod,showDropdownr, setShowDropdownr,
                setIsLoading,adultList,childrenList,infantList,
                isLoading,errorMessage, setErrorMessage,inputRefs,activeTab, setActiveTab,currentSearch, setCurrentSearch
            }}
        >
            {children}
        </FlightContext.Provider>
    )
}

export default FlightContext
