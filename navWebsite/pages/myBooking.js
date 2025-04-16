import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import FlightContext from "../context/FlightContext";
import PackageContext from "../context/PackageContext";
import Loader from "../components/Loader";
import HotelContext from "../context/HotelContext";
import { useRouter } from "next/router";
import styles from "../styles/Flight.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { API_AIR_URL } from '../config/index';
// import { Button, Modal } from "react-bootstrap";
export default function myBooking() {
  const router = useRouter();
  const { tab = "flight" } = router.query;
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedPackData, setSelectedPackData] = useState(null);
  const [selectedHotelData, setSelectedHotelData] = useState(null);
  
  const {
    loading,
    myBooking,
    flights,
    myBookingData,
    myPackageBooking,
    packageBooking,
    msg,
    error,
  } = useContext(FlightContext);
  console.log("myPackageBooking", packageBooking);
  const formatTime = (dateTime) => {
    if (!dateTime) return "N/A"; // Handle null or undefined
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Formats as HH:MM
  };
  const { myHotelBooking, hotelBooking } = useContext(HotelContext);
  useEffect(() => {
    myBooking();
    console.log("flights", myBookingData);
  }, []);

  useEffect(() => {
    myPackageBooking();
    console.log("Pakage", packageBooking);
  }, []);
  useEffect(() => {
    myHotelBooking();
  
  }, []);
  console.log("hotelhghgf", hotelBooking);
  useEffect(() => {
    console.log("Router query tab:", router.query.tab);
  }, [router.query.tab]);

  const handleCloseModal = () => {
    setSelectedRowData(null);
  };

  const [selectedRowData1, setSelectedRowData1] = useState(null);
  console.log("selectedRowData1",selectedRowData1)
  const [showModal, setShowModal] = useState(false);
  const handleDetailsClick = (data) => {
    try {
      if (!data) {
        console.error("Invalid data:", data);
        return;
      }

      setSelectedRowData(data);
      setSelectedRowData1(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error in handleDetailsClick:", error);
    }
  };
  const handlepackClick = (data) => {
    try {
      if (!data) {
        console.error("Invalid data:", data);
        return;
      }

      setSelectedPackData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error in handleDetailsClick:", error);
    }
  };
  const handlehotelClick = (data) => {
    try {
      if (!data) {
        console.error("Invalid data:", data);
        return;
      }

      setSelectedHotelData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error in handleDetailsClick:", error);
    }
  };
  console.log("selectedPackData",selectedPackData)
  const handleClose = () => {
    setShowModal(false);
    setSelectedRowData(null); 
    setSelectedPackData(null);// Optionally clear selected data
    setSelectedHotelData(null);
  };

  const downloadPDF = (pdf_link) => {
    if (!pdf_link) {
      console.error("PDF link is missing");
      return;
    }

    // Construct the full URL
    const fullUrl = `${API_AIR_URL}/${pdf_link}`;

    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = fullUrl;
    link.target = '_blank';
    document.body.appendChild(link); // Append to the body (needed for Firefox)
    link.click();
    document.body.removeChild(link); // Remove the link element afterward
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout className="login_form ">
      <section className="myScreen_section">
        <div className="container">
          <div className="row align-items-start g-3">
            <div className="col-lg-3 col-12">
              <div className="card_custom card">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className={`nav-pills nav-link ${
                      tab === "flight" ? "active" : ""
                    } ${!tab ? "active" : ""}`}
                    id="v-pills-flight-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-flight"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-flight"
                    aria-selected="true"
                  >
                    <span className="flight"></span>
                    Flight
                  </button>
                  {/* <button
                    className={`nav-pills nav-link ${
                      tab === "hotel" ? "active" : ""
                    }`}
                    id="v-pills-hotel-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-hotel"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-hotel"
                    aria-selected="false"
                  >
                    <span className="hotel "></span>
                    Hotel
                  </button> */}
                  {/* <button
                    className={`nav-pills nav-link ${
                      tab === "package" ? "active" : ""
                    }`}
                    id="v-pills-package-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-package"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-package"
                    aria-selected="false"
                  >
                    <span className="package"></span> Package
                  </button> */}
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              {/* <div className="card_custom card p-4"> */}
              <div className="p_5 pt-0">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className={`tab-pane fade ${
                      tab === "flight" ? "show active" : ""
                    }`}
                    id="v-pills-flight"
                    role="tabpanel"
                    aria-labelledby="v-pills-flight-tab"
                  >
                    {loading && <Loader />}



                    {/* Footer */}

                    {(!myBookingData || myBookingData.length === 0) &&
                    !loading ? (
                      <div>
                        {isLoading ? (
                          <div className="row">
                            <div className="col-sm-9">
                              <div className={`${styles.oktext2} `}>
                                <strong className="mb-2">
                                  <Skeleton height={20} width={250} />
                                </strong>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={350} />
                                </h6>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={450} />
                                </h6>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                          <div className="col-sm-9">
                            <div className={`${styles.oktext2} `}>
                              <strong className="mb-2">
                                <Skeleton height={20} width={250} />
                              </strong>
                            </div>
                            <div className={styles.oktext3}>
                              <h6 className="mt-2">
                                <Skeleton height={20} width={350} />
                              </h6>
                            </div>
                            <div className={styles.oktext3}>
                              <h6 className="mt-2">
                                <Skeleton height={20} width={450} />
                              </h6>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {!myBookingData || myBookingData.length === 0 ? (
                          <div className="table-responsive table-container">
                            <table className="table table-striped table-bordered data-table dt_tb">
                              <thead className="table_head">
                                <tr>
                                  <th>Name</th>
                                  <th>Surname</th>
                                  <th>Mobile</th>
                                  <th>Email</th>
                                  <th>Adult Count</th>
                                  <th>Children Count</th>
                                  <th>Infant Count</th>
                                  <th>Travel Cost</th>
                                  <th>Payment Status</th>
                                  <th>Booking date</th>
                                  <th style={{ width: "115px" }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                {loading && <Loader />}
                                {!loading && (
                                  <tr>
                                    <td colSpan="11">No data available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div>
                      {myBookingData.map((data, index) => {
                        const legs = data?.pnr_body?.legs || [];
                        if (legs.length === 0) {
                          return (
                            <div key={index}>No flight details available</div>
                          );
                        }

                        const firstLeg = legs[0];
                        const lastLeg = legs[legs.length - 1];

                        return (
                          <div className="booking_border" key={index}>
                            <span className="boooking_date">
                              {data.created_at?.split("T")[0] || "N/A"}
                            </span>
                            <div
                              className={`card ms-3 mt-1`}
                              style={{ border: "unset" }}
                            >
                              <div className="row">
                                <div className="col-md-12 col-sm-12 p-3">
                                  {data.pnr_body?.journey_type ===
                                    "Round Way" && (
                                    <>
                                      {/* Handling 2 Legs */}
                                      {legs.length === 2 && (
                                        <>
                                          <div
                                            key="leg1"
                                            className="row align-items-center"
                                            style={{ width: "100%" }}
                                          >
                                            <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                              <div className="forsmall_device d-flex ar_fli align-items-center">
                                                <div className="flex-grow-1 ms-3">
                                                  <p className="mb-0">
                                                    {legs[0]
                                                      ?.MarketingAirlineCode ||
                                                      "N/A"}
                                                    -
                                                    {legs[0]?.FlightNumber ||
                                                      "N/A"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                              <div className="row">
                                                <div className="col-4">
                                                  <div>
                                                    <strong className="fnt-14">
                                                      {legs[0]
                                                        ?.OriginLocationCode ||
                                                        "N/A"}
                                                    </strong>
                                                    <div
                                                      style={{ fontSize: 14 }}
                                                    >
                                                      {formatTime(
                                                        legs[0]
                                                          ?.DepartureDateTime
                                                      ) || "N/A"}
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className="col-4 for_transform"
                                                  style={{
                                                    alignSelf: "center",
                                                    textAlign: "center",
                                                    fontSize: "12px",
                                                    transform:
                                                      "translateX(-6px)",
                                                    color: "#535D7E",
                                                  }}
                                                >
                                                  <div className="flight_stops_info">
                                                    <div className="flight_stop_names"></div>
                                                  </div>
                                                </div>

                                                <div className="col-4 text-end">
                                                  <strong className="fnt-14">
                                                    {legs[0]
                                                      ?.DestinationLocationCode ||
                                                      "N/A"}
                                                  </strong>
                                                  <div>
                                                    {formatTime(
                                                      legs[0]?.ArrivalDateTime
                                                    ) || "N/A"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-sm-12 text-center">
                                              <button
                                                type="button"
                                                className="btn btn_book2 custom_btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#flightmodal"
                                                onClick={() =>
                                                  handleDetailsClick(data)
                                                }
                                              >
                                                View Details
                                              </button>
                                            </div>
                                          </div>

                                          <div
                                            key="leg1"
                                            className="row align-items-center mt-3"
                                            style={{ width: "100%" }}
                                          >
                                            <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                              <div className="forsmall_device d-flex ar_fli align-items-center">
                                                <div className="flex-grow-1 ms-3">
                                                  <p className="mb-0">
                                                    {legs[1]
                                                      ?.MarketingAirlineCode ||
                                                      "N/A"}
                                                    -
                                                    {legs[1]?.FlightNumber ||
                                                      "N/A"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="col-md-8 col-sm-12">
                                              <div className="row">
                                                <div className="col-4">
                                                  <div>
                                                    <strong className="fnt-14">
                                                      {legs[1]
                                                        ?.OriginLocationCode ||
                                                        "N/A"}
                                                    </strong>
                                                    <div
                                                      style={{ fontSize: 14 }}
                                                    >
                                                      {formatTime(
                                                        legs[1]
                                                          ?.DepartureDateTime
                                                      ) || "N/A"}
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className="col-4 for_transform"
                                                  style={{
                                                    alignSelf: "center",
                                                    textAlign: "center",
                                                    fontSize: "12px",
                                                    transform:
                                                      "translateX(-6px)",
                                                    color: "#535D7E",
                                                  }}
                                                >
                                                  <div className="flight_stops_info">
                                                    <div className="flight_stop_names"></div>
                                                  </div>
                                                </div>

                                                <div className="col-4 text-end">
                                                  <strong className="fnt-14">
                                                    {legs[1]
                                                      ?.DestinationLocationCode ||
                                                      "N/A"}
                                                  </strong>
                                                  <div>
                                                    {formatTime(
                                                      legs[1]?.ArrivalDateTime
                                                    ) || "N/A"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {/* View Details Button */}
                                            <div className="col-md-2 col-sm-12 text-center">
                                              {/* {data.pnr_body.legs.length === 2 &&
                                          index === 0 ? (
                                            // Show once for roundway
                                            <button
                                              type="button"
                                              className="btn btn_book2 custom_btn"
                                              data-bs-toggle="modal"
                                              data-bs-target="#flightmodal"
                                              onClick={() =>
                                                handleDetailsClick(data)
                                              }
                                            >
                                              View Details
                                            </button>
                                          ) : data.pnr_body.legs.length == 1 ? (
                                            // Show for all other cases
                                            <button
                                              type="button"
                                              className="btn btn_book2 custom_btn"
                                              data-bs-toggle="modal"
                                              data-bs-target="#flightmodal"
                                              onClick={() =>
                                                handleDetailsClick(data)
                                              }
                                            >
                                              View Details
                                            </button>
                                          ) : data.pnr_body.legs.length == 3 &&
                                            index === 0 ? (
                                            // Show for all other cases
                                            <button
                                              type="button"
                                              className="btn btn_book2 custom_btn"
                                              data-bs-toggle="modal"
                                              data-bs-target="#flightmodal"
                                              onClick={() =>
                                                handleDetailsClick(data)
                                              }
                                            >
                                              View Details
                                            </button>
                                          ) : data.pnr_body.legs.length == 4 &&
                                           index === 0 ? (
                                            // Show for all other cases
                                            <button
                                              type="button"
                                              className="btn btn_book2 custom_btn"
                                              data-bs-toggle="modal"
                                              data-bs-target="#flightmodal"
                                              onClick={() =>
                                                handleDetailsClick(data)
                                              }
                                            >
                                              View Details
                                            </button>
                                          ) : null} */}
                                            </div>
                                          </div>
                                        </>
                                      )}

                                      {/* Handling 4 Legs */}
                                      {legs.length === 4 && (
                                        <>
                                          <div
                                            key="leg05"
                                            className="row align-items-center"
                                            style={{ width: "100%" }}
                                          >
                                            <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                              <div className="forsmall_device d-flex ar_fli align-items-center">
                                                <div className="flex-grow-1 ms-3">
                                                  <p className="mb-0">
                                                    {legs[0]
                                                      ?.MarketingAirlineCode ||
                                                      "N/A"}
                                                    -
                                                    {legs[0]?.FlightNumber ||
                                                      "N/A"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                              <div className="row">
                                                <div className="col-4">
                                                  <div>
                                                    <strong className="fnt-14">
                                                      {legs[0]
                                                        ?.OriginLocationCode ||
                                                        "N/A"}
                                                    </strong>
                                                    <div
                                                      style={{ fontSize: 14 }}
                                                    >
                                                      {formatTime(
                                                        legs[0]
                                                          ?.DepartureDateTime
                                                      ) || "N/A"}
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className="col-4 for_transform"
                                                  style={{
                                                    alignSelf: "center",
                                                    textAlign: "center",
                                                    fontSize: "12px",
                                                    transform:
                                                      "translateX(-6px)",
                                                    color: "#535D7E",
                                                  }}
                                                >
                                                  <div className="flight_stops_info">
                                                    <div className="flight_stop_names"></div>
                                                  </div>
                                                </div>

                                                <div className="col-4 text-end">
                                                  <strong className="fnt-14">
                                                    {legs[1]
                                                      ?.DestinationLocationCode ||
                                                      "N/A"}
                                                  </strong>
                                                  <div>
                                                    {formatTime(
                                                      legs[1]?.ArrivalDateTime
                                                    ) || "N/A"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-sm-12 text-center">
                                              <button
                                                type="button"
                                                className="btn btn_book2 custom_btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#flightmodal"
                                                onClick={() =>
                                                  handleDetailsClick(data)
                                                }
                                              >
                                                View Details
                                              </button>
                                            </div>
                                          </div>

                                          <div
                                            key="leg02"
                                            className="row align-items-center mt-3"
                                            style={{ width: "100%" }}
                                          >
                                            <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                              <div className="forsmall_device d-flex ar_fli align-items-center">
                                                <div className="flex-grow-1 ms-3">
                                                  <p className="mb-0">
                                                    {legs[2]
                                                      ?.MarketingAirlineCode ||
                                                      "N/A"}
                                                    -
                                                    {legs[2]?.FlightNumber ||
                                                      "N/A"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                              <div className="row">
                                                <div className="col-4">
                                                  <div>
                                                    <strong className="fnt-14">
                                                      {legs[2]
                                                        ?.OriginLocationCode ||
                                                        "N/A"}
                                                    </strong>
                                                    <div
                                                      style={{ fontSize: 14 }}
                                                    >
                                                      {formatTime(
                                                        legs[2]
                                                          ?.DepartureDateTime
                                                      ) || "N/A"}
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className="col-4 for_transform"
                                                  style={{
                                                    alignSelf: "center",
                                                    textAlign: "center",
                                                    fontSize: "12px",
                                                    transform:
                                                      "translateX(-6px)",
                                                    color: "#535D7E",
                                                  }}
                                                >
                                                  <div className="flight_stops_info">
                                                    <div className="flight_stop_names"></div>
                                                  </div>
                                                </div>

                                                <div className="col-4 text-end">
                                                  <strong className="fnt-14">
                                                    {legs[3]
                                                      ?.DestinationLocationCode ||
                                                      "N/A"}
                                                  </strong>
                                                  <div>
                                                    {formatTime(
                                                      legs[3]?.ArrivalDateTime
                                                    ) || "N/A"}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-sm-12 text-center"></div>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}

                                  {data.pnr_body?.journey_type ===
                                    "One Way" && (
                                    <div
                                      key="leg03"
                                      className="row align-items-center"
                                      style={{ width: "100%" }}
                                    >
                                      <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                        <div className="forsmall_device d-flex ar_fli align-items-center">
                                          <div className="flex-grow-1 ms-3">
                                            <p className="mb-0">
                                              {legs[0]?.MarketingAirlineCode ||
                                                "N/A"}
                                              -{legs[0]?.FlightNumber || "N/A"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-sm-12">
                                        <div className="row">
                                          <div className="col-4">
                                            <div>
                                              <strong className="fnt-14">
                                                {" "}
                                                {firstLeg.OriginLocationCode ||
                                                  "N/A"}
                                              </strong>
                                              <div style={{ fontSize: 14 }}>
                                                {formatTime(
                                                  firstLeg.DepartureDateTime
                                                ) || "N/A"}
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className="col-4 for_transform"
                                            style={{
                                              alignSelf: "center",
                                              textAlign: "center",
                                              fontSize: "12px",
                                              transform: "translateX(-6px)",
                                              color: "#535D7E",
                                            }}
                                          >
                                            <div className="flight_stops_info">
                                              <div className="flight_stop_names"></div>
                                            </div>
                                          </div>

                                          <div className="col-4 text-end">
                                            <strong className="fnt-14">
                                              {" "}
                                              {lastLeg.DestinationLocationCode ||
                                                "N/A"}
                                            </strong>
                                            <div>
                                              {formatTime(
                                                lastLeg.ArrivalDateTime
                                              ) || "N/A"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-2 col-sm-12 text-center">
                                        <button
                                          type="button"
                                          className="btn btn_book2 custom_btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#flightmodal"
                                          onClick={() =>
                                            handleDetailsClick(data)
                                          }
                                        >
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  {data.pnr_body?.journey_type ===
                                    "Multi City" && (
                                    <div
                                      key="leg04"
                                      className="row align-items-center"
                                      style={{ width: "100%" }}
                                    >
                                      <div className="col-md-2 col-lg-2 col-sm-12 col-xl-2 d-flex">
                                        <div className="forsmall_device d-flex ar_fli align-items-center">
                                          <div className="flex-grow-1 ms-3">
                                            <p className="mb-0">
                                              {legs[0]?.MarketingAirlineCode ||
                                                "N/A"}
                                              -{legs[0]?.FlightNumber || "N/A"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-8 col-sm-12">
                                        <div className="row">
                                          <div className="col-4">
                                            <div>
                                              <strong className="fnt-14">
                                                {" "}
                                                {firstLeg.OriginLocationCode ||
                                                  "N/A"}
                                              </strong>
                                              <div style={{ fontSize: 14 }}>
                                                {formatTime(
                                                  firstLeg.DepartureDateTime
                                                ) || "N/A"}
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className="col-4 for_transform"
                                            style={{
                                              alignSelf: "center",
                                              textAlign: "center",
                                              fontSize: "12px",
                                              transform: "translateX(-6px)",
                                              color: "#535D7E",
                                            }}
                                          >
                                            <div className="flight_stops_info">
                                              <div className="flight_stop_names"></div>
                                            </div>
                                          </div>

                                          <div className="col-4 text-end">
                                            <strong className="fnt-14">
                                              {" "}
                                              {lastLeg.DestinationLocationCode ||
                                                "N/A"}
                                            </strong>
                                            <div>
                                              {formatTime(
                                                lastLeg.ArrivalDateTime
                                              ) || "N/A"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-2 col-sm-12 text-center">
                                        <button
                                          type="button"
                                          className="btn btn_book2 custom_btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#flightmodal"
                                          onClick={() =>
                                            handleDetailsClick(data)
                                          }
                                        >
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={`card ${styles.myfooter2}`}>
                              {!loading &&
                                data &&
                                data.pnr_body.legs.map((modal, modalIndex) => {
                                  // Check if the length is 2, 3, or 4
                                  if (
                                    [2, 3, 4].includes(
                                      data.pnr_body.legs.length
                                    )
                                  ) {
                                    // Show the footer content only for the first leg
                                    return modalIndex === 0 ? (
                                      <div
                                        key={modalIndex}
                                        className={styles.myfooter2_child}
                                      >
                                        <span
                                          className={styles.myfooter2_child1}
                                        >
                                          {modal.baggageInfo.weight}
                                          {modal.baggageInfo.unit} check-in bags
                                          included**
                                        </span>
                                      </div>
                                    ) : null;
                                  }
                                  // For other lengths, show content for each leg
                                  return (
                                    <div
                                      key={modalIndex}
                                      className={styles.myfooter2_child}
                                    >
                                      <span className={styles.myfooter2_child1}>
                                        {modal.baggageInfo.weight}
                                        {modal.baggageInfo.unit} check-in bags
                                        included**
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                        )}
                      </>
                    )}
                  </div>

                  <div
                    className={`tab-pane fade ${
                      tab === "hotel" ? "show active" : ""
                    }`}
                   
                    id="v-pills-hotel"
                    role="tabpanel"
                    aria-labelledby="v-pills-hotel-tab"
                  >
                    {!hotelBooking || hotelBooking.length == 0 ? (
                      <div>
                        {isLoading ? (
                          <div className="row">
                            <div className="col-sm-9">
                              <div className={`${styles.oktext2} `}>
                                <strong className="mb-2">
                                  <Skeleton height={20} width={250} />
                                </strong>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={350} />
                                </h6>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={450} />
                                </h6>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>No Data</div>
                        )}
                      </div>
                    ) : (
                      // <div className="table-responsive table-container">
                      //   <table className="table table-striped table-bordered data-table dt_tb">
                      //     <thead className="table_head">
                      //       <tr>
                      //         <th>Booking ID</th>
                      //         <th>Check In Date</th>
                      //         <th>Check Out Date</th>
                      //         <th>Hotel Name</th>
                      //         <th>Price</th>
                      //         <th>Booking Status</th>
                      //         <th>Payment Method</th>
                      //         <th>Payment Status</th>
                      //       </tr>
                      //     </thead>
                      //     <tbody>
                      //       {loading && <Loader />}
                      //       {!loading &&
                      //         hotelBooking &&
                      //         hotelBooking.map((hotel, index) => (
                      //           <tr key={index}>
                      //             <td>{hotel.id}</td>
                      //             <td style={{ whiteSpace: "nowrap" }}>
                      //             {hotel.checkInDate ? hotel.checkInDate.split("T")[0] : "N/A"}
                      //             </td>
                      //             <td style={{ whiteSpace: "nowrap" }}>
                                 
                      //               {hotel.checkOutDate ? hotel.checkOutDate.split("T")[0] : "N/A"}
                      //             </td>
                      //             <td style={{ whiteSpace: "nowrap" }}>
                      //               {hotel.propertyName}
                      //             </td>
                      //             <td style={{ whiteSpace: "nowrap" }}>
                      //               {hotel.totalAmount}
                      //             </td>
                      //             <td class="text-capitalize">
                      //               {hotel.status}
                      //             </td>
                      //             <td>{hotel.paymentMethod}</td>
                      //             <td class="text-capitalize">
                      //               {hotel.paymentStatus}
                      //             </td>
                      //           </tr>
                      //         ))}
                      //     </tbody>
                      //   </table>
                      // </div>
                      <>
                      {loading && <Loader />}

                      {!loading &&
                        hotelBooking &&
                        hotelBooking.map((pack, index) => (
                                               <div className="booking_border" key={index}>
                                                  <span className="boooking_date">
                                                    {pack.createDate?.split("T")[0] || "N/A"}
                                                  </span>
                                                  <div
                                                    className={`card ms-3 mt-1`}
                                                    style={{ border: "unset" }}
                                                  >
                      
                                                    <div className="row">
                                                      <div className="col-md-12 col-sm-12 p-3">
                                                        <div className="ps-3 pe-3 pack_boking">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                        <h6>Booking ID:<span>{pack.id}</span></h6> <div  className="d-flex align-items-center"> <h6>BDT  </h6><h5 className="ms-2">{pack?.totalAmount?.toLocaleString()}</h5></div>
                                                        </div>
                                                        <div className="d-inline  align-items-center pack_boking_body">
                                                    
                                                        <div className="mb-1 mt-2"> <h5>{pack.propertyName}</h5></div>
                                                      <div><p>{pack.roomName}</p></div>
                                                        </div>
                                                      
                                                        {/* <div className="d-flex align-items-center pack_boking_body">
                                                       
                                                        <h6 className="">Total Travlers:</h6>
                                                        <span>{pack.people_count}</span>
                                                        </div> */}
                         
                                                        <div className="d-flex justify-content-between align-items-center">
                                                       <div className=" justify-content-start align-items-center"><h6>Check In Date: <span> {pack.checkInDate ? pack.checkInDate.split("T")[0] : "N/A"} </span></h6><h6> Check Out Date:<span>  {pack.checkOutDate ? pack.checkOutDate.split("T")[0] : "N/A"}</span></h6></div> 
                                                       {/* <div className="d-flex justify-content-start align-items-center"><h6>Payment: <span>{pack.paymentMethod} </span></h6><h6> Booking:<span>  {pack.paymentStatus }</span></h6></div>  */}
                                                       <div><button  type="button"
                                                                      data-bs-toggle="modal"
                                                                      data-bs-target="#flightmodal"
                                                                      onClick={() =>
                                                                        handlehotelClick(pack)
                                                                      } className="btn btn_book2_pack custom_btn">View Details</button></div>
                                                        </div></div>
                                                      </div>
                                                      </div>
                                                      </div>
                                                      </div>
                        ))}</>
                    )}
                  </div>

                  <div
                    className={`tab-pane fade ${
                      tab === "package" ? "show active" : ""
                    }`}
                  
                    id="v-pills-package"
                    role="tabpanel"
                    aria-labelledby="v-pills-package-tab"
                  >
                    {packageBooking.length == 0 ? (
                      <div>
                        {isLoading ? (
                          <div className="row">
                            <div className="col-sm-9">
                              <div className={`${styles.oktext2} `}>
                                <strong className="mb-2">
                                  <Skeleton height={20} width={250} />
                                </strong>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={350} />
                                </h6>
                              </div>
                              <div className={styles.oktext3}>
                                <h6 className="mt-2">
                                  <Skeleton height={20} width={450} />
                                </h6>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>No Data</div>
                        )}
                      </div>
                    ) : (
                      <>
                       {loading && <Loader />}

{!loading &&
  packageBooking &&
  packageBooking.map((pack, index) => (
                         <div className="booking_border" key={index}>
                            <span className="boooking_date">
                              {pack.travel_date?.split("T")[0] || "N/A"}
                            </span>
                            <div
                              className={`card ms-3 mt-1`}
                              style={{ border: "unset" }}
                            >

                              <div className="row">
                                <div className="col-md-12 col-sm-12 p-3">
                                  <div className="ps-3 pe-3 pack_boking">
                                  <div className="d-flex justify-content-between align-items-center">
                                  <h6>Booking ID:<span>{pack.invoice_no}</span></h6> <div  className="d-flex align-items-center"> <h6>BDT  </h6><h5 className="ms-2">{pack.price.toLocaleString()}</h5></div>
                                  </div>
                                  <div className="d-inline  align-items-center pack_boking_body">
                              
                                  <div className="mb-3 mt-2"> <h5>{pack.userName}</h5></div>
                                
                                  </div>
                                
                                  {/* <div className="d-flex align-items-center pack_boking_body">
                                 
                                  <h6 className="">Total Travlers:</h6>
                                  <span>{pack.people_count}</span>
                                  </div> */}

                                  <div className="d-flex justify-content-between align-items-center">
                                 <div className="d-flex justify-content-start align-items-center"><h6>Payment: <span>{pack.paymentMode} </span></h6><h6> Booking:<span>  {pack.booking_status === "BOOKING_IN_PROGRESS" ? "Processing" : pack.booking_status}</span></h6></div> 
                                 <div><button  type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#flightmodal"
                                                onClick={() =>
                                                  handlepackClick(pack)
                                                } className="btn btn_book2_pack custom_btn">View Details</button></div>
                                  </div></div>
                                </div>
                                </div>
                                </div>
                                </div>
  ))}
                      {/* <div className="table-responsive table-container">
                        <table className="table table-striped table-bordered data-table dt_tb">
                          <thead
                            className="table_head"
                            style={{ backgroundColor: "red" }}
                          >
                            <tr>
                              <th>Package ID</th>
                              <th>Tour Type</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Booking Ref</th>
                              <th>People Count</th>
                              <th>Children Count</th>
                              <th>Infant Count</th>
                              <th>Payment Mode</th>
                              <th>Booking Status</th>
                              <th>Price</th>
                              <th>Discount</th>
                              <th>Travel Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading && <Loader />}

                            {!loading &&
                              packageBooking &&
                              packageBooking.map((pack, index) => (
                                <tr key={index}>
                                  <td>{pack.package_id}</td>
                                  <td>{pack.tour_type}</td>
                                  <td>{pack.mobile_no}</td>
                                  <td>{pack.email}</td>
                                  <td>{pack.booking_ref}</td>
                                  <td>{pack.people_count}</td>
                                  <td>{pack.children_count_bed}</td>
                                  <td>{pack.children_count_no_bed}</td>
                                  <td>{pack.paymentMode}</td>
                                  <td>{pack.booking_status}</td>
                                  <td>{pack.price}</td>
                                  <td>{pack.discount}</td>
                                  <td>{pack.travel_date.split("T")[0]}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div> */}
                      </>
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-visa"
                    role="tabpanel"
                    aria-labelledby="v-pills-visa-tab"
                  >
                    Coming Soon
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-transport"
                    role="tabpanel"
                    aria-labelledby="v-pills-transport-tab"
                  >
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedPackData && (
            <div
            className={`modal fade ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="flightmodalLabel"
            aria-hidden={!showModal}

            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="flightmodalLabel">
                      Pckage Details
                    </h5>
                    <button
                     type="button"
                     className="btn-close"
                     aria-label="Close"
                     onClick={handleClose}
                    ></button>
                  </div>
                  <div class="modal-body" style={{backgroundColor:"#f2f5f8"}}>      <h6 className=" mt-3">Travelers Details</h6>
                          <div className="pasger_card">
                            <div className="">
                              {selectedPackData && (
                               
                             
                                <div  className="row">
                                 
                                      <div className="col-md-8 col-sm-12">
                                        <div className="row booking_travelers" style={{backgroundColor:"#fff"}}>
                                     
                                        <div className="col-md-6 col-sm-12">
                                            <p>Package Id</p>
                                            <h4>
                                              {selectedPackData.package_id || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Tour Type</p>
                                            <h4>
                                              {selectedPackData.tour_type || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Name</p>
                                            <h4>
                                              {selectedPackData.userName || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Total Travel</p>
                                            <h4>
                                              {selectedPackData.people_count || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Email</p>
                                            <h4>
                                              {selectedPackData.email || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Mobile No</p>
                                            <h4>
                                              {selectedPackData.mobile_no || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Children Count	</p>
                                            <h4>
                                              {selectedPackData.children_count_bed || "N/A"}
                                            </h4>
                                          </div>

                                          <div className="col-md-6 col-sm-12">
                                            <p>Infant Count</p>
                                            <h4>
                                              {selectedPackData.children_count_no_bed || "N/A"}
                                            </h4>
                                          </div>
                                         
                                        
                                  

                                        </div>
                                      </div>
                                      <div className="col-md-4 col-sm-12">
                        <div className="flight_right" style={{backgroundColor:"#fff"}}>

                          <div className={`  p-3 ${styles.card_details}`}>
                            <div className="row">
                              <div className="col-12 d-flex justify-content-between align-items-center">
                                <div
                                  className={` text-center   ${styles.fare_data}`}
                                >
                                  <h2 style={{color:"#333"}}>Price</h2> 

                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                  {/* <span className={styles.cross_fair}>৳ 0</span> */}
                                  <h5 className="mb-0">
                                    {`৳ ${selectedPackData?.price?.toLocaleString()}`}
                                  </h5>
                                </div>
                                
                              </div>
                              <div className="col-12 d-flex justify-content-between align-items-center">
                              <div
                                  className={` text-center   ${styles.fare_data}`}
                                >
                                  <h2 style={{color:"#333"}}>Discount</h2> 

                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                  {/* <span className={styles.cross_fair}>৳ 0</span> */}
                                  <h5 className="mb-0">
                                    {`৳ ${selectedPackData?.discount?.toLocaleString()}`}
                                  </h5>
                                </div> </div>
                            </div>
                          </div>
                        </div>
                        <div className="pasger_card flight_right mt-3" style={{backgroundColor:"#fff"}}>
                          <div className="row">
                          <div className="col-md-12 col-sm-12">
                         
                                                  
                                            <p>Booking ID</p>

                                              {/* {selectedRowData1.payment_status === "NOT_PAID" ? "NOT PAID" : selectedRowData1.payment_status} */}
                                             <h4>{selectedPackData.booking_ref}</h4>

                                          </div>
                                          <div className="col-md-12 col-sm-12">
                                            <p>Booking Status</p>
                                            <h4>{selectedPackData.booking_status}</h4>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                            <p>Invoice No</p>
                                            <h4>{selectedPackData.invoice_no}</h4>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                            <p>Payment Mode</p>
                                            <h4>{selectedPackData.paymentMode}</h4>
                                            </div>
                                          </div></div></div>
                                   
                              
                                </div>
                              )}
                            </div>

                         
                          </div>     </div>
                </div>
              </div>
            </div>
          )}
          {selectedRowData && (
            <div
            className={`modal fade ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="flightmodalLabel"
            aria-hidden={!showModal}

            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="flightmodalLabel">
                      Flight Details
                    </h5>
                    <button
                     type="button"
                     className="btn-close"
                     aria-label="Close"
                     onClick={handleClose}
                    ></button>
                  </div>
                  <div class="modal-body">
                    {/* <table className="table table-bordered">
                  {!loading &&
                    selectedRowData &&
                    selectedRowData.pnr_body.legs.map((modal, index) => (
                      <tbody>
                        <tr>
                          <th>{modal.ArrivalDateTime.split("T")[0]}    </th>
                          <td>
                            <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <th>Departure From</th>
                                  <td>{modal.OriginLocationCode}</td>
                                </tr>
                                <tr>
                                  <th>Departure Time</th>
                                  <td>{formatTime(modal.DepartureDateTime)}</td>
                                </tr>
                                <tr>
                                  <th>Airline</th>
                                  <td>{modal.MarketingAirlineCode}</td>
                                </tr>

                                <tr>
                                  <th>Araival At</th>
                                  <td>{modal.DestinationLocationCode}</td>
                                </tr>
                                <tr>
                                  <th>Arrival Time</th>
                                  <td>{formatTime(modal.ArrivalDateTime)}</td>
                                </tr>
                                <tr>
                                  <th>Baggage Info</th>
                                  <td>
                                    <ul>
                                      <li>
                                        Max. luggage allowance :
                                        {modal.baggageInfo.weight}{modal.baggageInfo.unit}
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table> */}
                    <div className="row">
                      <div className="col-md-8 col-sm-12">
                        <div className="flight_left">
                          <h6>Flight Details</h6>

                          {!loading &&
                            selectedRowData &&
                            selectedRowData.pnr_body.legs.map(
                              (modal, index) => (
                                <div
                                  className={`card  mt-3 ${styles.Each_row_booking}`}
                                >
                                  <div className="row">
                                    <div>
                                      <div
                                        className="col-md-12 col-sm-12  p-3 "
                                        style={{ display: "flex" }}
                                      >
                                        <div
                                          className="row"
                                          style={{
                                            alignItems: "center",

                                            width: "100%",
                                          }}
                                        >
                                          {/* {legDesc.dateAdjustment && <div>{"+" + legDesc.dateAdjustment + (legDesc.dateAdjustment == 1 ? "day" : "days")}</div>} */}
                                          <div className="col-2 d-flex">


                                                  {modal.MarketingAirlineCode}
                                               -

                                                  {modal.FlightNumber}


                                          </div>

                                          {/* ---------- this side rendr by call api----------------- */}
                                          <div className="col-md-8 col-sm-10 ">
                                            <div className="row">
                                              <div className="col-4">
                                                <div className="">
                                                  <div className={styles.it2}>
                                                    <div
                                                      className={`${styles.oktext2}  `}
                                                    >
                                                      <strong className="fnt-14">
                                                        {
                                                          modal.OriginLocationCode
                                                        }
                                                      </strong>

                                                      <div
                                                        className={`${styles.oktext2}  `}
                                                        style={{ fontSize: 14 }}
                                                      >
                                                        {formatTime(
                                                          modal.DepartureDateTime
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className="col-4 for_transform"
                                                style={{
                                                  alignSelf: "center",
                                                  textAlign: "center",
                                                  fontSize: "12px",

                                                  transform:
                                                    "translateX(-38px)",
                                                  color: "#535D7E",
                                                }}
                                              >
                                                <div></div>

                                                <div className="flight_stops_info">
                                                  <div className="flight_stop_names">
                                                    <></>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-4">
                                                <div
                                                  style={{
                                                    textAlign: "right",
                                                  }}
                                                >
                                                  <div className={styles.it1}>
                                                    <div
                                                      className={styles.oktext2}
                                                    >
                                                      <strong className="fnt-14">
                                                        {
                                                          modal.DestinationLocationCode
                                                        }
                                                      </strong>

                                                      <div
                                                        className={`${styles.oktext2}  `}
                                                      >
                                                        {formatTime(
                                                          modal.ArrivalDateTime
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          <h6 className=" mt-3">Passenger Details</h6>
                          <div className="pasger_card">
                            <div className="">
                              {selectedRowData1.customer && (
                                <div>
                                  <div>
                                    <div>
                                      <div className="">
                                        <div className="row booking_travelers">
                                          <h4>
                                            Title:{" "}
                                            {selectedRowData1.customer.who}
                                          </h4>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Name</p>
                                            <h4>
                                              {selectedRowData1.customer.name || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Surname</p>
                                            <h4>
                                              {
                                                selectedRowData1.customer
                                                  .surname || "N/A"
                                              }
                                            </h4>
                                          </div>

                                          <div className="col-md-6 col-sm-12">
                                            <p>Contact Number</p>
                                            <h4>
                                              {
                                                selectedRowData1.customer
                                                  .contact_number || "N/A"
                                              }
                                            </h4>
                                          </div>

                                          {/* {selectedRowData1.customer
                                            .childrenCount > 0 && (
                                            <div>
                                              <p>Child Passenger</p>
                                              <h4>
                                                {
                                                  selectedRowData1.customer
                                                    .childrenCount
                                                }
                                              </h4>
                                            </div>
                                          )}
                                          {selectedRowData1.customer
                                            .infantCount > 0 && (
                                            <div>
                                              <p>Infant Passenger</p>
                                              <h4>
                                                {
                                                  selectedRowData1.customer
                                                    .infantCount
                                                }
                                              </h4>
                                            </div>
                                          )} */}

                                          <div className="col-md-6 col-sm-12">
                                            <p>Email</p>
                                            <h4>
                                              {selectedRowData1.customer.email || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Date of Birth</p>
                                            <h4>
                                              {
                                                selectedRowData1.customer
                                                  .date_of_birth || "N/A"
                                              }
                                            </h4>
                                          </div>

                                          <>
                                         
                                            <div className="col-md-6 col-sm-12">
                                              <p>Passport Number</p>
                                              <h4>{selectedRowData1.customer.passport_number || "N/A"}</h4>
                                            </div>
                                         
                                         
                                            <div className="col-md-6 col-sm-12">
                                              <p>Passport Issue Country</p>
                                              <h4>{selectedRowData1.customer.country_of_issue || "N/A"}</h4>
                                            </div>
                                         
                                         
                                            <div className="col-md-6 col-sm-12">
                                              <p>Passport Issue Date</p>
                                              <h4>{selectedRowData1.customer.passport_issue_date || "N/A"}</h4>
                                            </div>
                                        
                                         
                                            <div className="col-md-6 col-sm-12">
                                              <p>Passport Expire Date</p>
                                              <h4>{selectedRowData1.customer.passport_expire_date || "N/A"}</h4>
                                            </div>
                                         
                                          {/* {selectedRowData1?.customer?.nationality && (
                                            <div className="col-md-6 col-sm-12">
                                              <p>Nationality</p>
                                              <h4>{selectedRowData1.customer.nationality}</h4>
                                            </div>
                                          )} */}
                                        </>

                                        </div>
                                      </div>



                                      <div className="">
                                        {selectedRowData1.customer.others?.map(
                                          (item, i) => (
                                            <div>
                                              <h3
                                              className="mt-2"
                                                style={{
                                                  color: "#333",
                                                  fontSize: "16px",
                                                }}
                                              >
                                               Traveler No:{i + 2}
                                              </h3>
                                            <div className="row booking_travelers">
                                                <h4>Title: {item.who}</h4>
                                                <div className="col-md-6 col-sm-12">
                                                  <p>Name</p>
                                                  <h4>{item.name || "N/A"}</h4>
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                  <p>Surname</p>
                                                  <h4>{item.surname || "N/A"}</h4>
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                  <p>Contact Number</p>
                                                  <h4>{item.contactNumber || "N/A"}</h4>
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                  <p>Email</p>
                                                  <h4>{item.email || "N/A"}</h4>
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                  <p>Date of Birth</p>
                                                  <h4>{item.dateOfBirth === "Invalid-Date" ? "N/A" : item.dateOfBirth || "N/A"}</h4>
                                                </div>

                                                <>
                                               
                                                    <div className="col-md-6 col-sm-12">
                                                        <p>Passport Number</p>
                                                        <h4>{item.passportNumber || "N/A"}</h4>
                                                    </div>
                                                
                                                {item?.countryOfIssue && (
                                                    <div className="col-md-6 col-sm-12">
                                                        <p>Passport Issue Country</p>
                                                        <h4>{item.countryOfIssue || "N/A"}</h4>
                                                    </div>
                                                )}
                                              
                                                  <div className="col-md-6 col-sm-12">
                                                    <p>Passport Issue Date</p>
                                                    <h4>{item.passportIssueDate === "Invalid-Date" ? "N/A" : item.passportIssueDate || "N/A"}</h4>
                                                  </div>
                                              

                                               
                                                  <div className="col-md-6 col-sm-12">
                                                    <p>Passport Expire Date</p>
                                                    <h4>{item.passportExpireDate === "Invalid-Date" ? "N/A" : item.passportExpireDate || "N/A"}</h4>
                                                  </div>
                                               


                                                  {/* {selectedRowData1?.customer?.nationality && (
                                                    <div className="col-md-6 col-sm-12">
                                                      <p>Nationality</p>
                                                      <h4>{selectedRowData1.customer.nationality}</h4>
                                                    </div>
                                                  )} */}
                                                </>


                                             </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* {selectedRowData1.customer && (
                              <div>
                                <div>
                                  {selectedRowData1.customer.others?.map(
                                    (item, i) => {
                                      if (item.PaxType == "Adult") {
                                        sla++;
                                        return (
                                          <div cl key={i}>

                                            <h3>
                                              {item.PaxType} {sla}
                                            </h3>

                                            <p>Name</p>
                                            <h5>{`${item.Title} ${item?.FirstName} ${item?.LastName}`}</h5>
                                            <p>Country of Nationality</p>
                                            <h4>{item.Nationality}</h4>
                                            {item.PassportNumber.length > 0 && (
                                              <>
                                                <p>Passport No.</p>
                                                <h4>{item.PassportNumber}</h4>
                                              </>
                                            )}
                                            <p>Date Of Birth</p>
                                            <h4>{item.DateOfBirth}</h4>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                                <div>
                                  {selectedRowData1.customer.others?.map(
                                    (item, i) => {
                                      if (item.PaxType == "Child") {
                                        slc++;

                                        return (
                                          <div key={i}>
                                            <hr />
                                            <h3>
                                              {item.PaxType} {slc}
                                            </h3>

                                            <p>Name</p>
                                            <h5>{`${item.Title} ${item?.FirstName} ${item?.LastName}`}</h5>
                                            <p>Country of Nationality</p>
                                            <h4>{item.Nationality}</h4>
                                            {item.PassportNumber.length > 0 && (
                                              <>
                                                <p>Passport No.</p>
                                                <h4>{item.PassportNumber}</h4>
                                              </>
                                            )}
                                            <p>Date Of Birth</p>
                                            <h4>{item.DateOfBirth}</h4>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                                <div>
                                  {selectedRowData1.customer.others?.map(
                                    (item, i) => {
                                      if (item.PaxType == "Infant") {
                                        sli++;

                                        return (
                                          <div key={i}>
                                            <hr />
                                            <h3>
                                              {item.PaxType} {sli}
                                            </h3>

                                            <p>Name</p>
                                            <h5>{`${item.Title} ${item?.FirstName} ${item?.LastName}`}</h5>
                                            <p>Country of Nationality</p>
                                            <h4>{item.Nationality}</h4>
                                            {item.PassportNumber.length > 0 && (
                                              <>
                                                <p>Passport No.</p>
                                                <h4>{item.PassportNumber}</h4>
                                              </>
                                            )}
                                            <p>Date Of Birth</p>
                                            <h4>{item.DateOfBirth}</h4>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>{" "}
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="flight_right">

                          <div className={`  p-3 ${styles.card_details}`}>
                            <div className="row">
                              <div className="col-12 d-flex justify-content-between align-items-center">
                                <div
                                  className={` text-center   ${styles.fare_data}`}
                                >
                                  <h2 style={{color:"#333"}}>Price</h2>
                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                  {/* <span className={styles.cross_fair}>৳ 0</span> */}
                                  <h5 className="mb-0">
                                    {`৳ ${selectedRowData1?.to_be_paid?.toLocaleString()}`}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pasger_card flight_right mt-3">
                          <div className="row">
                          <div className="col-md-12 col-sm-12">
                                            <p>Payment Status</p>

                                              {/* {selectedRowData1.payment_status === "NOT_PAID" ? "NOT PAID" : selectedRowData1.payment_status} */}
                                              <span
                                              className={`badge mb-2 ${selectedRowData1.payment_status === "NOT_PAID" ? "bg-danger" : "bg-success"}`}
                                              style={{ borderRadius: '50px', padding: '5px 15px' }}
                                            >
                                              {selectedRowData1.payment_status === "NOT_PAID" ? "NOT PAID" : selectedRowData1.payment_status}
                                            </span>

                                          </div>
                                          <div className="col-md-12 col-sm-12">
                                            <p>PNR Status</p>


                                               {/* {selectedRowData1.pnr_id.startsWith('TempPNR') ? selectedRowData1.pnr_status : 'BOOKED'} */}
                                               <span
                                            className={`badge mb-2 ${selectedRowData1.pnr_id.startsWith('TempPNR') ? (selectedRowData1.pnr_status === 'PENDING' ? 'bg-warning' : 'bg-success') : 'bg-success'}`}
                                            style={{ borderRadius: '50px', padding: '5px 15px' }}
                                          >
                                            {selectedRowData1.pnr_id.startsWith('TempPNR') ? selectedRowData1.pnr_status : 'BOOKED'}
                                          </span>


                                          </div>
                                          <div className="col-md-12 col-sm-12">
                                            <p>PNR</p>
                                            <h4>

                                               { selectedRowData1.pnr_id}

                                            </h4>
                                          </div></div> <div className="row">


                                          <div className="col-md-12 col-sm-12">
                                            <p>Ticket Status</p>
                                            <h4>

                                            {selectedRowData1.ticket_status ? selectedRowData1.ticket_status : 'PROCESSING'}

                                            </h4>
                                          </div>


                                          <div className="col-md-6 col-sm-12">
                        {selectedRowData1.ticket_status === "TICKETED" &&  (
                          <button
                            className="btn btn_book2 custom_btn mb-2"
                            onClick={() => downloadPDF(selectedRowData1.ticket_url )}
                            title="Download PDF"

                          >
                       DOWNLOAD TICKET
                          </button>
                        ) }
                            </div>
                            <div className="col-md-12 col-sm-12">
                               <p>Flight Status</p>
                                 <h4>
                                    {selectedRowData1.flight_status || "PENDING"}

                                   </h4>
                               </div>
                            </div>


                                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedHotelData && (
            <div
            className={`modal fade ${showModal ? "show" : ""}`}
            style={{ display: showModal ? "block" : "none" }}
            tabIndex="-1"   
            role="dialog"
            aria-labelledby="flightmodalLabel"
            aria-hidden={!showModal}

            >
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="flightmodalLabel">
                      Hotel Details
                    </h5>
                    <button
                     type="button"
                     className="btn-close"
                     aria-label="Close"
                     onClick={handleClose}
                    ></button>
                  </div>
                  <div class="modal-body" style={{backgroundColor:"#f2f5f8"}}>      <h6 className=" mt-3">Booking Details</h6>
                          <div className="pasger_card">
                            <div className="">
                              {selectedHotelData && (
                               
                              
                                <div  className="row">
                                 
                                      <div className="col-md-8 col-sm-12">
                                        <div className="row booking_travelers" style={{backgroundColor:"#fff"}}>
                                     
                                        
                                          <div className="col-md-6 col-sm-12">
                                            <p>Check In Date</p>
                                            <h4>
                                              {selectedHotelData.checkInDate.split("T")[0]|| "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Check Out Date</p>
                                            <h4>
                                              {selectedHotelData.checkOutDate.split("T")[0] || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Hotel Name</p>
                                            <h4>
                                              {selectedHotelData.propertyName || "N/A"}
                                            </h4>
                                          </div>  <div className="col-md-6 col-sm-12">
                                            <p>Room Name</p>
                                            <h4>
                                              {selectedHotelData.roomName || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Total Days</p>
                                            <h4>
                                              {selectedHotelData.totalDays || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Total Room</p>
                                            <h4>
                                              {selectedHotelData.totalRoom || "N/A"}
                                            </h4>
                                          </div>
                                         
                                          <div className="col-md-6 col-sm-12">
                                            <p>Name</p>
                                            <h4>
                                              {selectedHotelData.userName || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Email</p>
                                            <h4>
                                              {selectedHotelData.userId || "N/A"}
                                            </h4>
                                          </div>
                                          <div className="col-md-6 col-sm-12">
                                            <p>Mobile No</p>
                                            <h4>
                                              {selectedHotelData.phoneNo || "N/A"}
                                            </h4>
                                          </div>
                                        

                                          
                                         
                                        
                                  

                                        </div>
                                      </div>
                                      <div className="col-md-4 col-sm-12">
                        <div className="flight_right" style={{backgroundColor:"#fff"}}>

                          <div className={`  p-3 ${styles.card_details}`}>
                            <div className="row">
                              <div className="col-12 d-flex justify-content-between align-items-center">
                                <div
                                  className={` text-center   ${styles.fare_data}`}
                                >
                                  <h2 style={{color:"#333"}}>Price</h2> 

                                </div>

                                <div className="d-flex justify-content-end align-items-center">
                                  {/* <span className={styles.cross_fair}>৳ 0</span> */}
                                  <h5 className="mb-0">
                                    {`৳ ${selectedHotelData?.totalAmount?.toLocaleString()}`}
                                  </h5>
                                </div>
                                
                              </div>
                             
                            </div>
                          </div>
                        </div>
                        <div className="pasger_card flight_right mt-3" style={{backgroundColor:"#fff"}}>
                          <div className="row">
                          <div className="col-md-12 col-sm-12">
                         
                                                  
                                            <p>Booking ID</p>

                                              {/* {selectedRowData1.payment_status === "NOT_PAID" ? "NOT PAID" : selectedRowData1.payment_status} */}
                                             <h4>{selectedHotelData.id}</h4>

                                          </div>
                                        
                                            <div className="col-md-12 col-sm-12">
                                            <p>Payment Mode</p>
                                            <h4>{selectedHotelData.paymentMethod}</h4>
                                            </div>  <div className="col-md-12 col-sm-12">
                                            <p>Payment Status</p>
                                            <h4>{selectedHotelData.paymentStatus === "pending" ? "PENDING" : selectedHotelData.paymentStatus}</h4>

                                            </div>
                                          </div></div></div>
                                   
                              
                                </div>
                              )}
                            </div>

                         
                          </div>     </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
