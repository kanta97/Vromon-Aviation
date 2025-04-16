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

export default function SearchBar(props) {
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
        trips,selectedFlight,
        button1Ref,
        button2Ref,adultList,infantList,
        setflightType,setShowDatePicker
    } = useContext(FlightContext)

    // const curr_date = new Date()
    // const date_str = journeyDate.toISOString().split('T')[0]
    // const curr_date_str = journeyDate.toString()
    // const today = curr_date_str.split(' ')[0]

    // const [selectedOption, setSelectedOption] = useState(null)
    // const [selectedOption1, setSelectedOption1] = useState('')

    // const [endDate, setEndDate] = useState(null)

    const [day, setDay] = useState(journeyDate.toLocaleString('default', { weekday: 'long' }))

    const [showDropdown, setShowDropdown] = useState(false)

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
    const [minDateForIndex1, setMinDateForIndex1] = useState(null);
    const dateFormat = (date) => {
        const selected_day = date.toLocaleString('default', { weekday: 'long' });
        setDay(selected_day)
        assignJourneyDate(date, props.index)
        console.log("date", date)
        console.log("selected_day", props.index)
       
      setMinDateForIndex1(date);
 
    if (props.index === 0) {
        setMinDateForIndex1(date);
      }
      setShowDropdown(true);
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


    const triggerButton2 = () => {
        if (button2Ref.current) {
            // console.log('hello')
          button2Ref.current.click("hello");
          setShowDatePicker(true);

        }}

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
    setMenuIsOpenTo(true);
};

