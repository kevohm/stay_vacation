import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const baseClasses =
    "p-2.5 text-sm rounded-lg transition font-[montserratSemi] whitespace-nowrap";

  const getActiveClasses = ({ isActive }) =>
    isActive
      ? `${baseClasses} bg-[rgba(138,154,234,0.2)] text-dark-blue`
      : `${baseClasses} text-dark-blue/80 hover:text-dark-blue`;

  return (
    <div className="w-full h-max overflow-x-scroll overflow-y-auto">
      <div className="w-full max-w-[280px] md:max-w-none flex flex-row space-x-5 md:space-x-0 md:flex-col md:space-y-5">
        <NavLink to="/info/about" className={getActiveClasses}>
          About
        </NavLink>

        <NavLink to="/info/contact" className={getActiveClasses}>
          Contacts
        </NavLink>

        <NavLink to="/info" className={getActiveClasses}>
          Terms and Conditions
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
