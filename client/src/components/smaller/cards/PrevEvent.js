import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
export const PrevEvent = ({img}) => {
  return (
      <Main src={img} alt="events"/>
  )
}
const Main = styled.img`
${tw`w-full h-full px-3 sm:p-0`}
`
