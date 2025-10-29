import React from "react";
import { Link } from "react-router-dom";

export const PrevEvent = ({ image, event }) => {
  return (
    <Link className="w-full h-full px-3 sm:p-0" to={`/events/${event.name}`}>
      <img className="w-full h-full" src={image} alt={event.name} />
    </Link>
  );
};
