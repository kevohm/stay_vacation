import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../../context/AppContext";

export const ListDashSmall = ({ text, icon, url }) => {
  const { defaultData } = useGlobal();

  return (
    <NavLink
      to={url}
      title={text}
      onClick={() => defaultData()}
      className={({ isActive }) =>
        `flex items-center justify-center w-max sm:w-full sm:justify-start space-x-5 p-2 sm:pl-5 sm:py-2 rounded-lg sm:text-lg text-3xl transition-colors duration-200 ${
          isActive
            ? "bg-orange text-white"
            : "text-[rgba(0,0,0,0.4)] hover:bg-orange/10"
        }`
      }
    >
      {icon}
      <p className="capitalize hidden sm:block">{text}</p>
    </NavLink>
  );
};
