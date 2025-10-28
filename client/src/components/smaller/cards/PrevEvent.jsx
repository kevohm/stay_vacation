import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import tw from "twin.macro"
export const PrevEvent = ({image,event}) => {
  return (
    <Main to={`/events/${event.name}`}>
      <img src={image} alt={event.name}/>
    </Main>
  )
}
const Main = styled(Link)`
${tw`w-full h-full px-3 sm:p-0`}
img{
  ${tw`w-full h-full`}
}
`
