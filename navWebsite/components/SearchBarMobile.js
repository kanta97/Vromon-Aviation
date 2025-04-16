import React, { useEffect, useState, useContext,useRef } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from '../styles/Flight.module.css'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import { API_AIR_URL } from '../config/index'
import { API_DOMAIN_URL_ONE } from '../config/index'
import FlightContext from '../context/FlightContext'
import { getPageFiles } from 'next/dist/server/get-page-files'
import passenger_data from '../data/passengerDetails.json'
import cabin_type from '../data/cabinType.json'
import moment from "moment/moment";
export default function SearchBarMobile(props) {
    const style = {
        width: '100px'
    }

    let trip = props.trip

    const {
        assignFromDestination,
        assignToDestination,
        assignJourneyDate,
        flightType,
        adults,
        childrenList,
        setChildrenList,
        childCount,
        infants,
        addTraveler,
        removeTraveler,
        journeyDate,
        handleSwapper,
        cabin,
        handleCabin,
        removeTrip,
        addTrip,
        trips,
        button1Ref,
        button2Ref,adultList,infantList,
        setflightType,showDatePicker,setShowDatePicker,isOffcanvasOpenCal, setIsOffcanvasOpenCal,isOffcanvasOpend, setIsOffcanvasOpen,isOffcanvasOpenTo, setIsOffcanvasOpenTo,showDropdownr, setShowDropdownr
    } = useContext(FlightContext)

    // const curr_date = new Date()
    // const date_str = journeyDate.toISOString().split('T')[0]
    // const curr_date_str = journeyDate.toString()
    // const today = curr_date_str.split(' ')[0]

    // const [selectedOption, setSelectedOption] = useState(null)
    // const [selectedOption1, setSelectedOption1] = useState('')

    // const [endDate, setEndDate] = useState(null)

    const [day, setDay] = useState(journeyDate.toLocaleString('default', { weekday: 'long' }))



    //const [startDate, setStartDate] = useState(curr_date)

    const getAirports = async (city) => {
        const get_airports_url =
            API_AIR_URL + '/available-airports?city=' + city
        const airports = await axios.get(get_airports_url)
        return airports.data.airports
    }

    const handleSelectedFrom = (e) => {
        assignFromDestination(e, props.index)
    }
    const handleSelectedTo = (e) => {
        assignToDestination(e, props.index)
    }

    const dateFormat = (date) => {
        const selected_day = date.toLocaleString('default', { weekday: 'long' });
        setDay(selected_day)
        assignJourneyDate(date, props.index)
    }
    function range(start, stop, step = 1) {
        return Array(Math.ceil((stop + start) / step))
            .fill(start)
            .map((x, y) => x + y * step)
    }
    function range1(start, stop, step = 1) {
        return Array(Math.ceil((stop - start) / step))
            .fill(start)
            .map((x, y) => x + y * step)
    }

    const curr_date = new Date()
    const year = curr_date.getFullYear()
    const year12ago = year - 11

    const years = range(2020, new Date().getFullYear() + 1, 1)
    const child = range1(year12ago, new Date().getFullYear() + 1, 1)

    const handleChildrenDOB = (date, index) => {
        let temp = [...childrenList]
        temp[index].dateOfBirth = date
        setChildrenList(temp)
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]


    // const triggerButton2 = () => {
    //     if (button2Ref.current) {
    //         button2Ref.current.click("hello");
    //         setShowDatePicker(true);
    
       
    //     }
    // };
    const triggerButton2 = () => {
        if (button2Ref.current) {
            button2Ref.current.click("hello");
            setShowDatePicker(true);
    
          
        }
    };
    

        const [previousSearches, setPreviousSearches] = useState([]);
    const [previousToSearches, setPreviousToSearches] = useState([]);

      useEffect(() => {
        const savedFromSearches = localStorage.getItem('previousSearches');
        if (savedFromSearches) {
            setPreviousSearches(JSON.parse(savedFromSearches));
        }
    }, []);

    useEffect(() => {
        const savedToSearches = localStorage.getItem('previousToSearches');
        if (savedToSearches) {
            setPreviousToSearches(JSON.parse(savedToSearches));
        }
    }, []);

   const handleOptionChange = (selectedOption) => {
    handleSelectedFrom(selectedOption);
    const updatedSearches = [...previousSearches, selectedOption];
    setPreviousSearches(updatedSearches);
    localStorage.setItem('previousSearches', JSON.stringify(updatedSearches));
};

const handleOptionChange1 = (selectedOption) => {
    handleSelectedTo(selectedOption);
    const updatedSearches = [...previousToSearches, selectedOption];
    setPreviousToSearches(updatedSearches);
    localStorage.setItem('previousToSearches', JSON.stringify(updatedSearches));
};
// const dropdownRef = useRef(null);

//   const handleOutsideClickdrop = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(true); // Close dropdown if clicked outside
//     }
//   };

//   useEffect(() => {
//     if (showDropdown) {
//       document.addEventListener('mousedown', handleOutsideClickdrop);
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClickdrop);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClickdrop);
//     };
//   }, [showDropdown]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px",
      backgroundColor: state.data.isFirst
        ? "#b0e7e5" // Always red for the first option #b0e7e5
        : state.isFocused
        ? "#ebf0f4" // Hover color for other options
        : "white", // Default background for non-hovered options,
      color: state.data.isFirst ? "#333" : state.isFocused ? "#333" : "#333", // Ensure readable text
      border:"unset",
      cursor: "pointer",
    }),
  };

