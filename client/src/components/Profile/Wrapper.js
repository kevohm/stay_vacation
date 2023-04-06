import React from 'react'
import EventsTable from './EventsTable'
import Recent from './Recent'
import UserDetails from './UserDetails'
import styled from "styled-components"
import tw from "twin.macro"
import Search from './Search'

const Wrapper = () => {
  return (
    <Main>
        <div>
        <UserDetails/>
        <EventsTable/>
        </div>
        <div>
            <Search/>
            <Recent/>
        </div>
    </Main>
  )
}

export default Wrapper


const Main = styled.section`
${tw`w-full grid grid-cols-[3fr, 7fr]`}
`