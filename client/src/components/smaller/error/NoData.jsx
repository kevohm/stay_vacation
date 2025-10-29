import React from "react";

export const NoData = ({ img, text }) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center space-y-10 py-10"
      style={{ fontFamily: "poppinsSemi, sans-serif" }}
    >
      <img src={img} alt="no events" className="w-full max-w-[250px] mx-auto" />
      <p className="w-full max-w-[250px] text-center text-sm text-dark-blue">
        {text}
      </p>
    </div>
  );
};
