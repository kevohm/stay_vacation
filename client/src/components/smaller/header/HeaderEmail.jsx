import React from "react";
import header from "../../../assets/svg/header-2.svg";

export const HeaderEmail = ({ text }) => {
  return (
    <header className="flex flex-col items-center space-y-[30px]" style={{}}>
      <img src={header} alt="header" className="h-5 w-14" style={{}} />
      <p
        className="text-dark-blue uppercase text-base"
        style={{ fontFamily: "poppinsSemi" }}
      >
        {text}
      </p>
    </header>
  );
};
