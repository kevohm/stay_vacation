import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Loader } from "../../smaller/load/Loader";
import { BsCheck2Circle } from "react-icons/bs";
import { FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import err from "../../../assets/svg/error.svg";
import dot from "../../../assets/svg/dot.svg";
import Likes from "./Likes";
import { useQuery } from "@tanstack/react-query";
import { useGlobal } from "../../../context/AppContext";




const Single = ({data, isError}) => {
  const { name } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);


  const isExpired =
    data && new Date(data.validity) - new Date() - 24 * 60 * 60 * 1000 < 0;

  const nextImage = () => {
    if (!data?.image) return;
    setCurrentIndex((prev) => (prev + 1) % data.image.length);
  };

  const prevImage = () => {
    if (!data?.image) return;
    setCurrentIndex(
      (prev) => (prev - 1 + data.image.length) % data.image.length
    );
  };



  // Error or Not Found
  if (isError || !data)
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-lg py-12 shadow-sm space-y-6">
        <img src={err} alt="error" className="w-full max-w-[320px]" />
        <p className="text-gray-700 text-lg font-medium">
          Oops! {isError ? "An error occurred." : "Event not found."}
        </p>
      </div>
    );

  return (
    <div
      className="w-full bg-white rounded-2xl flex flex-col items-center p-4 md:p-6 space-y-6 shadow-md"
      style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, 0.1)" }}
    >
      {/* Image Carousel */}
      <div className="relative w-full h-[260px] md:h-[400px] overflow-hidden rounded-xl group shadow-sm">
        <img
          src={data.image[currentIndex]}
          alt={`${data.name}-${currentIndex}`}
          className="w-full h-full object-cover transition-transform duration-500 rounded-xl"
        />

        {/* Left/Right Arrows */}
        {data.image.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
            >
              <FaChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
            >
              <FaChevronRight size={18} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {data.image.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {data.image.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  currentIndex === index ? "bg-[#ea580c]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className="w-full flex flex-col space-y-6 text-dark-blue">
        {/* Title & Description */}
        <div>
          <h2
            className="text-2xl font-semibold capitalize mb-1"
            style={{ fontFamily: "montserratSemi" }}
          >
            {data.name}, {data.city}
          </h2>
          <p
            className="text-gray-600 text-sm leading-relaxed"
            style={{ fontFamily: "montserratMedium" }}
          >
            {data.description}
          </p>
        </div>

        {/* Price Section */}
        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ fontFamily: "montserratSemi" }}
          >
            Price
          </h3>
          <ul className="space-y-2">
            {data.price_choices.map((item, i) => (
              <li key={i} className="flex items-center space-x-2">
                <img src={dot} alt="dot" className="w-3 h-3" />
                <p
                  className="text-sm"
                  style={{ fontFamily: "montserratMedium" }}
                >
                  Ksh. {item.price.toLocaleString("en-US")} per {item.category}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities */}
        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ fontFamily: "montserratSemi" }}
          >
            Amenities
          </h3>
          <ul className="space-y-2 pl-1">
            {data.Amenities.map((item, i) => (
              <li key={i} className="flex items-center space-x-3">
                <BsCheck2Circle className="text-[#ea580c]" />
                <p
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "montserratMedium" }}
                >
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Category */}
        <div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ fontFamily: "montserratSemi" }}
          >
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.category.map((cat, i) => (
              <span
                key={i}
                className="border border-dark-blue text-dark-blue rounded-full px-3 py-1 text-xs font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Likes */}
        <Likes eventId={data._id} />

        {/* Expiry */}
        <div>
          <h3
            className="text-lg font-semibold mb-1"
            style={{ fontFamily: "montserratSemi" }}
          >
            Expires At
          </h3>
          <p
            className="text-sm text-gray-700"
            style={{ fontFamily: "montserratMedium" }}
          >
            {moment(data.validity).format("dddd, MMMM DD YYYY")}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-2 text-light-blue text-sm">
            <FaInfoCircle className="text-light-blue" />
            <p className="max-w-md">
              You can only book an event 24hrs before it expires.{" "}
              <Link
                to="/info/contact"
                className="underline hover:text-[#ea580c] transition"
              >
                Contact Us
              </Link>
            </p>
          </div>

          {!isExpired && (
            <Link
              to={`/events/${name}/book`}
              className="bg-[#ea580c] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#d94f08] transition"
              style={{ fontFamily: "montserratMedium" }}
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
