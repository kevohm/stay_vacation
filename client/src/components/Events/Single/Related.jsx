import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../smaller/load/Loader";
import { useEvent } from "../context/EventContext";
import { FaArrowRight } from "react-icons/fa";
import Event from "./Event";

const Related = () => {
  const { related, getRelated } = useEvent();
  const { name } = useParams();

  useEffect(() => {
    getRelated(name);
  }, [name]);

  if (related.loading) {
    return (
      <div className="w-full flex flex-col space-y-5">
        <p
          className="text-lg text-dark-blue"
          style={{ fontFamily: "montserratMedium" }}
        >
          Related Posts
        </p>
        <Loader color="#8A9AEA" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-5">
      <p
        className="text-lg text-dark-blue"
        style={{ fontFamily: "montserratMedium" }}
      >
        Related Posts
      </p>
      <div
        className="grid items-start justify-items-center gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {related.data.map((item) => (
          <Event key={item.name} {...item} />
        ))}

        <div
          className="w-full flex items-center justify-center rounded-lg bg-white"
          style={{
            height: "250px",
            boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, 0.25)",
          }}
        >
          <div className="flex items-center space-x-2.5 text-lg text-orange">
            <Link to="/events" className="text-orange hover:underline">
              view all
            </Link>
            <FaArrowRight className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Related;
