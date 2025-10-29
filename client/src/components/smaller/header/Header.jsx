import React from 'react'

import header from "../../../assets/svg/header.svg"
export const Header = ({text}) => {
  return (
    <div className="flex flex-col items-center space-y-[30px]">
      <img src={header} alt="header" className="h-7 w-24" />
      <p
        className="text-darkBlue uppercase text-xl"
        style={{
          fontFamily: "poppinsSemi",
        }}
      >
        {text}
      </p>
    </div>
  );
}
