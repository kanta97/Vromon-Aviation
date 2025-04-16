import { createContext, useState, useEffect, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import { API_HOTEL_URL } from '../config/index'
import AuthContext from './AuthContext'
import moment from 'moment'

const HotelContext = createContext()

export const HotelProvider = ({ children }) => {
    const router = useRouter()

    const [hotelData, setHotelData] = useState([])
    const [hotelDetails, setHotelDetails] = useState([])
    const [hotelSugg, setHotelSugg] = useState([])
    const [hotelBooking, setHotelBooking] = useState([])
    const [bookData, setBookData] = useState([])
    const [bookingObj, setBookingObj] = useState({})
    const [reserveData, setReserveData] = useState([])
    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [selectedOption, setSelectedOption] = useState({})
    const [hotelSearchData, setHotelSearchData] = useState({
        destination: { value: 'Coxs Bazar', label: 'Coxs Bazar' },
        checkInDate: new Date(),
        checkOutDate: moment().add(1, 'days').format('YYYY-MM-DD'),
        roomData: [
            {
                adults: 1,
                children: 0,
                children_ages: []
            }
        ]
    })

    const { user } = useContext(AuthContext)

    const getDestinationSuggestions = async () => {
        try {
            setLoading(false)

            const suggsUrl = await fetch(
                `${API_HOTEL_URL}/ws/getDestinationSuggestions`,
                {
                    method: 'GET',
                    headers: {
                        APP_KEY: '123456',
                        'Content-Type': 'application/json'
                    }
                }
            )
            const suggetions = await suggsUrl.json()

            let result = suggetions[0]
            let tempArray = []
            for (let i = 0; i < result.length; i++) {
                tempArray.push(result[i].city)
            }
            const options = tempArray.map((item) => ({
                value: item,
                label: item
            }))
            setHotelSugg(options)
        } catch (error) {
            console.log('error', error)
        }
    }

    const setDestination = (destination) => {
        setHotelSearchData({
            ...hotelSearchData,
            destination: destination
        })
        // saveLocalData()
    }

    const setDate = (dates) => {

        setHotelSearchData({
            ...hotelSearchData,
            checkInDate: dates

        })


        // console.log("dates", dates)
        // const [start, end] = dates

        // setHotelSearchData({
        //     ...hotelSearchData,
        //     checkInDate: start,
        //     checkOutDate: end
        // })
        // console.log(
        //     'start date',
        //     hotelSearchData.checkInDate,
        //     hotelSearchData.checkOutDate
        // )

        // saveLocalData()
    }
    const setCheckOut = (dates) => {

        // setHotelSearchData({
        //     ...hotelSearchData,
        //     checkOutDate: dates

        // })
   
            setHotelSearchData((prevState) => ({
              ...prevState,
              checkOutDate: dates || prevState.checkInDate, // Ensure checkOutDate always >= checkInDate
            }));
       

        // console.log("dates", dates)
        // const [start, end] = dates

        // setHotelSearchData({
        //     ...hotelSearchData,
        //     checkInDate: start,
        //     checkOutDate: end
        // })
        // console.log(
        //     'start date',
        //     hotelSearchData.checkInDate,
        //     hotelSearchData.checkOutDate
        // )

        // saveLocalData()
    }


    const addRoomOne = function () {
        setHotelSearchData((previousState) => ({
            ...previousState,
            roomData: [
                ...previousState.roomData,
                {
                    adults: 1,
                    children: 0,
                    children_ages: []
                }
            ]
        }))
        // saveLocalData()
    }

    const removeRoom = function (index) {
        setHotelSearchData((previousState) => ({
            ...previousState,
            roomData: hotelSearchData.roomData.filter((_, i) => i !== index)
        }))
        // saveLocalData()
    }

    const incrementAdults = (roomIndex) => {
        const updatedRoomData = [...hotelSearchData.roomData]
        updatedRoomData[roomIndex] = {
            ...updatedRoomData[roomIndex],
            adults: updatedRoomData[roomIndex].adults + 1
        }
        setHotelSearchData({
            ...hotelSearchData,
            roomData: updatedRoomData
        })
        // saveLocalData()
    }

    const decrementAdults = (roomIndex) => {
        const updatedRoomData = [...hotelSearchData.roomData]
        updatedRoomData[roomIndex] = {
            ...updatedRoomData[roomIndex],
            adults: updatedRoomData[roomIndex].adults - 1
        }
        setHotelSearchData({
            ...hotelSearchData,
            roomData: updatedRoomData
        })
        // saveLocalData()
    }

    const incrementChildren = (roomIndex) => {
        const updatedRoomData = [...hotelSearchData.roomData]

        var cg = updatedRoomData[roomIndex].children_ages;

        if (cg.length < 4) {
            cg.push({ "age": "" });

            updatedRoomData[roomIndex] = {
                ...updatedRoomData[roomIndex],
                children: updatedRoomData[roomIndex].children + 1,
                children_ages: cg,
            }

            setHotelSearchData({
                ...hotelSearchData,
                roomData: updatedRoomData
            })
        }



        // saveLocalData()
    }

    const decrementChildren = (roomIndex) => {
        const updatedRoomData = [...hotelSearchData.roomData]

        var cg = updatedRoomData[roomIndex].children_ages;

        if (cg.length > 0) {

            cg.splice(cg.length - 1, 1);

            updatedRoomData[roomIndex] = {
                ...updatedRoomData[roomIndex],
                children: updatedRoomData[roomIndex].children - 1,
                children_ages: cg,
            }

            setHotelSearchData({
                ...hotelSearchData,
                roomData: updatedRoomData
            })
        }

        // saveLocalData()
    }

    const searchHotel = async (id) => {
        // const tempData = JSON.parse(localStorage.getItem('hotelSearchData'))
        // tempData.checkInDate = new Date(tempData.checkInDate)
        // tempData.checkOutDate = new Date(tempData.checkOutDate)
        // console.log('check in date', tempData)
        // setHotelSearchData(tempData)

        setLoading(true)
        let url =
            API_HOTEL_URL +
            '/ws/getProperty?query=' +
            hotelSearchData.destination.value +
            '&maxAdult=' +
            hotelSearchData.roomData.length +
            '&rating=' +
            '&propertyName='
        let responseOne = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let getPropertyOne = await responseOne.json()
        let propertyData = getPropertyOne[0]


        console.log("url", url);

        var hotel_list = [];

        for (let i = 0; i < propertyData.length; i++) {
            propertyData[i].popularFacilities = JSON.parse(
                propertyData[i].popularFacilities
            )
            propertyData[i].roomAmenities = JSON.parse(
                propertyData[i].roomAmenities
            )
            propertyData[i].thumbnail = JSON.parse(propertyData[i].thumbnail)


            function dayDiff(fromDat, toDat) {
                const fromDate = new Date(fromDat)
                const toDate = new Date(toDat)
                const diffTime = Math.abs(toDate - fromDate)
                const diffDays = Math.ceil(
                    diffTime / (1000 * 60 * 60 * 24)
                )
                return diffDays
            }

            const date1 = new Date(hotelSearchData.checkInDate)
            const date2 = new Date(hotelSearchData.checkOutDate)
            var totalDays = dayDiff(date1, date2)




            propertyData[i].availabilityData = JSON.parse(propertyData[i].availabilityData)

            function r_a(date, availabilityData) {

                var tl_p = 0;
                var av_rm = false;

                for (let index1 = 0; index1 < availabilityData.length; index1++) {



                    var ch_date = availabilityData[index1]?.date.toLowerCase().slice(0, 10);

                    if (date == ch_date && availabilityData[index1].availableRoom > 0) {

                        tl_p = availabilityData[index1].price;
                        av_rm = true;
                        break
                    }

                }

                return {
                    prc: tl_p,
                    av: av_rm,
                };
            }


            var av_rm_ = false;
            var rc_c = 0;
            var pricePerNight = 0;

            for (let index = 0; index < totalDays; index++) {


                var chk_in_dt = moment(date1).add(index, "days").format("yyyy-MM-DD");
                chk_in_dt = moment(chk_in_dt).add(-1, "days").format("yyyy-MM-DD");


                var r_a_c = r_a(chk_in_dt, propertyData[i].availabilityData);

                if (r_a_c.av) {
                    rc_c++;

                    if (r_a_c.prc > pricePerNight) {
                        pricePerNight = r_a_c.prc;
                    }
                }

            }

            if (totalDays > 0 && totalDays == rc_c) {
                av_rm_ = true;
            } else {
                av_rm_ = false;
            }

            propertyData[i].room_avaibility = av_rm_;
            propertyData[i].pricePerNight = pricePerNight;

            hotel_list.push(propertyData[i]);

        }

        setHotelData(hotel_list)
        setLoading(false)
    }

    const showAlert = () => {
        console.log(hotelSearchData.checkInDate, hotelSearchData.checkOutDate)
    }

    const bookNow = async (userId) => {
        if (user) {
            try {
                setLoading(false)
                const response = await fetch(
                    `${API_HOTEL_URL}/ws/getPropertyDataForWeb?userId=${userId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const getResponse = await response.json()
                setHotelDetails(getResponse[0])
                for (let j = 0; j < getResponse[0].length; j++) {
                    getResponse[0][j].popularFacilities = JSON.parse(
                        getResponse[0][j].popularFacilities
                    )
                    getResponse[0][j].images = JSON.parse(
                        getResponse[0][j].images
                    )
                }

                let apiBody = {
                    propertyName: getResponse[0][0].name
                }
                const roomDataRes = await fetch(
                    `${API_HOTEL_URL}/ws/getRoomData`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(apiBody)
                    }
                )

                const getRoomData = await roomDataRes.json()
                let roomData = getRoomData[0]
                // console.log("room data", roomData)

                for (let j = 0; j < roomData.length; j++) {
                    roomData[j].accessibility = JSON.parse(
                        roomData[j].accessibility
                    )
                    roomData[j].amenities = JSON.parse(roomData[j].amenities)
                    roomData[j].availabilityData = JSON.parse(
                        roomData[j].availabilityData
                    )
                    roomData[j].entertainmentAndFamilyServices = JSON.parse(
                        roomData[j].entertainmentAndFamilyServices
                    )
                    roomData[j].extraServices = JSON.parse(
                        roomData[j].extraServices
                    )
                    roomData[j].images = JSON.parse(roomData[j].images)
                    roomData[j].popularFacilities = JSON.parse(
                        roomData[j].popularFacilities
                    )
                    roomData[j].roomAmenities = JSON.parse(
                        roomData[j].roomAmenities
                    )
                    roomData[j].mealData = JSON.parse(roomData[j].mealData)

                    const date1 = new Date(hotelSearchData.checkInDate)
                    const date2 = new Date(hotelSearchData.checkOutDate)

                    // console.log("date1 print", date1)
                    // console.log("date2 print", date2)

                    // date1.setDate(date1.getDate() - 1)
                    // date2.setDate(date2.getDate() - 1)
                    // console.log('date1', date1)
                    roomData[j].check_in_date = date1.toLocaleDateString(
                        'en-US',
                        {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            weekday: 'short'
                        }
                    )
                    roomData[j].check_out_date = date2.toLocaleDateString(
                        'en-US',
                        {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            weekday: 'short'
                        }
                    )
                    roomData[j].roomNumber = hotelSearchData.roomData.length

                    // day differance
                    function dayDiff(fromDat, toDat) {
                        const fromDate = new Date(fromDat)
                        const toDate = new Date(toDat)
                        const diffTime = Math.abs(toDate - fromDate)
                        const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24)
                        )
                        return diffDays
                    }
                    roomData[j].totalDays = dayDiff(date1, date2)
                    // console.log('Day Difference', roomData[j].totalDays)

                    // day differance end

                    // roomData[j].check_out_date.setDate(
                    //     roomData[j].check_out_date.getDate() - 1
                    // )
                    // console.log('check_in_date', date1)
                    // console.log('check_out_date', date2)

                    let tempArr = []

                    if (roomData[j].availabilityData) {
                        try {

                            roomData[j].availabilityData = [
                                ...new Map(
                                    roomData[j].availabilityData.map((item) => [
                                        item['date'],
                                        item
                                    ])
                                ).values()
                            ]


                            function r_a(date, availabilityData) {

                                var r_av = false;
                                var tl_p = 0;


                                for (let index1 = 0; index1 < availabilityData.length; index1++) {

                                    var ch_date = availabilityData[index1]?.date.toLowerCase().slice(0, 10);

                                    // console.log(date + ch_date);

                                    if (date == ch_date && availabilityData[index1].availableRoom > 0) {

                                        tl_p = availabilityData[index1].price;
                                        r_av = true;
                                        break
                                    } else {
                                        r_av = false;
                                    }

                                }

                                return {
                                    av: r_av,
                                    prc: tl_p,
                                }
                            }

                            var r_av_ = false;
                            var tl_p_ = 0;
                            var cn_av = 0;

                            for (let index = 0; index < roomData[j].totalDays; index++) {


                                var chk_in_dt = moment(date1).add(index, "days").format("yyyy-MM-DD");
                                chk_in_dt = moment(chk_in_dt).add(-1, "days").format("yyyy-MM-DD");

                                // console.log("chk_in_dt", chk_in_dt);


                                var r_a_c = r_a(chk_in_dt, roomData[j].availabilityData);

                                if (r_a_c.av) {

                                    cn_av++;
                                    tl_p_ = (r_a_c.prc * 1 + tl_p_);

                                    // console.log("cn_av", cn_av);
                                }

                            }

                            if (roomData[j].totalDays == cn_av) {
                                r_av_ = true;
                            } else {
                                r_av_ = false;
                            }


                            roomData[j].room_availability = r_av_;
                            roomData[j].totalPrice = tl_p_;


                            for (
                                let p = 0;
                                p < roomData[j].availabilityData.length;
                                p++
                            ) {
                                // console.log(
                                //     'hi',
                                //     new Date(roomData[j].availabilityData[j].date),
                                //     new Date('2022-09-15T18:00:00.000Z')
                                // )
                                if (
                                    new Date(
                                        roomData[j].availabilityData[p].date
                                    ).toDateString() == date.toDateString()
                                ) {
                                    if (
                                        roomData[j].availabilityData[p]
                                            .availableRoom > 0
                                    ) {
                                        roomData[j].pricePerNight =
                                            roomData[j].availabilityData[
                                                p
                                            ].price

                                        let availPrice =
                                            roomData[j].availabilityData[p]
                                                .price
                                        // console.log(
                                        //     'avaiable price',
                                        //     availPrice
                                        // )
                                        tempArr.push(roomData[j])
                                    }
                                } else {
                                }
                            }
                        } catch (e) { }
                    } else {
                    }
                    // console.log('print temp data', tempArr)
                    let date = new Date(date1)
                    let eate = new Date(date2)

                    eate.setDate(eate.getDate() - 1)

                    let array1 = roomData[j].availabilityData

                    // console.log('availibilities', array1)
                    // console.log('startDate', date)
                    // console.log('endDate', eate)
                    let totalPrice = 0
                    array1.forEach((room) => {
                        if (
                            new Date(room.date) >= date &&
                            new Date(room.date) <= eate
                        ) {
                            totalPrice += room.price
                        }
                    })
                    // console.log('final Price', totalPrice)

                    // roomData[j].totalPrice = totalPrice

                    // if (roomData[j].discount && roomData[j].discount >= 0) {
                    //     roomData[j].pricePerNightdiscounted =
                    //         roomData[j].pricePerNight -
                    //         Math.ceil(
                    //             (roomData[j].discount *
                    //                 roomData[j].pricePerNight) /
                    //             100
                    //         )

                    // }
                    // roomData[j].discount = 6







                    roomData[j].pricePerNightdiscounted =
                        roomData[j].pricePerNight -
                        Math.ceil(
                            (roomData[j].discount *
                                roomData[j].pricePerNight) /
                            100
                        )
                    // console.log(
                    //     'pricePerNight',
                    //     roomData[j].pricePerNight
                    // )
                    // console.log(
                    //     'discount',
                    //     roomData[j].discount
                    // )
                    // console.log(
                    //     'pricePerNightdiscounted',
                    //     roomData[j].pricePerNightdiscounted
                    // )
                    roomData[j].totalPricediscounted =
                        roomData[j].pricePerNightdiscounted *
                        roomData[j].roomNumber *
                        roomData[j].totalDays

                    roomData[j].totalfinalPrice =
                        roomData[j].totalPrice *
                        roomData[j].roomNumber 
                       

                    // console.log(

                    //     'totalPricediscounted',
                    //     roomData[j].totalPricediscounted
                    // )


                }

                // for find mimimum value 
                // let minPrice = roomData[0].totalPrice;
                // for (let j = 1; j < roomData.length; j++) {
                //     if (roomData[j].totalPrice < minPrice) {
                //         minPrice = roomData[j].totalPrice;
                //     }
                // }
                // console.log("Minimum price:", minPrice);


                setBookData(roomData)
            } catch (error) {
                console.log('error', error)
            }
        } else {
            router.push('/login?redirectUrl=hotel')
        }
    }

    const myHotelBooking = async () => {
        try {
            setLoading(false)
            // const userId = user.usernm

            let url =
                API_HOTEL_URL +
                '/ws/getAllBookingListForCustomer?userId=' + JSON.parse(localStorage.getItem('userInfo')).email;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    APP_KEY: '123456',
                    'Content-Type': 'application/json'
                }
            })
            const data1 = await response.json()

            console.log('Hotel', data1[0])
            let customers = ''

            setHotelBooking(data1[0])
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <HotelContext.Provider
            value={{
                loading,
                msg,
                error,
                searchHotel,
                hotelData,
                hotelDetails,
                bookNow,
                bookData,
                reserveData,
                bookingObj,
                hotelSugg,
                startDate,
                endDate,
                getDestinationSuggestions,
                setDate,
                setCheckOut,
                setDestination,
                selectedOption,
                myHotelBooking,
                hotelBooking,
                hotelSearchData,
                addRoomOne,
                removeRoom,
                incrementAdults,
                decrementAdults,
                incrementChildren,
                decrementChildren,
                showAlert
            }}>
            {children}
        </HotelContext.Provider>
    )
}

export default HotelContext
