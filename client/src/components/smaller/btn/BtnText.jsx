import React from "react";

export const BtnText = ({
  text,
  color = "rgba(1, 49, 91, 1)",
  bg = "white",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  return (
    <button
      className="px-3 py-2 text-lg rounded-lg border-none transition-colors duration-200"
      style={{
        background: bg,
        color,
        fontFamily: "poppins",
      }}
      onMouseEnter={(e) => (e.target.style.color = hover)}
      onMouseLeave={(e) => (e.target.style.color = color)}
    >
      {text}
    </button>
  );
};
