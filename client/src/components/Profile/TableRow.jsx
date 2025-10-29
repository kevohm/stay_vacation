import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEvent } from "../Events/context/EventContext";
import { BiLoaderAlt } from "react-icons/bi";

const TableRow = ({
  index,
  user,
  event,
  amount,
  category,
  state,
  createdAt,
  _id,
}) => {
  const [currentState, setCurrentState] = useState(state);
  const { checkPayment } = useEvent();
  const [loading, setLoading] = useState(false);

  const fetchUpdate = () => {
    setLoading(true);
    if (state === "Pending") {
      checkPayment(_id)
        .then((res) => {
          const { status } = res.data;
          setCurrentState(status ? "Paid" : state);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchUpdate, 30000);
    return () => clearInterval(interval);
  }, [currentState]);

  return (
    <tr
      className={`border-b border-[rgba(0,0,0,0.05)] ${
        index % 2 !== 0 ? "bg-[rgba(0,0,0,0.02)]" : ""
      }`}
    >
      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">0{index + 1}</td>

      <td className="p-5 text-start">
        <img
          src={event.image[0]}
          alt="event"
          className="h-12 w-20 object-cover rounded-lg"
        />
      </td>

      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">{event.name}</td>
      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">{event.city}</td>
      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">{event.country}</td>
      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">
        ksh. {amount.toLocaleString()}
      </td>
      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">{category}</td>

      {/* Status */}
      <td className="p-5 text-start">
        <div className="flex items-center justify-end pt-8 pb-0">
          <button
            className={`w-[80px] h-[30px] rounded-full border bg-white flex items-center justify-center text-sm ${
              currentState === "Pending"
                ? "border-orange text-orange"
                : currentState === "Paid"
                ? "border-green text-green"
                : "border-red-400 text-red-400"
            }`}
          >
            {loading ? (
              <BiLoaderAlt className="animate-spin mx-auto" />
            ) : (
              currentState
            )}
          </button>
        </div>
      </td>

      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">
        {moment(event.validity).format("ddd, MMM DD YYYY")}
      </td>

      <td className="p-5 text-start text-[rgba(0,0,0,.4)]">
        {moment(createdAt).format("ddd, MMM DD YYYY")}
      </td>

      <td className="p-5 text-start">
        <div className="flex items-center justify-end pt-8 pb-0">
          <Link
            to={`/events/${event.name}`}
            className="bg-orange text-white px-2 py-1 rounded-lg text-sm"
          >
            view
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
