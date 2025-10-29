import React, { useEffect } from "react";
import { Loader } from "../../smaller/load/Loader";
import { Event } from "./Event";
import { useEvent } from "../context/EventContext";

const Recent = () => {
  const { recent, getRecent } = useEvent();

  useEffect(() => {
    getRecent();
  }, []);

  return (
    <div
      className="w-full max-w-none lg:max-w-[424px] flex flex-col space-y-5 rounded-lg bg-white p-6 lg:p-12 pr-5 shadow-custom"
      style={{
        boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, 0.25)",
      }}
    >
      {/* Header */}
      <header
        className="text-lg text-[rgba(1,49,91,1)] font-semibold"
        style={{ fontFamily: "montserratSemi" }}
      >
        Recent Posts
      </header>

      {/* Content */}
      {recent.loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 md:flex md:flex-col md:space-y-5">
          {recent.data.length !== 0 ? (
            recent.data.map((item) => <Event key={item._id} event={item} />)
          ) : (
            <div>No Events Available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recent;
