import React, { useState } from "react";
import {BtnLink} from "../smaller/links/BtnLink"
import { Main } from "./css/Navbar"
import logo from "../../assets/img/logo.png"
import {BtnTextLink} from "../smaller/links/BtnTextLink";
import {LinkList} from "../smaller/list/LinkList";
import { data } from "../utils/links"
import {FaBars, FaTimes} from "react-icons/fa"
const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const changeMenu = () => {
    setMenu(!menu)
  }
  return (
    <Main menu={menu}>
      <div className="image">
        <img src={logo} alt="logo" />
        <div className={`dropdown ${menu ? "active" : ""}`} onClick={changeMenu}>
          {menu ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <LinkList data={data} menu={menu} />
      <div className="register">
        <BtnTextLink />
        <BtnLink />
      </div>
    </Main>
  );
};

export default Navbar;
