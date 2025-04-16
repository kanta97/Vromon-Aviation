import { createContext, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { API_AIR_URL } from '../config/index'
import { API_DOMAIN_URL_ONE } from '../config/index'
import { API_HOTEL_URL } from '../config/index'

const FlightContext = createContext()
const MyBookingContext = createContext()

export const FlightProvider = ({ children }) => {
    const [flights, setFlights] = useState([])
    const [roundFlight, setRoundflights] = useState([])
    const [flightType, setFlightype] = useState('ONE WAY')

    // const [airports, setAirports] = useState([])
    // const [airlines, setAirlines] = useState([])
    // const [logos, setLogos] = useState([])

    const [margeData, setMargeData] = useState([])

    const [myBookingData, setMybookingdata] = useState([])

    const [packageBooking, setPackageBooking] = useState([])
    const [hotelBooking, setHotelBooking] = useState([])

    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectedFlight, setSelectedFlight] = useState()

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
    const [arName, setArName] = useState([])
    ///////////////end new code////////////////////////////////////

    const router = useRouter()

    //set selected flight

    const setFlight = (flight) => {
        if (Array.isArray(flight)) {
        } else {
            flight.tripType = 'One Way'
        }
        setSelectedFlight(flight)
        Router.push('/checkout')
    }

    // Register user
    const getFlights = async () => {
        setLoading(true)

        let scheduleDescs
        let taxDescs
        let baggageAllowanceDescs
        let legDescs
        let itineraryGroups

        const tokenRes = await fetch(`${API_AIR_URL}/token`)
        const tokenData = await tokenRes.json()
        console.log('all airports', tokenRes)
        let flightBody = {
            flightSegment: [
                {
                    from: 'DAC',
                    fromName: 'DAC Hazrat Shahjalal International Airport',
                    journey_date: '2023-03-12',
                    to: 'CXB',
                    toName: "Cox's Bazar Airport"
                }
            ],
            return_date: null,
            adult: '1',
            infant: '0',
            ins: 0,
            children: [],
            seatClass: 'Y',
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
        console.log('post one flight api check', flightData)

        if (flightRes.ok) {
            // setScheduleDescs(flightData.groupedItineraryResponse.scheduleDescs)
            // setTaxDescs(flightData.groupedItineraryResponse.taxDescs)
            // setBaggageAllowanceDescs(
            //     flightData.groupedItineraryResponse.baggageAllowanceDescs
            // )
            // setLegDescs(flightData.groupedItineraryResponse.legDescs)
            // setItineraryGroups(
            //     flightData.groupedItineraryResponse.itineraryGroups
            // )
            scheduleDescs = flightData.groupedItineraryResponse.scheduleDescs
            taxDescs = flightData.groupedItineraryResponse.taxDescs
            baggageAllowanceDescs =
                flightData.groupedItineraryResponse.baggageAllowanceDescs
            legDescs = flightData.groupedItineraryResponse.legDescs
            itineraryGroups =
                flightData.groupedItineraryResponse.itineraryGroups
        } else {
            setError(flightData.message)
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
        //console.log('want to see /airlines', data2.body)
        //console.log('airline print', data2.body)
        //setAirlines(airlines_data)
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
        //console.log('want to see /airlines', data3.body)
        //setLogos(logo_data)
        console.log(logo_data)
        let logos = logo_data.body

        var itineraries = itineraryGroups[0].itineraries
        var groupDescription =
            itineraryGroups[0].groupDescription.legDescriptions

        for (let i = 0; i < scheduleDescs.length; i++) {
            try {
                let min = scheduleDescs[i].elapsedTime

                let hr = 0

                while (min > 60) {
                    hr++
                    min = min - 60
                }

                scheduleDescs[i].elapsedTimeS = hr + 'hr ' + min + 'min'
                scheduleDescs[i].legDescriptions = groupDescription

                var itinerary = itineraries[i]
                var totalFare = itinerary?.pricingInformation[0].fare.totalFare

                scheduleDescs[i].currency = totalFare?.currency

                scheduleDescs[i].totalPrice = totalFare?.totalPrice

                // if (storeFlight.way == "One Way") {
                //     fl[i].totalPrice = ddd?.totalPrice;
                // } else if (storeFlight.way == "Round Way") {
                //     fl[i].totalPrice = ddd?.totalPrice * 2;
                // }
                // else if (storeFlight.way == "Multi City") {
                //     fl[i].totalPrice = ddd?.totalPrice * 2;
                // }

                if (scheduleDescs[i].totalPrice > maxPrice) {
                    setMaxPrice(scheduleDescs[i].totalPrice)
                }

                scheduleDescs[i].totalTaxAmount = totalFare?.totalTaxAmount
                scheduleDescs[i].weight = baggageAllowanceDescs[0]?.weight
                scheduleDescs[i].unit = baggageAllowanceDescs[0]?.unit
                scheduleDescs[i].departure.time = scheduleDescs[
                    i
                ].departure.time.slice(0, 5)
                scheduleDescs[i].arrival.time = scheduleDescs[
                    i
                ].arrival.time.slice(0, 5)
                scheduleDescs[i].way = flightType
                // fl[i].journey_date = moment(storeFlight.journey_date).format("MMM DD");
                // fl[i].return_date = moment(storeFlight.return_date).format("MMM DD");

                ///console.log("Finding airport name");

                for (let i2 = 0; i2 < airports.length; i2++) {
                    if (
                        scheduleDescs[i].legDescriptions[0]
                            .departureLocation === airports[i2].iata
                    ) {
                        scheduleDescs[i].airportFrom = airports[i2].name
                    }

                    if (
                        scheduleDescs[i].legDescriptions[0].arrivalLocation ===
                        airports[i2].iata
                    ) {
                        scheduleDescs[i].airportTo = airports[i2].name
                    }
                }

                /// console.log("Finding log");

                var icaoCode = ''
                var airlineName = ''

                for (let i2 = 0; i2 < airlines.length; i2++) {
                    if (
                        scheduleDescs[i].carrier.operating ===
                        airlines[i2].iata_code
                    ) {
                        //console.log(airports[i2].iata);
                        icaoCode = airlines[i2].icao_code
                        airlineName = airlines[i2].name
                        break
                    }
                }

                scheduleDescs[i].airlineName = airlineName

                // var arNameAV = true

                // for (let index = 0; index < arName.length; index++) {
                //     if (scheduleDescs[i].airlineName === arName.toString()) {
                //         arNameAV = false
                //         break
                //     } else {
                //         arNameAV = true
                //     }
                // }

                // if (arNameAV === true) {
                //     arName.push(fl[i].airlineName)
                // }

                for (let i2 = 0; i2 < logos.length; i2++) {
                    if (icaoCode === logos[i2].airline) {
                        //console.log(airports[i2].iata);
                        scheduleDescs[i].logo = logos[i2].logo
                        break
                    }
                }
                setFlights(scheduleDescs)
            } catch (e) {
                console.error(e)
            }
        }

        // Roundtrip Data fetching start
        // const roundTokenRes = await fetch(`${API_AIR_URL}/token`)
        // const roundTokenData = await roundTokenRes.json()
        // console.log('all airports', roundTokenRes)
        // let roundFlightBody = {
        //     flightSegment: [
        //         {
        //             from: 'DAC',
        //             to: 'ZYL',
        //             journey_date: '2022-12-28',
        //             fromName: 'DAC Hazrat Shahjalal International Airport',
        //             toName: 'ZYL Osmany International Airport'
        //         },
        //         {
        //             from: 'ZYL',
        //             to: 'DAC',
        //             journey_date: '2022-12-28',
        //             fromName: 'ZYL Osmany International Airport',
        //             toName: 'DAC Hazrat Shahjalal International Airport'
        //         }
        //     ],
        //     return_date: '2022-12-30',
        //     adult: 1,
        //     infant: 0,
        //     ins: 0,
        //     children: [],
        //     seatClass: 'Y',
        //     token: roundTokenData.access_token
        // }
        // const roundFlightRes = await fetch(`${API_AIR_URL}/get_flights_post`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(roundFlightBody)
        // })

        // const roundFlightData = await roundFlightRes.json()
        // console.log('post round flight api check', roundFlightData)

        // if (roundFlightRes.ok) {
        //     setRoundflights(
        //         roundFlightData.groupedItineraryResponse.scheduleDescs
        //     )
        // } else {
        //     setError(roundFlightData.message)
        // }
        // console.log('round trip Print', roundFlight)
        // end
        setLoading(false)
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

            console.log('want to see response', data.body)
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
                `${API_DOMAIN_URL_ONE}/bookedpackage/search?limit=10&offset=1&user_id=39223`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await response.json()

            console.log('package', data.body)
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
                setFlight,
                myHotelBooking,
                hotelBooking
            }}>
            {children}
        </FlightContext.Provider>
    )
}

export default FlightContext
