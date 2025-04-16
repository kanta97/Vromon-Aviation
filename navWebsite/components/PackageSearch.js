import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext, useRef } from "react";
import style from "../styles/Package.module.css";
import axios from "axios";
// import $ from 'jquery'
import Select from "react-select";
import InputSelect from "./InputSelect";

import PackageContext from "../context/PackageContext";
import DatePicker from 'react-datepicker'
import { API_HOTEL_URL } from "../config/index";

export default function PackageSearch() {
 const modalRef = useRef(null)
  const router = useRouter(); 
  const {
    getAllDestinations,
    destinations,
    selectedDestination,
    setSelectedDestination,
  } = useContext(PackageContext);

  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [customPackData, setCustomPackData] = useState({
    cityData: [
      {
        city: "",
        nights: 0,
      },
    ],
    totalChildren: 0,
    childrenData: [],
    country: "",
    totalAdult: 1,
    travelDate: null,
    totalRoom: 0,
    tourType:"",
    hotelCategory: "",
    activitiesSightseeing: "",
    userName: "",
    userEmail: "",
    userPhone: "",
  });


  useEffect(() => {
    getAllDestinations();
    getAllCountries();
  }, []);

  useEffect(() => {
    setCustomPackData({
      ...customPackData,
      totalChildren: customPackData.childrenData.length,
    });
  }, [customPackData.childrenData]);
  console.log("customPackData", customPackData);
  useEffect(() => {
    getAllCities();
  }, [customPackData.country]);

  const getAllCountries = async () => {
    const resData = await axios.get(`${API_HOTEL_URL}/ws/getAllCountries`);

    setAllCountries(resData.data[0]);
  };

  const getAllCities = async () => {
    let country = allCountries.find(
      (item) => item.name == customPackData.country
    )?.id;
    const resData = await axios.get(
      `${API_HOTEL_URL}/ws/getCitiesOfCountry?countryId=${country}`
    );
    console.log("resData.data[0]", resData);
    setAllCities(resData.data[0]);
  };

  const requestPlan = async (e) => {
    e.preventDefault();
    const resData = await axios.post(
      `${API_HOTEL_URL}/ws/bookCustomPackage`,
      customPackData
    );
    if (resData.data[0][0].result === "+success") {
      alert(
        "Your customized package request has been accepted, we will contact with you as soon as possible."
      );
      setCustomPackData({
        cityData: [
          {
            city: "",
            nights: 0,
          },
        ],
        totalChildren: 0,
        childrenData: [],
        country: "",
        totalAdult: 0,
        travelDate: "",
        totalRoom: 0,
        tourType:"",
        hotelCategory: "",
        activitiesSightseeing: "",
        userName: "",
        userEmail: "",
        userPhone: "",
      });
    //$(modalRef.current).modal('hide')
    if (modalRef.current) {
      modalRef.current.style.display = 'none'; // Hides the modal
    }
    window.location.reload();
    console.log("Redirecting to home...");
    }
  };

  const addCityHandler = () => {
    if (customPackData.cityData.length <= 3) {
      setCustomPackData({
        ...customPackData,
        cityData: [
          ...customPackData.cityData,
          {
            city: "",
            nights: 0,
          },
        ],
      });
    }
  };

  const handleSelectChange = (e, index) => {
    const newCityData = [...customPackData.cityData];
    newCityData[index] = {
      ...newCityData[index],
      city: e.target.value,
    };

    setCustomPackData({
      ...customPackData,
      cityData: newCityData,
    });
  };
  //console.log("allCountries", allCountries);
  const handleNightsChange = (e, index) => {
    const newCityData = [...customPackData.cityData];
    newCityData[index] = {
      ...newCityData[index],
      nights: e.target.value,
    };

    setCustomPackData({
      ...customPackData,
      cityData: newCityData,
    });
  };

  const removeCityHandler = (index) => {
    let newCityData = [...customPackData.cityData];
    newCityData.splice(index, 1);
    setCustomPackData({
      ...customPackData,
      cityData: newCityData,
    });
  };

  const childDecHandler = () => {
    let newChildrenData = [...customPackData.childrenData];
    newChildrenData.splice(customPackData.childrenData.length - 1, 1);
    setCustomPackData({
      ...customPackData,
      childrenData: newChildrenData,
    });
  };

  const childIncHandler = () => {
    setCustomPackData({
      ...customPackData,
      childrenData: [
        ...customPackData.childrenData,
        {
          age: "",
          extraBed: "No",
        },
      ],
    });
  };

  const childAgeChangeHandler = (e, index) => {
    const newChildrenData = [...customPackData.childrenData];
    newChildrenData[index] = {
      ...newChildrenData[index],
      age: e.target.value,
    };

    setCustomPackData({
      ...customPackData,
      childrenData: newChildrenData,
    });
  };

  return (
    <div className={`${style.hotel_tab} row g-3 mt-1`}>
      <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
        <div className="form_secelct_option me-2 w-100 h-100">
      <InputSelect
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
        destinations={destinations}
      />
        </div>
      </div>
      {/* <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 ">
        <div className="form_secelct_option me-2 w-100">
          <div className="form_select">
            <level className="text-uppercase ">TOUR TYPE</level>
            <div className="marge active package_destination">
              <Select
                defaultValue={selectedDestination}
                onChange={setSelectedDestination}
                options={destinations}
              />
              <div className="sub-value">Country</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
        <button
          type="button"
          className={`{style.customizebtn} btn btn_primary2 `}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Need A Customized Package?
        </button>

        <div
         ref={modalRef}
          className=" modal_pack modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog custom_pack_modal modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title mt-2 mb-2" id="exampleModalLabel">Request Customized Package Plan</h6>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    requestPlan(e);
                  }}
                  className="form ms-4 me-4 mb-4"
                >
                  <div className="row mb-2">
               
                  <div className="col-6">
                  <div className="form-group">
  <label className="text-dark mb-2">Tour Type</label>
  <div className="custom-select-wrapper">
    <select
      onChange={(e) => {
        setCustomPackData({
          ...customPackData,
          tourType: e.target.value,
        });
      }}
      id="custPackagetourType"
      required
      className="form-control custom-select"
      value={customPackData.tourType}
    >
      <option value="">Select</option>
      <option value="LUXURY">LUXURY</option>
      <option value="PREMIUM">PREMIUM</option>
      <option value="STANDARD">STANDARD</option>
    </select>
    <span className="arrow-down">&#9660;</span> {/* Down arrow icon */}
  </div>
</div>

                    </div>
 <div className="col-6">
 <div className="form-group">
  <label className="text-dark mb-2">Country</label>
  <div className="custom-select-wrapper">
    <select
      onChange={(e) => {
        setCustomPackData({
          ...customPackData,
          country: e.target.value,
        });
      }}
      id="custPackageCountry"
      required
      className="form-control custom-select"
      value={customPackData.country}
    >
      <option value="">Select</option>
      {allCountries &&
        allCountries.map((item, index) => (
          <option key={index} value={item.name}>{item.name}</option>
        ))}
    </select>
    <span className="arrow-down">&#9660;</span> {/* Down arrow icon */}
  </div>
</div>

                    </div>

                  </div>
                  
                  <div
                    id="cityParent"
                    className="border rounded  pt-2 ps-3 pb-0 mb-2"
                  >
                    {customPackData.cityData.map((item, index) => (
                      <div className="row mb-2">
                        <div className="col-lg-5 col-sm-12">
                        <div className="form-group">
  <label className="text-dark mb-2">City</label>
  <div className="custom-select-wrapper">
    <select
      onChange={(e) => handleSelectChange(e, index)}
      className="form-control custom-select"
      id={`custPackageCity-${index}`}
      required
      value={item.city}
    >
      <option value="">Select</option>
      {allCities &&
        allCities.map((cityItem, cityIndex) => (
          <option key={cityIndex} value={cityItem.city}>
            {cityItem.city}
          </option>
        ))}
    </select>
    <span className="arrow-down">&#9660;</span> {/* Down arrow icon */}
  </div>
</div>

                        </div>
                        <div className="col-lg-5 col-sm-12">
                          <div className="form-group">
                            <label className="text-dark mb-2">
                              How many nights?
                            </label>
                            <input
                              value={item.nights}
                              onChange={(e) => {
                                handleNightsChange(e, index);
                              }}
                              required
                              className="form-control"
                              type="number"
                              placeholder="How many nights?"
                            />
                          </div>
                        </div>
                        {index > 0 && (
                          <div className="col-lg-2 col-sm-12">
                            <div className="form-group">
                              <label
                                style={{
                                  visibility: "hidden",
                                }}
                                className="text-dark mb-2"
                              >
                                Remove
                              </label>
                              <button
                                onClick={(e) => {
                                  removeCityHandler(index);
                                }}
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {customPackData.cityData.length <= 3 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group mt-2 mb-2">
                            <div
                              onClick={addCityHandler}
                              className="btn btn_primary btn_1"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              Add city
                            </div>
                            <small className="text-dark mb-2 ms-2">
                              *Upto 4
                            </small>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border rounded pt-2 ps-3 pe-3 pb-0 mb-2">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group mb-3">
                          <label className="text-dark mb-2">Adult</label>
                          <input
                            value={customPackData.totalAdult}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                totalAdult: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="text"
                            placeholder="Adult"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label className="text-dark mb-2">Children</label>
                          <br></br>
                          <div className="d-flex justify-content-start align-items-center">
                            <span
                              onClick={childDecHandler}
                              className="bg-sec1 ps-3 pe-3 pt-2 pb-2 rounded "
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              -
                            </span>
                            <input
                              value={customPackData.childrenData.length}
                              required
                              disabled
                              className="form-control w-75 text-center cust_from"
                              type="number"
                              placeholder="Children"
                            />
                            <span
                              onClick={childIncHandler}
                              className=" bg-sec2 ps-3 pe-3 pt-2 pb-2 rounded "
                              style={{
                                cursor: "pointer",
                              }}
                            >
                             +
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {customPackData.childrenData.map((item, index) => (
                      <>
                        <div className="col-lg-6 col-sm-12"></div>
                        <div className="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label className="text-dark mb-2">
                              Child No {index + 1}
                            </label>
                            <select
                              value={item.age}
                              onChange={(e) => {
                                childAgeChangeHandler(e, index);
                              }}
                              required
                              className="form-control mb-2"
                            >
                              <option value="">Select</option>
                              <option value="1">1 year age</option>
                              <option value="2">2 year age</option>
                              <option value="3">3 year age</option>
                              <option value="4">4 year age</option>
                              <option value="5">5 year age</option>
                              <option value="6">6 year age</option>
                              <option value="7">7 year age</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ))}
                    {/* <div className="col-lg-6 col-sm-12">
                                                <div className="form-group">
                                                    <label className="text-dark mb-2">
                                                        Do you want to take an
                                                        extra bed?
                                                    </label>
                                                    <select
                                                        ng-model="child.extraBed"
                                                        required
                                                        className="form-control mb-1">
                                                        <option value="">
                                                            Select
                                                        </option>
                                                        <option value="Yes">
                                                            Yes
                                                        </option>
                                                        <option value="No">
                                                            No
                                                        </option>
                                                    </select>
                                                </div>
                                            </div> */}
                  </div>

                  <div className="border rounded pt-2 ps-3 pe-3 pb-2 mb-2">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label className="text-dark mb-2">Travel Date</label>
                          <div className="form-control customize-pack-date">
 
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
<span style={{ fontSize: '14px', fontWeight: '500', color: '#10b7b1' }}>
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
      showIcon
      selected={customPackData.travelDate}
      onChange={(date) =>
        setCustomPackData({
          ...customPackData,
          travelDate: date,
        })
      }
      dateFormat="MMM d, yyyy"
  minDate={new Date()}
      placeholderText="Select Travel Date"
      className="form-control"
   
    /></div>
                          {/* <input
                            value={customPackData.travelDate}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                travelDate: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="date"
                            placeholder="Trvel Date"
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label className="text-dark mb-2">Room</label>
                          <input
                            value={customPackData.totalRoom}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                totalRoom: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="number"
                            placeholder="Room"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
  <label className="text-dark mb-2 mt-2">Hotel Category</label>
  <div className="custom-select-wrapper">
    <select
      value={customPackData.hotelCategory}
      onChange={(e) => {
        setCustomPackData({
          ...customPackData,
          hotelCategory: e.target.value,
        });
      }}
      required
      className="form-control custom-select"
    >
      <option value="">Select</option>
      <option value="1">1 Star</option>
      <option value="2">2 Star</option>
      <option value="3">3 Star</option>
      <option value="4">4 Star</option>
      <option value="5">5 Star</option>
    </select>
    <span className="arrow-down">&#9660;</span> {/* Down arrow icon */}
  </div>
</div>

                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="form-group">
                          <label className="text-dark mb-2 mt-2">
                          &nbsp; &nbsp;
                          </label>
                          <textarea
                            value={customPackData.activitiesSightseeing}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                activitiesSightseeing: e.target.value,
                              });
                            }}
                            style={{
                              height: "35px",
                            }}
                            required
                            className="form-control"
                            placeholder="Write here"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded pt-2 ps-3 pe-3 pb-3 mb-2">
                    <div className="row">
                      <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                          <label className="text-dark mb-2">Your Name</label>
                          <input
                            value={customPackData.userName}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                userName: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                          <label className="text-dark mb-2">Your Email</label>
                          <input
                            value={customPackData.userEmail}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                userEmail: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6">
                        <div className="form-group">
                          <label className="text-dark mb-2">Your Phone</label>
                          <input
                            value={customPackData.userPhone}
                            onChange={(e) => {
                              setCustomPackData({
                                ...customPackData,
                                userPhone: e.target.value,
                              });
                            }}
                            required
                            className="form-control"
                            type="text"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <button type="submit" className="btn w-100 btn_primary btn_1">
                          Request Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
