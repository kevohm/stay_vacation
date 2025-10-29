import React, { useEffect } from "react";
import { useEvent } from "../context/EventContext";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Loader } from "../../smaller/load/Loader";
import { BsCheck2Circle } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import err from "../../../assets/svg/error.svg";
import dot from "../../../assets/svg/dot.svg";
import Likes from "./Likes";

const Single = () => {
  const { currentEvent, getSingle } = useEvent();
  const { name } = useParams();

  useEffect(() => {
    getSingle(name);
  }, [name]);

  if (currentEvent.loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg py-12 space-y-10">
        <Loader color="#8A9AEA" />
      </div>
    );
  }

  if (!currentEvent.id) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-white rounded-lg py-12 space-y-10">
        <img src={err} alt="error" className="w-full max-w-[400px]" />
        <p className="text-gray-700 text-lg font-medium">
          Opps! Event does not exist.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white rounded-lg p-2.5 flex flex-col items-center md:items-start space-y-5 md:grid md:grid-cols-[48%_52%] md:gap-2.5"
      style={{
        boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, 0.25)",
      }}
    >
      {/* Images */}
      <div
        className="w-full max-w-[620px] grid gap-2.5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {currentEvent.data.image.map((item, index) => {
          const key = `${currentEvent.data.name}-${index}`;
          return (
            <img
              key={key}
              src={item}
              alt={key}
              className="w-full h-[150px] md:h-[200px] rounded-lg object-cover"
            />
          );
        })}
      </div>

      {/* Info Section */}
      <div className="w-full max-w-[720px] pl-5 pr-6 flex flex-col space-y-10">
        {/* Title & Description */}
        <div className="flex flex-col space-y-2">
          <header
            className="flex items-center text-lg text-dark-blue"
            style={{ fontFamily: "montserratSemi" }}
          >
            <p className="text-lg capitalize text-dark-blue">
              {currentEvent.data.name}
            </p>
            <p className="text-lg capitalize text-dark-blue">{`, ${currentEvent.data.city}`}</p>
          </header>
          <p className="text-sm" style={{ fontFamily: "montserratMedium" }}>
            {currentEvent.data.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex flex-col space-y-2">
          <header
            className="text-lg text-dark-blue"
            style={{ fontFamily: "montserratSemi" }}
          >
            Price
          </header>
          <div className="flex items-start pl-1">
            <ul className="list-none space-y-1">
              {currentEvent.data.price_choices.map((item, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <img src={dot} alt={index} className="w-3 h-3" />
                  <p
                    className="text-sm"
                    style={{ fontFamily: "montserratMedium" }}
                  >
                    ksh. {item.price.toLocaleString("en-US")} per{" "}
                    {item.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col space-y-2">
          <header
            className="text-lg text-dark-blue"
            style={{ fontFamily: "montserratSemi" }}
          >
            Amenities
          </header>
          {currentEvent.data.Amenities.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 pl-1">
              <BsCheck2Circle className="text-orange text-sm" />
              <p className="text-sm" style={{ fontFamily: "montserratMedium" }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <header
            className="text-lg text-dark-blue"
            style={{ fontFamily: "montserratSemi" }}
          >
            Category
          </header>
          <div
            className="w-full grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            }}
          >
            {currentEvent.data.category.map((item, index) => (
              <div
                key={index}
                className="w-max rounded-xl border border-dark-blue text-dark-blue p-2 px-2.5 text-sm"
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Likes */}
        <Likes eventId={currentEvent.data._id} />

        {/* Expiry */}
        <div className="flex flex-col space-y-2">
          <header
            className="text-lg text-dark-blue"
            style={{ fontFamily: "montserratSemi" }}
          >
            Expires at
          </header>
          <p className="text-sm" style={{ fontFamily: "montserratMedium" }}>
            {moment(currentEvent.data.validity).format("dddd, MMMM DD YYYY")}
          </p>
        </div>

        {/* Submit Section */}
        <div className="py-10 flex flex-col md:flex-row items-start justify-between space-y-5 md:space-y-0">
          <div className="flex flex-row items-center space-x-2 text-light-blue text-sm">
            <FaInfoCircle className="text-light-blue text-sm w-max" />
            <p className="w-full">
              You can only book an event 24hrs before it expires{" "}
              <Link to="/info/contact" className="text-light-blue underline">
                contact Us
              </Link>
            </p>
          </div>

          {!currentEvent.isExpired && (
            <div className="flex items-center justify-end w-full">
              <Link
                to={`/events/${name}/book`}
                className="p-2.5 py-2 rounded-lg bg-green text-sm text-dark-blue border-none"
                style={{ fontFamily: "montserratMedium" }}
              >
                Book now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
