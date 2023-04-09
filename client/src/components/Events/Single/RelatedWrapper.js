import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import Related from './Related'
import Comments from './Comments'

export const RelatedWrapper = ({element,comments=false}) => {
  return (
   <Main>
    {element}
    {comments && <Comments/>}
    <Related/>
   </Main>
  )
}

const Main = styled.section`
${tw`flex flex-col space-y-12 items-start`}
`