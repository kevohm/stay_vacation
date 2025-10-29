import React, { useState } from "react";
import { BtnLink } from "../smaller/links/BtnLink";
import { BtnLogout } from "../smaller/btn/BtnLogout";
import logo from "../../assets/img/logo.png";
import { BtnTextLink } from "../smaller/links/BtnTextLink";
import { LinkList } from "../smaller/list/LinkList";
import { data } from "../utils/landing/links";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobal } from "../../context/AppContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { state } = useGlobal();

  const toggleMenu = () => setMenu(!menu);

  return (
    <div
      className={`transition ease-in-out w-full p-5 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 ${
        menu ? "h-auto" : "h-24"
      }`}
    >
      {/* Logo and menu toggle */}
      <div className="flex h-[60px] pb-5 md:pb-0 md:h-full w-full md:w-auto justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className="w-auto md:w-full h-full object-contain"
        />

        {/* Mobile menu toggle */}
        <div
          className={`w-[50px] h-full text-3xl flex items-center justify-center text-darkBlue md:hidden cursor-pointer ${
            menu ? "active" : ""
          }`}
          onClick={toggleMenu}
        >
          {menu ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </div>
      </div>

      {/* Navigation links */}
      <LinkList data={data} menu={menu} />

      {/* Auth buttons */}
      {state.user.id ? (
        <div
          className={`items-center ${
            menu ? "flex" : "hidden"
          } md:flex transition-all`}
        >
          <BtnLogout />
        </div>
      ) : (
        <div
          className={`items-center space-x-10 ${
            menu ? "flex" : "hidden"
          } md:flex transition-all`}
        >
          <BtnTextLink />
          <BtnLink />
        </div>
      )}
    </div>
  );
};

export default Navbar;
