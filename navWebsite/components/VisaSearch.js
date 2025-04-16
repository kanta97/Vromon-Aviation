import React, { useEffect, useState, useContext,useRef } from 'react';
import Select from 'react-select';
import style from '../styles/visaPage.module.css';
import VisaContext from '../context/VisaContext';

export default function VisaSearch() {
    const {
        setCountry,
        country,
        setTravellingTo,
        travellingTo,
        setCategory,
        category,
        setSelectedVisa,
        selectedVisa,
        allCountries,
        setAllCountries,
        allTravellingTo,
        setAllTravellingTo,
        allCategories,
        setAllCategories,
        getVisaData,
        populateUniqueCategory
    } = useContext(VisaContext);

    const defaultVisaData = {
        country_name: "Thailand",
        from_country: "Bangladesh",
        visa_category: "Tourist Visa",
    };

    const reorderOptions = (options, selectedValue) => {
        if (!options || !selectedValue) return options;
        const reordered = options.filter(
            (option) => option.value !== selectedValue.value
        );
        return [selectedValue, ...reordered];
    };
    const reorderOptions1 = (options, selectedValue) => {
        if (!options || !selectedValue) return options;

        const allTypesOption = options.find(option => option.value === "All Types of Visa");
        const filteredOptions = options.filter(option => option.value !== "All Types of Visa" && option.value !== selectedValue.value);

        const sortedOptions = filteredOptions.sort((a, b) => a.label.localeCompare(b.label));
        return [

            ...(allTypesOption ? [allTypesOption] : []),
            ...sortedOptions.slice(0, 1), 
            selectedValue,
            ...sortedOptions.slice(1)
        ];
    };

    useEffect(() => {
        setCountry({ label: defaultVisaData.from_country, value: defaultVisaData.from_country });
        setTravellingTo({ label: defaultVisaData.country_name, value: defaultVisaData.country_name });
        setCategory({ label: defaultVisaData.visa_category, value: defaultVisaData.visa_category });
    }, []);

    useEffect(() => {
        getVisaData();
    }, []);

    useEffect(() => {
        populateUniqueCategory();
    }, [travellingTo]);
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
      const [menuIsOpenTT, setMenuIsOpenTT] = useState(false);
        const containerRefTT = useRef(null);
        const inputRefTT = useRef(null);
        // Open the dropdown menu on focus or click
        const handleFocusTT = () => {
            if (isDesktop) {
                setMenuIsOpenTT((prevState) => !prevState);
            } // Toggle the menu open/close
      };
      
        // Close the dropdown when clicking outside
        const handleClickOutsideTT = (event) => {
            if (containerRefTT.current && !containerRefTT.current.contains(event.target)) {
                setMenuIsOpenTT(false); // Close menu if click is outside the container
            }
        };
      
        useEffect(() => {
            // Add and clean up event listener
            document.addEventListener("mousedown", handleClickOutsideTT);
            return () => {
                document.removeEventListener("mousedown", handleClickOutsideTT);
            };
        }, []);
      
      useEffect(() => {
          if (menuIsOpenTT && inputRefTT.current) {
              inputRefTT.current.focus(); // Focus input when the menu is opened
          }
      }, [menuIsOpenTT]); // Runs when menuIsOpen state changes
      const [menuIsOpenVC, setMenuIsOpenVC] = useState(false);
        const containerRefVC = useRef(null);
        const inputRefVC = useRef(null);
        // Open the dropdown menu on focus or click
        const handleFocusVC = () => {
            if (isDesktop) {
                setMenuIsOpenVC((prevState) => !prevState);
            } // Toggle the menu open/close
      };
      
        // Close the dropdown when clicking outside
        const handleClickOutsideVC = (event) => {
            if (containerRefVC.current && !containerRefVC.current.contains(event.target)) {
                setMenuIsOpenVC(false); // Close menu if click is outside the container
            }
        };
      
        useEffect(() => {
            // Add and clean up event listener
            document.addEventListener("mousedown", handleClickOutsideVC);
            return () => {
                document.removeEventListener("mousedown", handleClickOutsideVC);
            };
        }, []);
      
      useEffect(() => {
          if (menuIsOpenVC && inputRefVC.current) {
              inputRefVC.current.focus(); // Focus input when the menu is opened
          }
      }, [menuIsOpenVC]); // Runs when menuIsOpen state changes
    return (
        <div className={`${style.hotel_tab} row g-3 mt-1`}>
            <div className="col-lg-12 col-xl-4 col-md-12 col-sm-12 col-12 mb_3">
                <div className="form_secelct_option me-2 w-100 h-100"  ref={containerRef} // Attach ref to detect outside clicks
            onClick={handleFocus}>
                    <div className="form_select">
                        <level className="text-uppercase">
                            I’m a citizen of
                        </level>
                        <div className="marge active">
                            <Select
                             ref={inputRef} 
                                value={country}
                                onChange={setCountry}
                                options={reorderOptions(allCountries, country)}
                                defaultValue={{ label: defaultVisaData.from_country, value: defaultVisaData.from_country }} // Default country
                                menuIsOpen={isDesktop ? menuIsOpen : undefined}
                            />
                            <div className="sub-value">Country</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-12 col-xl-4 col-md-12 col-sm-12 mb_3">
                <div className="form_secelct_option me-2 w-100 h-100" ref={containerRefTT} // Attach ref to detect outside clicks
            onClick={handleFocusTT}>
                    <div className="form_select">
                        <level className="text-uppercase">Travelling to</level>
                        <div className="marge active">
                            <Select
                             ref={inputRefTT} 
                                value={travellingTo}
                                onChange={setTravellingTo}
                                options={reorderOptions(allTravellingTo, travellingTo)}
                                defaultValue={{ label: defaultVisaData.country_name, value: defaultVisaData.country_name }} // Default country
                                menuIsOpen={isDesktop ? menuIsOpenTT : undefined}
                            />
                            <div className="sub-value">Country</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 col-xl-4 col-md-12 col-sm-12 mb_3">
                <div className="form_secelct_option me-2 w-100 h-100" ref={containerRefVC} // Attach ref to detect outside clicks
            onClick={handleFocusVC}>
                    <div className="form_select">
                        <level className="text-uppercase">Visa Category</level>
                        <div className="marge active">
                            <Select
                              ref={inputRefVC} 
                              menuIsOpen={isDesktop ? menuIsOpenVC : undefined}
                                value={category}
                                onChange={setCategory}
                                options={reorderOptions1(allCategories, category)}
                                defaultValue={{ label: defaultVisaData.visa_category, value: defaultVisaData.visa_category }} // Default category
                            />
                            <div className="sub-value">Type</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
