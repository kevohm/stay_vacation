import React from "react";

export const BtnRounded = ({
  text,
  color = "white",
  bg = "rgba(1, 49, 91, 1)",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  return (
    <button
      className="px-3 py-2 text-base sm:text-lg rounded-lg border-none transition-colors duration-200"
      style={{
        background: bg,
        color: color,
      }}
      onMouseEnter={(e) => (e.target.style.background = hover)}
      onMouseLeave={(e) => (e.target.style.background = bg)}
    >
      {text}
    </button>
  );
};
