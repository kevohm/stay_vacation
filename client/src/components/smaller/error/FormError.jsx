import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const FormError = ({state,msg,show}) => {
  if(!show)return
  return (
    <Main success={state}>
          {msg} 
    </Main>
  )
}
const Main = styled.div`
  ${tw`px-2 py-1 bg-red-100 text-red-600 z-50 rounded-lg`}
  ${(props) => (props.success === "success") && tw`text-[#16a34a] bg-[#dcfce7]`}
`;