import React from "react";
import { Link } from "react-router-dom";

const SingleEvent = ({ grid, event }) => {
  const cardShadow = "0px 2px 6px 0px rgba(1, 49, 91, 0.25)";

  const description = grid
    ? event.description.length <= 100
      ? event.description
      : `${event.description.slice(0, 100)}...`
    : event.description.length <= 200
    ? event.description
    : `${event.description.slice(0, 200)}...`;

  return (
    <Link
      to={`${event.name}`}
      className={`w-full rounded-lg bg-white flex ${
        grid
          ? "flex-col max-w-none md:max-w-[415px]"
          : "h-[150px] sm:h-[200px] items-start space-x-2 md:space-x-5"
      }`}
      style={{ boxShadow: cardShadow }}
    >
      <Link
        to={`${event.name}`}
        className={`w-full h-full flex ${grid ? "" : "max-w-[300px]"}`}
      >
        <img
          src={event.image[0]}
          alt={event.name}
          className={`w-full h-full object-cover ${
            grid
              ? "max-h-[274px] rounded-t-lg"
              : "min-w-[150px] max-w-[300px] max-h-[200px] rounded-lg"
          }`}
        />
      </Link>

      <div
        className={`font-[montserratMedium] flex flex-col space-y-2.5 text-sm ${
          grid ? "w-full p-5" : "w-[560px] p-2 pl-0 md:p-0 md:pt-5"
        }`}
      >
        <div className="w-full flex items-center justify-between pr-5">
          <header className="capitalize text-darkBlue font-[montserratSemi]">
            {event.name}
          </header>
          <Link
            to={`${event.name}`}
            className="hidden md:block border border-orange text-orange p-1 rounded-lg"
          >
            Details
          </Link>
        </div>

        <p>{description}</p>
      </div>
    </Link>
  );
};

export default SingleEvent;
