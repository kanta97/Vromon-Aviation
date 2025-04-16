import React, { useEffect, useState, useContext ,useCallback} from 'react'

import Link from 'next/link'
import FlightSearch from './FlightSearch'
import HotelSearch from './HotelSearch'
import VisaSearch from './VisaSearch'
import PackageSearch from './PackageSearch'
import TransportSearch from './TransportSearch'
import HotelContext from '../context/HotelContext'
import VisaContext from '../context/VisaContext'
import PackageContext from '../context/PackageContext'
import style from '../styles/Home.module.css'
import AliceCarousel from 'react-alice-carousel'
import { useRouter } from 'next/router'
import 'react-alice-carousel/lib/alice-carousel.css'
import { API_TRIP_URL } from '../config/index'
import $ from 'jquery'
import FlightContext from '../context/FlightContext'
import { API_AIR_URL, excludedAirlines } from '../config/index'
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { hotelTabRef  } from './sharedRef';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Show 4 items per row
      slidesToSlide: 4 // Slide 4 items at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  
const tabImage = [
    {
        id: '1',
        key: '1',
        title: 'Title1',
        text: 'Text1.',
        img: '/assets/icons/flight_active.svg'
    },
    {
        id: '2',
        key: '2',
        title: 'Title2',
        text: 'Text2.',
        img: '/assets/icons/hotel_active.svg'
    },
    {
        id: '3',
        key: '3',
        title: 'Title3',
        text: 'Text3.',
        img: '/assets/icons/flight_active.svg'
    },
    {
        id: '4',
        key: '4',
        title: 'Title4',
        text: 'Text4',
        img: '/assets/icons/flight_active.svg'
    }
]

