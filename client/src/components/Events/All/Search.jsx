import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FaInfoCircle } from "react-icons/fa";
import { useEvent } from "../context/EventContext";
import Categories from "./Categories";
import { minDate, currentDate } from "../context/utils";

const Search = ({ handleRefresh, filter }) => {
  const { removeFilterLocal } = useEvent();
  const [filterData, setfilterData] = useState(filter);

  const changeExpired = (val) => {
    setfilterData({
      ...filterData,
      expired: val,
      validity: val ? minDate : currentDate,
    });
  };

  const handleChange = (e) => {
    setfilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handlePrice = (value) => {
    setfilterData({ ...filterData, price: { min: value[0], max: value[1] } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    removeFilterLocal();
    handleRefresh({ ...filterData });
  };

  return (
    <form
      className="bg-white w-full max-w-none md:min-w-[270px] lg:max-w-[424px] rounded-lg p-10 lg:p-12 flex flex-col space-y-6 shadow-md"
      onSubmit={handleSubmit}
    >
      {/* Toggle */}
      <div className="flex items-center justify-evenly w-full">
        <button
          type="button"
          className={`cursor-pointer p-2 px-2.5 rounded-lg border border-light-blue text-light-blue ${
            filterData.expired && "bg-light-blue text-white"
          }`}
          onClick={() => changeExpired(true)}
        >
          upcoming
        </button>
        <button
          type="button"
          className={`cursor-pointer p-2 px-2.5 rounded-lg border border-light-blue text-light-blue ${
            !filterData.expired && "bg-light-blue text-white"
          }`}
          onClick={() => changeExpired(false)}
        >
          past events
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col space-y-4">
        <label className="text-dark-blue font-semibold capitalize">Search</label>
        <div className="flex w-full space-x-0">
          <input
            type="text"
            name="search"
            className="w-full px-3 py-2 border border-gray-300 rounded-l-lg"
            placeholder="keywords"
            value={filterData.search}
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
            value={[filterData.price.min, filterData.price.max]}
            onInput={handlePrice}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <label>Ksh. {Number(filterData.price.min).toLocaleString()}</label>
            <label>Ksh. {Number(filterData.price.max).toLocaleString()}</label>
          </div>
        </div>
      </div>

      {/* Categories */}
      <Categories handleChange={handleChange} category={filterData.category} />

      {/* Date */}
      <div className="flex flex-col space-y-4">
        <label className="text-dark-blue font-semibold capitalize">Date</label>
        <input
          type="date"
          name="validity"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          value={filterData.validity}
          min={filterData.expired ? minDate : ""}
          max={filterData.expired ? "" : minDate}
          onChange={handleChange}
        />
      </div>

      {/* Info */}
      <div className="flex space-x-2 items-start text-light-blue text-sm">
        <FaInfoCircle />
        {filterData.expired ? (
          <p className="text-xs">
            will show events that are valid till the date provided above
          </p>
        ) : (
          <p className="text-xs">
            will show events that expired between now and the date provided
            above
          </p>
        )}
      </div>
    </form>
  );
};

export default Search;
