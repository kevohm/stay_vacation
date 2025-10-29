import React from "react";

export const Term = ({ title, info }) => {
  return (
    <div className="text-[rgba(0,0,0,.7)] text-sm flex flex-col space-y-2.5">
      <header className="font-[poppinsSemi]">{title}</header>
      <ul className="pl-5">
        {info.map((i, index) => (
          <li key={index} className="w-full">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};
