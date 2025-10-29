import React from "react";

export const Review = ({ text, author, num }) => {
  return (
    <div
      className="relative w-full min-w-full sm:max-w-max sm:min-w-[calc(100%-100px)] md:min-w-[629px] flex flex-col items-center p-5 lg:p-10 pt-10 space-y-10 sm:space-y-24 text-lg rounded-lg"
      style={{
        boxShadow: "0px 2px 6px 0px rgba(138, 154, 234, 0.25)",
      }}
    >
      <h1
        className="select-none absolute top-0 left-0 flex items-center justify-center text-[150px] md:text-[200px] lg:text-[300px] h-[140px] md:h-[180px] lg:h-[280px]"
        style={{
          fontFamily: "poppinsBold",
          color: "rgba(255, 181, 50, 0.15)",
        }}
      >
        0{num}
      </h1>

      <p
        className="w-full max-w-[340px] sm:max-w-max sm:w-[80%] text-center text-darkBlue"
        style={{
          fontFamily: "poppins",
        }}
      >
        {text}
      </p>

      <p
        className="w-auto text-darkBlue"
        style={{
          fontFamily: "poppinsSemi",
        }}
      >
        --{author}
      </p>
    </div>
  );
};
