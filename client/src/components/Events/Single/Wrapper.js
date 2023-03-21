import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import Single from './Single'
import Related from './Related'
const Wrapper = () => {
  return (
   <Main>
    <Single/>
    <Related/>
   </Main>
  )
}

export default Wrapper

const Main = styled.section`
${tw`flex flex-col space-y-12 items-start`}
`