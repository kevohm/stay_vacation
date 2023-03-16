import React from 'react'
import { NavLink} from 'react-router-dom'
import styled from 'styled-components'
import tw from "twin.macro"
import { useGlobal } from '../../../context/AppContext'
export const ListDashSmall = ({ text, icon, url}) => {
  const {defaultData} = useGlobal()
  return (
    <Main
      to={url}
      title={text}
      onClick={()=>defaultData()}
    >
      {icon}
      <p>{text}</p>
    </Main>
  );
}


const Main = styled(NavLink)`
  ${tw`flex items-center justify-center w-max sm:w-full sm:justify-start space-x-5 p-2 sm:pl-5 sm:py-2 rounded-lg sm:text-lg text-3xl text-[rgba(0,0,0,.4)]`}
  p {
    ${tw`capitalize hidden sm:block`}
  }
  &.active {
    ${tw`bg-orange text-white`}
  }
`;