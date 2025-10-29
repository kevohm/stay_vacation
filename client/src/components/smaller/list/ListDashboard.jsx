import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../../context/AppContext";

export const ListDashboard = ({ text, icon, url, button = false }) => {
  const { defaultData } = useGlobal();

  if (button) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        {text}
      </div>
    );
  }

  return (
    <NavLink
      to={url}
      title={text}
      onClick={() => defaultData()}
      className={({ isActive }) =>
        `flex items-center justify-start w-full sm:justify-start space-x-5 p-2 pl-5 text-xl capitalize transition-colors duration-200 ${
          isActive
            ? "bg-orange text-white"
            : "text-[rgba(0,0,0,0.4)] hover:bg-orange/10"
        }`
      }
      style={{
        borderRadius: "6px",
      }}
    >
      {icon}
      <p className="capitalize block">{text}</p>
    </NavLink>
  );
};
