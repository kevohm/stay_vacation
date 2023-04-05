import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import Related from './Related'
export const RelatedWrapper = ({element}) => {
  return (
   <Main>
    {element}
    <Related/>
   </Main>
  )
}

const Main = styled.section`
${tw`flex flex-col space-y-12 items-start`}
`