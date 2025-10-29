import React from "react";
import Users from "./Users";
import Bookings from "./Bookings";
const Graph = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5">
      <Users />
      <Bookings />
    </div>
  );
};

export default Graph;

