import React from "react";
import { Link } from "react-router-dom";

const Event = ({ name, city, description, image }) => {
  return (
    <div
      className="w-full h-min rounded-lg bg-white"
      style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)" }}
    >
      <Link className="w-full relative block" to={`/events/${name}`}>
        <img
          src={image[0]}
          alt="event"
          className="w-full rounded-t-lg h-[200px] object-cover"
        />
      </Link>

      <div className="p-2.5 flex flex-col space-y-2.5">
        <header
          className="flex items-center justify-start text-sm text-[#01315B]"
          style={{ fontFamily: "montserratSemi" }}
        >
          <p
            className="w-auto text-sm capitalize text-[#01315B]"
            style={{ fontFamily: "montserratSemi" }}
          >
            {name}
          </p>
          <p
            className="w-auto text-sm capitalize text-[#01315B]"
            style={{ fontFamily: "montserratSemi" }}
          >
            , {city}
          </p>
        </header>

        <p
          className="text-sm w-full text-black"
          style={{ fontFamily: "montserratMedium" }}
        >
          {description.length < 220
            ? description
            : `${description.slice(0, 220)}...`}
        </p>
      </div>
    </div>
  );
};

export default Event;
