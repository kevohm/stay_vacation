import React from 'react'
import EventsTable from './EventsTable'
import Recent from './Recent'
import UserDetails from './UserDetails'
import styled from "styled-components"
import tw from "twin.macro"
import Search from './Search'
import { useGlobal } from '../../context/AppContext'
import {Navigate} from "react-router-dom"

const Wrapper = () => {
  const {state} = useGlobal()
  if(!state.user.id || !state.user.role){
    return <Navigate to="/events"/>
  }
  return (
    <Main>
        <Search/>
        <UserDetails/>
        <EventsTable/>
        <Recent/>
    </Main>
  )
}

export default Wrapper


const Main = styled.section`
${tw`w-full flex flex-col space-y-5 md:space-y-0 md:grid md:justify-items-start md:grid-cols-[55%, 45%] md:grid-rows-[7rem, 11rem ,1fr] md:gap-5`}
  >div{
    ${tw`bg-white rounded-lg w-full`}
    box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
    .header{
      font-family:montserratSemi;
      ${tw`text-base  capitalize text-darkBlue pb-2.5`}
    }
}
`