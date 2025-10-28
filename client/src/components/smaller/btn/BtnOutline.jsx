import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
export const BtnOutline = ({text, color, hover, outline}) => {
  return (
      <Main outline={outline} color={color} hover={hover}>
          {text}</Main>
  )
}


const Main = styled.button`
  ${tw`capitalize px-[12px] py-[8px] text-lg rounded-[8px] border-none`}
  background: white;
  outline: 1px solid ${(props) => props.outline};
  color: ${(props) => props.color};
  :hover {
    outline: 1px solid ${(props) => props.hover};
    color: ${(props) => props.hover};
  }
`;