import React from "react";
import { useGlobal } from "../../../context/AppContext";
import { Error } from "../error/Error";

export const TableHolder = ({
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

  return (
    <div className="relative bg-white flex flex-col items-start space-y-5 p-5 rounded-lg">
      {/* Update Overlay */}
      {state[`${typeDataB}_startUpdate`].start && (
        <div className="flex items-start sm:items-center justify-center absolute left-0 top-0 bg-black/20 w-full h-full z-20 rounded-lg">
          {update}
        </div>
      )}

      {/* Select Filters */}
      <div className="w-full flex justify-between">
        <header className="capitalize text-lg text-black/70 font-poppinsSemi">
          {text}
        </header>

        <div className="flex items-center space-x-2">
          <select
            onChange={changeArrange}
            value={arrange}
            className="capitalize bg-transparent border-none text-sm text-darkBlue px-2 font-poppinsMedium"
          >
            <option
              value="desc"
              className="capitalize text-sm text-white bg-darkBlue"
            >
              desc
            </option>
            <option
              value="asc"
              className="capitalize text-sm text-white bg-darkBlue"
            >
              asc
            </option>
          </select>

          <select
            onChange={changeSort}
            value={sort}
            className="capitalize bg-transparent border-none text-sm text-darkBlue px-2 font-poppinsMedium"
          >
            {data.map((i) => (
              <option
                key={i}
                value={i}
                className="capitalize text-white text-sm bg-darkBlue"
              >
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart / Table Container */}
      <div className="w-full">{children}</div>
    </div>
  );
};
