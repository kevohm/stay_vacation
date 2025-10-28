import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Form, Image} from "../../components/Register/index"
const Register = () => {
  return (
    <Main>
      <Form />
      <Image/>
    </Main>
  )
}

export default Register
const Main = styled.main`
  ${tw`min-h-screen w-full flex items-center justify-center sm:justify-start lg:justify-center space-x-12 md:space-x-20 lg:space-x-40 px-12 bg-[rgba(138, 154, 234, .25)]`}
`;