import React, { useState }  from 'react'
import styled from 'styled-components';
import tw from "twin.macro"
import logo from "../../assets/img/logo.png";
import { BtnLogout } from "../smaller/btn/BtnLogout"
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import {BtnRounded} from "../smaller/btn/BtnRounded"
const Navbar = () => {
  const [open, setOpen] = useState(true)
  const handleChange = () => {
    setOpen(!open)
  }
  return (
      <Main open={open}>
      <img src={logo} alt="logo" />
      <div className="dropdown">
        <div>
          <BtnRounded text="Admin" hover="#fff" color="" bg="#fff" />
          {open ? (
            <FaCaretUp onClick={handleChange} className="icon" />
          ) : (
            <FaCaretDown onClick={handleChange} className="icon" />
          )}
        </div>
        {open ? (
          <></>
        ) : (
            <BtnLogout/>
        )}
      </div>
    </Main>
  );
}

export default Navbar
const Main = styled.div`
  ${tw`w-full h-24 p-5 bg-white flex justify-between items-center`}
  img {
    ${tw`h-full`}
  }
  .dropdown {
    ${tw`absolute right-5 top-5 bg-white p-2 rounded-lg`}
    box-shadow:${(props) =>
      props.open ? "" : "0px 2px 6px 0px rgba(0, 0, 0, .3)"};
    border: ${(props) =>
      props.open
        ? "1px solid  rgba(0, 0, 0, 0)"
        : "1px solid  rgba(0, 0, 0, .1)"};
  }
  .icon {
    ${tw`cursor-pointer`}
  }
`;