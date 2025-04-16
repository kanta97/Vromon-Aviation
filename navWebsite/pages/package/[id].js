import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Package.module.css";
import FsLightbox from "fslightbox-react";
import Link from "next/link";
import Loader from "../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  faCheck,
  faSquare,
  faStar,
  faExclamationCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import PackageContext from "../../context/PackageContext";
import { API_TRIP_URL } from "../../config/index";
import moment from "moment";
import Star from "../../components/Star";
import Router from 'next/router'
import AuthContext from '../../context/AuthContext'

export default function packageDetails() {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { assignPackage,getPackageDetails, packageDetails, bookingData, setBookingData } =
    useContext(PackageContext);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      getPackageDetails(id);
    }
    console.log(id);
  }, [router.query.id]);


  const handleBookNow = (packageDetails) => {
    console.log(packageDetails);

    if (user) {
        console.log(user)
        assignPackage(packageDetails)
    } else {
        Router.push('/login?redirectUrl=/package/booking')
    }
}
useEffect(() => {
  // Set the default tourType to the first available one when packageDetails is loaded
  if (
    packageDetails.data &&
    packageDetails.data.tourTypeDetails &&
    packageDetails.data.tourTypeDetails.length > 0
  ) {
    setBookingData((prevState) => ({
      ...prevState,
      tourType: packageDetails.data.tourTypeDetails[0].tour_type,
      totalCost: packageDetails.data.tourTypeDetails[0].price || 0,
    }));
  }
}, [packageDetails]);
console.log("wanna see",packageDetails)
const [isFullscreen, setIsFullscreen] = useState(false);
// const images =
// Array.isArray(packageDetails.data.media) &&
// packageDetails.data.media.map((item) => ({
//   original: `${API_TRIP_URL}/${item.path}`,
//   thumbnail: `${API_TRIP_URL}/${item.path}`, // Use the same for thumbnails
//   alt: "Gallery Image",
// }));
const images = Array.isArray(packageDetails.data.media) &&
  packageDetails.data.media
    .filter((item) => item.isFeatured === 0) // Include only items where isFeatured is 0
    .map((item) => ({
      original: `${API_TRIP_URL}/${item.path}`,
      thumbnail: `${API_TRIP_URL}/${item.path}`,
      fullscreen: `${API_TRIP_URL}/${item.path}`, // Fullscreen view (can be a high-res version)
      originalWidth: "782", // HTML5 attribute for width
      thumbnailWidth: "248", // Thumbnail width
      alt: "Gallery Image",
    }));
    const [startDate, setStartDate] = useState(new Date());
  return (
    <Layout>
      {/* lightbox imagess */}

      {/* <div className="row">
                <FsLightbox
                    toggler={toggler}
                    sources={[
                        <img className="img-fluid" src="" alt="Logo" />,
                        <img className="img-fluid" src="" alt="Logo" />
                    ]}
                />
            </div> */}

      {packageDetails.loading && (
        <>
          <div className={`${styles.package_details}  row`}>
        
            <div className="col-lg-9 col-12 col-xl-9 col-sm-12 col-md-12">
      
              <div>
                <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                      <Skeleton height={432} width={784} />{" "}
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                      <Skeleton height={432} width={784} />{" "}
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                      <Skeleton height={432} width={784} />{" "}
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-12  col-lg-3  col-xl-3 col-sm-4 col-md-4">
              <div className={`${styles.small_img}`}>
                <Skeleton height={136} width={244} />{" "}
                <Skeleton height={136} width={244} />{" "}
                <Skeleton height={136} width={244} />{" "}
              </div>
            </div>
          </div>

          <div>
            <div className={`${styles.custom_Details}`}>
              <div className=" row g-3 ">
                <div className="col-lg-8 col-12 col-xl-8 col-sm-12 col-md-8">
                  <nav className="navbar navbar-expand  mb-3">
                    <div className="container">
                      <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="#details"
                            >
                              <Skeleton height={20} width={100} />{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#trip">
                              <Skeleton height={20} width={100} />
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#tc">
                              <Skeleton height={20} width={100} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                  <div>
                    <Skeleton height={30} width={700} />
                  </div>
                  <div className="mt-2">
                    <Skeleton height={20} width={500} />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton height={20} width={300} />
                  </div>
                  <div>
                    <Skeleton height={30} width={700} />
                  </div>
                  <div className="mt-2">
                    <Skeleton height={20} width={500} />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton height={20} width={300} />
                  </div>
                </div>

                <div className="col-lg-4 col-12 col-xl-4 col-sm-12 col-md-4 ">
                  <div className={`${styles.card_custom} card mt-5 p-3`}>
                    <div className="d-flex p-2 border text-center">
                      <div className="col-6">
                        <Skeleton height={20} width={100} />
                      </div>
                      <div className="col-6">
                        <Skeleton height={20} width={100} />
                      </div>
                    </div>
                    <div className=" mt-3 p-2 border">
                      <Skeleton height={20} width={300} />
                    </div>
                    <div className="d-flex mt-3 p-2 border text-center">
                      <div className="col-6">
                        <div>
                          {" "}
                          <Skeleton height={20} width={100} />
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <Skeleton height={20} width={100} />
                        </div>
                      </div>
                    </div>

                    <p className="mt-5">
                      <Skeleton height={20} width={300} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!packageDetails.loading && packageDetails.data && (
        <>
          <div
            className={`${styles.package_details}  row`}
            style={{ margin: "6rem 0 20px 0" }}
          >
            <h6 className="mb-3">{packageDetails.data.name}</h6>
            <div className="col-lg-12 col-12 col-xl-12 col-sm-12 col-md-12">
              <div>
              <div>
      {images.length > 0 ? (
         <div className={isFullscreen ? "fullscreen-gallery" : ""}>
        <ImageGallery items={images} 
        thumbnailPosition={isFullscreen ? "bottom" : "right"}
        //  autoPlay={true} 
         showPlayButton={false} 
         showFullscreenButton={true}
         onScreenChange={(fullScreen) => setIsFullscreen(fullScreen)}
         /></div>
      ) : (
        <p>No images available</p>
      )}
    </div>
                {/* <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    {Array.isArray(packageDetails.data.media) &&
                      packageDetails.data.media.map((item, index) => (
                        <div
                          class={`carousel-item
                                                            ${
                                                              index === 0
                                                                ? "active"
                                                                : ""
                                                            }
                                                    `}
                          data-bs-interval="5000"
                        >
                          <img
                            className={`${styles.packagebig_img} img-fluid`}
                            src={API_TRIP_URL + "/" + item.path}
                            alt="Logo"
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div> */}
              </div>
            </div>
            {/* <div className=" col-12  col-lg-3  col-xl-3 col-sm-4 col-md-4">
              <div className={`${styles.small_img}`}>
                {Array.isArray(packageDetails.data.media) &&
                  packageDetails.data.media.map(
                    (item, index) =>
                      index > 0 &&
                      index < 4 && (
                        <img
                          className={styles.package_img}
                          src={API_TRIP_URL + "/" + item.path}
                          alt="Logo"
                        />
                      )
                  )}
              </div>
            </div> */}
          </div>

          <div>
            <div className={`${styles.custom_Details}`}>
              <div className="row g-3">
                <div className="col-lg-8 col-12 col-xl-8 col-sm-12 col-md-8">
                  <nav className="navbar navbar-expand ">
           
                      <div className="" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                            <a
                              className={`${styles.pack_headLine2} nav-link  mr-3`}
                              aria-current="page"
                            
                              href="#details"
                            >
                              Details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`${styles.pack_headLine2} nav-link mr-3`}
                            
                              href="#trip"
                            >
                              Trip Details
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`${styles.pack_headLine2} nav-link mr-3`}
                        
                              href="#tc"
                            >
                              Terms & Conditions
                            </a>
                          </li>
                        </ul>
                      </div>
                  
                  </nav>
<div className={`${styles.pack_acoc} mb-3`}>
  <h6 className="mb-2">Trip Details</h6>
                  <div
                    className="accordion "
                    id="accordionPanelsStayOpenExample"
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button accordion_button2 pl-0"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-expanded="true"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          <h6
                            id="details"
                            className={`${styles.pack_headLine}`}
                          >
                            Summary
                          </h6>
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className={`${styles.pack_headLine} accordion-collapse collapse show`}
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <strong>{packageDetails.data.name}</strong>{" "}
                          <div className="row mt-3">
                            <div className="col-6">
                              <h6 className={`${styles.pack_headLine}`}>
                                {" "}
                                Valid From
                              </h6>
                              <p>
                                {new Date(
                                  packageDetails.data.vaidFrom
                                ).toLocaleString()}
                              </p>
                            </div>
                            <div className="col-6">
                              <h6 className={`${styles.pack_headLine}`}>
                                {" "}
                                Valid Till
                              </h6>
                              <p>
                                {new Date(
                                  packageDetails.data.validTo
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <h6 className={`${styles.pack_headLine}`}>
                                Minimum People
                              </h6>
                              <p>
                                {packageDetails.data.minimum_number_people}
                              </p>
                            </div>
                            <div className="col-6">
                              <h6 className={`${styles.pack_headLine}`}>
                                {" "}
                                Duration
                              </h6>
                              <p className={`${styles.pack_headLine}`}>
                                {packageDetails.data.duration_day} days{" "}
                                {packageDetails.data.duration_night} nights
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingTwo"
                      >
                        <button
                          className="accordion-button accordion_button2 collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          <h6 className={`${styles.pack_headLine}`}>
                            Description{" "}
                          </h6>
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          <div className={`${styles.pack_headLine}`}
                            dangerouslySetInnerHTML={{
                              __html: packageDetails.data.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingThree  "
                      >
                        <button
                          className="accordion-button accordion_button2 collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          <h6 className={`${styles.pack_headLine}`}>Hotels</h6>
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                      >
                        <div className="accordion-body">
                          {Array.isArray(
                            packageDetails.data.tourTypeDetailsMain
                          ) &&
                            packageDetails.data.tourTypeDetailsMain.map(
                              (item, index) => (
                                <>
                                  <h6 className={`${styles.pack_headLine}`}>
                                    {item.tour_type}
                                  </h6>
                                  <hr></hr>
                                  <strong className={`${styles.pack_headLine}`}>
                                    {item.name}
                                  </strong>{" "}
                                  <div className={`${styles.pack_headLine} d-flex mt-2 mb-2`}>
                                    {item.tour_type.toLowerCase() ==
                                      "STANDARD".toLowerCase() && (
                                      <Star quntity={3} />
                                    )}

                                    {item.tour_type.toLowerCase() ==
                                      "PREMIUM".toLowerCase() && (
                                      <Star quntity={4} />
                                    )}

                                    {item.tour_type.toLowerCase() ==
                                      "LUXURY".toLowerCase() && (
                                      <Star quntity={5} />
                                    )}
                                  </div>
                                  <address>
                                    <strong
                                      className={`${styles.pack_headLine}`}
                                    >
                                      Location
                                    </strong>
                                    <br></br>
                                    {item.location}
                                  </address>
                                  <strong className={`${styles.pack_headLine}`}>
                                    Duration
                                  </strong>
                                  <p className={`${styles.pack_headLine}`}>
                                    {item.duration} Nights
                                  </p>
                                </>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className={`${styles.pack_acoc} mb-3`}>
                    <h6 id="trip" className={`${styles.pack_headLine1} mb-3`}>
                      Detail Itinerary
                    </h6>
                    <div
                      className={`${styles.pack_headLine}`}
                      dangerouslySetInnerHTML={{
                        __html: packageDetails.data.itinerary,
                      }}
                    ></div>
                    <h6 className={`${styles.pack_headLine}`}>Inclusion</h6>
                    <div
                      className={`${styles.pack_headLine}`}
                      dangerouslySetInnerHTML={{
                        __html: packageDetails.data.inclusions,
                      }}
                    ></div>
                    <h6 className={`${styles.pack_headLine}`}>Exclusion</h6>
                    <div
                      className={`${styles.pack_headLine}`}
                      dangerouslySetInnerHTML={{
                        __html: packageDetails.data.exclusions,
                      }}
                    ></div>
                    <h6 id="tc" className={`${styles.pack_headLine}`}>
                      Terms & Conditions
                    </h6>
                    <div
                      className={`${styles.pack_headLine}`}
                      dangerouslySetInnerHTML={{
                        __html: packageDetails.data.terms_conditions,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-lg-4 col-12 col-xl-4 col-sm-12 col-md-4">
                  {new Date() < new Date(packageDetails.data.validTo) ? (
                    <div className={`${styles.card_custom} card  pack_cal p-3`}>
                      <div className="d-flex p-2 border rounded text-left">
                        <div className="col-6">
                          <div className={`${styles.pack_headLine}`}>
                            Journey Date
                          </div>
                          <div className="me-2 mt-2">
                            {/* <input
                              type="date"
                              className="form-control from_control_pac_fo no-calendar-icon"
                              min={moment(new Date()).format("yyyy-MM-DD"from_control_pac_fo)}
                              max={moment(
                                new Date(packageDetails.data.validTo)
                              ).format("yyyy-MM-DD")}
                              value={
                                bookingData.journeyDate == ""
                                  ? moment(new Date()).format("yyyy-MM-DD")
                                  : bookingData.journeyDate
                              }
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  journeyDate: e.target.value,
                                  returnDate: moment(e.target.value)
                                    .add(
                                      packageDetails.data.duration_day - 1,
                                      "days"
                                    )
                                    .format("yyyy-MM-DD"),
                                })
                              }
                            /> */}
                             <div className="booing_pa">                          

                                  <DatePicker
                                    selected={
                                      bookingData.journeyDate === ""
                                        ? new Date()
                                        : new Date(bookingData.journeyDate)
                                    }
                                    onChange={(date) => {
                                      const formattedDate = moment(date).format("YYYY-MM-DD");
                                      setBookingData({
                                        ...bookingData,
                                        journeyDate: formattedDate,
                                        returnDate: moment(date)
                                          .add(packageDetails.data.duration_day - 1, "days")
                                          .format("YYYY-MM-DD"),
                                      });
                                    }}
                                    maxDate={new Date(packageDetails.data.validTo)}
                                    minDate={new Date()}

                                    shouldCloseOnSelect={true}
                                    dropdownMode="select"
                                    monthsShown={1}
                                    className=" form-control from_control_pac_fo no-calendar-icon"
                                  
                                    style={{ marginTop: "-20px" }}
                                  />
                                  </div>

                            
                          </div>
                        </div>
                        <div className="col-6">
                          <div className={`${styles.pack_headLine}`}>
                            Return Date
                          </div>
                          <div className=" mt-1">
                          <input
                            type="date"
                            readOnly="true"
                            className="form-control from_control_pac_fo no-calendar-icon p-0"
                            style={{border:"unset"}}
                            min={moment(new Date()).format("yyyy-MM-DD")}
                            max={moment(
                              new Date(packageDetails.data.validTo)
                            ).format("yyyy-MM-DD")}
                            value={
                              bookingData.journeyDate == ""
                                ? moment(new Date())
                                    .add(
                                      packageDetails.data.duration_day - 1,
                                      "days"
                                    )
                                    .format("yyyy-MM-DD")
                                : moment(bookingData.journeyDate)
                                    .add(
                                      packageDetails.data.duration_day - 1,
                                      "days"
                                    )
                                    .format("yyyy-MM-DD")
                            }
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                returnDate: e.target.value,
                              })
                            }
                          />
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 border rounded">
      <div className={`${styles.pack_headLine} `}>Tour Type</div>
      <select
        className="form-select from_control_pac_fo p-0 mt-1"
        aria-label="Default select example"
        onChange={(e) => {
          setBookingData({
            ...bookingData,
            tourType: e.target.value,
            totalCost:
              packageDetails.data.tourTypeDetails.find(
                (item) => item.tour_type === e.target.value
              )?.price || 0,
          });
        }}
        value={bookingData.tourType} // value comes from state
      >
        {packageDetails.data.tourTypeDetails.map((item, index) => (
          <option key={index} value={item.tour_type}>
            {item.tour_type}
          </option>
        ))}
      </select>
    </div>

                      <div className="d-flex mt-3 p-2 border rounded">
                        <div className="col-6 text-left">
                          <div className={`${styles.pack_headLine}`}>
                            Price{" "}
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <div>
                            <strong className={`${styles.pack_headLine}`}>
                              BDT
                            </strong>{" "}
                            {bookingData.totalCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <button className="btn btn_primary w-100 mt-3"
                         onClick={() => {
                          handleBookNow(
                            packageDetails
                          )
                      }}>
                         Book Now
                        </button>
                      {/* <Link href="/package/booking">

                      </Link> */}

                      <p style={{fontSize:"14px"}} className="mt-3">
                        *The prices may be lowered for larger group. Please
                        contact us for details
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="package_expirebox p-3 mb-3">
                        <h5 className=" text-danger">
                          Sorry this package is not available right now. Please
                          modify your search and try again.
                        </h5>
                      </div>

                      <button
                        type="submit"
                        class="login_btn btn w-100"
                        onClick={() => {
                          router.push("/package/contactus");
                        }}
                      >
                        Contact Us
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
