import React from "react";
import { useGlobal } from "../../../context/AppContext";
import { FaTimes } from "react-icons/fa";

export const TableEntityHolder = ({
  changeOpen,
  typeDataB,
  update,
  text,
  type,
  children,
  sort = "createdAt",
  changeArrange,
  changeSort,
  data,
  arrange = "desc",
}) => {
  const { state } = useGlobal();
  const isUpdating = state[`${typeDataB}_startUpdate`]?.start;

  return (
    <div className="relative bg-white flex flex-col items-start space-y-5 p-5 rounded-lg shadow-xs">
      {/* Loading/Updating Overlay */}
      {isUpdating && (
        <div className="flex items-start sm:items-center justify-center absolute left-0 top-0 bg-[rgba(0,0,0,0.2)] w-full h-full z-20 rounded-lg">
          {update}
        </div>
      )}

      {/* Top Section */}
      <div className="flex justify-between w-full">
        {/* Close + Title */}
        <div className="flex items-center space-x-5">
          <div
            onClick={changeOpen}
            className="cursor-pointer text-black/60 hover:text-black"
          >
            <FaTimes title="close popup" />
          </div>
          <header className="capitalize text-lg text-[rgba(0,0,0,.7)] font-semibold">
            {text}
          </header>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center space-x-2">
          <select
            onChange={(e) => changeArrange(e)}
            value={arrange}
            className="capitalize text-sm text-dark-blue bg-transparent border rounded-sm px-2 py-1 focus:outline-hidden"
          >
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>

          <select
            onChange={(e) => changeSort(e)}
            value={sort}
            className="capitalize text-sm text-dark-blue bg-transparent border rounded-sm px-2 py-1 focus:outline-hidden"
          >
            {data.map((i) => (
              <option key={i} value={i} className="capitalize text-black">
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full">{children}</div>
    </div>
  );
};
