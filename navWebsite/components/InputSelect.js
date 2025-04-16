import React, { useEffect, useState, useContext, useRef } from "react";
import Select from 'react-select';

const InputSelect = ({
    selectedDestination,
    setSelectedDestination,
    destinations = [] // Default to an empty array
}) => {
    
    // Add selected option to the list if it's not already present
    const getUpdatedDestinations = () => {
        if (!selectedDestination) return destinations; // No selected destination, return original list

        const isSelectedInOptions = destinations.some(dest => dest.value === selectedDestination.value);

        // If the selected destination is not in the options, add it
        if (!isSelectedInOptions) {
            return [{ value: selectedDestination.value, label: selectedDestination.label }, ...destinations];
        }

        return destinations; // Otherwise, return the original list
    };

    // Sort the destinations list to show the selected one on top
    const sortedDestinations = () => {
        if (!selectedDestination) return destinations; // Return unmodified list if nothing is selected
        const selectedOption = destinations.find(dest => dest.value === selectedDestination.value);
        const filteredOptions = destinations.filter(dest => dest.value !== selectedDestination.value);
        return selectedOption ? [selectedOption, ...filteredOptions] : filteredOptions;
    };

    // Ensure default value has both label and value
    const defaultValue = selectedDestination
        ? { value: selectedDestination.value, label: selectedDestination.label }
        : null;

    useEffect(() => {
        console.log("defaultValue", selectedDestination?.value);
    }, [selectedDestination]);
const [menuIsOpen, setMenuIsOpen] = useState(false);
  const containerRef = useRef(null);
 const inputRef = useRef(null);
  // Toggle menu open/close when clicking inside the box
  const [isDesktop, setIsDesktop] = useState(true);
  const handleToggle = () => {
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
 

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
   useEffect(() => {
            if (menuIsOpen && inputRef.current) {
                inputRef.current.focus(); // Focus input when the menu is opened
            }
        }, [menuIsOpen]);
    return (
        <div className="form_select" ref={containerRef} // Attach ref to detect outside clicks
                    onClick={handleToggle}>
            <level className="text-uppercase ">LOCATION / TOUR</level>
            <div className="marge active package_destination">
                {/* Render Select only if destinations are available */}
                {destinations.length > 0 ? (
                    <Select
                    ref={inputRef} 
                        defaultValue={defaultValue} // Set defaultValue with both label and value
                        onChange={setSelectedDestination}
                        options={sortedDestinations()} // Display sorted options
                        getOptionLabel={option => option.label}  // Assuming your options have a `label` key
                        getOptionValue={option => option.value} 
                        menuIsOpen={isDesktop ? menuIsOpen : undefined} // Assuming your options have a `value` key
                    />
                ) : (
                    <div className="loading-message">Loading destinations...</div>
                )}
                <div className="sub-value">Country</div>
            </div>
        </div>
    );
};

export default InputSelect;
