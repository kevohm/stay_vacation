import React from "react";
import { Link } from "react-router-dom";

export const Event = ({ event }) => {
  return (
    <Link
      to={`/events/${event.name}`}
      className="w-full h-auto md:h-[100px] flex flex-col space-y-2 md:space-y-0 md:flex-row items-start text-black"
    >
      {/* Image section */}
      <div className="flex items-center justify-center h-full w-full max-w-none md:max-w-[100px]">
        <img
          src={event.image[0]}
          alt="event"
          className="object-cover w-full max-w-none md:max-w-[100px] h-full max-h-[200px] rounded-lg"
        />
      </div>

      {/* Text section */}
      <div className="w-full flex flex-col space-y-2.5 p-2.5 pt-0 text-sm">
        <header
          className="text-sm capitalize"
          style={{ fontFamily: "montserratSemi" }}
        >
          {event.name}
        </header>
        <p className="w-full text-sm" style={{ fontFamily: "montserrat" }}>
          {event.description.length <= 70
            ? event.description
            : `${event.description.slice(0, 70)}...`}
        </p>
      </div>
    </Link>
  );
};
