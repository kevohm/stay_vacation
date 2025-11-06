import React, { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FaInfoCircle } from "react-icons/fa";
import { useEvent } from "../context/EventContext";
import Categories from "./Categories";
import { minDate, currentDate } from "../context/utils";
import { useNavigate } from "react-router-dom";

const Search = ({ filter, setfilterData }) => {
  const { removeFilterLocal } = useEvent();
  const [localFilter, setLocalFilter] = useState(filter);
  const navigate = useNavigate()

  // Debounce effect — updates global filters only after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      // const searchParams =
      const { price, ...filters } = localFilter;
      const queryParams = new URLSearchParams({
        ...filters,
        min: price?.min,
        max: price?.max,
      }).toString();

      // Navigate to /events with query string
      navigate(`/events?${queryParams}`);
      // setfilterData(localFilter);
    }, 500); // 500ms debounce delay
    return () => clearTimeout(timeout);
  }, [localFilter, setfilterData]);

  const changeExpired = (val) => {
    setLocalFilter({
      ...localFilter,
      expired: val,
      validity: val ? minDate : currentDate,
    });
  };

  const handleChange = (e) => {
    setLocalFilter({
      ...localFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrice = (value) => {
    setLocalFilter({
      ...localFilter,
      price: { min: value[0], max: value[1] },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    removeFilterLocal();
    setfilterData(localFilter); // final sync on submit (optional)
  };

  return (
    <form
      className="bg-white w-full max-w-none md:min-w-[270px] lg:max-w-[424px] rounded-lg p-10 lg:p-12 flex flex-col space-y-6 shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Toggle */}
      {/* <div className="flex items-center justify-evenly w-full">
        <button
          type="button"
          className={`cursor-pointer p-2 px-2.5 rounded-lg border border-light-blue text-light-blue ${
            localFilter.expired && "bg-light-blue text-white"
          }`}
          onClick={() => changeExpired(true)}
        >
          upcoming
        </button>
        <button
          type="button"
          className={`cursor-pointer p-2 px-2.5 rounded-lg border border-light-blue text-light-blue ${
            !localFilter.expired && "bg-light-blue text-white"
          }`}
          onClick={() => changeExpired(false)}
        >
          past events
        </button>
      </div> */}

      {/* Search */}
      <div className="flex flex-col space-y-4">
        <label className="text-dark-blue font-semibold capitalize">
          Search
        </label>
        <div className="flex w-full space-x-0">
          <input
            type="text"
            name="search"
            className="w-full px-3 py-2 border border-gray-300 rounded-l-lg"
            placeholder="keywords"
            value={localFilter.search}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="px-3 py-2 bg-orange text-white rounded-r-lg cursor-pointer"
            value="Apply"
          />
        </div>
      </div>

      {/* Price slider */}
      <div className="flex flex-col space-y-4">
        <label className="text-dark-blue font-semibold capitalize">Price</label>
        <div className="flex flex-col space-y-2">
          <RangeSlider
            min={0}
            max={900000}
            step={5000}
            value={[localFilter.price.min, localFilter.price.max]}
            onInput={handlePrice}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <label>Ksh. {Number(localFilter.price.min).toLocaleString()}</label>
            <label>Ksh. {Number(localFilter.price.max).toLocaleString()}</label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <Categories handleChange={handleChange} category={localFilter.category} />

      {/* Date */}
      {/* <div className="flex flex-col space-y-4">
        <label className="text-dark-blue font-semibold capitalize">Date</label>
        <input
          type="date"
          name="validity"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          value={localFilter.validity}
          min={localFilter.expired ? minDate : ""}
          max={localFilter.expired ? "" : minDate}
          onChange={handleChange}
        />
      </div> */}

      {/* Info */}
      {/* <div className="flex space-x-2 items-start text-light-blue text-sm">
        <FaInfoCircle />
        {localFilter.expired ? (
          <p className="text-xs">
            will show events that are valid till the date provided above
          </p>
        ) : (
          <p className="text-xs">
            will show events that expired between now and the date provided
            above
          </p>
        )}
      </div> */}
    </form>
  );
};

export default Search;
