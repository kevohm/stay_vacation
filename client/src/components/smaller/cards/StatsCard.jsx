import React from "react";

export const StatsCard = ({ icon, title, color, data }) => {
  const text = data[title];

  return (
    <div
      className="w-full bg-white p-5 flex items-center justify-start space-x-5 rounded-lg"
      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
    >
      <div
        className="p-2 px-3 text-xl flex items-center justify-center rounded-lg text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <p
          className="text-base"
          style={{ fontFamily: "poppinsSemi, sans-serif" }}
        >
          {text}
        </p>
        <p
          className="text-sm text-[rgba(0,0,0,.5)]"
          style={{ fontFamily: "poppinsMedium, sans-serif" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};
