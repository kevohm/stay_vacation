import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

export const Loader = ({ color = "rgba(0, 0, 0, 0.3)" }) => {
  const containerStyle = {
    width: "100%",
    minWidth: "100%",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle = {
    fontSize: "2.25rem", // text-4xl
    color,
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <BiLoaderAlt style={iconStyle} />
    </div>
  );
};
