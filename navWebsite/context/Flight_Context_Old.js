import { createContext, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { API_AIR_URL, flightDiscount, pgw_fee } from '../config/index'
import { API_TRIP_URL } from '../config/index'
import { API_HOTEL_URL } from '../config/index'
import axios from 'axios'

import passenger_data from '../data/passengerDetails.json'
import cabin_type from '../data/cabinType.json'

const FlightContext = createContext()
const MyBookingContext = createContext()

export const FlightProvider = ({ children }) => {
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425

    const [journeyDate, setJourneyDate] = useState(new Date())
    //const ISODate = dt.toISOString().split('T')[0]

    const [flights, setFlights] = useState([])
    const [roundFlight, setRoundflights] = useState([])
    const [flightType, setFlightype] = useState('One Way')

    // const [airports, setAirports] = useState([])
    // const [airlines, setAirlines] = useState([])
    // const [logos, setLogos] = useState([])

    const [trips, setTrips] = useState([
        {
            from: 'DAC',
            fromName: 'Hazrat Shahjalal International Airport',
            journey_date: journeyDate,
            to: 'CXB',
            toName: "Cox's Bazar Airport"
        }
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
            toName: null
        }
    ])

    const [fromDestination, setFromDestination] = useState({
        name: 'Hazrat Shahjalal International Airport',
        city: 'Dhaka',
        iata: 'DAC',
        country: 'Bangladesh'
    })
    const [toDestination, setToDestination] = useState({
        name: 'Austin Bergstrom International Airport',
        city: 'Austin',
        iata: 'AUS',
        country: 'United States'
    })

    const [adults, setAdults] = useState(1)
    const [_children, set_Children] = useState([])
    const [infants, setInfants] = useState(0)
    const [childCount, setChildCount] = useState(0)

    const [adultList, setAdultList] = useState([
        {
            dateOfBirth: '',
            passportIssueDate: '',
            passportExpireDate: '',
            name: '',
            surname: '',
            gender: 'male',
            passportNumber: '',
            contactNumber: '',
            email: '',
            countryOfIssue: '',
            nationality: ''
        }
    ])
    const [childrenList, setChildrenList] = useState([])
    const [infantList, setInfantList] = useState([])
    const [cabin, setCabin] = useState('Y')

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
        startDate: null,
        endDate: null
    })
    ///////////////end new code////////////////////////////////////

    // useEffect(() => {
    //     getFlights()
    // }, [adults, childCount, infants])

    const formatTime = (time) => {
        let split = time.split(":")
        return split[0] + ":" + split[1]
    }

    const handleSwapper = (index) => {
        let temp_trip = [...trips]
        let from = temp_trip[index].from
        let fromName = temp_trip[index].fromName
        temp_trip[index].from = temp_trip[index].to
        temp_trip[index].fromName = temp_trip[index].toName
        temp_trip[index].to = from
        temp_trip[index].toName = fromName
        setTrips(temp_trip)
    }

    const assignFromDestination = (dest, index) => {
        const temp_trip = [...trips]
        temp_trip[index].from = dest.iata
        temp_trip[index].fromName = dest.name
        setTrips(temp_trip)
    }
    const assignToDestination = (dest, index) => {
        const temp_trip = [...trips]
        temp_trip[index].to = dest.iata
        temp_trip[index].toName = dest.name
        setTrips(temp_trip)
    }
    const assignJourneyDate = (date, index) => {
        const temp_trip = [...trips]
        temp_trip[index].journey_date = new Date(date)
        setTrips(temp_trip)
    }

    const assignFlight = (flight) => {
        console.log(flight)
        setSelectedFlight(flight)
        Router.push('/checkout')
    }

    const get_time_string = (minutes) => {
        let hours = Math.floor(minutes / 60);
        minutes %= 60;
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
                    airlineName: airlines[i2].name
                }

            }
        }
        return {
            icaoCode: null,
            airlineName: null
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

        const diffInMilliseconds = Math.abs(flight_end_time - flight_start_time);

        const diffInMinutes = diffInMilliseconds / (1000 * 60);

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return hours + 'hr, ' + minutes + 'min'
    }

    const getFlights = async () => {
        setLoading(true)

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
                    day: 'numeric'
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
                    toName: temp_trip.toName
                },
                {
                    from: temp_trip.to,
                    fromName: temp_trip.toName,
                    journey_date: roundTripDate.endDate,
                    to: temp_trip.from,
                    toName: temp_trip.fromName
                }
            ]
        } else if (flightType == 'Multi City') {
            flightSegment = [...trips]
            for (let fs = 0; fs < flightSegment.length; fs++) {
                const jd = new Date(flightSegment[fs].journey_date)
                const localeDate = jd
                    .toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
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
            token: tokenData.access_token
        }

        const flightRes = await fetch(`${API_AIR_URL}/get_flights_post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightBody)
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
                'Content-Type': 'application/json'
            }
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
                'Content-Type': 'application/json'
            }
        })
        const airlines_data = await res_airlines.json()

        let airlines = airlines_data.body
        //    Logos API
        const res_logos = await fetch(`${API_AIR_URL}/logos`, {
            method: 'GET',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json'
            }
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

                for (let k = 0; k < passengerInfoList.length; k++) {
                    let passengerInfo = passengerInfoList[k].passengerInfo
                    console.log(passengerInfo)
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
                console.log(new_flight)
                let baggageRef
                if (passengerInfoList.length > 0) {
                    baggageRef = passengerInfoList[0].passengerInfo.baggageInformation[0]
                        .allowance.ref

                    new_flight.baggageInformation =
                        baggageAllowanceDescs[baggageRef - 1]
                }


                new_flight.currency = totalFare?.currency

                new_flight.totalPrice = totalFare?.totalPrice

                new_flight.common_discount = Math.floor(new_flight.totalPrice * flightDiscount)
                new_flight.pgw_fee = Math.ceil((new_flight.totalPrice - new_flight.common_discount) * pgw_fee)

                if (new_flight.totalPrice > maxPrice) {
                    setMaxPrice(new_flight.totalPrice)
                }

                new_flight.totalTaxAmount = totalFare?.totalTaxAmount
                new_flight.weight = baggageRef ? (baggageAllowanceDescs[baggageRef - 1].weight ? baggageAllowanceDescs[baggageRef - 1].weight : '') : ''
                new_flight.unit = baggageRef ? (baggageAllowanceDescs[baggageRef - 1].unit ? baggageAllowanceDescs[baggageRef - 1].unit : '') : ''
                new_flight.way = flightType

                new_flight.legs = []
                new_flight.elapsedTime = 0
                new_flight.stopCount = 0

                itinerary?.legs?.map((item, idx) => {
                    let ref = item.ref
                    let leg = {}

                    leg.elapsedTime = legDescs[ref - 1].elapsedTime
                    leg.elapsedTimeS = get_time_string(legDescs[ref - 1].elapsedTime)
                    new_flight.elapsedTime = new_flight.elapsedTime + leg.elapsedTime

                    leg.schedules = []
                    leg.stops = []
                    let schedule_ref = [...legDescs[ref - 1].schedules]

                    schedule_ref?.map((schedule, index) => {
                        let route = JSON.parse(JSON.stringify(scheduleDescs[schedule.ref - 1]));

                        route.elapsedTimeS = get_time_string(route.elapsedTime)

                        route.departure.airportName = get_airport_name(route.departure.airport, airports)
                        route.arrival.airportName = get_airport_name(route.arrival.airport, airports)

                        route.departure.f_time = formatTime(route.departure.time)
                        route.arrival.f_time = formatTime(route.arrival.time)

                        let airline_data = get_airlines_name(route.carrier.operating, airlines)
                        route.carrier.icaoCode = airline_data.icaoCode
                        route.carrier.airlineName = airline_data.airlineName

                        route.carrier.logo = get_airline_logo(airline_data.icaoCode, logos)

                        if (index == 0) {
                            new_flight.airlineName = route.carrier.airlineName
                            new_flight.logo = route.carrier.logo
                            route.departure.date = groupDescription[idx].departureDate
                        } else {
                            route.departure.date = leg.schedules[index - 1].arrival.date
                            leg.stops.push(route.departure.airport)
                        }

                        if (schedule.departureDateAdjustment) {
                            let initialDate = new Date(route.departure.date);
                            let nextDay = new Date(initialDate.setDate(initialDate.getDate() + schedule.departureDateAdjustment));
                            route.departure.date = nextDay.toISOString().slice(0, 10)
                        }

                        if (route.arrival.dateAdjustment) {
                            let initialDate = new Date(route.departure.date);
                            let nextDay = new Date(initialDate.setDate(initialDate.getDate() + route.arrival.dateAdjustment));
                            route.arrival.date = nextDay.toISOString().slice(0, 10)
                        } else {
                            route.arrival.date = route.departure.date
                        }

                        leg.schedules.push(route)

                        if (route.arrival.dateAdjustment) {
                            leg.dateAdjustment = leg.dateAdjustment ? leg.dateAdjustment + route.arrival.dateAdjustment : route.arrival.dateAdjustment
                        }

                        if (route.arrival.country != 'BD' || route.departure.country != 'BD') {
                            international_flag = true
                        }
                    })

                    leg.departure = {}
                    leg.arrival = {}

                    leg.departure.time = scheduleDescs[schedule_ref[0].ref - 1].departure.time
                    leg.departure.f_time = formatTime(leg.departure.time)
                    leg.departure.date = leg.schedules[0].departure.date //groupDescription[idx].departureDate
                    leg.departure.departureLocation = groupDescription[idx].departureLocation
                    leg.departure.airportName = get_airport_name(groupDescription[idx].departureLocation, airports)

                    leg.arrival.time = scheduleDescs[schedule_ref[schedule_ref.length - 1].ref - 1].arrival.time
                    leg.arrival.f_time = formatTime(leg.arrival.time)

                    // if (leg.dateAdjustment) {
                    //     let initialDate = new Date(groupDescription[idx].departureDate);
                    //     let nextDay = new Date(initialDate.setDate(initialDate.getDate() + leg.dateAdjustment));
                    //     leg.arrival.date = nextDay.toISOString().slice(0, 10)
                    // } else {
                    //     leg.arrival.date = leg.departure.date
                    // }

                    leg.arrival.date = leg.schedules[leg.schedules.length - 1].arrival.date

                    leg.arrival.arrivalLocation = groupDescription[idx].arrivalLocation
                    leg.arrival.airportName = get_airport_name(groupDescription[idx].arrivalLocation, airports)

                    leg.stopCount = leg.schedules.length - 1

                    new_flight.stopCount = new_flight.stopCount + leg.stopCount

                    if (international_flag) {
                        new_flight.country = 'international'
                    } else {
                        new_flight.country = 'BD'
                    }

                    new_flight.legs.push(leg)
                })


                for (let ld = 0; ld < new_flight.legs.length; ld++) {
                    new_flight.legDescriptions[ld].airportFrom = get_airport_name(new_flight.legDescriptions[ld].departureLocation, airports)
                    new_flight.legDescriptions[ld].airportTo = get_airport_name(new_flight.legDescriptions[ld].arrivalLocation, airports)
                }

                flgiht_descs.push(new_flight)

            } catch (e) {
                console.log(e)
            }
        }

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
            const response = await fetch(`${API_AIR_URL}/my-pnr/39223`, {
                method: 'GET',
                headers: {
                    APP_KEY: '123456',
                    'Content-Type': 'application/json'
                }
            })
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
                `${API_TRIP_URL}/bookedpackage/search?limit=10&offset=1&user_id=39223`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json'
                    }
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
                `${API_HOTEL_URL}/ws/getAllBookingListForCustomer?userId=39223`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await response.json()

            console.log('Hotel', data.body)
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

    const addTraveler = (type, dob) => {
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
            nationality: 'Bangladesh'
        }
        if (type == 'children') {
            const dob = new Date(
                new Date().setFullYear(new Date().getFullYear() - 2)
            )
            newPassenger.dateOfBirth = dob
            setChildCount((count) => count + 1)
            let tempChdlist = [...childrenList, newPassenger]
            setChildrenList(tempChdlist)
        } else if (type == 'infant') {
            setInfants((count) => count + 1)
            let tempInflist = [...infantList, newPassenger]
            setInfantList(tempInflist)
        } else {
            setAdults((count) => count + 1)
            let tempAdtlist = [...adultList, newPassenger]
            setAdultList(tempAdtlist)
        }
    }

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
            toName: null
        }
        const temp = [...multiCities, newTravel]

        if (temp.length > 4) {
            return
        }
        setMultiCitites(temp)
    }
    const addTrip = () => {
        const newTravel = {
            from: null,
            fromName: null,
            journey_date: new Date(),
            to: null,
            toName: null
        }
        const temp = [...trips, newTravel]

        if (temp.length > 4) {
            return
        }
        setTrips(temp)
    }

    const formate_date_pnr = (date) => {
        const dt = new Date(date)
        const formattedDate = dt
            .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            .split(' ')
            .join('-')

        return formattedDate
    }

    const validate_customer_data = (customers) => {
        for (let i = 0; i < customers.length; i++) {
            let customer = customers[i]
            if (customer.dateOfBirth == null || customer.dateOfBirth.length == 0 || customer.dateOfBirth == undefined) { return 'Date of birth' }
            else if (selectedFlight.country != 'BD' && (customer.passportIssueDate == null || customer.passportIssueDate.length == 0 || customer.passportIssueDate == undefined)) { return 'Passport issue date' }
            else if (selectedFlight.country != 'BD' && (customer.passportExpireDate == null || customer.passportExpireDate.length == 0 || customer.passportExpireDate == undefined)) { return 'Passport expire date' }
            else if (customer.name == null || customer.name.length == 0 || customer.name == undefined) { return 'Given Name' }
            else if (customer.surname == null || customer.surname.length == 0 || customer.surname == undefined) { return 'Surname' }
            else if (customer.gender == null || customer.gender.length == 0 || customer.gender == undefined) { return 'Gender' }
            else if (selectedFlight.country != 'BD' && (customer.passportNumber == null || customer.passportNumber.length == 0 || customer.passportNumber == undefined)) { return 'Passport number' }
            else if (customer.contactNumber == null || customer.contactNumber.length == 0 || customer.contactNumber == undefined) { return 'Contact number' }
            else if (customer.email == null || customer.email.length == 0 || customer.email == undefined) { return 'email' }
            else if (selectedFlight.country != 'BD' && (customer.countryOfIssue == null || customer.countryOfIssue.length == 0 || customer.countryOfIssue == undefined)) { return 'Country' }
            else if (selectedFlight.country != 'BD' && (customer.nationality == null || customer.nationality.length == 0 || customer.nationality == undefined)) { return 'Country' }
            else { return 'OK' }
        }
    }

    const create_pnr = async () => {
        const tokenRes = await fetch(`${API_AIR_URL}/token`)
        const tokenData = await tokenRes.json()
        const userId = JSON.parse(localStorage.getItem('userInfo')).userId
        // console.log(tokenData)
        // console.log(userId)
        let payment_ref
        const [, ...temp_adultList] = adultList
        const customers = [...temp_adultList, ...childrenList, ...infantList]

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

        let v_data = validate_customer_data([...adultList, ...childrenList, ...infantList])

        if (v_data != 'OK') {
            alert(v_data + ' is required')
            return
        }

        let fl_legs = []

        for (let n = 0; n < selectedFlight.legs.length; n++) {
            let leg = selectedFlight.legs[n]
            let new_leg = {}

            new_leg.ArrivalDateTime = leg.arrival.date + "T" + leg.arrival.f_time + ":00"
            new_leg.DepartureDateTime = leg.arrival.date + "T" + leg.arrival.f_time + ":00"
            new_leg.FlightNumber = leg.schedules[0].carrier.marketingFlightNumber
            new_leg.baggageInfo = selectedFlight.baggageInformation
            new_leg.DestinationLocationCode = leg.arrival.arrivalLocation
            new_leg.OriginLocationCode = leg.departure.departureLocation
            new_leg.MarketingAirlineCode = leg.schedules[0].carrier.marketing
            new_leg.ResBookDesigCode = cabin
            new_leg.operatingCarrierCode = leg.schedules[0].carrier.operating
            new_leg.operatingFlightNumber = leg.schedules[0].carrier.operatingFlightNumber

            fl_legs.push(new_leg)
        }

        let pnr_data = {
            price: "BDT " + (Math.ceil((selectedFlight.totalPrice - selectedFlight.common_discount) + selectedFlight.pgw_fee)).toLocaleString(),
            legs: fl_legs,
            source: 'web',
            payment_mode: null,
            customer: {
                who: '',
                name: adultList[0].name,
                surname: adultList[0].surname,
                contact_number: adultList[0].contactNumber,
                email: adultList[0].email,
                passport_number: adultList[0].passportNumber,
                country_of_issue: adultList[0].countryOfIssue,
                passport_issue_date: adultList[0].passportIssueDate ? formate_date_pnr(
                    adultList[0].passportIssueDate
                ) : null,
                passport_expire_date: adultList[0].passportIssueDate ? formate_date_pnr(
                    adultList[0].passportExpireDate
                ) : null,
                date_of_birth: formate_date_pnr(adultList[0].dateOfBirth),
                nationality: adultList[0].nationality,
                others: customers
            },
            journey_type: flightType,
            to_be_paid: Math.ceil((selectedFlight.totalPrice - selectedFlight.common_discount) + selectedFlight.pgw_fee),
            adultCount: adults,
            childrenCount: childCount,
            infantCount: infants,
            used_coupon: null,
            coupon_discount: 0,
            seatClass: cabin,
            customer_id: userId
        }

        //pnr_data = JSON.stringify(pnr_data)

        console.log(pnr_data)

        const url = 'http://localhost:3005/create_pnr'
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pnr_data)
        })
            .then(async (response) => {
                try {
                    //console.log('PNR create request received.')

                    const data = await response.json()

                    if (data?.success === true) {
                        payment_ref = data?.payment?.msg?.booking_ref
                    }

                    const payment_data = {
                        total_amount: Math.ceil((selectedFlight.totalPrice - selectedFlight.common_discount) + selectedFlight.pgw_fee),
                        currency: selectedFlight.currency,
                        tran_id: payment_ref,
                        success_url: `http://localhost:3000/api/payment-success`,
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
                        cus_fax: '',
                        multi_card_name: 'mastercard',
                        value_a: 'ref001_A',
                        value_b: 'ref002_B',
                        value_c: 'ref003_C',
                        value_d: 'ref004_D',
                        ipn_url: `http://localhost:3000/api/payment-success`
                    }

                    //console.log(payment_data)
                    try {
                        const result = await axios.post(
                            '/api/payment',
                            payment_data
                        )

                        const redURL = result.data.redirectURL
                        console.log(result.data)
                        Router.push(redURL)
                    } catch (e) {
                        console.log(e)
                    }
                } catch (error) {
                    console.log(err)
                }
            })
            .catch((error) => {
                console.error('There was an error!', error)
            })
    }

    const removeTrip = () => {
        if (trips.length > 2) {
            let temp = [...trips]
            temp.pop()
            setTrips(temp)
        } else {
            return
        }

    }

    return (
        <FlightContext.Provider
            value={{
                loading,
                msg,
                flights,
                error,
                getFlights,
                myBooking,
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
                adults,
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
                get_transit_time
            }}>
            {children}
        </FlightContext.Provider>
    )
}

export default FlightContext
