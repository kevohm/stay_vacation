import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {StatsHolder} from "../cards/StatsHolder"

export const ManageData = ({element, img, title}) => {
  return (
    <StatsHolder text={title}>
      <Main>
        {element}
        <img src={img} alt="users"/>
      </Main>
    </StatsHolder>
  )
}


const Main = styled.section`
  ${tw`w-full flex items-center`}
  img { 
    ${tw`w-full hidden sm:block max-w-[180px] md:max-w-[250px] lg:max-w-xs ml-auto mr-0 lg:mr-24`}
  }
`;
