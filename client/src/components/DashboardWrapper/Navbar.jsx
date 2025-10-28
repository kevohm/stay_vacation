import React, { useState }  from 'react'
import styled from 'styled-components';
import tw from "twin.macro"
import logo from "../../assets/img/logo.png";
import { BtnLogout } from "../smaller/btn/BtnLogout"
import { FaCaretUp, FaCaretDown, FaBars, FaSignOutAlt } from "react-icons/fa";
import {BtnRounded} from "../smaller/btn/BtnRounded"
import { ListDashboard } from '../smaller/list/ListDashboard';
import { sidebarData } from '../utils/DashboardWrapper/sidebar';
const Navbar = () => {
  const [open, setOpen] = useState(true)
  const [menu, setMenu] = useState(false)
  const handleChange = () => {
    setOpen(!open)
  }
  return (
      <Main open={open}>
        <div className='constant'>
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
      <div className='menu' onClick={()=>setMenu(!menu)}>
        <FaBars className='icon'/>
      </div>
        </div>
      {menu && <div className='hover'>
      {sidebarData.map((item) => {
        const { text } = item;
        return <ListDashboard key={text} {...item}/>
      })}
      <ListDashboard button={true} icon={<FaSignOutAlt/>} url={"#"} text={<BtnLogout/>}/>
      </div>}
    </Main>
  );
}

export default Navbar
const Main = styled.div`
  ${tw`relative w-full h-24`}
  .constant{
    ${tw`h-full w-full p-5 bg-white flex justify-between items-center`}
  }
  img {
    ${tw`h-full`}
  }
  .dropdown {
    ${tw`hidden sm:block absolute right-5 top-5 bg-white p-2 rounded-lg z-40`}
    box-shadow:${(props) =>
      props.open ? "" : "0px 2px 6px 0px rgba(0, 0, 0, .3)"};
    border: ${(props) =>
      props.open
        ? "1px solid  rgba(0, 0, 0, 0)"
        : "1px solid  rgba(0, 0, 0, .1)"};
  }
  .menu{
    ${tw`flex items-center sm:hidden`}
    .icon{
      ${tw`cursor-pointer text-lg`}
    }
  }
  .icon {
    ${tw`cursor-pointer`}
  }
  .hover{
    ${tw`absolute w-full flex sm:hidden flex-col items-start space-y-5  py-5 bg-white z-40`}
  }
`;