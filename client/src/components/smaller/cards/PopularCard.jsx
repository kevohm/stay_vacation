import React from "react";
import dot from "../../../assets/svg/dot.svg";
import { Link } from "react-router-dom";

export const PopularCard = ({ name, city, image }) => {
  return (
    <Link
      to={`/events/${name}`}
      className="w-[calc(100%-24px)] sm:w-full flex flex-col items-start space-y-3 transition-transform duration-300 hover:scale-[1.02]"
      style={{ textDecoration: "none" }}
    >
      <div className="w-full h-[280px] md:h-[360px] overflow-hidden rounded-lg shadow-md">
        <img
          src={image?.[0]}
          alt={name}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-base capitalize font-medium text-gray-800">{name}</p>
        <img src={dot} alt="dot" className="w-3 h-3 opacity-70" />
        <p className="text-base capitalize text-gray-600">{city}</p>
      </div>
    </Link>
  );
};
