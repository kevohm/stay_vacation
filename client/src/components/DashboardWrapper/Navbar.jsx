import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import { BtnLogout } from "../smaller/btn/BtnLogout";
import { FaCaretUp, FaCaretDown, FaBars, FaSignOutAlt } from "react-icons/fa";
import { BtnRounded } from "../smaller/btn/BtnRounded";
import { ListDashboard } from "../smaller/list/ListDashboard";
import { sidebarData } from "../utils/DashboardWrapper/sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <div className="relative w-full h-24">
      {/* Top bar */}
      <div className="h-full w-full p-5 bg-white flex justify-between items-center">
        <img src={logo} alt="logo" className="h-full" />

        {/* Dropdown */}
        <div
          className="hidden sm:block absolute right-5 top-5 bg-white p-2 rounded-lg z-40"
          style={{
            boxShadow: open ? "none" : "0px 2px 6px 0px rgba(0, 0, 0, 0.3)",
            border: open
              ? "1px solid rgba(0, 0, 0, 0)"
              : "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center gap-2">
            <BtnRounded text="Admin" hover="#fff" color="" bg="#fff" />
            {open ? (
              <FaCaretUp onClick={handleChange} className="cursor-pointer" />
            ) : (
              <FaCaretDown onClick={handleChange} className="cursor-pointer" />
            )}
          </div>

          {!open && (
            <div className="mt-2">
              <BtnLogout />
            </div>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="flex items-center sm:hidden">
          <FaBars
            className="cursor-pointer text-lg"
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menu && (
        <div className="absolute w-full flex sm:hidden flex-col items-start space-y-5 py-5 bg-white z-40">
          {sidebarData.map((item) => {
            const { text } = item;
            return <ListDashboard key={text} {...item} />;
          })}
          <ListDashboard
            button={true}
            icon={<FaSignOutAlt />}
            url={"#"}
            text={<BtnLogout />}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
