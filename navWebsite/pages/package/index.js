import React, { useEffect, useState, useContext } from "react";

import Layout from "../../components/Layout";
import styles from "../../styles/Package.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilter } from "@fortawesome/free-solid-svg-icons";
import { API_TRIP_URL } from "../../config";
import InputSelect from "../../components/InputSelect";
import PackageContext from "../../context/PackageContext";
import { useRouter } from "next/router";
import $ from "jquery";
import Select from "react-select";
export default function packagePage() {
  const router = useRouter();
  const { des } = router.query;

  const {
    getAllDestinations,
    destinations,
    selectedDestination,
    setSelectedDestination,

    searchPackages,
    foundPackages,

    searchByDestination,
    handlePriceRange,

    priceData,
  } = useContext(PackageContext);

  const [keyword, setKeyword] = useState("");
  const [priceRange, setPriceRange] = useState(0);
console.log("foundPackages",foundPackages);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setSelectedDestination({
      value: des,
      label: des,
    });
  }, [router.query]);

  useEffect(() => {
    $(document).ready(function () {
      $(".package_destination .css-1dimb5e-singleValue").html(des);
    });
  });

  useEffect(() => {
    getAllDestinations();

    if (selectedDestination.value) {
      if (flag) {
        setFlag(false);
        searchPackages();
      }
    }
  }, [selectedDestination]);

  useEffect(() => {
    searchByDestination(keyword);
  }, [keyword]);

  useEffect(() => {
    setPriceRange(priceData.max);
  }, [priceData.max]);

  useEffect(() => {
    handlePriceRange(priceRange);
  }, [priceRange]);

  const handleSearch = (value) => {
    setKeyword(value);
  };

  const resetFilter = () => {
    setKeyword("");
    setPriceRange(priceData.max); 
  };

  return (
    <Layout>
      {/* modify search */}
      <div className={`${styles.custom_tabs}`}>
        <div className=" row g-3">
          <div className="col-lg-10 col-xl-10 col-md-10 col-sm-12 ">
            <div className="form_secelct_option me-2 w-100">
              <InputSelect
                selectedDestination={selectedDestination}
                setSelectedDestination={(e) => {
                  router.push(`/package?des=${e.value}`);

                  setSelectedDestination(e);
                }}
                destinations={destinations}
              />
            </div>
          </div>
          {/* <div className="col-lg-5 col-xl-5 col-md-5 col-sm-12 ">
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
          <div className="col-lg-12 col-xl-2 col-md-12 col-sm-12 ">
            <div className=" d-flex justify-content-end align-items-center">
              <button
                onClick={() => {
                  searchPackages();
                }}
                className="btn btn_primary btn_modify_search w-100 h-100"
              >
                Modify Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modify search end */}
      <div className="row g-3" style={{ marginBottom: "40px" }}>
        <div className={`col-sm-3 ${styles.for_filter_hide}`}>
          <div className={`mt-3 ${styles.card_customm}`}>
            <div className="d-flex justify-content-between align-items-center depart_bg">
              <h6 className="card-header border-0 bg-transparent">Sort & Filter</h6>
             <div className=" d-flex justify-content-center">
                <button className="btn btn_primary" onClick={resetFilter}>
                  RESET
                </button>
              </div></div>
            
            <div className="depart_bg">
              <h6 className="pb-2">Destination</h6>
              <div class="input-group  mt-3">
                <input
                  type="text"
                  value={keyword}
                  class="form-control"
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </div>
            </div>
<div className="depart_bg">
            <h6 className="mb-3">
              Price Range
            </h6>
            <div className="card-body pt-0">
              <div className="d-flex justify-content-between">
                <div className={styles.discount_info1}>Minimum price</div>
                <div className={styles.discount_info1}>Maximum price</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className={styles.taxtotall}>{priceData.min.toLocaleString()}</div>
                <div className={styles.taxtotall}>{priceData.max.toLocaleString()}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="range"
                  className="form-range"
                  min={priceData.min}
                  max={priceData.max}
                  value={priceRange}
                  id="customRange2"
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                  }}
                />
              </div>
            </div>
            </div>
            {/* <div className={`${styles.Facilities} card-footer bg-transparent `}>
              
            </div> */}
          </div>
        </div>
        <div className="col-sm-9">
          <div className="row">
            <div className="col-sm-12">
              {/* <div className="">
                <h6
                  className={`bg-white mt-3 round-3 p-2 ${styles.card_header}`}
                >
                  Destination: {foundPackages.data && foundPackages.data
    .filter(pack => new Date() < new Date(pack.validTo)).length}
                 &nbsp; properties found
                </h6>
              </div> */}
              {foundPackages.data && foundPackages.data.filter(pack => new Date() < new Date(pack.validTo)).length > 0 && (
  <div className="">
    <h6 className={`bg-white mt-3 round-3 p-2 ${styles.card_header}`}>
      Destination: {foundPackages.data.filter(pack => new Date() < new Date(pack.validTo)).length} properties found
    </h6>
  </div>
)}

              {/* {loading && <Loader />} */}
              {foundPackages.loading && (
                <>
                  <div className={`card mt-3 ${styles.card_custom}`}>
                    <div class="row p-3">
                      <div class="col-12  col-lg-5 col-xl-5 ">
                        <Skeleton height={230} />
                      </div>
                      <div class="col-12  col-lg-7 col-xl-7">
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className={`${styles.mr_t} d-flex justify-content-between align-items-center`}
                          ></div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h4></h4>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            {" "}
                            <Skeleton height={20} width={350} />{" "}
                          </div>
                          <Skeleton height={20} width={60} />
                        </div>

                        <div
                          className={`${styles.facilities} d-flex justify-content-between mt-2`}
                        >
                          <Skeleton height={20} width={200} />
                        </div>
                        <div
                          className={`${styles.facilities} d-flex justify-content-between mt-5`}
                        >
                          <Skeleton height={20} width={220} />
                          <Skeleton height={20} width={60} />
                        </div>
                        <div
                          className={`${styles.facilities} d-flex justify-content-between mt-3`}
                        >
                          <Skeleton height={20} width={150} />
                        </div>

                        <div className=" d-flex justify-content-end mt-3">
                          <Skeleton height={20} width={90} /> &nbsp; &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
{/* .filter(pack => new Date() < new Date(pack.validTo)) */}
{!foundPackages.loading ? (
  foundPackages.data && foundPackages.data.length > 0 ? (
    foundPackages.data.filter(pack => new Date() < new Date(pack.validTo)).length > 0 ? (
      foundPackages.data
        .filter(pack => new Date() < new Date(pack.validTo))
        .map((item, key) => (
          <div className={`card mt-3 ${styles.card_custom}`} key={key}>
            <div className="row p-3">
              <div className="col-12 col-lg-5 col-xl-5">
                <img
                  className={`${styles.hotel_img} img-fluid`}
                  src={`${API_TRIP_URL}/${item.path}`}
                  alt="..."
                />
              </div>
              <div className="col-12 col-lg-7 col-xl-7">
                <div className="d-flex justify-content-between">
                  <div className={`${styles.mr_t} col-8`}>
                    <h5>{item.name}</h5>
                  </div>
                  <div className={`${styles.mr_t} col-4 text-end`}>
                    <div className="d-flex justify-content-end">
                      <h4 className="me-2">{item.currency}</h4>
                      <h4>{item.price.toLocaleString()}</h4>
                    </div>
                    <div className={`${styles.note}`}>Per Person</div>
                  </div>
                </div>
                <div className={`${styles.package_name} d-flex justify-content-between align-items-center`}>
                  <div>
                    <div className="d-flex">
                      <img src="assets/icons/location.svg" className={`${styles.icon} me-1`} />
                      <a href="#" className="location-link">
                        {item.destination}
                      </a>
                    </div>
                    <div className={`${styles.note} mt-3`}>
                      {item.duration_day} Days {item.duration_night} Nights
                    </div>
                  </div>
                  <div className="d-inline-block align-items-end text-end"></div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Link href={`/package/${item.id}`}>
                    <button className="btn btn_primary text-right">Details</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
    ) : (
      <div className="mt-3">
        <p style={{ fontSize: "20px" }} className={`bg-white mt-3 round-3 p-2 ${styles.card_header}`}>
          No Package available
        </p>
      </div>
    )
  ) : (
    <div className="mt-3">
      <p style={{ fontSize: "20px" }} className={`bg-white mt-3 round-3 p-2 ${styles.card_header}`}>
        No Package available
      </p>
    </div>
  )
) : (
  <div className="mt-3">
    <p>Loading...</p>
  </div>
)}

{/* {foundPackages.data && foundPackages.data.length > 0 && (
  foundPackages.data
  .filter(pack => new Date() < new Date(pack.validTo))
    .map((item, key) => (
      <div className={`card mt-3 ${styles.card_custom}`} key={key}>
        <div className="row p-3">
          <div className="col-12 col-lg-5 col-xl-5">
            <img
              className={`${styles.hotel_img} img-fluid`}
              src={`${API_TRIP_URL}/${item.path}`}
              alt="..."
            />
          </div>
          <div className="col-12 col-lg-7 col-xl-7">
            <div className="d-flex justify-content-between">
              <div className={`${styles.mr_t} col-8`}>
                <h5>{item.name}</h5>
              </div>
              <div className={`${styles.mr_t} col-4 text-end`}>
                <div className="d-flex justify-content-end">
                  <h4 className="me-2">{item.currency}</h4>
                  <h4>{item.price}</h4>
                </div>
                <div className={`${styles.note}`}>Per Person</div>
              </div>
            </div>
            <div className={`${styles.package_name} d-flex justify-content-between align-items-center`}>
              <div>
                <div className="d-flex">
                  <img src="assets/icons/location.svg" className={`${styles.icon} me-1`} />
                  <a href="#" className="location-link">
                    {item.destination}
                  </a>
                </div>
                <div className={`${styles.note} mt-3`}>
                  {item.duration_day} Day {item.duration_night} Night
                </div>
              </div>
              <div className="d-inline-block align-items-end text-end"></div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Link href={`/package/${item.id}`}>
                <button className="btn btn_primary text-right">Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))
)} */}



            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`btn d-flex ${styles.scroll_btn}`}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FontAwesomeIcon
          icon={faFilter}
          style={{
            color: "#fff",
          }}
        />{" "}
       <span> Filter</span>
      </button>

      <div
        className="modal fade mt-5"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Filter
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className={` ${styles.card_customm}`}>
            <div className="d-flex justify-content-between align-items-center depart_bg">
              <h6 className="card-header border-0 bg-transparent">Sort & Filter</h6>
             <div className=" d-flex justify-content-center">
                <button className="btn btn_primary" onClick={resetFilter}>
                  RESET
                </button>
              </div></div>
            
            <div className="depart_bg">
              <h6 className="pb-2">Destination</h6>
              <div class="input-group  mt-3">
                <input
                  type="text"
                  value={keyword}
                  class="form-control"
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </div>
            </div>
<div className="depart_bg">
            <h6 className="mb-3">
              Price Range
            </h6>
            <div className="card-body pt-0">
              <div className="d-flex justify-content-between">
                <div className={styles.discount_info1}>Minimum price</div>
                <div className={styles.discount_info1}>Maximum price</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className={styles.taxtotall}>{priceData.min.toLocaleString()}</div>
                <div className={styles.taxtotall}>{priceData.max.toLocaleString()}</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="range"
                  className="form-range"
                  min={priceData.min}
                  max={priceData.max}
                  value={priceRange}
                  id="customRange2"
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                  }}
                />
              </div>
            </div>
            </div>
            {/* <div className={`${styles.Facilities} card-footer bg-transparent `}>
              
            </div> */}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
