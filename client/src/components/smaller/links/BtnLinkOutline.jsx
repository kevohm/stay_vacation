import React from "react";
import { Link } from "react-router-dom";

export const BtnLinkOutline = ({
  outline = "rgba(1, 49, 91, 1)",
  color = "rgba(1, 49, 91, 1)",
  hover = "rgba(1, 49, 91, .8)",
  text = "button",
  url = "/",
}) => {
  const baseStyle = {
    padding: "8px 12px",
    fontSize: "1.125rem",
    borderRadius: "8px",
    textTransform: "capitalize",
    textDecoration: "none",
    background: "white",
    outline: `1px solid ${outline}`,
    color: color,
    transition: "0.2s ease",
  };

  return (
    <Link
      to={url}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.target.style.outline = `1px solid ${hover}`;
        e.target.style.color = hover;
      }}
      onMouseLeave={(e) => {
        e.target.style.outline = `1px solid ${outline}`;
        e.target.style.color = color;
      }}
    >
      {text}
    </Link>
  );
};