export default function Showcase() {
    const router = useRouter()
 
    const [adults, setAdults] = useState(0)
    const [child, setChild] = useState(0)
    const [childAge, setChildAge] = useState('')
    const [carouselItem, setCarouselItem] = useState([])

    const { country, travellingTo, category } = useContext(VisaContext)
    const { loadOffersData, offersData, setFlightype,trips,activeTab,setActiveTab,currentSearch, setCurrentSearch } = useContext(FlightContext);
    const { getFeaturedPackage, featuredPackages, packageDetails,selectedDestination } = useContext(PackageContext)

    const {
        loading,
        searchHotel,
        hotelData,
        hotelSugg,
        hotelsearchBtn,
        startDate,
        endDate,
        onChange,
        destination,
        selectedOption
    } = useContext(HotelContext)
    // const hardcodedImages = [
    //     "assets/img/11.jpg",
    //     "assets/img/22.jpg",
    //     "assets/img/33.jpg",
    //     "assets/img/44.jpg",
    //     "assets/img/55.jpg",
    //     "assets/img/66.jpg",
    //     "assets/img/77.jpg",
    //     "assets/img/88.jpg",
    //     "assets/img/99.jpg",
    //     // Add more image paths as needed
    //   ];
    //   const updatedPackages = Array.isArray(featuredPackages)
    //   ? featuredPackages.map((pack, index) => ({
    //       ...pack,
    //       image: hardcodedImages[index % hardcodedImages.length], // Assign images cyclically
    //     }))
    //   : [];
    //console.log(' hotelSugg print', hotelSugg)
    // console.log(' hotelData print', hotelData)

    // console.log('startDate', startDate)
    // console.log('endDate', endDate)
    // console.log(' selectedOption print', selectedOption)
    useEffect(() => {
        const storedadults = localStorage.getItem('adults')
        if (storedadults) {
            setAdults(parseInt(storedadults))
        }

        const storedchild = localStorage.getItem('child')
        if (storedchild) {
            setChild(parseInt(storedchild))
        }

        const childAgeval = window.localStorage.getItem('childAge')
        if (childAgeval) {
            setChildAge(childAgeval)
        }
    }, [])

    useEffect(() => {
        getFeaturedPackage()
        loadOffersData();

    }, [])
    useEffect(() => {

        setFlightype('One Way')

    }, [])


    useEffect(() => {
        $(document).ready(function () {
            $(".package_destination .css-1dimb5e-singleValue").html(selectedDestination.value ? selectedDestination.value : "Thailand");
        })
    })
  
    const handleClick = (callFor) => {
        setActiveTab(callFor); // Set the active tab
        setCurrentSearch(callFor); // Update current search state
        router.push(`/?search=${callFor}`); // Update the URL with query parameter
      };
    
      useEffect(() => {
        const { search } = router.query;
    
        if (search) {
          setActiveTab(search); // Set the active tab based on query parameter
    
          if (search === 'package') {
            // If "package" tab is active, set default destination to "Thailand" if none is selected
            const defaultDestination = `/package?des=${selectedDestination.value || 'Thailand'}`;
            setCurrentSearch(defaultDestination);
          } else if (search === 'offers') {
            // If "offers" tab is active
            setCurrentSearch('offers');
          } else {
            // For other tabs, set the tab name directly
            setCurrentSearch(search);
          }
        } else {
          // Default behavior when no query is present
          setActiveTab('flight');
          setCurrentSearch('flight');
        }
      }, [router.query, selectedDestination]);
    
    // const handleClick = (callFor) => {
    //     router.push(`/?search=${callFor}`)
    //     // if (callFor !== 'visa') {
    //     setCurrentSearch(callFor)
    //     // }
    // }
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const [slides1, setSlides1] = useState([]);
    const [slides2, setSlides2] = useState([]);
    const [slides3, setSlides3] = useState([]);


    const delay = 3500;


    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === slides1.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);
    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === slides2.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);
    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === slides3.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

   

    useEffect(() => {
        // console.log("offersData", offersData);

        var off_data = [];
        var off_data2 = [];
        var off_data3 = [];

        if (offersData) {

            for (let index = 0; index < offersData?.length; index++) {

                off_data.push({
                    id: index,
                    title: 'Slide 1',
                    content: <div className="d-flex">
                        <div className="flex-shrink-0">
                            <img
                                className={`${style.slider_img} d-block w-100`}
                                src={`${API_AIR_URL}/${offersData[index].imgUrl}`}
                                alt="Logo"
                            />
                        </div>
                        <div className="flex-grow-1 ms-2 " >
                            <h6 style={{
                                whiteSpace: "pre-line"
                            }}>
                                {offersData[index].title}
                            </h6>
                            <div className="mt-3" style={{

                                fontSize: "1.5rem",
                                lineHeight: "1.2",
                                overflow: "hidden",
                                maxHeight: "3.6em",
                                fontWeight: "600",
                                whiteSpace: "pre-line"


                            }}>
                                {offersData[index].description}

                            </div>
                        </div>
                    </div>
                });

            }

            setSlides1(off_data);
            setSlides2(off_data);
            setSlides3(off_data);
        }

    }, [offersData])
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 3 }, [Autoplay({ delay: 3000000 })]);
const [selectedIndex, setSelectedIndex] = useState(0);

const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index * 3), [emblaApi]);
const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);

const onSelect = useCallback(() => {
  if (!emblaApi) return;
  // Divide by 3 to group slides, so each dot corresponds to three slides
  setSelectedIndex(Math.floor(emblaApi.selectedScrollSnap() / 1));
}, [emblaApi]);

useEffect(() => {
  if (!emblaApi) return;
  emblaApi.on('select', onSelect);
  onSelect();
}, [emblaApi, onSelect]);

