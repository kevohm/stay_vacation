import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../Events/context/EventContext";

const Search = () => {
  const { storeFilter } = useEvent();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    storeFilter(search, moment(new Date()).format("YYYY-MM-DD"), 0, 300000, "");
    navigate("/events");
  };

  return (
    <div className="h-full bg-white rounded-lg w-full order-1 md:order-2 p-5 flex flex-col shadow-sm">
      <div className="bg-white w-full ">
        <header
          className="text-base capitalize text-dark-blue pb-2.5"
          style={{ fontFamily: "montserratSemi" }}
        >
          Search For Tours
        </header>

        <form onSubmit={handleSubmit} className="w-full flex items-center">
          <input
            type="text"
            placeholder="keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-[300px] px-2.5 py-2 text-[rgba(1,49,91,0.7)] text-sm border border-[rgba(1,49,91,0.3)] border-r-0 rounded-l-lg"
            style={{ fontFamily: "poppinsMedium" }}
          />
          <input
            type="submit"
            value="Search"
            className="w-24 max-w-[80px] px-2.5 py-2 text-white text-sm rounded-none rounded-r-lg bg-orange border border-orange cursor-pointer"
            style={{ fontFamily: "poppinsSemi" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
