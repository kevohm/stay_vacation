import React from 'react'
import tw from "twin.macro"
import styled from 'styled-components'
export const BtnRounded = ({ text, color = "white", bg = "rgba(1, 49, 91, 1)" }) => {
  return (
    <Button color={color} bg={bg}>
      {text}
    </Button>
  );
};


const Button = styled.button`
  ${tw`px-[12px] py-[8px] text-base sm:text-lg rounded-[8px] border-none`}
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  :hover {
    background: ${(props) => props.hover};
  }
`;