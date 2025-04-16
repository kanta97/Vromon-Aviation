import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthContext from '../context/AuthContext'
import HotelContext from '../context/HotelContext'
import VisaContext from '../context/VisaContext'
import PackageContext from '../context/PackageContext'
import FlightContext from '../context/FlightContext'
import style from '../styles/Home.module.css'
import $ from 'jquery'
import { API_TRIP_URL } from '../config/index'

import { API_AIR_URL, excludedAirlines } from '../config/index'
export default function Header() {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }
    const { loadOffersData, offersData,setActiveTab,activeTab,currentSearch,showDropdownr, setCurrentSearch ,isOffcanvasOpenCal, isOffcanvasOpend, showDatePicker,isOffcanvasOpenTo } = useContext(FlightContext);
    const router = useRouter()
    const [isTransparent, setIsTransparent] = useState(true)

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 50) {
                setIsTransparent(false)
            } else {
                setIsTransparent(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const isHomePage = router.pathname === '/';
    // const navbarClass = isHomePage && isTransparent ? 'navbar transparent-navbar' : 'nav_bar'

    const navbarClass = `${isHomePage && isTransparent ? 'navbar nav_bar' : 'nav_bar'} ${isOffcanvasOpenCal || isOffcanvasOpend || isOffcanvasOpenTo || showDropdownr || showDatePicker ? 'nav-behind' : ''}`;

    const [carouselItem, setCarouselItem] = useState([])
    

    const { country, travellingTo, category } = useContext(VisaContext)

    const { getFeaturedPackage, featuredPackages, selectedDestination } = useContext(PackageContext)
    useEffect(() => {
        const items = [
            <div className={`${style.item}`} data-value="1">
                <Link href={featuredPackages ? '/package/' + featuredPackages[0].id : ''} className={style.package_link}>
                    <div className={style.package_card}>
                        <img
                            className={style.package_img}
                            src={featuredPackages && API_TRIP_URL + '/' + featuredPackages[0].path}
                            alt="Logo"
                        />

                        <div className={style.package_info}>
                            <div className="d-flex">
                                {/* <img src="assets/icons/package-show.svg" alt="Logo" /> */}
                                {/* <span className={style.package_title}>22 Packages</span> */}
                            </div>
                            <h5 className={style.package_country}>{featuredPackages && featuredPackages[0].name}</h5>
                            <div className={style.package_balance}>
                                <span>BDT </span> {featuredPackages && featuredPackages[0].price}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>,
            <div className={`${style.item}`} data-value="2">
                <Link href={featuredPackages ? '/package/' + featuredPackages[1].id : ''} className={style.package_link}>
                    <div className={style.package_card}>
                        <img
                            className={style.package_img}
                            src={featuredPackages && API_TRIP_URL + '/' + featuredPackages[1].path}
                            alt="Logo"
                        />

                        <div className={style.package_info}>
                            <div className="d-flex">
                                {/* <img src="assets/icons/package-show.svg" alt="Logo" /> */}
                                {/* <span className={style.package_title}>22 Packages</span> */}
                            </div>
                            <h5 className={style.package_country}>{featuredPackages && featuredPackages[1].name}</h5>
                            <div className={style.package_balance}>
                                <span>BDT </span> {featuredPackages && featuredPackages[1].price}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>,
            <div className={`${style.item}`} data-value="3">
                <Link href={featuredPackages ? '/package/' + featuredPackages[2].id : ''} className={style.package_link}>
                    <div className={style.package_card}>
                        <img
                            className={style.package_img}
                            src={featuredPackages && API_TRIP_URL + '/' + featuredPackages[2].path}
                            alt="Logo"
                        />

                        <div className={style.package_info}>
                            <div className="d-flex">
                                {/* <img src="assets/icons/package-show.svg" alt="Logo" /> */}
                                {/* <span className={style.package_title}>22 Packages</span> */}
                            </div>
                            <h5 className={style.package_country}>{featuredPackages && featuredPackages[2].name}</h5>
                            <div className={style.package_balance}>
                                <span>BDT </span> {featuredPackages && featuredPackages[2].price}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>,
            <div className={`${style.item}`} data-value="4">
                <Link href={featuredPackages ? '/package/' + featuredPackages[3].id : ''} className={style.package_link}>
                    <div className={style.package_card}>
                        <img
                            className={style.package_img}
                            src={featuredPackages && API_TRIP_URL + '/' + featuredPackages[3].path}
                            alt="Logo"
                        />

                        <div className={style.package_info}>
                            <div className="d-flex">
                                {/* <img src="assets/icons/package-show.svg" alt="Logo" /> */}
                                {/* <span className={style.package_title}>22 Packages</span> */}
                            </div>
                            <h5 className={style.package_country}>{featuredPackages && featuredPackages[3].name}</h5>
                            <div className={style.package_balance}>
                                <span>BDT </span> {featuredPackages && featuredPackages[3].price}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>,
            <div className={`${style.item}`} data-value="5">
                <Link href={featuredPackages ? '/package/' + featuredPackages[4].id : ''} className={style.package_link}>
                    <div className={style.package_card}>
                        <img
                            className={style.package_img}
                            src={featuredPackages && API_TRIP_URL + '/' + featuredPackages[4].path}
                            alt="Logo"
                        />

                        <div className={style.package_info}>
                            <div className="d-flex">
                                {/* <img src="assets/icons/package-show.svg" alt="Logo" /> */}
                                {/* <span className={style.package_title}>22 Packages</span> */}
                            </div>
                            <h5 className={style.package_country}>{featuredPackages && featuredPackages[4].name}</h5>
                            <div className={style.package_balance}>
                                <span>BDT </span> {featuredPackages && featuredPackages[4].price}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ]

        setCarouselItem(items)
    }, [featuredPackages])
   
 


    // useEffect(() => {

    //     if (router.query.search == "package") {

    //         let callForTwo = `/package?des=${selectedDestination.value ? selectedDestination.value : "Thailand"}`
    //         setCurrentSearch(callForTwo)

    //     }


    // }, [selectedDestination, router])

    // useEffect(() => {
    //     $(document).ready(function () {
    //         $(".package_destination .css-1dimb5e-singleValue").html(selectedDestination.value ? selectedDestination.value : "Thailand");
    //     })
    // })


    const [showNavBar, setShowNavBar] = useState(false);
   
    
    useEffect(() => {
      const handleScroll = () => {
        if (isHomePage) {
          const scrollPosition = window.scrollY;
          const scrollThreshold = 50;
    
          setShowNavBar(scrollPosition > scrollThreshold);
        }
      };
    
      if (isHomePage) {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }
    }, [isHomePage]);



    // const [activeTab, setActiveTab] = useState('flight');
    // useEffect(() => {
    //     const routeToTab = {
    //         '/': 'flight',
    //         '/hotel': 'hotel',
    //         '/package': 'package',
    //         '/visa': 'visa',
    //         '/transport': 'transport',
    //         '/offers': 'offers',
    //         '/hotelDetails': 'hotel',
    //         '/hotelBooking': 'hotel',
    //         '/visaContactus': 'visa'
    //     };

    //     const currentTab = Object.keys(routeToTab).find(route => {
    //         // Check if the current route starts with the defined route or has a nested route
    //         const matches = router.pathname === route || router.pathname.startsWith(`${route}/`);
    //         return matches;
    //     });

    //     setActiveTab(currentTab ? routeToTab[currentTab] : 'flight');
    // }, [router.pathname]);
    const handleClick = (callFor) => {
        // setCurrentSearch(prevSearch => callFor)
        console.log('Current Search:', currentSearch);
        setActiveTab(callFor); 
        router.push(`/?search=${callFor}`)
        // if (callFor !== 'visa') {
       
        // }
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Ensures smooth scrolling to the top
          });
      
    }


    // const handleClick = (tab) => {
    //     setActiveTab(tab); // Set the active tab
    //     router.push(`/${tab}`) // Navigate to the selected tab's URL
    //       .then(() => {
    //         console.log(`Navigated to: /${tab}`);
    //       })
    //       .catch((err) => console.error('Navigation error:', err));
    //   };
    
 
    
    //   useEffect(() => {
    //     // Determine the active tab based on the current pathname
    //     const currentPath = router.pathname.split('/')[1]; // Get the first segment of the path
    //     if (currentPath === 'offers') {
    //       setActiveTab(currentPath);
    //     } else {
    //       setActiveTab(currentPath); // Default to "flight" if not "offers"
    //     }
    //   }, [router.pathname]);
    useEffect(() => {
  // Determine the active tab based on the current pathname
  const currentPath = router.pathname.split('/')[1]; // Get the first segment of the path
  if (currentPath === 'offers') {
    setActiveTab(currentPath);
  } else if (router.pathname === '/checkout') {
    setActiveTab('flight'); // Set active tab to "checkout flight" for the specific route
  } else if (router.pathname === '/visaContactus') {
    setActiveTab('visa'); // Set active tab to "checkout flight" for the specific route
  } else {
    setActiveTab(currentPath); // Default to other first segments
  }
}, [router.pathname]);

    
    //   const handleOffersClick = () => {
    //     setActiveTab('offers');
    //   }
    
    const handleOffersClick = () => {
        setActiveTab('offers');
        window.history.pushState({ tab: 'offers' }, 'Offers'); // Update history state
      };
    
      const handleBackNavigation = () => {
        if (activeTab === 'offers') {
          setActiveTab('flight'); // Switch to 'flight' tab
          router.push('/'); // Navigate to the home page
        } else {
       
        }
      };
    
      useEffect(() => {
        const onPopState = () => {
          handleBackNavigation();
        };
    
        window.addEventListener('popstate', onPopState);
    
        return () => {
          window.removeEventListener('popstate', onPopState);
        };
      }, [activeTab]);
    
    return (
        <header>
         
            <nav className={`navbar navbar-expand-lg sps  ${navbarClass}`}>
                <div className="container">
                    <Link className="navbar-brand" href="/" onClick={() => handleClick('flight')}>
                        <img width={220} src="/assets/img/logo_latest.png" alt="Logo" />
                    </Link>
                    <nav
                        className={`tab_box mt-0 d-flex align-items-center justify-content-center tab_box_mobile ${
                        isHomePage ? (showNavBar ? '' : 'showNavBar') : ''
                        }`}
                        style={{
                        backgroundColor: 'unset',
                        boxShadow: 'unset',
                        }}
                    >
                            <div
                                className="nav nav-tabs"
                               
                                id="nav-tab"
                                role="tablist">
                                {/* <button
                                   className={`nav-link ${activeTab === 'flight' ? 'active' : ''}`}
                                 
                                    type="button"
                                  
                                    onClick={() => handleClick('flight')}>
                                    {' '}
                                   Flight
                                </button>

                                <button
                                 
                                  className={`nav-link ${activeTab === 'hotel' ? 'active' : ''}`}
                                    type="button"
                                  
                                    onClick={() => handleClick('hotel')}>
                                    {' '}
                                     Hotel
                                </button>
                                <style jsx>{`
                                    .nav-link.active {
                                        color: #27266b; 
                                    }
                                `}</style>
                                <button
                                      className={`nav-link ${activeTab === 'package' ? 'active' : ''}`}
                               
                                    type="button"
                                  
                                    onClick={() => handleClick('package')}>
                                 {' '}
                                    Package
                                </button>
                                <button
                                       className={`nav-link ${activeTab === 'visa' ? 'active' : ''}`}
                                   
                                    type="button"
                               
                                 
                                    onClick={() => handleClick('visa')}>
                                 
                                    Visa
                                </button> */}
                                {/* <button
                                      className={`nav-link ${activeTab === 'transport' ? 'active' : ''}`}
                                    id="nav-transport-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-transport"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-transport"
                                    aria-selected="false"
                                    onClick={(e) => {
                                        handleClick('flight')
                                    }}>
                                 
                                    Transport
                                </button> */}
                                
                                <button
                                
                                      className={`nav-link ${router.pathname === '/offers' ? 'active' : ''}`}
                                    
                                    type="button"
                                    
                                   >
                                       {/* <Link style={{textDecoration: "none", color: "#3a4856"}} href="/offers"> 
                                            Offers    
                                            </Link> */}
                                             <Link href="/offers" passHref style={{textDecoration: "none", color: "#fff"}}
                                              >
                                                <button style={
                                    {
                                        borderBottom:"unset"
                                    }
                                } className={`nav-link p-0 ${activeTab === 'offers' ? 'active' : ''}`} onClick={handleOffersClick}>
                                                    Offers
                                                </button>
                                            </Link>
                                 
                                  
                                </button>
                                <button
                                
                                className={`nav-link ${router.pathname === '/offers' ? 'active' : ''}`}
                              
                              type="button"
                              
                             >
                                 {/* <Link style={{textDecoration: "none", color: "#3a4856"}} href="/offers"> 
                                      Offers    
                                      </Link> */}
                                       <Link href="/contact" passHref style={{textDecoration: "none", color: "#fff"}}
                                        >
                                          <button style={
                              {
                                  borderBottom:"unset"
                              }
                          } className={`nav-link p-0 ${activeTab === 'offers' ? 'active' : ''}`} onClick={handleOffersClick}>
                                        Contact Us
                                          </button>
                                      </Link>
                           
                            
                          </button>
                                <style jsx>{`
                                  .nav-link{
                                        color: #3a4856;
                                        border-radius:8px;

                                       
                                    }
                                    .nav-link.active {
                                        color: #27266b; 
                                     
                                    }
                                `}</style>
                            </div>
                        </nav>
                        <nav
                            className={` mt-0 d-flex offer_small_div align-items-center justify-content-center tab_box_web text-bold `}
                            style={{
                            backgroundColor: 'unset',
                           
                            boxShadow: 'unset',
                            }}
                        >
                            <div
                                className="nav nav-tabs"
                               >
                                
                                <button
                                
                                  
                                    className={`nav-link p-1 offertab ${router.pathname === '/offers' ? 'active' : ''}`}
                                  
                                    type="button"
                                   
                                   >
                                        <Link href="/offers" passHref style={{textDecoration: "none", color: "#fff"}} >
                                                <button style={
                                    {
                                        borderBottom:"unset"
                                    } } className={`nav-link p-1  ${activeTab === 'offers' ? 'active' : ''}`} onClick={handleOffersClick}>
                                                    Offers
                                                </button>
                                            </Link>
                                 
                                  
                                </button>
                                <style jsx>{`
                                  .nav-link{
                                    color: #3a4856;
                                       
                                    }
                                    .nav-link.active {
                                        color: #27266b; 
                                     
                                    }
                                `}</style>
                            </div>
                        </nav>
                    <div className="d-flex">
                        <div className="d-flex">
                            {!user && (
                                <Link
                                    href="/login"
                                    className="btn btn-primary btn_primary ">
                                    Sign In
                                </Link>
                            )}
                            {user && (
                                <div className="dropdown drop_down">
                                    <svg
                                        viewBox="0 0 16 16"
                                        width="1em"
                                        height="1em"
                                        focusable="false"
                                        role="img"
                                        aria-label="person fill"
                                        aria-hidden="true"
                                        alt="avatar"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="profile_icon bi-person-fill b-icon bi dropdown-toggle"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <g>
                                            <path
                                                fillRule="evenodd"
                                                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                        </g>
                                    </svg>

                                    <ul
                                        className="dropdown-menu dropdown_menu"
                                        aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link
                                                className="dropdown-item dropdown_item"
                                                href="/profile">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item dropdown_item"
                                                href="/myBooking">
                                                My Booking
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                onClick={handleLogout}
                                                className="dropdown-item dropdown_item">
                                                Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
