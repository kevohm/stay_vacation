import React, { useState } from "react";
import { BtnLink } from "../smaller/links/BtnLink"
import { BtnLogout } from "../smaller/btn/BtnLogout";
import { Main } from "./css/Navbar"
import logo from "../../assets/img/logo.png"
import {BtnTextLink} from "../smaller/links/BtnTextLink";
import {LinkList} from "../smaller/list/LinkList";
import { data } from "../utils/landing/links"
import { FaBars, FaTimes } from "react-icons/fa"
import { useGlobal } from "../../context/AppContext";
import { useEffect } from "react";
const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const {state} = useGlobal()
  const changeMenu = () => {
    setMenu(!menu)
  }
  return (
    <Main menu={menu}>
      <div className="image">
        <img src={logo} alt="logo" />
        <div
          className={`dropdown ${menu ? "active" : ""}`}
          onClick={changeMenu}
        >
          {menu ? <FaTimes className="times"/> : <FaBars className="bars"/>}
        </div>
      </div>
      <LinkList data={data} menu={menu} />
      {state.user.id ? (
        <div className="logged-in">
          <BtnLogout/>
        </div>
      ) : (
        <div className="register">
          <BtnTextLink />
          <BtnLink />
        </div>
      )}
    </Main>
  );
};

export default Navbar;
