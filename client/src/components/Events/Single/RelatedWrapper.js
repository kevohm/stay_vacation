import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import Related from './Related'
import Comments from './Comments'
import { useEvent } from '../context/EventContext'

export const RelatedWrapper = ({element,comments=false}) => {
  const {currentEvent} = useEvent()
  return (
   <Main>
    {element}
    {(comments && !currentEvent.loading) && <Comments/>}
    <Related/>
   </Main>
  )
}

const Main = styled.section`
${tw`flex flex-col space-y-12 items-start`}
`