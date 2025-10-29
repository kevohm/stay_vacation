import React from "react";

export const Service = ({ img, title, text, color, bg }) => {
  return (
    <div className="w-full max-w-[233px] flex flex-col space-y-3 items-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
        style={{ background: bg, color }}
      >
        {img}
      </div>

      <p className="text-dark-blue font-poppinsSemi">{title}</p>

      <p className="text-dark-blue text-center text-base">{text}</p>
    </div>
  );
};