const uniqueOptions = (options) => {
    const seen = new Set();
    return options.filter((option) => {
      const isDuplicate = seen.has(option.iata);
      seen.add(option.iata);
      return !isDuplicate;
    });
  };
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  // Open the dropdown menu on focus or click
  const handleFocus = () => {
    if (isDesktop) {
        setMenuIsOpen((prevState) => !prevState);
    }
};
useEffect(() => {
    const updateIsDesktop = () => {
        setIsDesktop(window.innerWidth >= 768); // Adjust breakpoint as needed
    };

    // Set initial value and add a listener for resize
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);

    return () => {
        window.removeEventListener("resize", updateIsDesktop);
    };
}, []);
  // Close the dropdown when clicking outside
  const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
          setMenuIsOpen(false); // Close menu if click is outside the container
      }
  };
  const handleDoneClick = () => {
    setShowDatePicker(false); // Close the date picker
  };
  useEffect(() => {
      // Add and clean up event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

useEffect(() => {
    if (menuIsOpen && inputRef.current) {
    inputRef.current.focus(); // Focus input when the menu is opened
    }
}, [menuIsOpen]); // Runs when menuIsOpen state changes

const [menuIsOpenTo, setMenuIsOpenTo] = useState(false);
  const containerRefTo = useRef(null);
  const inputRefTo = useRef(null);
  // Open the dropdown menu on focus or click
  const handleFocusTo = () => {
    if (isDesktop) {
        setMenuIsOpenTo((prevState) => !prevState);
    }
  
};


const handleClickOutsideTo = (event) => {
    if (containerRefTo.current && !containerRefTo.current.contains(event.target)) {
        setMenuIsOpenTo(false); // Close menu if click is outside the container
    }
};

useEffect(() => {
    // Add and clean up event listener
    document.addEventListener("mousedown", handleClickOutsideTo);
    return () => {
        document.removeEventListener("mousedown", handleClickOutsideTo);
    };
}, []);

useEffect(() => {
    if (menuIsOpenTo && inputRefTo.current) {
        inputRefTo.current.focus(); // Focus input when the menu is opened
    }
}, [menuIsOpenTo]); // Runs when menuIsOpen state changes
const [calendarIsOpen, setCalendarIsOpen] = useState(true);
    const containerRefcal = useRef(null);

    // Toggle calendar on click
    const handleFocuscal = (event) => {
        // Check if the event target is part of the calendar navigation buttons
        const isNavigationButton = event.target.closest('.react-datepicker__navigation');
        
        // Only toggle calendar if the click is not on a navigation button
        if (!isNavigationButton) {
            setCalendarIsOpen(true); // Toggle the calendar open/close
        }
        setIsOffcanvasOpenCal(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    

    // Close the calendar when clicking outside
    // const handleClickOutsidecal = (event) => {
    //     if (containerRef.current && !containerRef.current.contains(event.target) && calendarIsOpen) {
    //         setCalendarIsOpen(false); // Close calendar if click is outside the container
    //     }
    // };

    // useEffect(() => {
    //     // Add and clean up event listener for outside clicks
    //     document.addEventListener("mousedown", handleClickOutsidecal);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutsidecal);
    //     };
    // }, []);


    const handleOpenOffcanvas = () => {
        setIsOffcanvasOpen(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
 
    const handleOpenOffcanvasTo = () => {
        setIsOffcanvasOpenTo(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const handleOpenOffcanvasCal = () => {
          setIsOffcanvasOpenCal(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
    return (
        <>
            <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-6" >
         
        
      <div className="form_secelct_option me-2  w-100 h-100"  onClick={handleOpenOffcanvas}   // Attach ref to detect outside clicks
        // Open menu on click
            style={{ cursor: "pointer", position: "relative" }}>
    <div className="form_select" >
        <level>FROM</level>
        <div className="marge active">
    <div className='css-1jqq78o-placeholder mb-2 '>
    
       {trip.cityfrom}
        
        </div>
    <div className="sub-value">
        {(trip.from ? trip.from : "Choose an airport") +
            (trip.fromName ? ", " + trip.fromName : "")}
    </div>
</div>
    </div>
</div>
{isOffcanvasOpend && (
<div className='' style={{
      position: "fixed",
      top: "0",
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "#ebf0f4",
      zIndex: 1050,
      overflowX: "auto"
    }}>
  <div class="offcanvas_header d-flex justify-content-between align-items-center pb-1 p-3">
 <div></div>
    <div className='text-center'>
  <h6 className='mt-2 mb-0' id="offcanvasTopLabel">Departure From {trip.cityfrom}</h6>
  <small >{flightType}</small>
  </div>
    <button type="button" class="btn text-reset clo_btn"  onClick={() => setIsOffcanvasOpen(false)}
  aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </div>
  <div class="p-0">
  <div className="form_secelct_option me-2 w-100 h-100"   ref={containerRef} // Attach ref to detect outside clicks
            onClick={handleFocus} // Open menu on click
            style={{ cursor: "pointer", position: "relative" }}>
    <div className="form_select_mm">
        
        <div className="marge active mob_v ">
    <AsyncSelect
    ref={inputRef} 
        placeholder={trip.cityfrom}
        cacheOptions
        loadOptions={getAirports}
        defaultOptions={uniqueOptions([
            // Show the current search result first (if available)
            ...(trip.from
                ? [
                      {
                          name: trip.fromName,
                          city: trip.cityfrom,
                          iata: trip.from,
                          country: "Bangladesh",
                          isFirst: true,
                      },
                  ]
                : []),

            // Exclude the current search result from previous searches
            ...previousSearches.filter(
                (item) => item.iata !== trip.from
            ),

            // Exclude the current search result from fallback default options
            ...[
                { name: "Hazrat Shahjalal International Airport", city: "Dhaka", iata: "DAC", country: "Bangladesh" },
                { name: "Shah Amanat International Airport", city: "Chattogram", iata: "CGP", country: "Bangladesh" },
                { name: "Cox's Bazar Airport", city: "Cox's Bazar", iata: "CXB", country: "Bangladesh" },
                { name: "Osmany International Airport", city: "Sylhet", iata: "ZYL", country: "Bangladesh" },
                { name: "Saidpur Airport", city: "Saidpur", iata: "SPD", country: "Bangladesh" },
                { name: "Jashore Airport", city: "Jashore", iata: "JSR", country: "Bangladesh" },
                { name: "Shah Mokhdum Airport", city: "Rajshahi", iata: "RJH", country: "Bangladesh" },
                { name: "Barisal Airport", city: "Barisal", iata: "BZL", country: "Bangladesh" },
                { name: "Ishurdi Airport", city: "Ishurdi", iata: "IRD", country: "Bangladesh" },
            ].filter((item) => item.iata !== trip.from),
        ])}
        value={trip.from || ""}
        blurInputOnSelect={true}
        getOptionLabel={(option) =>
            `${option.iata}: ${option.name} ${option.city}`
        }
        onChange={handleOptionChange}
        menuIsOpen={true}
        styles={customStyles}
    />
    <div className="sub-value">
        {(trip.from ? trip.from : "Choose an airport") +
            (trip.fromName ? ", " + trip.fromName : "")}
    </div>
</div>
    </div>
</div>
  </div>
</div>
            )}

            </div>

            <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-6">

            <div className="form_select  form_select_to h-100  w-100" onClick={handleOpenOffcanvasTo}  // Attach ref to detect outside clicks
           
            style={{ cursor: "pointer", position: "relative" }}>
    {flightType !== "Multi City" && (
        <span
            className="swapper"
            onClick={() => {
                handleSwapper(props.index);
            }}
        ></span>
    )}
    <level className="ps-1">TO</level>

    <div className='css-1jqq78o-placeholder mb-2 '>
    
    {trip.cityto}
     
     </div>


    <div className="sub-value ps-1">
        {(trip.to ? trip.to : "Choose an airport") + (trip.toName ? `, ${trip.toName}` : "")}
    </div>
</div>
{isOffcanvasOpenTo && (
<div style={{
      position: "fixed",
      top: "0",
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "#ebf0f4",
      zIndex: 1050,
      overflowX: "auto"
    }}>
  <div class="offcanvas_header d-flex justify-content-between align-items-center  pb-1 p-3">
    <div></div>
    <div className='text-center'>
  <h6 className='mt-2 mb-0' id="offcanvasTopLabel">Arrival on {trip.cityto}</h6>
  <small >{flightType}</small>
  </div>
    <button type="button" class="btn text-reset clo_btn"  onClick={() => setIsOffcanvasOpenTo(false)}
  aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </div>
  <div class="p-0">
  <div className="form_select form_select_mm_to  h-100  w-100 mob_v "   // Attach ref to detect outside clicks
           onClick={handleFocusTo}
           style={{ cursor: "pointer",  }}>
 
 


<AsyncSelect
ref={inputRefTo} 
 placeholder={trip.cityto || "Choose an airport"}
 cacheOptions
 loadOptions={getAirports}
 defaultOptions={uniqueOptions([
   ...(trip.to
     ? [
         {
           name: trip.toName,
           city: trip.cityto,
           iata: trip.to,
           country: "Bangladesh",
           isFirst: true, // Mark the first option
         },
       ]
     : []),
   ...previousToSearches.filter((item) => item.iata !== trip.to),
   ...[
     {
       name: "Hazrat Shahjalal International Airport",
       city: "Dhaka",
       iata: "DAC",
       country: "Bangladesh",
      
     },
     { name: "Shah Amanat International Airport", city: "Chattogram", iata: "CGP", country: "Bangladesh" },
     { name: "Cox's Bazar Airport", city: "Cox's Bazar", iata: "CXB", country: "Bangladesh" },
     { name: "Osmany International Airport", city: "Sylhet", iata: "ZYL", country: "Bangladesh" },
     { name: "Saidpur Airport", city: "Saidpur", iata: "SPD", country: "Bangladesh" },
     { name: "Jashore Airport", city: "Jashore", iata: "JSR", country: "Bangladesh" },
     { name: "Shah Mokhdum Airport", city: "Rajshahi", iata: "RJH", country: "Bangladesh" },
     { name: "Barisal Airport", city: "Barisal", iata: "BZL", country: "Bangladesh" },
     { name: "Ishurdi Airport", city: "Ishurdi", iata: "IRD", country: "Bangladesh" },
   ].filter((item) => item.iata !== trip.to),
 ])}
 value={trip.to || ""}
 blurInputOnSelect={true}
 getOptionLabel={(option) => `${option.iata}: ${option.name} ${option.city}`}
 onChange={handleOptionChange1}
 menuIsOpen={true} 
 styles={customStyles}
/>

   <div className="sub-value">
       {(trip.to ? trip.to : "Choose an airport") + (trip.toName ? `, ${trip.toName}` : "")}
   </div>
</div>
  </div>
  </div>)}

            </div>
            <div className={flightType == 'One Way' ? "col-lg-12 col-xl-4 col-md-12 col-sm-12 " : "col-lg-12 col-xl-3 col-md-12 col-sm-12  hover_re"}>


                <div
                    className="btn-group w-100 h-100 button-travel topDate_pic date_index"  // Attach ref to the container
                    onClick={() =>  setShowDatePicker(true)} 
                    role="group"
                    aria-label="Basic example">
                    <button type="button" className="btn w-100 btn-primary-date" > 
                        <div className="form_select_btn  modify_date w-100  text-start">
                            <level>JOURNEY DATE</level>
                            {/* <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            /> */}
                            <div className='css-1jqq78o-placeholder mb-2 '>
                            {trip.journey_date instanceof Date
    ? moment(trip.journey_date).format("MMM DD, YYYY") // Format Date object
    : trip.journey_date || "Select a date"}
                            {/* {typeof (trip.journey_date) == 'string' ? new Date(trip.journey_date) : trip.journey_date} */}
     
     </div>
                         

                            {/* <div className="value">
        15 <span>Dec'22</span>
    </div> */}
                            <div className="sub-value">{day}</div>
                        </div>
                    </button>
                    {flightType == 'One Way' && <button type="button" className="btn w-100 btn-primary-date" onClick={triggerButton2}>
                        <div className="form_select_btn  modify_date  w-100 text-start">
                            <level>RETURN DATE</level>
                            <div className="return_flight mb-2">Save more in Return <br></br> Flight</div>
                        </div>
                    </button>}
                </div>
                {showDatePicker && (

 <div
 className="offcanvas offcanvas-start show date_sm"
 tabIndex="-1"
 style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
    zIndex: 1050,
    
 }}
    >
         <div class="offcanvas_header d-flex justify-content-between align-items-center  pb-1 p-3">
         <button type="button" class="btn text-reset clo_btn"  onClick={() => setShowDatePicker(false)}
  aria-label="Close">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 12.0007C20 12.553 19.593 13.0007 19.0909 13.0007H4.90909C4.40701 13.0007 4 12.553 4 12.0007C4 11.4485 4.40701 11.0007 4.90909 11.0007H19.0909C19.593 11.0007 20 11.4485 20 12.0007Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.8876 6.29641C11.2412 6.68854 11.2388 7.3217 10.8824 7.71062L6.19986 12.0012L10.8823 16.2905C11.2388 16.6794 11.2412 17.3126 10.8877 17.7047C10.5342 18.0969 9.95856 18.0996 9.60206 17.7107L4.26872 12.7113C4.09659 12.5236 4.00001 12.2674 4 12.0007C3.99999 11.7341 4.09656 11.479 4.26867 11.2913L9.602 6.2906C9.95848 5.90169 10.5341 5.90429 10.8876 6.29641Z" fill="#fff"></path></svg>
</button>
<div className='text-center'>
  <h6 className='mt-1 mb-0' id="offcanvasTopLabel"> Departure on {trip.journey_date instanceof Date
    ? moment(trip.journey_date).format("MMM DD, YYYY") // Format Date object
    : trip.journey_date || "Select a date"}</h6>
    <small className='text-center'>{flightType}</small></div>
    <button type="button" class="btn text-reset clo_btn"  onClick={() => setShowDatePicker(false)}
  aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </div>
  
                <DatePicker
                            open={calendarIsOpen} // Controlled state to open/close calendar
                            onClickOutside={() => setCalendarIsOpen(true)}
                                renderCustomHeader={({
                                    monthDate,
                                    customHeaderCount,
                                    decreaseMonth,
                                    increaseMonth,
                                    date,
                                    changeYear,
                                    changeMonth,

                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled
                                }) => (
                                    <div
                                        style={{
                                            margin: 6,
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                        <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="react-datepicker__navigation react-datepicker__navigation--previous"
                style={{
                    border: 'none',
                    background: 'none',
                    cursor: prevMonthButtonDisabled ? 'default' : 'pointer',
                }}
            >
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
            </button>

                                        {/* Static Month and Year Display */}
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#2e2d80' }}>
                {monthDate.toLocaleString('default', { month: 'long' })} {monthDate.getFullYear()}
            </span>
                                        <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="react-datepicker__navigation react-datepicker__navigation--next"
                style={{
                    border: 'none',
                    background: 'none',
                    cursor: nextMonthButtonDisabled ? 'default' : 'pointer',
                }}
            >
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
            </button>
                                    </div>
                                )}
                              selected={typeof (trip.journey_date) == 'string' ? new Date(trip.journey_date) : trip.journey_date}
                                monthsShown={1}
                                onChange={(date) => dateFormat(date)}
                                startDate={typeof (trip.journey_date) == 'string' ? new Date(trip.journey_date) : trip.journey_date}
                                dateFormat="MMM d, yyyy"
                                minDate={new Date()}
                                showDisabledMonthNavigation
                                   showMonthDropdown={false}
                                showYearDropdown={false}
                                readOnly // Prevent typing
                                onKeyDown={(e) => e.preventDefault()} // Block keyboard input
                                onFocus={(e) => e.target.blur()}
                            // onChange={onChange}
                            // endDate={endDate}
                            />
                             <button
              onClick={handleDoneClick}
              className="done-button p-2"
              style={{
                position: "absolute",
            fontSize:"15px",
             width:"90%",
            bottom:"10%",
                marginLeft: "5%",
              }}
            >
              Done
            </button>
                            </div>)}
            </div>
            {props.index < 1 && <div      className={flightType == 'One Way' ? `col-lg-12 col-xl-2 col-md-12 col-sm-12 dropdown` : `col-lg-12 col-xl-3 col-md-12 col-sm-12 dropdown`}>
            <div className=" w-100 h-100 ">
                    <button
                        className={`${styles.bg_color} form_select w-100 h-100 text-start `}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowDropdownr(!showDropdownr);
                          }}>
                        {/* {selectedOption1 || 'Select an option'} */}
                        <level>TRAVELER, CLASS</level>
                        <div className="value">
                            {adults + childCount + infants} Travelers
                        </div>
                        <div className="sub-value">{cabin_type[cabin]}</div>
                    </button>
                    <div className={`  ${styles.dropdown_custom}`}
                       onClick={(e) => e.stopPropagation()} >
                        {showDropdownr && (
                            <div className='' style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100vh",
                                backgroundColor: "#ebf0f4",
                                zIndex: 1050,
                              }}>
           <div class="offcanvas_header d-flex justify-content-between align-items-center  pb-1 p-3">
         <button type="button" class="btn text-reset clo_btn"  onClick={() => setShowDropdownr(false)}
  aria-label="Close">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 12.0007C20 12.553 19.593 13.0007 19.0909 13.0007H4.90909C4.40701 13.0007 4 12.553 4 12.0007C4 11.4485 4.40701 11.0007 4.90909 11.0007H19.0909C19.593 11.0007 20 11.4485 20 12.0007Z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.8876 6.29641C11.2412 6.68854 11.2388 7.3217 10.8824 7.71062L6.19986 12.0012L10.8823 16.2905C11.2388 16.6794 11.2412 17.3126 10.8877 17.7047C10.5342 18.0969 9.95856 18.0996 9.60206 17.7107L4.26872 12.7113C4.09659 12.5236 4.00001 12.2674 4 12.0007C3.99999 11.7341 4.09656 11.479 4.26867 11.2913L9.602 6.2906C9.95848 5.90169 10.5341 5.90429 10.8876 6.29641Z" fill="#fff"></path></svg>
</button>

  <h6 className='mt-2' id="offcanvasTopLabel">  <div className="value">
                            {adults + childCount + infants} Travelers
                        </div>
                        <div className="sub-value" style={{fontSize:"12px"}}>{cabin_type[cabin]}</div></h6>
    <button type="button" class="btn text-reset clo_btn"  onClick={() => setShowDropdownr(false)}
  aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </div>
                            <ul className='mb-2'>
                                <div
                                    className={`${styles.dropdown_custom_box}  mt-0 p-3`} style={{width:"100%",backgroundColor:"#fff"}}>
                                    {/* <div className="d-flex justify-content-between border_bottom pb-2">
                                        <p className=" my-0 fs-13 ms-2  traveler1">
                                            Travelers
                                        </p>

                                        <div
                                            className=" me-2 my-0 fs-13 ms-2  traveler"
                                            onClick={() => {
                                                setShowDropdown(false)
                                            }}>
                                           <img width={14} src="./assets/icons/crossremove.svg" alt="remove" />
                                        </div>
                                    </div> */}
                                      
                                    <li
                                        // onClick={handleOptionClick('Option 1')}
                                        className="border_bottom ">
                                            <p className="mb-0 text-clr-gray fw-normal ">Traveller's</p>
                                            <small className="d-block pb-3">Choose a person to join you on your journey</small>
                                        <div className="dropdown-item">
                                            <div className="adult d-inline-flex pt-2 justify-content-between align-items-center p-2 w-100">
                                                <div className="mb-0 pb-0">
                                                    <p className="mb-0 text-clr-gray fw-normal ">
                                                        Adults
                                                    </p>
                                                    <small className="d-block pb-0">
                                                        12 years+
                                                    </small>
                                                </div>
                                                <div className="traveler-input-box d-flex">
                                                    <input
                                                        type="button"
                                                        className=" traveler-btn-plus"
                                                        disabled={adultList.length <= 1} 
                                                        value="-"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeTraveler(
                                                                'adult'
                                                            )
                                                        }}
                                                    />
                                                    <p className="px-3  py-0 mb-0 mt-1 text-dark">
                                                        {adults}
                                                    </p>
                                                    <input
                                                        type="button"
                                                        className="traveler-btn-plus "
                                                        value="+"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addTraveler('adult')
                                                        }}
                                                        disabled={adultList.length + childrenList.length >= 7}  />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        // onClick={handleOptionClick('Option 2')}
                                        className="border_bottom">
                                        <div className="dropdown-item">
                                            <div className="children d-inline-flex justify-content-between gap-2 align-items-center p-2 w-100">
                                                <div className="mb-0 pb-0">
                                                    <p className="mb-0 text-clr-gray fw-normal  mt-0">
                                                        Children
                                                    </p>
                                                    <small className="d-block pb-0">
                                                        2-12 years
                                                    </small>
                                                </div>
                                                <div className="traveler-input-box d-flex">
                                                    <input
                                                        type="button"
                                                        className="px-0 py-0 traveler-btn-plus"
                                                        disabled={childrenList.length === 0} 
                                                        value="-"
                                                        onClick={(e) => {
                                                            e.preventDefault();  // Prevents scrolling or default behavior
                                                            removeTraveler('children');
                                                          }}
                                                    />
                                                    <p className="px-3 py-0 mb-0 mt-1 text-dark">
                                                        {childCount}
                                                    </p>
                                                    <input
                                                        type="button"
                                                        className="traveler-btn-plus px-0 py-0"
                                                        value="+"
                                                        onClick={(e) =>{
                                                            e.preventDefault();
                                                            addTraveler(
                                                                'children'
                                                            )
                                                        }}
                                                        disabled={adultList.length + childrenList.length >= 7} 
                                                    />
                                                </div>
                                            </div>
                                            {childrenList.map((chd, ch_idx) => {
                                                return (
                                                    <div className="d-flex justify-content-between child_dop ms-2 mt-2 mb-1">
                                                        <span
                                                            style={{
                                                                fontSize: '12px',marginTop:"-4px"
                                                            }}
                                                            className="me-3 mb-2">
                                                            Child {ch_idx + 1}{' '}
                                                            DOB
                                                        </span>
                                                        <DatePicker
                                                            renderCustomHeader={({
                                                                monthDate,
                                                                customHeaderCount,
                                                                decreaseMonth,
                                                                increaseMonth,
                                                                date,
                                                                changeYear,
                                                                changeMonth,

                                                                prevMonthButtonDisabled,
                                                                nextMonthButtonDisabled
                                                            }) => (
                                                           
                                                                <div
                                                                    style={{
                                                                        margin: 6,
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'center'
                                                                    }}>
                                                                   
                                                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        className="react-datepicker__navigation react-datepicker__navigation--previous"
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            cursor: prevMonthButtonDisabled ? 'default' : 'pointer',
                                        }}
                                    >
                                        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
                                    </button>
                                                                    <select
                                                                    style={{ fontSize: '14px', fontWeight: '500', color: '#2e2d80',border:"unset" }}
                                                                        className="btn p-1 pl-0 pe-0"
                                                                        value={date.getFullYear()}
                                                                        onChange={({
                                                                            target: {
                                                                                value
                                                                            }
                                                                        }) =>
                                                                            changeYear(
                                                                                value
                                                                            )
                                                                        }>
                                                                        {child.map(
                                                                            (
                                                                                option
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        option
                                                                                    }
                                                                                    value={
                                                                                        option
                                                                                    }>
                                                                                    {
                                                                                        option
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                    style={{ fontSize: '14px', fontWeight: '500', color: '#2e2d80',border:"unset" }}
                                                                        className="btn  p-1 pl-0 pe-0"
                                                                        value={
                                                                            months[
                                                                            date.getMonth()
                                                                            ]
                                                                        }
                                                                        onChange={({
                                                                            target: {
                                                                                value
                                                                            }
                                                                        }) =>
                                                                            changeMonth(
                                                                                months.indexOf(
                                                                                    value
                                                                                )
                                                                            )
                                                                        }>
                                                                        {months.map(
                                                                            (
                                                                                option
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        option
                                                                                    }
                                                                                    value={
                                                                                        option
                                                                                    }>
                                                                                    {
                                                                                        option
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                   
                                                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        className="react-datepicker__navigation react-datepicker__navigation--next"
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            cursor: nextMonthButtonDisabled ? 'default' : 'pointer',
                                        }}
                                    >
                                        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
                                    </button>
                                                                </div>
                                                            )}
                                                            placeholderText="mm/dd/yy"
                                                            monthsShown={1}
                                                            onChange={(date) =>
                                                                handleChildrenDOB(
                                                                    date,
                                                                    ch_idx
                                                                )
                                                            }
                                                            selected={
                                                                new Date(
                                                                    chd.dateOfBirth
                                                                )
                                                            }
                                                            startDate={
                                                                chd.dateOfBirth
                                                            }
                                                            dateFormat="MMM d, yyyy"
                                                            maxDate={
                                                                new Date(
                                                                    new Date().setFullYear(
                                                                        new Date().getFullYear() -
                                                                        2
                                                                    )
                                                                )
                                                            }
                                                            minDate={
                                                                new Date(
                                                                    new Date().setFullYear(
                                                                        new Date().getFullYear() -
                                                                        11
                                                                    )
                                                                )
                                                            }
                                                        // onChange={onChange}
                                                        // endDate={endDate}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </li>
                                    <li
                                        // onClick={handleOptionClick('Option 3')}
                                        className="border_bottom">
                                        <div className="dropdown-item">
                                            <div className="infant d-inline-flex justify-content-between gap-2 align-items-center p-2 w-100 ">
                                                <div className="mb-0 pb-0">
                                                    <p className=" mb-0 text-clr-gray fw-normal  mt-0">
                                                        Infant
                                                    </p>
                                                    <small className="d-block pb-0">
                                                        below 2 years
                                                    </small>
                                                </div>
                                                <div className="traveler-input-box d-flex">
                                                    <input
                                                        type="button"
                                                        className="px-0 py-0 traveler-btn-plus"
                                                        disabled={infantList.length <= 0}
                                                        onClick={(e) =>{
                                                            e.preventDefault();
                                                            removeTraveler(
                                                                'infant'
                                                            )
                                                        }}
                                                        value="-"
                                                    />
                                                    <p className="px-3 py-0 mb-0 mt-1 text-dark">
                                                        {infants}
                                                    </p>
                                                    <input
                                                        type="button"
                                                        className="traveler-btn-plus px-0 py-0"
                                                        value="+"
                                                        disabled={infantList.length >= 7} 
                                                        onClick={(e) =>{
                                                            e.preventDefault();
                                                            addTraveler(
                                                                'infant'
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                     <div className="my-2" style={{height:"6px",backgroundColor:"#ebf0f4",borderRadius:"8px"}} />
                                     <div style={{backgroundColor:"#fff"}}>
                                    <p className="my-0 fs-13 ms-2 mt-2 px-2 traveler">
                                        Booking class
                                    </p>
                                    <form className="cls_book border-0 px-2  row" style={{fontSize:"14px",paddingLeft:"5px"}}>
                                        <div className="col-5">
                                            <div className="form-check ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'Y'}
                                                    onChange={() => { handleCabin('Y') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label"     onClick={() => handleCabin('Y')} >
                                                    Economy
                                                </label>
                                            </div></div>
                                             <div className="col-7">
                                            <div className="form-check  ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName2"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'S'}
                                                    onChange={() => { handleCabin('S') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label" onClick={() => handleCabin('S') }>
                                                    Premium Economy
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="form-check ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName3"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'C'}
                                                    onChange={() => { handleCabin('C') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label" onClick={() =>  handleCabin('C') }>
                                                    Business
                                                </label>
                                            </div></div><div className="col-7">
                                            <div className="form-check  ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName4"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'J'}
                                                    onChange={() => { handleCabin('J') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label"  onClick={() =>  handleCabin('J') }>
                                                    Premium Business
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="form-check  ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName3"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'F'}
                                                    onChange={() => { handleCabin('F') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label"  onClick={() =>  handleCabin('F') }>
                                                    First Class
                                                </label>
                                            </div>  </div><div className="col-7">
                                            <div className="form-check ">
                                                <input
                                                    name="cabinclassName"
                                                    type="radio"
                                                    id="cabinclassName4"
                                                    className="form-check-input form_check_input "
                                                    checked={cabin == 'P'}
                                                    onChange={() => { handleCabin('P') }}
                                                />
                                                <label
                                                    title=""
                                                    className="form-check-label"  onClick={() =>  handleCabin('P') }>
                                                    Premium First Class
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </ul></div>
                        )}
                    </div>
                </div>
            </div>}


            {props.index > 0 && props.index == (trips.length - 1) ?

                <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 dropdown">
                    <div className="form_select ps-1 w-100 d-flex h-100">

                        <span class="add_city" onClick={addTrip}>
                            Add Another City
                        </span>

                        <span class="separator"></span>
                        <span class="remove_city disabled" onClick={removeTrip}>
                            <img src="./assets/icons/removeicon.svg" alt="remove" />
                        </span>

                        {/* <button onClick={() => removeTrip(props.index)} >Remove</button> */}
                    </div>
                </div> :
                props.index > 0 || props.index == (trips.length - 1) ?
                    <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 dropdown m-0"> </div> : ""
            }
        </>
    )
}
