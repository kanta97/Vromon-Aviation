import React, { useEffect, useState, useContext,useRef,useCallback } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import style from '../styles/Hotel.module.css'
import HotelContext from '../context/HotelContext'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
export default function HotelSearch() {
    const [showDropdown, setShowDropdown] = useState(false)


    const {
        getDestinationSuggestions,
        hotelSugg,
        setDate, setCheckOut,
        setDestination,
        hotelSearchData,setHotelSearchData ,
        addRoomOne,
        removeRoom,
        incrementAdults,
        decrementAdults,
        incrementChildren,
        decrementChildren
    } = useContext(HotelContext)

    useEffect(() => {
        getDestinationSuggestions()
    }, [])
    function range(start, stop, step = 1) {
        return Array(Math.ceil((stop + start) / step))
            .fill(start)
            .map((x, y) => x + y * step)
    }

    const years = range(2023, new Date().getFullYear() + 1, 1)
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
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(
        hotelSearchData.checkInDate ? new Date(hotelSearchData.checkInDate) : null
      );
      const [endDate, setEndDate] = useState(
        hotelSearchData.checkOutDate ? new Date(hotelSearchData.checkOutDate) : null
      );
      
    const datePickerRef = useRef(null);
  
      const handleOutsideClick = useCallback((event) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
          setShowDatePicker(false);
        }
      }, []);
      
      useEffect(() => {
        if (showDatePicker) {
          document.addEventListener('mousedown', handleOutsideClick);
        } else {
          document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => document.removeEventListener('mousedown', handleOutsideClick);
      }, [showDatePicker, handleOutsideClick]);
    // const handleDateChange = (dates) => {
    //     const [start, end] = dates;
    //        setStartDate(start);
    //   setEndDate(end);
    //     setDate(start);
    //     setCheckOut(end ); // Ensure checkOut defaults to start if end is null
    //   };
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        console.log("Start Date:", start);
        console.log("End Date:", end);
        
        // Update startDate and endDate
        setStartDate(start);
    
        if (start && end) {
          if (start.toDateString() === end.toDateString()) {
            alert("Check out date cannot be the same as the Check in date.");
            setEndDate(null);
            setCheckOut(null); // Reset endDate if invalid
          } else {
            setDate(start);
            setEndDate(end); 
            setCheckOut(end);// Update endDate
          }
        } else {
          setEndDate(end);
          setCheckOut(end); // Allow selection of endDate without a startDate
        }
      };
    const handleDoneClick = () => {
        setShowDatePicker(false);
          
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
      
    return (
        <div className={`${style.hotel_tab} row g-3 mt-1`}>
            <div className="col-lg-12 col-xl-4 col-md-12 col-sm-12 col-12 mb_3">
                <div className="form_secelct_option me-2 w-100 h-100" ref={containerRef} // Attach ref to detect outside clicks
            onClick={handleFocus}>
                    <div className="form_select">
                        <level>CITY/HOTEL/RESORT/AREA</level>
                        <div className="marge active">
                            <Select
                              ref={inputRef} 
                                defaultValue={hotelSearchData.destination}
                                onChange={setDestination}
                                options={hotelSugg}
                                placeholder="Select"
                                menuIsOpen={isDesktop ? menuIsOpen : undefined}
                            />
                            <div className="sub-value">Bangladesh</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-12 col-xl-5 col-md-12 col-sm-12 mb_3">
                <div
                    className="btn-group w-100 h-100  button-travel"
                    role="group"
                    aria-label="Basic example" onClick={() => !showDatePicker && setShowDatePicker(true)}>
                    <button type="button" className="btn w-100 btn-primary-date">
                        <div className="form_select_btn   w-100 text-start">
                            <level>CHECK IN</level>
                     
                               
                                <div className="date-selection-text" >
                                {moment(startDate).isValid() 
  ? moment(startDate).format("MMM DD, YYYY") 
  : "Select Date"}
                                 </div>
                                <div className="sub-value-hotel">
                                    Your Journey Day
                                </div>
                            </div>
                        
                    </button>
    
   
                    <button type="button" className="btn w-100 btn-primary-date">
                        <div className="form_select_btn  w-100 text-start">
                            <level>CHECK OUT</level>                          
                            <div className="date-selection-text" onClick={() => !showDatePicker && setShowDatePicker(true)}>
                            
                             {endDate ? moment(endDate).format('MMM DD, YYYY') : 'Select Date'}
                             </div><div className="sub-value-hotel">
                                Your Return Day
                            </div>
                        </div>
                    </button>
                    {showDatePicker && (
        <div ref={datePickerRef} className="datepicker-wrapper" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, width: '500px' }}>
          <React.Suspense fallback={<div>Loading...</div>}>
          <DatePicker
  selected={startDate instanceof Date && !isNaN(startDate) ? startDate : null}
  onChange={handleDateChange}
  startDate={startDate instanceof Date && !isNaN(startDate) ? startDate : null}
  endDate={endDate instanceof Date && !isNaN(endDate) ? endDate : null}
  selectsRange
  inline
  shouldCloseOnSelect={false}
  minDate={new Date()}
  monthsShown={2}
  className="custom-datepicker"
/>
</React.Suspense>
          <button
            onClick={handleDoneClick}
            className="done-button"
            style={{
              position: 'absolute',
              bottom: '19px',
              right: '16px',
            }}
          >
            Done
          </button>
        </div>
      )}
                </div>
            </div>
            <div className="col-lg-12 col-xl-3 col-md-12 col-sm-12 mb-3" ref={dropdownRef}>
                <div className=" w-100 h-100">
                    <button
                        className={`${style.bg_color} form_select w-100 h-100 text-start `}
                        onClick={() => setShowDropdown(!showDropdown)}>
                        <level>ROOMS & GUESTS</level>
                        <div className="value">
                            {hotelSearchData.roomData.length} Room,{' '}
                            {hotelSearchData.roomData.reduce(
                                (acc, curr) => acc + curr.adults,
                                0
                            ) +
                                hotelSearchData.roomData.reduce(
                                    (acc, curr) => acc + curr.children,
                                    0
                                )}{' '}
                            Guests
                        </div>
                        <div className="sub-value_hotel">
                            {hotelSearchData.roomData.reduce(
                                (acc, curr) => acc + curr.adults,
                                0
                            )}{' '}
                            Adults
                        </div>
                    </button>
                    <div className={`  ${style.dropdown_custom}`}>
                        {showDropdown && (
                            <ul>
                                {hotelSearchData.roomData.map((room, index) => (
                                    <div
                                        className={`${style.dropdown_custom_box} px-2`}>
                                        <div className="d-flex justify-content-between border_bottom">
                                            <p className="mt-2 my-0 fs-13 ms-2 mb-2 traveler1">
                                                Room {index + 1}
                                            </p>
                                            {index > 0 && (
                                                <p
                                                    onClick={(e) =>
                                                        removeRoom(index)
                                                    }
                                                    className="mt-2 my-0 fs-13 ms-2  traveler">
                                                    Remove
                                                </p>
                                            )}
                                        </div>
                                        <li className="border_bottom">
                                            <a
                                                className="dropdown-item"
                                                href="#">
                                                <div className="adult d-inline-flex justify-content-between align-items-center p-2 w-100">
                                                    <div className="mb-0 pb-0">
                                                        <p className="mb-0 text-clr-gray fw-normal">
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
                                                            disabled=""
                                                            value="-"
                                                            onClick={() =>
                                                                decrementAdults(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <p className="px-3 py-0 mb-0 mt-1 text-dark">
                                                            {room.adults}
                                                        </p>
                                                        <input
                                                            type="button"
                                                            className="traveler-btn-plus "
                                                            value="+"
                                                            onClick={() =>
                                                                incrementAdults(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="border_bottom">
                                            <a
                                                className="dropdown-item"
                                                href="#">
                                                <div className="children d-inline-flex justify-content-between gap-2 align-items-center p-2 w-100">
                                                    <div className="mb-0 pb-0">
                                                        <p className="mb-0 text-clr-gray fw-normal mt-0">
                                                            Children
                                                        </p>
                                                        <small className="d-block pb-0">
                                                            0-12 years
                                                        </small>

                                                        <div style={{ position: 'absolute' }}>
                                                            {
                                                                room.children_ages.map((item) => {
                                                                    return (
                                                                        <select style={{ marginRight: 5 }}>
                                                                            <option value="">
                                                                                Age
                                                                            </option>
                                                                            <option value="1">
                                                                                1
                                                                            </option>
                                                                            <option value="2">
                                                                                2
                                                                            </option>
                                                                            <option value="3">
                                                                                3
                                                                            </option>
                                                                            <option value="4">
                                                                                4
                                                                            </option>
                                                                            <option value="5">
                                                                                5
                                                                            </option>
                                                                            <option value="6">
                                                                                6
                                                                            </option>
                                                                            <option value="7">
                                                                                7
                                                                            </option>
                                                                            <option value="8">
                                                                                8
                                                                            </option>
                                                                            <option value="9">
                                                                                9
                                                                            </option>
                                                                            <option value="10">
                                                                                10
                                                                            </option>
                                                                            <option value="11">
                                                                                11
                                                                            </option>
                                                                            <option value="12">
                                                                                12
                                                                            </option>
                                                                        </select>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                    </div>
                                                    <div className="traveler-input-box d-flex">
                                                        <input
                                                            type="button"
                                                            className=" traveler-btn-plus"
                                                            disabled=""
                                                            value="-"
                                                            onClick={() =>
                                                                decrementChildren(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <p className="px-3 py-0 mb-0 mt-1 text-dark">
                                                            {room.children}
                                                        </p>
                                                        <input
                                                            type="button"
                                                            className="traveler-btn-plus "
                                                            value="+"
                                                            onClick={() =>
                                                                incrementChildren(
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between px-2 my-3">
                                    <button
                                        className="btn btn-outline-info me-2"
                                        type="button"
                                        onClick={addRoomOne}>
                                        <img
                                            src="assets/icons/plus_cercle.svg"
                                            className={`${style.icon} me-1 mb-1`}
                                        />
                                        Add Room
                                    </button>
                                    <button
                                        className="btn btn_primary px-2 py-1 fs-6"
                                        type="button"
                                        onClick={() => setShowDropdown(false)}>
                                        Done
                                    </button>
                                </div>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
