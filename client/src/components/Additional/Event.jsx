import React from "react";
import { Link } from "react-router-dom";

const Event = ({ name, image, city, description, category, _id }) => {
  return (
    <div className="w-full flex flex-col items-start space-y-2.5">
      {/* Event Image */}
      <img
        src={image[0]}
        alt={name}
        className="w-full h-[250px] object-cover rounded-t-lg"
      />

      {/* Details Section */}
      <div className="flex flex-col items-start space-y-2.5">
        <header className="flex items-start">
          <p className="text-sm text-[rgba(1,49,91,1)] capitalize font-medium">
            {name}
          </p>
          <p className="text-sm text-[rgba(1,49,91,1)]">{`, ${city}`}</p>
        </header>

        <div className="flex flex-col w-full items-start space-y-2 justify-center">
          <p className="w-full text-sm text-[rgba(1,49,91,0.8)]">
            {description.length > 200
              ? `${description.slice(0, 200)}...`
              : description}
          </p>

          <div className="flex flex-wrap">
            {category.map((i, index) => (
              <button
                key={index}
                className="px-2 py-1 rounded-lg mr-2 border border-solid bg-white border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.5)] text-xs"
              >
                {i.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="w-full p-2.5 px-0 flex justify-center items-center">
        <Link
          to={`/admin/additional/${_id}`}
          className="px-2 py-1 text-xs bg-green-400 cursor-pointer text-[rgba(1,49,91,1)] border-none rounded-sm font-poppins hover:bg-green-300 transition"
        >
          Add posters
        </Link>
      </div>
    </div>
  );
};

export default Event;