const handleOptionChange1 = (selectedOption) => {
    handleSelectedTo(selectedOption);
    const updatedSearches = [...previousToSearches, selectedOption];
    setPreviousToSearches(updatedSearches);
    localStorage.setItem('previousToSearches', JSON.stringify(updatedSearches));
    setCalendarIsOpen(true);
};
const dropdownRef = useRef(null);

  const handleOutsideClickdrop = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleOutsideClickdrop);
    } else {
      document.removeEventListener('mousedown', handleOutsideClickdrop);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClickdrop);
    };
  }, [showDropdown]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px",
      backgroundColor: state.data.isFirst
        ? "#2e2d805e" // Always red for the first option #b0e7e5
        : state.isFocused
        ? "#ebf0f4" // Hover color for other options
        : "white", // Default background for non-hovered options,
      color: state.data.isFirst ? "#333" : state.isFocused ? "#333" : "#333", // Ensure readable text
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
const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const containerRefcal = useRef(null);

    // Toggle calendar on click
    const handleFocuscal = (event) => {
        // Check if the event target is part of the calendar navigation buttons
        const isNavigationButton = event.target.closest('.react-datepicker__navigation');
        
        // Only toggle calendar if the click is not on a navigation button
        if (!isNavigationButton) {
            setCalendarIsOpen(prevState => !prevState); // Toggle the calendar open/close
        }
    };
    

    // Close the calendar when clicking outside
    const handleClickOutsidecal = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target) && calendarIsOpen) {
            setCalendarIsOpen(false); // Close calendar if click is outside the container
        }
    };

    useEffect(() => {
        // Add and clean up event listener for outside clicks
        document.addEventListener("mousedown", handleClickOutsidecal);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsidecal);
        };
    }, []);


    
    return (
        <>
            <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-6">
            {/* <p ref={textRef} onClick={handleClick} style={{ cursor: "pointer", userSelect: "text" }}>
      Click on this text to automatically select it.
    </p> */}
      <div className="form_secelct_option me-2 w-100 h-100 "  ref={containerRef} // Attach ref to detect outside clicks
            onClick={handleFocus} // Open menu on click
            style={{ cursor: "pointer", position: "relative" }}>
    <div className="form_select">
        <level>FROM</level>
        <div className="marge active">
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
        menuIsOpen={isDesktop ? menuIsOpen : undefined}
        styles={customStyles}
    />
    <div className="sub-value" >
        {(trip.from ? trip.from : "Choose an airport") +
            (trip.fromName ? ", " + trip.fromName : "")}
    </div>
</div>
    </div>
</div>

 {/* <div
            className="form_secelct_option me-2 w-100 h-100"
            ref={containerRef}
            style={{ cursor: "pointer", position: "relative" }}
        >
            <div className="form_select" onClick={() => inputRef.current?.focus()}>
                <label>FROM</label>
                <div className="marge active">
                    <AsyncSelect
                        ref={inputRef}
                        placeholder="Choose an airport"
                        cacheOptions
                        loadOptions={getAirports}
                        defaultOptions={[
                            ...(selectedAirport ? [selectedAirport] : []),
                            ...previousSearches.filter((item) => item.iata !== trip.from),
                            { name: "Hazrat Shahjalal International Airport", city: "Dhaka", iata: "DAC", country: "Bangladesh" },
                            { name: "Shah Amanat International Airport", city: "Chattogram", iata: "CGP", country: "Bangladesh" },
                            { name: "Cox's Bazar Airport", city: "Cox's Bazar", iata: "CXB", country: "Bangladesh" },
                            { name: "Osmany International Airport", city: "Sylhet", iata: "ZYL", country: "Bangladesh" },
                            { name: "Saidpur Airport", city: "Saidpur", iata: "SPD", country: "Bangladesh" },
                            { name: "Jashore Airport", city: "Jashore", iata: "JSR", country: "Bangladesh" },
                            { name: "Shah Mokhdum Airport", city: "Rajshahi", iata: "RJH", country: "Bangladesh" },
                            { name: "Barisal Airport", city: "Barisal", iata: "BZL", country: "Bangladesh" },
                            { name: "Ishurdi Airport", city: "Ishurdi", iata: "IRD", country: "Bangladesh" },
                        ]}
                        value={selectedAirport}
                        getOptionLabel={(option) => `${option.iata}: ${option.name}, ${option.city}`}
                        onChange={handleSelect}
                        menuIsOpen={isDesktop ? undefined : undefined}
                        styles={{
                            ...customStyles,
                            control: (provided) => ({
                                ...provided,
                                minHeight: "40px",
                                display: "flex",
                                justifyContent: "space-between",
                            }),
                        }}
                    />
                    <div className="sub-value">
                        {selectedAirport ? (
                            <>
                                {selectedAirport.iata}: {selectedAirport.name}, {selectedAirport.city}
                                <span
                                    className="clear-btn"
                                    onClick={handleClearSelection}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                        color: "red",
                                    }}
                                >
                                    ✖
                                </span>
                            </>
                        ) : (
                            "Choose an airport"
                        )}
                    </div>
                </div>
            </div>
        </div> */}
            </div>

            <div className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-6">
            <div className="form_select  form_select_to h-100  w-100" ref={containerRefTo} // Attach ref to detect outside clicks
            onClick={handleFocusTo} // Open menu on click
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
  menuIsOpen={isDesktop ? menuIsOpenTo : undefined} 
  styles={customStyles}
/>

    <div className="sub-value ps-1">
        {(trip.to ? trip.to : "Choose an airport") + (trip.toName ? `, ${trip.toName}` : "")}
    </div>
</div>


            </div>
            <div className={flightType == 'One Way' ? "col-lg-12 col-xl-4 col-md-12 col-sm-12 " : "col-lg-12 col-xl-3 col-md-12 col-sm-12  hover_re"}>


                <div
                    className="btn-group w-100 h-100 button-travel topDate_pic date_index" ref={containerRefcal} // Attach ref to the container
                    onClick={(event) => handleFocuscal(event)} 
                    role="group"
                    aria-label="Basic example">
                    <button type="button" className="btn w-100 btn-primary-date">
                        <div className="form_select_btn  modify_date w-100  text-start">
                            <level>JOURNEY DATE</level>
                            {/* <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            /> */}
                            <DatePicker
                            open={calendarIsOpen} // Controlled state to open/close calendar
                            onClickOutside={() => setCalendarIsOpen(false)}
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
                                minDate={
                                    props.index === 0
                                      ? new Date() // Ensure the first trip has today's date as minDate
                                      : selectedFlight?.trips?.[props.index - 1]?.journey_date &&
                                        trip?.journey_date &&
                                        new Date(selectedFlight.trips[props.index - 1].journey_date) > new Date(trip.journey_date)
                                      ? new Date(selectedFlight.trips[props.index - 1].journey_date)
                                      : trip?.journey_date
                                      ? new Date(trip.journey_date)
                                      : new Date() // Fallback to today if trip.journey_date is missing
                                  }
                                  
                                 
                                   showDisabledMonthNavigation
                                   showMonthDropdown={false}
                                showYearDropdown={false}
                                readOnly // Prevent typing
                                onKeyDown={(e) => e.preventDefault()} // Block keyboard input
                                onFocus={(e) => e.target.blur()}
                            // onChange={onChange}
                            // endDate={endDate}
                            />

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
            </div>
            {props.index < 1 && <div ref={dropdownRef} className={flightType == 'One Way' ? `col-lg-12 col-xl-2 col-md-12 col-sm-12 dropdown` : `col-lg-12 col-xl-3 col-md-12 col-sm-12 dropdown`}>
                <div className=" w-100 h-100 ">
                    <button
                        className={`${styles.bg_color} form_select w-100 h-100 text-start `}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowDropdown(!showDropdown);
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
                        {showDropdown && (
                            <ul className='mb-2'>
                                <div
                                    className={`${styles.dropdown_custom_box}   px-2`}>
                                    <div className="d-flex justify-content-between border_bottom pb-2">
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
                                    </div>
                                    <li
                                        // onClick={handleOptionClick('Option 1')}
                                        className="border_bottom">
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
                                     {/* <hr className="my-2" /> */}
                                    <p className="my-0 fs-13 ms-2 mt-1  traveler">
                                        Booking class
                                    </p>
                                    <form className="cls_book border-0   row" style={{fontSize:"14px",paddingLeft:"5px"}}>
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
                            </ul>
                        )}
                    </div>
                </div>
            </div>}


            {props.index > 0 && props.index == (trips.length - 1) ?

                <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 dropdown">
                    <div className="form_select ps-3 w-100 d-flex h-100">

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
