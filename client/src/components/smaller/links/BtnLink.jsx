import React from "react";
import { Link } from "react-router-dom";

export const BtnLink = ({
  text = "sign up",
  url = "/register",
  color = "white",
  bg = "rgba(1, 49, 91, 1)",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  const baseStyle = {
    padding: "8px 12px",
    fontSize: "1.125rem",
    borderRadius: "8px",
    background: bg,
    color: color,
    textDecoration: "none",
    transition: "0.2s ease",
  };

  return (
    <Link
      to={url}
      style={baseStyle}
      onMouseEnter={(e) => (e.target.style.background = hover)}
      onMouseLeave={(e) => (e.target.style.background = bg)}
    >
      {text}
    </Link>
  );
};
