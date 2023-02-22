import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import Users from "./Users"
import Bookings from './Bookings'
const Graph = () => {
  return (
    <Main>
          <Users />
          <Bookings/>
    </Main>
  )
}

export default Graph

const Main = styled.div`
${tw`w-full grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5`}
`