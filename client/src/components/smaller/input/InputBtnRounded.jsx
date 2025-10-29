import React from "react";

export const InputBtnRounded = ({
  text,
  color = "white",
  bg = "rgba(1, 49, 91, 1)",
}) => {
  return (
    <input
      type="submit"
      value={text}
      className="px-[8px] sm:px-[12px] py-[6px] sm:py-[8px] text-sm sm:text-lg rounded-lg border-none cursor-pointer transition duration-200"
      style={{
        background: bg,
        color: color,
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(1, 49, 91, 0.85)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = bg;
      }}
    />
  );
};
