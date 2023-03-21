import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import error  from "../../assets/svg/error.svg"
import {Link} from "react-router-dom"
const Error = () => {
  return (
    <Main>
      <img src={error} alt="error"/>
      <p>Opps! page does not exist <Link to="/">Go Home</Link></p>
    </Main>
  )
}

export default Error
const Main = styled.section`
${tw`w-full min-h-screen flex flex-col items-center justify-start pt-12 space-y-10`}
img{
  ${tw`w-full max-w-[600px]`}
}
a{
  font-family:PoppinsSemi;
  ${tw`text-darkBlue hover:underline`}
}
`