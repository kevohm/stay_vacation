import React from 'react'
import { NavLink} from 'react-router-dom'
import styled from 'styled-components'
import tw from "twin.macro"
import { useGlobal } from '../../../context/AppContext'
export const ListDashboard = ({ text, icon, url, button=false}) => {
  const {defaultData} = useGlobal()
  if(button){
   return  <div style={{width:"100%", display:"flex",alignItems:"center",justifyItems:"center",padding:"10px 20px"}}>{text}
    </div>
  }
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
  ${tw`flex items-center justify-start w-full sm:justify-start space-x-5 p-2 pl-5 text-xl text-[rgba(0,0,0,.4)]`}
  p {
    ${tw`capitalize  block`}
  }
  &.active {
    ${tw`bg-orange text-white`}
  }
`;