import React from "react";

export const BtnOutline = ({ text, color, hover, outline }) => {
  return (
    <button
      className="capitalize px-3 py-2 text-lg rounded-lg border-none transition-colors duration-200"
      style={{
        background: "white",
        outline: `1px solid ${outline}`,
        color: color,
      }}
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
    </button>
  );
};
