import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "../styles/Checkout.module.css";
import DatePicker from "react-datepicker";
import camera from "../public/assets/icons/camera.png";
import countries from "../data/countryList.json";

import "react-datepicker/dist/react-datepicker.css";
import FlightContext from "../context/FlightContext";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function Passenger_Details({
  idx,
  passenger,
  onInputChanage,
  country,
  pass_type,
  errors,
}) {
  const handleDate = (date, type) => {
    if (type == "dob") {
      onInputChanage(date, "dateOfBirth");
    } else if (type == "passportIssueDate") {
      onInputChanage(date, "passportIssueDate");
    } else if (type == "passportExpireDate") {
      onInputChanage(date, "passportExpireDate");
    }
  };
  const { inputRefs } = useContext(FlightContext);
  console.log("idx", idx);
  console.log("errors", errors);
  function range(start, stop, step = 1) {
    return Array(Math.ceil((stop + start) / step))
      .fill(start)
      .map((x, y) => x + y * step);
  }
  function range1(start, stop, step = 1) {
    return Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);
  }
  const years = range(2023, new Date().getFullYear() + 1, 1);
  const child = range1(1900, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [who, setWho] = useState("Mr");
  console.log("want to see passenger ", passenger);
  function validateEmail(email) {
    const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address");
      // You can also add other logic to handle invalid input here
    }
  }
  return (
    passenger && (
      <div className={styles.margin_bottom}>
        <div
          className="card passenger_de"
          style={{ border: "unset", borderRadius: "0 0 16px 16px" }}
        >
          <div className="card-body pt-0" style={{}}>
            <div className="d-flex">
              <div class="" style={{ marginRight: 20 }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id={`${pass_type}-${idx}-who-mr`}
                  value="Mr"
                  onChange={(e) => {
                    setWho("Mr");
                    onInputChanage(e, "who");
                  }}
                  checked={who == "Mr" ? true : false}
                  style={{
                    margin: 0,
                    marginTop: 5,
                  }}
                />
                <label
                  style={{ margin: 0, paddingLeft: 10 }}
                  class="form-check-label"
                  for={`${pass_type}-${idx}-who-mr`}
                >
                  Mr
                </label>
              </div>

              <div class="" style={{ marginRight: 20 }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id={`${pass_type}-${idx}-who-ms`}
                  value="Ms"
                  onChange={(e) => {
                    setWho("Ms");
                    onInputChanage(e, "who");
                  }}
                  checked={who == "Ms" ? true : false}
                  style={{
                    margin: 0,
                    marginTop: 5,
                  }}
                />
                <label
                  style={{ margin: 0, paddingLeft: 10 }}
                  class="form-check-label"
                  for={`${pass_type}-${idx}-who-ms`}
                >
                  Ms
                </label>
              </div>

              <div class="" style={{ marginRight: 20 }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id={`${pass_type}-${idx}-who-mrs`}
                  value="Mrs"
                  onChange={(e) => {
                    setWho("Mrs");
                    onInputChanage(e, "who");
                  }}
                  checked={who == "Mrs" ? true : false}
                  style={{
                    margin: 0,
                    marginTop: 5,
                  }}
                />
                <label
                  style={{ margin: 0, paddingLeft: 10 }}
                  class="form-check-label"
                  for={`${pass_type}-${idx}-who-mrs`}
                >
                  Mrs
                </label>
              </div>
            </div>

            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-sm-12 col-md-6 margin_botton_3">
                <label>Given Name</label>
                <input
                  ref={(el) => (inputRefs.current[`${idx}_name`] = el)}
                  className={`form-control w-100 form-control-cus  ${
                    errors && errors[`${idx}_name`]
                      ? "border-danger"
                      : "border-0"
                  }`}
                  type="text"
                  placeholder="Given Name"
                  aria-label=" example "
                  style={{ marginRight: "10px" }}
                  value={passenger.name}
                  onChange={(e) => onInputChanage(e, "name", idx)}
                  onKeyPress={(e) => {
                    const alphabetsAndSpace = /^[A-Za-z\s]+$/;
                    const maxLength = 30;
                    if (
                      !alphabetsAndSpace.test(e.key) ||
                      e.target.value.length >= maxLength
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors && errors[`${idx}_name`] && (
                  <small className="text-danger">{errors[`${idx}_name`]}</small>
                )}
              </div>
              <div className="col-sm-12 col-md-6 margin_botton_3">
                <label>Surname</label>
                <input
                  ref={(el) => (inputRefs.current[`${idx}_surname`] = el)}
                  className={`form-control w-100 form-control-cus  ${
                    errors && errors[`${idx}_surname`]
                      ? "border-danger"
                      : "border-0"
                  }`}
                  type="text"
                  placeholder="Surname"
                  aria-label=" example"
                  style={{ marginRight: "10px" }}
                  value={passenger.surname}
                  onChange={(e) => onInputChanage(e, "surname", idx)}
                  onKeyPress={(e) => {
                    const alphabetsAndSpace = /^[A-Za-z\s]+$/;
                    const maxLength = 30;
                    if (
                      !alphabetsAndSpace.test(e.key) ||
                      e.target.value.length >= maxLength
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors && errors[`${idx}_surname`] && (
                  <small className="text-danger">
                    {errors[`${idx}_surname`]}
                  </small>
                )}
                {/* <select
                                className="form-select w-50"
                                aria-label="Default select example"
                                value={passenger.gender}
                                onChange={(e) => onInputChanage(e, 'gender')}>
                                <option selected disabled>
                                    Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select> */}
              </div>
            </div>

            {country != "BD" && (
              <div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 margin_botton_3">
                    <div style={{ marginTop: "10px" }}>
                      <label> Passport Details </label>
                    </div>
                    <input
                      ref={(el) =>
                        (inputRefs.current[`${idx}_passportNumber`] = el)
                      }
                      className={`form-control w-100 form-control-cus  ${
                        errors && errors[`${idx}_passportNumber`]
                          ? "border-danger"
                          : "border-0"
                      }`}
                      type="text"
                      placeholder="Passport Number"
                      aria-label=" example "
                      style={{ marginRight: "10px" }}
                      value={passenger.passportNumber}
                      onChange={(e) => onInputChanage(e, "passportNumber", idx)}
                      onKeyPress={(e) => {
                        const alphanumeric = /^[A-Za-z0-9]+$/;

                        if (!alphanumeric.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors && errors[`${idx}_passportNumber`] && (
                      <small className="text-danger">
                        {errors[`${idx}_passportNumber`]}
                      </small>
                    )}
                  </div>{" "}
                  <div className="col-sm-12 col-md-6 ">
                    <div style={{ marginTop: "10px" }}>
                      <label> Nationality </label>
                    </div>
                    <select
                      className={`form-select w-100 form-control-cus  ${
                        errors && errors[`${idx}_nationality`]
                          ? "border-danger"
                          : "border-0"
                      }`}
                      aria-label="Default select example "
                      value={passenger.nationality}
                      onChange={(e) => onInputChanage(e, "nationality", idx)}
                    >
                      {countries.map((country) => (
                        <option value={country}>{country} </option>
                      ))}
                    </select>
                    {errors && errors[`${idx}_nationality`] && (
                      <small
                        className="text-danger"
                        style={{ position: "relative", top: "0px" }}
                      >
                        {errors[`${idx}_nationality`]}
                      </small>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-2">
                    <div style={{ marginTop: "10px" }}>
                      <label> Passport Issued on </label>
                    </div>
                    <div
                      className=" date_birth"
                      ref={(el) =>
                        (inputRefs.current[`${idx}_passportIssueDate`] = el)
                      }
                    >
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
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 6,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              className="react-datepicker__navigation react-datepicker__navigation--previous"
                              style={{
                                border: "none",
                                background: "none",
                                cursor: prevMonthButtonDisabled
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
                            </button>

                            <select
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2e2d80",
                                border: "unset",
                              }}
                              className="btn p-1 pl-0 pe-0"
                              value={date.getFullYear()}
                              onChange={({ target: { value } }) =>
                                changeYear(value)
                              }
                            >
                              {child.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <select
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2e2d80",
                                border: "unset",
                              }}
                              className="btn  p-1 pl-0 pe-0"
                              value={months[date.getMonth()]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              className="react-datepicker__navigation react-datepicker__navigation--next"
                              style={{
                                border: "none",
                                background: "none",
                                cursor: nextMonthButtonDisabled
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
                            </button>
                          </div>
                        )}
                        monthsShown={1}
                        className={`form-control w-100 form-control-cus ${
                          errors && errors[`${idx}_passportIssueDate`]
                            ? "border-danger"
                            : "border-0"
                        }`}
                        wrapperClassName={`date_birth ${
                          errors && errors[`${idx}_passportIssueDate`]
                            ? "border-danger"
                            : "border-0"
                        }`}
                        selected={passenger.passportIssueDate}
                        placeholderText="Day - Month - Year"
                        onChange={(date) =>
                          handleDate(date, "passportIssueDate")
                        }
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                      />
                      {errors && errors[`${idx}_passportIssueDate`] && (
                        <small
                          className="text-danger"
                          style={{ position: "relative", top: "12px" }}
                        >
                          {errors[`${idx}_passportIssueDate`]}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 mb-2">
                    <div style={{ marginTop: "10px" }}>
                      <label> Passport expire on </label>
                    </div>
                    <div
                      className=" date_birth"
                      ref={(el) =>
                        (inputRefs.current[`${idx}_passportExpireDate`] = el)
                      }
                    >
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
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 6,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              className="react-datepicker__navigation react-datepicker__navigation--previous"
                              style={{
                                border: "none",
                                background: "none",
                                cursor: prevMonthButtonDisabled
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
                            </button>
                            <select
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2e2d80",
                                border: "unset",
                              }}
                              className="btn p-1 pl-0 pe-0"
                              value={date.getFullYear()}
                              onChange={({ target: { value } }) =>
                                changeYear(value)
                              }
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <select
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#2e2d80",
                                border: "unset",
                              }}
                              className="btn  p-1 pl-0 pe-0"
                              value={months[date.getMonth()]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              className="react-datepicker__navigation react-datepicker__navigation--next"
                              style={{
                                border: "none",
                                background: "none",
                                cursor: nextMonthButtonDisabled
                                  ? "default"
                                  : "pointer",
                              }}
                            >
                              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
                            </button>
                          </div>
                        )}
                        monthsShown={1}
                        minDate={new Date()}
                        className={`form-control w-100 form-control-cus ${
                          errors && errors[`${idx}_passportExpireDate`]
                            ? "border-danger"
                            : "border-0"
                        }`}
                        wrapperClassName={`date_birth ${
                          errors && errors[`${idx}_passportExpireDate`]
                            ? "border-danger"
                            : "border-0"
                        }`}
                        selected={passenger.passportExpireDate}
                        placeholderText={"Day - Month - Year"}
                        onChange={(date) =>
                          handleDate(date, "passportExpireDate")
                        }
                        dateFormat="yyyy-MM-dd"
                      />
                      {errors && errors[`${idx}_passportExpireDate`] && (
                        <small
                          className="text-danger"
                          style={{ position: "relative", top: "12px" }}
                        >
                          {errors[`${idx}_passportExpireDate`]}
                        </small>
                      )}
                    </div>{" "}
                  </div>
                </div>
              </div>
            )}
            {/* <div style={{ marginTop: '20px' }}>
                            <h6> Contact Details </h6>
                        </div> */}
            {/* <div>Receive booking confirmation &amp; updates</div> */}
            <div className="row pb-2">
              <div className="col-sm-12 col-md-6 margin_botton_3">
                <div
                  className="ml-2 form-group w-100"
                  style={{ marginRight: "10px", marginTop: "10px" }}
                >
                  <label for="exampleInputEmail1">Email address</label>
                  {/* <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={passenger.email}
                                    onChange={(e) => onInputChanage(e, 'email')}
                                /> */}
                  <input
                    type="text"
                    ref={(el) => (inputRefs.current[`${idx}_email`] = el)}
                    className={`form-control w-100 form-control-cus  ${
                      errors && errors[`${idx}_email`]
                        ? "border-danger"
                        : "border-0"
                    }`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={passenger.email}
                    onChange={(e) => onInputChanage(e, "email", idx)}
                    onBlur={(e) => validateEmail(e.target.value)}
                  />
                  {errors && errors[`${idx}_email`] && (
                    <small className="text-danger">
                      {errors[`${idx}_email`]}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-sm-12 col-md-6 margin_botton_3">
                <div
                  className="form-group w-100 "
                  style={{ marginTop: "10px" }}
                >
                  <label
                    htmlFor={`contactNumber_${idx}`}
                    for="exampleInputEmail1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`form-control w-100 form-control-cus  ${
                      errors && errors[`${idx}_contactNumber`]
                        ? "border-danger"
                        : "border-0"
                    }`}
                    ref={(el) =>
                      (inputRefs.current[`${idx}_contactNumber`] = el)
                    }
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="+8801xxxxxxxxx"
                    value={passenger.contactNumber}
                    onChange={(e) => onInputChanage(e, "contactNumber", idx)}
                    onKeyPress={(e) => {
                      const onlyNumbers = /^[0-9\b]+$/;
                      if (
                        !onlyNumbers.test(e.key) ||
                        e.target.value.length >= 11
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors && errors[`${idx}_contactNumber`] && (
                    <small className="text-danger">
                      {errors[`${idx}_contactNumber`]}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-sm-12 ">
                <div>
                  <div style={{ marginTop: "10px" }}>
                    <label> Date Of Birth </label>
                  </div>
                </div>
                <div
                  className=" date_birth"
                  style={{ marginRight: "10px" }}
                  ref={(el) => (inputRefs.current[`${idx}_dateOfBirth`] = el)}
                >
                  <div>
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
                        nextMonthButtonDisabled,
                      }) => (
                        <div
                          style={{
                            margin: 6,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            className="react-datepicker__navigation react-datepicker__navigation--previous"
                            style={{
                              border: "none",
                              background: "none",
                              cursor: prevMonthButtonDisabled
                                ? "default"
                                : "pointer",
                            }}
                          >
                            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
                          </button>
                          <select
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#2e2d80",
                              border: "unset",
                            }}
                            className="btn p-1 pl-0 pe-0"
                            value={date.getFullYear()}
                            onChange={({ target: { value } }) =>
                              changeYear(value)
                            }
                          >
                            {child.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <select
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#2e2d80",
                              border: "unset",
                            }}
                            className="btn  p-1 pl-0 pe-0"
                            value={months[date.getMonth()]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            className="react-datepicker__navigation react-datepicker__navigation--next"
                            style={{
                              border: "none",
                              background: "none",
                              cursor: nextMonthButtonDisabled
                                ? "default"
                                : "pointer",
                            }}
                          >
                            <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
                          </button>
                        </div>
                      )}
                      monthsShown={1}
                      className={`form-control w-100 form-control-cus ${
                        errors && errors[`${idx}_dateOfBirth`]
                          ? "border-danger"
                          : "border-0"
                      }`}
                      wrapperClassName={`date_birth ${
                        errors && errors[`${idx}_dateOfBirth`]
                          ? "border-danger"
                          : "border-0"
                      }`}
                      selected={passenger.dateOfBirth}
                      placeholderText="Day - Month - Year"
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => handleDate(date, "dob")}
                      // maxDate={new Date()}
                      maxDate={
                        pass_type == "child"
                          ? new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 2
                              )
                            )
                          : pass_type == "infant"
                          ? new Date()
                          : new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 11
                              )
                            )
                      }
                      minDate={
                        pass_type == "child"
                          ? new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 11
                              )
                            )
                          : pass_type == "infant"
                          ? new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 2
                              )
                            )
                          : null
                      }
                    />
                    {errors && errors[`${idx}_dateOfBirth`] && (
                      <small
                        className="text-danger"
                        style={{ position: "relative", top: "12px" }}
                      >
                        {errors[`${idx}_dateOfBirth`]}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
