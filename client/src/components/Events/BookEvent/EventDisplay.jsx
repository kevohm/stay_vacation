import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../smaller/load/Loader";
import nodata from "../../../assets/svg/nodata.svg";
import dot from "../../../assets/svg/dot.svg";
import { FaInfoCircle } from "react-icons/fa";
import { useEvent } from "../context/EventContext";
import { NoData } from "../../smaller/error/NoData";

const EventDisplay = () => {
  const { getSingleById, book_event, book_event_id } = useEvent();
  useEffect(() => {
    getSingleById(book_event_id);
  }, [book_event_id]);

  if (book_event.loading) {
    return (
      <div
        className="bg-white w-full rounded-lg flex flex-col items-start space-y-2.5"
        style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)" }}
      >
        <Loader />
      </div>
    );
  }
  if (!book_event.data) {
    return (
      <div
        className="bg-white w-full rounded-lg flex flex-col items-start space-y-2.5"
        style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)" }}
      >
        <NoData img={nodata} text="Event not found" />
      </div>
    );
  }
  return (
    <div
      className="bg-white w-full rounded-lg flex flex-col items-start space-y-2.5"
      style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)" }}
    >
      <div className="w-full h-[250px] md:h-[350px]">
        <img
          src={book_event.data.image[0]}
          alt="event"
          className="w-full h-[250px] md:h-full object-cover rounded-t-lg"
          style={{ objectPosition: "center" }}
        />
      </div>
      <div className="w-full flex flex-col space-y-2.5 h-full px-5">
        <div className="md:px-0 py-2.5">
          <header
            className="text-dark-blue text-base mb-2.5 flex items-center w-full justify-start"
            style={{ fontFamily: "montserratSemi" }}
          >
            <p
              className="text-dark-blue text-base capitalize w-auto"
              style={{ fontFamily: "montserratSemi" }}
            >
              {book_event.data.name}
            </p>
            <p
              className="text-dark-blue text-base capitalize w-auto"
              style={{ fontFamily: "montserratSemi" }}
            >
              {`, ${book_event.data.city}`}
            </p>
          </header>
          <p
            className="w-full text-sm"
            style={{ fontFamily: "montserratMedium" }}
          >
            {book_event.data.description}
          </p>
        </div>
        <div className="md:px-0 py-2.5">
          <header
            className="text-dark-blue text-base mb-2.5 flex items-center w-full justify-start"
            style={{ fontFamily: "montserratSemi" }}
          >
            Price
          </header>
          <ul className="flex flex-col">
            {book_event.data.price_choices.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <img src={dot} alt={index} />
                <p
                  className="text-sm"
                  style={{ fontFamily: "montserratMedium" }}
                >
                  ksh. {item.price.toLocaleString("en-US")} per {item.category}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-0 flex flex-row items-center space-x-2 md:px-0 py-2.5">
          <FaInfoCircle className="text-light-blue text-xs w-max" />
          <p className="w-full text-light-blue text-xs">
            For more information, contact us at{" "}
            <span
              className="text-dark-blue text-xs"
              style={{ fontFamily: "montserratSemi" }}
            >
              +254704591173
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;
