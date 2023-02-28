import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const FormError = ({err}) => {
  return (
    <Main success={err.state}>
          {err.msg} 
    </Main>
  )
}
const Main = styled.div`
  ${tw`px-2.5 py-1 text-red-400 z-50 rounded-lg`}
  ${(props) => (props.success === "success") && tw`text-green`}
`;