const totalSlides = emblaApi ? emblaApi.slideNodes().length : 0;
// Set totalDots to four groups for 10 slides
const totalDots = Math.ceil(totalSlides / 3);
// console.log("totalSlides",totalSlides)
const handleShowcaseClick = () => {
    console.log('Showcase button clicked');
  };
    return (
        <>
            <section className="hero_section">
            {/* <video class="video-bg" autoplay="true" muted="true" loop crossorigin="anonymous">
  <source src="/assets/img/bg_v.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video> */}


            {/* <div class="overlay"></div> */}
     
                <div className="container">
                    <div className="row ml-3 mr-3 align-items-center justify-content-center ">
                        
                        <nav className="tab_box d-flex align-items-center justify-content-center ">
                            <div
                                className="nav nav-tabs "
                                id="nav-tab"
                                role="tablist">
                                {/* <button
                               
                               className={`nav-link ${activeTab === 'flight' ? 'active' : ''}`}
                                    id="nav-flight-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-flight"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-flight"
                                    aria-selected={activeTab === 'flight'}
                                    onClick={() => handleClick('flight')}
                                    >
                                    {' '}
                                    <span className="flight_img "></span> Flight
                                </button>

                                <button
                               className={`nav-link ${activeTab === 'hotel' ? 'active' : ''}`}
                                    id="nav-hotel-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-hotel"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-hotel"
                                    aria-selected={activeTab === 'hotel'}
                                    
                                    onClick={() => handleClick('hotel')}
                                    >
                                    {' '}
                                    <span className="hotel_img "></span> Hotel
                                </button>
                                <button
      className={`nav-link ${activeTab === 'package' ? 'active' : ''}`}
      id="nav-package-tab"
      type="button"
      role="tab"
      aria-controls="nav-package"
      aria-selected={activeTab === 'package'}
      onClick={() => handleClick('package')}
    >
      <span className="package_img"></span> Package
    </button>

    
    <button
      className={`nav-link ${activeTab === 'visa' ? 'active' : ''}`}
      id="nav-visa-tab"
      type="button"
      role="tab"
      aria-controls="nav-visa"
      aria-selected={activeTab === 'visa'}
      onClick={() => handleClick('visa')}
    >
      <span className="visa_img"></span> Visa
    </button> */}
                                
                            </div>
                        </nav>
                        <div
                            className="tab-content custom_tabs " 
                            id="nav-tabContent">
                                <div style={{position:"relative"}}>
                                {activeTab === 'flight' && (
    <div className="tab-pane fade show active" id="nav-flight" role="tabpanel" aria-labelledby="nav-flight-tab">
      <FlightSearch />
    </div>
  )}

  {/* Hotel Content */}
  {activeTab === 'hotel' && (
    <div className="tab-pane fade show active" id="nav-hotel" role="tabpanel" aria-labelledby="nav-hotel-tab">
      <HotelSearch />
    </div>
  )}
 {activeTab === 'package' && (
    <div className="tab-pane fade show active" id="nav-package" role="tabpanel" aria-labelledby="nav-package-tab">
       <PackageSearch />
    </div>
  )}

  {/* Visa Content */}
  {activeTab === 'visa' && (
    <div className="tab-pane fade show active" id="nav-visa" role="tabpanel" aria-labelledby="nav-visa-tab">
    <VisaSearch />
    </div>
  )}
                           </div>
                            {/* <div
                                className="tab-pane fade"
                                id="nav-transport"
                                role="tabpanel"
                                aria-labelledby="nav-transport-tab"
                                tabIndex="0">
                                <TransportSearch />
                            </div> */}

                            <div className="search">
                                <Link
                                    href={'/' + currentSearch}
                                    className="btn search_btn">
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
 <section className={style.slider_section}>
                <div className="container ">
                    <div className="row mt-5">
                        <div className='col-12'>
                    <div className="carouselContainer">
    <div className="embla g-3" ref={emblaRef}>
      <div className="emblaContainer">
        {slides1.map((image, index) => (
          <div className="emblaSlide" key={index}>
            <img src={`${API_AIR_URL}/${offersData[index].imgUrl}`} alt={`Slide ${index + 1}`} className="emblaSlideImg" />
            <div className="caption">
                <div>
              <p>{offersData[index].title}</p>
              <h3>{offersData[index].description}</h3></div>
            </div>
          </div>
        ))}
      </div>
    </div>
 
    <div className="dots">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          className={`dot ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => scrollTo(index)}
        />
      ))}
    </div>
  </div>
  </div>
                    </div>
                </div>
            </section>
            <section className={style.tour_section} >
                {/* <div className="container">
                   
                        <div
                            className={`${style.tour_section_container} row g-3 `}>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/1.png"
                                        alt="Logo"
                                    />
                                </div>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                    <h6 className="text-uppercase font-weight-bold">
                                    crew
                                </h6>
                                <p className="text-uppercase">
                                    YOUR TOUR GUIDE, DRIVERS & LOCAL GUIDES
                                </p></div>
</div>
                               
                              
                            </div>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/2.png"
                                        alt="Logo"
                                    />
                                </div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6 className="text-uppercase  font-weight-bold">
                                    Activities
                                </h6>
                                <p className="text-uppercase">
                                    MOST ACTIVITIES WITH THE OCCASSIONAL
                                    OPTIONAL EXTRA
                                </p></div>
</div>
                               
                                
                            </div>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/3.png"
                                        alt="Logo"
                                    />
                                </div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6 className="text-uppercase  font-weight-bold">
                                    Transport
                                </h6>
                                <p className="text-uppercase">
                                    ALL TRANSPORT FROM DAY 1
                                </p></div>
</div>
                              
                                
                            </div>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/4.png"
                                        alt="Logo"
                                    />
                                </div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6 className="text-uppercase  font-weight-bold">
                                    Accomm
                                </h6>
                                <p className="text-uppercase">
                                    ALL NIGHTS DURING YOUR TOUR
                                </p></div>
</div>
                               
                                
                            </div>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/5.png"
                                        alt="Logo"
                                    />
                                </div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6 className="text-uppercase  font-weight-bold">
                                    Groups
                                </h6>
                                <p className="text-uppercase">
                                    small - medium - enterprise
                                </p></div>
</div>
                               
                               
                            </div>
                            <div className="col-lg-4 col-sm-4 text-left">
                            <div class="d-flex align-items-center">
  <div class="flex-shrink-0">
  <div className={style.tour_icon}>
                                    <img
                                        className="img-fluid"
                                        src="assets/img/travel-facilities/6.png"
                                        alt="Logo"
                                    />
                                </div>
  </div>
  <div class="flex-grow-1 ms-3">
  <h6 className="text-uppercase  font-weight-bold">
                                    food
                                </h6>
                                <p className="text-uppercase">
                                    MOST BREAKFASTS, LUNCHES AND DINNERS
                                </p></div>
</div>
                                
                             
                            </div>
                        </div>
                    
                </div> */}
            </section>

            {featuredPackages && featuredPackages.length > 0 && featuredPackages.filter(pack => new Date() < new Date(pack.validTo)).length > 0 && (
    <section className={style.package_section}>
        <div className="container">
            <div className="row">
                <h2 className="mb-4">
                    Packages in Popular Destinations
                </h2>
            </div>

            <div className="row cus_wid">
          {/* <div className="col-12">
    <AliceCarousel
        autoPlay
        autoPlayControls
        autoPlayStrategy="none"
        autoPlayInterval={2000}
        animationDuration={2000}
        animationType="fadeout"
        autoWidth
        infinite
        mouseTracking
        items={featuredPackages
            .filter(pack => new Date() < new Date(pack.validTo))
            .sort((a, b) => a.price - b.price) 
            .slice(0, 5)
            .map((pack, index) => (
                <div className={`${style.item}`} data-value={index + 1} key={pack.id}>
                    <Link href={`/package/${pack.id}`} className={style.package_link}>
                        <div className={style.package_card}>
                            <img
                                className={style.package_img}
                                src={`${API_TRIP_URL}/${pack.path}`}
                                alt="Logo"
                            />

                            <div className={style.package_info}>
                                <div className="d-flex">
                                                  
                                </div>
                                <h5 className={style.package_country}>{pack.name}</h5>
                                <div className={style.package_balance}>
                                    <span>BDT </span> {pack.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        }
        responsive={responsive}
        controlsStrategy="alternate"
    />
</div>  */}
 <div className="col-12">
 {/* <Carousel
  autoPlay
  autoPlaySpeed={3000}
//   infinite
  swipeable={true}
  draggable={false}
  transitionDuration={400}
  responsive={responsive}
  showDots
  containerClass="carousel-container"
  itemClass="carousel-item-padding-40-px"
>
  {updatedPackages
    .filter((pack) => new Date() < new Date(pack.validTo)) // Keep valid packages
    .sort((a, b) => a.price - b.price) // Sort by price
    .slice(0, 8) // Show only the first 5
    .map((pack) => (
      <div className={style.package_container} key={pack.id}>
        <Link href={`/package/${pack.id}`} className={style.package_link}>
          <div className={style.package_card}>
          
            <img
              className={style.package_img}
              src={pack.image}
              alt={`Package ${pack.name}`}
            />
                 <div className={style.package_info}>
                    <h5 className={style.package_country}>{pack.name}</h5>
                    <div className={style.package_balance}>
                      <span ><FontAwesomeIcon icon={faBangladeshiTakaSign} /> </span> {pack.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
      </div>
    ))}
</Carousel> */}
<Carousel
       autoPlay
       autoPlaySpeed={3000}
       infinite
       swipeable={true}           // Enable swipe gestures
       draggable={false}           // Enable drag gestures
       transitionDuration={400}   // Set a shorter transition duration for smoother sliding
       responsive={responsive}
       showDots                   // Show bottom dots
       containerClass="carousel-container"
       itemClass="carousel-item-padding-40-px"
      >
        {featuredPackages
          .filter(pack => new Date() < new Date(pack.validTo))
          .sort((a, b) => a.price - b.price)
       .slice(0, 10)
          .map((pack) => (
            <div className={style.package_container} key={pack.id}>
              <Link href={`/package/${pack.id}`} className={style.package_link}>
              
                <div className={style.package_card}>
                  <img
                    className={style.package_img}
                    src={`${API_TRIP_URL}/${pack.path}`}
                    alt="Package"
                  />
                  <div className={style.package_info}>
                    <h5 className={style.package_country}>{pack.name}</h5>
                    <h6 className={style.package_country_name}>  {pack.country.split(/[-_]/)[0]}</h6>     
                    <div className={style.package_balance}>
                      <span >BDT </span> &nbsp;{pack.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </Carousel>
    </div>

    </div>
            </div>
     
    </section>
)}



            <section className=''>
                <div className="container">

                    <div className="row">
                        <h2 className="mb-4">
                            What Vromon Aviation Brings to the Table
                        </h2>
                    </div>
                    <div className="row  g-3">
                        <div className='col-sm-12 col-md-3 '>
                            <div className='card wht_card p-3 h-100'>
                                <div className='icon_wht mb-3'>
                                    <img
                                        src="assets/icons/amazing_flight_deals.svg"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className='text_wht'>
                                    <h3 className='mb-2 wht_head'>Amazing Flight Deals</h3>
                                    <p className='wht_para'>The beginning of your trip marks the beginning of your happiness! We help you get affordable flight deals for the trip at the tip of your finger. Easy booking with special surprise deals to your destination.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className='col-sm-12 col-md-3 '>
                            <div className='card wht_card p-3 h-100'>
                                <div className='icon_wht mb-3'>
                                    <img
                                        src="assets/icons/smooth_visa_processing.svg"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className='text_wht'>
                                    <h3 className='mb-2 wht_head'>Smooth Visa Processing</h3>
                                    <p className='wht_para'>No more delays and cancellations over complicated visa processing. Vromon Aviation makes your visa processing super smooth with proper documentation. Book your tickets and fly on time!

                                    </p>
                                </div>

                            </div>
                        </div>   <div className='col-sm-12 col-md-3 '>
                            <div className='card wht_card p-3 h-100'>
                                <div className='icon_wht mb-3'>
                                    <img
                                        src="assets/icons/exciting_tour_packages.svg"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className='text_wht'>
                                    <h3 className='mb-2 wht_head'>Exciting Tour Package</h3>
                                    <p className='wht_para'>No need to worry about your tour plan costing a whooping fortune! We sort your tour plan that includes all the fun spots within budget! Vromon Aviation is your go-to quality commercial travel operator!

                                    </p>
                                </div>

                            </div>
                        </div>   <div className='col-sm-12 col-md-3 '>
                            <div className='card wht_card p-3 h-100'>
                                <div className='icon_wht mb-3'>
                                    <img
                                        src="assets/icons/hassle_free_hotel_booking.svg"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className='text_wht'>
                                    <h3 className='mb-2 wht_head'>Hassle-free Hotel Booking</h3>
                                    <p className='wht_para'>Boosing your preferred hotel for the stay is a click away with Vromon Aviation! Our packages include complimentary breakfasts and transportation to the Airport. So you get to live precious moments with your close ones!

                                    </p>
                                </div>

                            </div>
                        </div>



                    </div></div>
            </section>

            {/* <section className={style.app_section}>
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-6 col-sm-6">
                            <img
                                className="img-fluid"
                                src="assets/img/app-section.png"
                            />
                        </div>
                        <div className="col-lg-6 col-sm-6">
                            <div
                                className={`${style.app_header} text-capitalize  ml-5`}>
                                <h1 className={style.app_weight}>
                                    Download Navigator App
                                </h1>
                            </div>
                            <div className="para mb-5 ml-5">
                                <p className={style.app_weight}>
                                    {' '}
                                    Design your next favourite trip with amazing
                                    offers.
                                </p>
                            </div>

                            <div className="row ml-5">
                                <div className="col-4">
                                    <a
                                        target="_blank"
                                        href="https://play.google.com/store/apps/details?id=com.navigatortourism.app">
                                        <img
                                            className="img-fluid mb-3"
                                            src="assets/img/google.png"
                                        />
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://apps.apple.com/pk/app/navigator-tourism/id1605547618">
                                        <img
                                            className="img-fluid mb-3"
                                            src="assets/img/apple.png"
                                        />
                                    </a>
                                </div>
                                <div className="col-3">
                                    <img className="img-fluid rounded-2" src="assets/img/bar-code.png" alt="" />
                                </div>
                                <div className="col-5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            
            <section className={style.app_section}>
                <div className="container">
                    <div className="row align-items-center">
                       
                        <div className="col-lg-7 col-sm-12">
                            <div
                                className={`${style.app_header} text-capitalize  ml-5`}>
                                <h1 className={style.app_weight} style={{fontSize:"36px"}}>
                                All your <span style={{color:"#27266b"}}> travel options</span> in one place
                                </h1>
                            </div>
                            <div className="para mb-5 ml-5">
                                <p >
                                    {' '}
                                    More than 1,000 trusted travel partners across trains, buses, flights, and launch, so that you can focus on the journey.
                                </p>
                            </div>

                            <div className="row ml-5">
                                <div className="col-4">
                                    <a
                                        target="_blank"
                                        style={{color:"#27266b",fontSize:"26px",textDecoration:"none",fontWeight:"600"}}
                                        href="#">
                                       250 Million+
                                    </a>
                                    <br></br>
                                    <a
                                        target="_blank"
                                        style={{fontSize:"14px",color:"#212529",textDecoration:"none"}}
                                        href="#">
                                       Tickets Sold
                                    </a>
                                </div>
                                <div className="col-3">
                                <a
                                        target="_blank"
                                        style={{color:"#27266b",fontSize:"26px",textDecoration:"none",fontWeight:"600"}}
                                        href="#">
                                    3000+
                                    </a>    <br></br>
                                    <a
                                        target="_blank"
                                         style={{fontSize:"14px",color:"#212529",textDecoration:"none"}}
                                        href="#">
                                      Routes
                                    </a>
                                </div>
                                <div className="col-4">
                                <a
                                        target="_blank"
                                        style={{color:"#27266b",fontSize:"26px",textDecoration:"none",fontWeight:"600"}}
                                        href="#">
                                      10 Million+
                                    </a>   
                                    <a
                                        target="_blank"
                                         style={{fontSize:"14px",color:"#212529",textDecoration:"none"}}
                                        href="#">
                                       Happy Users
                                    </a>
                                </div>
                                {/* <div className="col-5"></div> */}
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <img
                                className="img-fluid mt-5 mb-5"
                                src="https://www.shohoz.com/air-tickets/_next/static/media/AllYourTravelOption.7d9736c5.png"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section style={{marginBottom:"-40px"}}>
                <div className='container'>
                    <div className="row">
                        <h2 className="mb-4">
                            FAQs
                        </h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <div class="accordion accordion_custom accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button accordion_button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            How can I book a tour with Vromon Aviation Travels?
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body" style={{ backgroundColor: "#ebf0f4",textAlign:"justify" }}>Answer: Booking a tour with us is easy! Simply visit our website and browse through our available domestic and international routes. Once you've chosen your desired destination, select the tour package that suits your preferences and budget. Follow the prompts to provide your details and make a secure online payment. Our team will then confirm your booking and provide you with all the necessary information for your tour.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button accordion_button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            What are the payment options available for tour bookings?

                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body" style={{ backgroundColor: "#ebf0f4",textAlign:"justify" }}>Answer: We offer multiple payment options to make it convenient for our customers. You can pay for your tour booking using credit or debit cards, and online banking transfers. And you can use popular third-party payment gateways. Rest assured that our payment processes are secure and compliant with industry standards to protect your personal and financial information.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button accordion_button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Can I customize my tour itinerary?

                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body " style={{ backgroundColor: "#ebf0f4",textAlign:"justify" }}>Answer: Absolutely! We understand that each traveler has their own ways of liking! We provide options for customization, allowing you to tailor your tour itinerary according to your specific requirements. Whether you want to extend your stay, include additional attractions, or make changes to the activities, our team will work with you to create a personalized itinerary that suits your needs.
                                        </div>
                                    </div>
                                </div>
                            </div></div>   <div className='col-md-6 col-sm-12'>
                            <div class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFour">
                                        <button class="accordion-button accordion_button   collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseOne">
                                            What is Vromon Aviations’ cancellation and refund policy?

                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body" style={{ backgroundColor: "#ebf0f4" ,textAlign:"justify"}}>Answer: We understand that plans can change, and we strive to provide flexibility for our customers. Our cancellation and refund policy varies depending on the type of tour package and the cancellation period.
                                            <br></br>Please refer to our terms and conditions or contact our customer support team. They will provide you with specific details regarding cancellations and refunds. We are best known for making the process as smooth as possible for you.

                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingFive">
                                        <button class="accordion-button accordion_button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Do I need travel insurance for my tour?

                                        </button>
                                    </h2>
                                    <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body" style={{ backgroundColor: "#ebf0f4",textAlign:"justify" }}>Answer: While travel insurance is not mandatory for booking a tour with us, we highly recommend it for your peace of mind. Travel insurance can provide coverage for unforeseen circumstances.
                                            <br></br>You’ll be covered for trip cancellations, medical emergencies, lost baggage, or travel delays. It ensures that you are financially protected throughout your journey. We can assist you in finding suitable travel insurance options, and our team will be happy to answer any questions you may have.
                                        </div>
                                    </div>
                                </div>

                            </div></div>
                    </div>
                </div>
            </section>
        </>
    )
}
