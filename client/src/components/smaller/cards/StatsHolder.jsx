import React from "react";

export const StatsHolder = ({
  text,
  children,
  button = false,
  type,
  changeType,
}) => {
  return (
    <div
      className="w-full bg-white flex flex-col items-start space-y-5 p-5 rounded-lg"
      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
    >
      {button ? (
        <div className="flex justify-between w-full">
          <header
            className="capitalize text-lg text-[rgba(0,0,0,.7)]"
            style={{ fontFamily: "poppinsSemi, sans-serif" }}
          >
            {text}
          </header>
          <select
            onChange={(e) => changeType(e)}
            value={type}
            className="capitalize border-none bg-transparent text-dark-blue px-2 outline-hidden cursor-pointer"
            style={{ fontFamily: "poppinsMedium, sans-serif" }}
          >
            <option value="day" className="capitalize bg-dark-blue text-white">
              day
            </option>
            <option value="week" className="capitalize bg-dark-blue text-white">
              week
            </option>
            <option value="month" className="capitalize bg-dark-blue text-white">
              month
            </option>
          </select>
        </div>
      ) : (
        <header
          className="capitalize text-lg text-[rgba(0,0,0,.7)]"
          style={{ fontFamily: "poppinsSemi, sans-serif" }}
        >
          {text}
        </header>
      )}

      <div
        className="w-full"
        style={{
          fontFamily: "poppinsMedium, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
};
