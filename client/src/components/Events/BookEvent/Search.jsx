import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEvent } from "../context/EventContext";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Categories from "../All/Categories";
import { minDate, currentDate } from "../context/utils";

const Search = () => {
  const { filter, removeFilterLocal, storeFilter } = useEvent();
  const [filterData, setFilterData] = useState(filter);
  const navigate = useNavigate();

  const changeExpired = (val) => {
    setFilterData({
      ...filterData,
      expired: val,
      validity: val ? minDate : currentDate,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handlePrice = (value) => {
    setFilterData({
      ...filterData,
      price: { min: value[0], max: value[1] },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeFilter(
      filterData.search,
      filterData.validity,
      filterData.price.min,
      filterData.price.max,
      filterData.category,
      filterData.expired
    );
    navigate("/events");
  };

  useEffect(() => {
    removeFilterLocal();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-10 lg:p-12 flex flex-col space-y-6 w-full min-h-152"
    >
      {/* Classification */}
      <div className="flex items-center justify-evenly w-full">
        <button
          type="button"
          onClick={() => changeExpired(true)}
          className={`cursor-pointer p-2 px-3 rounded-lg border border-light-blue ${
            filterData.expired ? "bg-light-blue text-white" : "text-light-blue"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() => changeExpired(false)}
          className={`cursor-pointer p-2 px-3 rounded-lg border border-light-blue ${
            !filterData.expired ? "bg-light-blue text-white" : "text-light-blue"
          }`}
        >
          Past Events
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col space-y-3">
        <label className="text-dark-blue font-semibold">Search</label>
        <div className="flex space-x-0 w-full">
          <input
            type="text"
            name="search"
            placeholder="keywords"
            value={filterData.search}
            onChange={handleChange}
            className="w-full px-3 py-2 text-dark-blue border border-light-blue/40 rounded-l-lg focus:outline-orange"
          />
          <input
            type="submit"
            value="Apply"
            className="cursor-pointer px-3 py-[10px] bg-orange text-white rounded-r-lg"
          />
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-3">
        <label className="text-dark-blue font-semibold">Price</label>
        <div className="flex flex-col space-y-2">
          <RangeSlider
            className="slider bg-light-blue/30 h-[2px]"
            min={0}
            max={900000}
            step={5000}
            value={[filterData.price.min, filterData.price.max]}
            onInput={handlePrice}
          />
          <div className="flex justify-between text-sm text-dark-blue/70">
            <span>Ksh. {Number(filterData.price.min).toLocaleString()}</span>
            <span>Ksh. {Number(filterData.price.max).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <Categories handleChange={handleChange} category={filterData.category} />

      {/* Date */}
      <div className="flex flex-col space-y-3">
        <label className="text-dark-blue font-semibold">Date</label>
        <div className="w-full">
          <input
            type="date"
            name="validity"
            min={filterData.expired ? minDate : ""}
            max={filterData.expired ? "" : minDate}
            value={filterData.validity}
            onChange={handleChange}
            className="w-full px-3 py-2 text-dark-blue border border-light-blue/40 rounded-lg focus:outline-orange"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start space-x-2 text-light-blue text-sm">
        <FaInfoCircle />
        <p className="text-xs">
          {filterData.expired
            ? "Will show events that are valid till the selected date"
            : "Will show events that expired between now and the selected date"}
        </p>
      </div>
    </form>
  );
};

export default Search;
