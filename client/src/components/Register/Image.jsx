import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import login from "../../assets/svg/login.svg"
const Image = () => {
  return (
      <Main src={login} alt="login">
    </Main>
  )
}

export default Image
const Main = styled.img`
  ${tw`w-full max-w-[22rem] hidden lg:max-w-[30rem] sm:block`}
`;