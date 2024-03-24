import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import SpinLoader from "./SpinLoader";

const CountrySelect = ({ getSelectedCountry, countryData }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(countryData.flag);
  const [filterText, setFilterText] = useState(countryData.name);
  const countrySelectRef = useRef(null);

  const countrySelectHandler = (name, flag) => {
    setFilterText(name);
    setShowList(false);
    setSelectedFlag(flag);
    getSelectedCountry(name, flag);
  };

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      } catch (error) {
        toast.error("Error loading countries");
        setLoading(false);
      }
    }

    fetchCountryData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countrySelectRef.current &&
        !countrySelectRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCountryInput = (e) => {
    setFilterText(e.target.value);
    setSelectedFlag(null);
  };

  // Function to filter and sort countries based on input
  const filteredAndSortedCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div
      className="w-full country-select relative"
      id="country"
      ref={countrySelectRef}
    >
      <div
        className="flex px-2 items-center justify-center py-1 border-[1px] border-blue-gray-100 md:h-[48px] h-[42px] text-slategray rounded font-medium text-sm sm:text-base mb-2 cursor-pointer hover:border-blue-gray-200 default-transition"
        onClick={() => setShowList((prevValue) => !prevValue)}
      >
        <input
          className="outline-none w-full placeholder:text-center placeholder:text-slategray placeholder:font-normal opacity-90"
          type="text"
          placeholder="-- Select a country --"
          value={filterText}
          onChange={handleCountryInput}
        />
        {selectedFlag && <img src={selectedFlag} alt="" className="w-[28px]" />}
      </div>
      <div className={`${showList ? "country-options w-full" : "hidden"}`}>
        {loading ? (
          <SpinLoader />
        ) : (
          filteredAndSortedCountries.map((country) => {
            return (
              <div
                key={country.flags.png}
                className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  countrySelectHandler(country.name.common, country.flags.png);
                }}
              >
                <div className="text-slategray text-sm">
                  {country.name.common}
                </div>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-[25px]"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

CountrySelect.propTypes = {
  getSelectedCountry: PropTypes.func,
  countryData: PropTypes.object,
};

export default CountrySelect;
