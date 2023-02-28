import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useGlobal } from '../../../context/AppContext';
import {env} from "../../../context/appActions"
export const LinkList = ({ data = [], menu = false }) => {
  const {state} = useGlobal()
    if (data.length === 0) {
        return <p>provide data prop</p>
    }
  return (
    <Main menu={menu}>
          {
              data.map(
                  (item) => {
                  const { link, text } = item
                  if (text === "Contacts" && state.user.id) {
                    if (
                      state.user.role === env.ADMIN
                    ) {
                      return (
                        <Link to={"/admin/"} key="admin">
                          <li>Admin</li>
                        </Link>
                      );
                    }
                    return (
                      <Link to={"/profile"} key="profile">
                        <li>Profile</li>
                      </Link>
                    );
                    
                  }
                      return (
                        <Link to={link} key={text}>
                          <li>{text}</li>
                        </Link>
                      );
                  }
              )
          }
    </Main>
  );
}


const Main = styled.ul`
  ${tw`hidden list-none w-full md:w-auto flex flex-col items-start md:items-center space-x-0 space-y-2 md:space-y-0 md:space-x-[25px] text-lg md:flex-row md:flex`}
  display:${(props)=>props.menu ? "flex" : "hidden"};
  a {
    ${tw`w-full pl-5 md:p-0`}
  }
  li {
    ${tw`hover:text-[rgba(1, 49, 91, .8)]`}
  }
`;