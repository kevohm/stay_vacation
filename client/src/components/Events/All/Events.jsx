import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import SingleEvent from "./SingleEvent";
import { Loader } from "../../smaller/load/Loader";
import { useEvent } from "../context/EventContext";
import noevents from "../../../assets/svg/noevents.svg";
import "./events.css"; // 👈 for small custom CSS parts

const Events = ({ loading, eventsData, page, changePage, handleCategory }) => {
  const { sortBy, events } = useEvent();
  const section = useRef();
  const [filter, setFilter] = useState(sortBy);
  const [currentPage, setCurrentPage] = useState(page);
  const [grid, setGrid] = useState(false);

  const changeGrid = (grid) => setGrid(grid);

  const handlePages = (val) => {
    const pages = Number(events.pages);
    const num = Number(val);
    if (num <= pages && num > 0) {
      section.current.scrollIntoView({ behavior: "smooth" });
      changePage(num);
    }
    if (!isNaN(num) || num === "") setCurrentPage(val);
  };

  const handleDir = (dir) => {
    section.current.scrollIntoView({ behavior: "smooth" });
    const current = Number(events.currentPage);
    const max = Number(events.pages);
    if (1 !== max) {
      if (dir === "next") {
        if (current === max) {
          changePage(1);
          setCurrentPage(1);
        } else {
          changePage(current + 1);
          setCurrentPage(current + 1);
        }
      } else if (dir === "prev") {
        if (current === 1) {
          changePage(max);
          setCurrentPage(max);
        } else {
          changePage(current - 1);
          setCurrentPage(current - 1);
        }
      }
    }
  };

  const mapper = {
    "createdAt desc": "newest",
    "createdAt asc": "oldest",
    "name desc": "name",
  };

  const changeCategory = (val) => {
    const mapper = {
      newest: "createdAt desc",
      oldest: "createdAt asc",
      name: "name desc",
    };
    const sortData = mapper[val].split(" ");
    const data = { ...sortBy, sort: sortData[0], arrange: sortData[1] };
    setFilter(data);
    handleCategory(sortData[0], sortData[1]);
  };

  return (
    <div
      ref={section}
      className="w-full max-w-[896px] flex flex-col space-y-5 rounded-lg col-span-2 row-span-3"
    >
      {/* 🔹 Sort & View Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2.5">
          <label
            className="text-[#01315B] hidden sm:block"
            style={{ fontFamily: "montserratSemi" }}
          >
            Sort By
          </label>
          <select
            value={mapper[`${filter.sort} ${filter.arrange}`]}
            onChange={(e) => changeCategory(e.target.value)}
            className="bg-white capitalize text-sm text-[#8A9AEA] rounded-lg p-2.5 border-none"
            style={{ fontFamily: "montserratSemi" }}
          >
            <option disabled value="">
              Category
            </option>
            {filter.data.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Grid/List toggle */}
        <div className="flex items-center space-x-2.5">
          <header
            className="text-[#01315B] hidden sm:block"
            style={{ fontFamily: "montserratSemi" }}
          >
            View
          </header>
          <div
            onClick={() => changeGrid(true)}
            className={`h-10 w-10 p-1 flex items-center justify-center rounded-lg cursor-pointer ${
              grid ? "bg-[#8A9AEA] text-white" : "bg-white text-[#8A9AEA]"
            }`}
          >
            <BsFillGrid3X3GapFill className="text-xl" />
          </div>
          <div
            onClick={() => changeGrid(false)}
            className={`h-10 w-10 p-1 flex items-center justify-center rounded-lg cursor-pointer ${
              !grid ? "bg-[#8A9AEA] text-white" : "bg-white text-[#8A9AEA]"
            }`}
          >
            <FaList className="text-xl" />
          </div>
        </div>
      </div>

      {/* 🔹 Events Section */}
      <div
        className={`${
          grid
            ? "grid grid-cols-1 sm:justify-items-center sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5"
            : "flex flex-col space-y-5"
        }`}
      >
        {loading ? (
          <Loader color="#8A9AEA" />
        ) : eventsData.length === 0 ? (
          <div
            className="flex flex-col justify-center items-center space-y-10 py-10"
            style={{ fontFamily: "poppinsSemi" }}
          >
            <img
              src={noevents}
              alt="no events"
              className="w-full max-w-[250px] mx-auto"
            />
            <p className="text-sm text-[#01315B]">
              No Events Yet. Try changing the filters.
            </p>
          </div>
        ) : (
          eventsData.map((item) => (
            <SingleEvent key={item.name} grid={grid} event={item} />
          ))
        )}
      </div>

      {/* 🔹 Pagination */}
      {events.pages > 0 && (
        <div
          className="bg-white flex space-x-5 items-center p-5 rounded-lg shadow-md"
          style={{
            boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)",
          }}
        >
          <div
            className="icon-holder text-lg p-1 flex items-center justify-center rounded-lg border border-solid border-[rgba(0,0,0,.2)] hover:border-[rgba(0,0,0,.4)] cursor-pointer"
            title="previous"
            onClick={() => handleDir("prev")}
          >
            <FaAngleLeft className="text-[rgba(0,0,0,.7)]" />
          </div>

          <div className="flex items-center w-full justify-center space-x-4">
            <input
              type="text"
              value={currentPage}
              onChange={(e) => handlePages(e.target.value)}
              className="appearance-none p-2 w-[30px] h-[30px] rounded-lg border border-solid border-[rgba(0,0,0,.2)] focus:border-[rgba(0,0,0,.4)] text-center"
            />
            <p>of {events.pages}</p>
          </div>

          <div
            className="icon-holder text-lg p-1 flex items-center justify-center rounded-lg border border-solid border-[rgba(0,0,0,.2)] hover:border-[rgba(0,0,0,.4)] cursor-pointer"
            title="next"
            onClick={() => handleDir("next")}
          >
            <FaAngleRight className="text-[rgba(0,0,0,.7)]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
