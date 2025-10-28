import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import header from "../../../assets/svg/header.svg"
export const Header = ({text}) => {
  return (
    <Main>
          <img src={header}  alt="header"/>
          <p>{text}</p>
    </Main>
  )
}

const Main = styled.div`
${tw`flex flex-col items-center space-y-[30px]`}
img{
  ${tw`h-7 w-24`}
}
p{
    ${tw`text-darkBlue uppercase text-xl`}
    font-family:poppinsSemi;
}
`