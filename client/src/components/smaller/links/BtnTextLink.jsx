import React from "react";
import { Link } from "react-router-dom";

export const BtnTextLink = ({
  text = "login",
  url = "/register/login",
  color = "rgba(1, 49, 91, 1)",
  bg = "white",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  const baseStyle = {
    padding: "8px 12px",
    fontSize: "1.125rem", // text-lg
    borderRadius: "8px",
    background: bg,
    color: color,
    textDecoration: "none",
    transition: "color 0.2s ease-in-out",
  };

  return (
    <Link
      to={url}
      style={baseStyle}
      onMouseEnter={(e) => (e.target.style.color = hover)}
      onMouseLeave={(e) => (e.target.style.color = color)}
    >
      {text}
    </Link>
  );
};
