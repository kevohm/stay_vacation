import React from 'react'
import styled from 'styled-components'
import header from "../../../assets/svg/header-2.svg"
import tw from "twin.macro"
export const HeaderEmail = ({text}) => {
  return (
      <Main>
          <img src={header} alt="header" />
          <p>{text}</p>
    </Main>
  )
}
const Main = styled.header`
  ${tw`flex flex-col items-center space-y-[30px]`}
  img {
    ${tw`h-5 w-14`}
  }
  p {
    ${tw`text-darkBlue uppercase text-base`}
    font-family:poppinsSemi;
  }
`;
