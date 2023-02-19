import React from 'react'
import tw from "twin.macro"
import styled from 'styled-components'
export const InputBtnRounded = ({ text, color = "white", bg = "rgba(1, 49, 91, 1)"}) => {
  return <Input type="submit" value={text} color={color} bg={bg} />;
};


const Input = styled.input`
  ${tw`px-[8px] sm:px-[12px] py-[6px] sm:py-[8px] text-sm sm:text-lg rounded-lg border-none`}
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  :hover {
    background: ${(props) => props.hover};
  }
`;