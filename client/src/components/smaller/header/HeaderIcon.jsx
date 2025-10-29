import React from "react";
import header from "../../../assets/svg/header.svg";
import blob from "../../../assets/svg/blob.svg";

export const HeaderIcon = ({ text }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "24rem",
        height: "24rem",
        backgroundImage: `url(${blob})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "5rem",
        gap: "30px",
      }}
    >
      <img
        src={header}
        alt="header"
        style={{
          height: "1.75rem",
          width: "6rem",
        }}
      />
      <p
        style={{
          textTransform: "uppercase",
          fontSize: "1.25rem",
          color: "#0C0C1D",
          fontFamily: "poppinsSemi",
        }}
      >
        {text}
      </p>
    </div>
  );
};
