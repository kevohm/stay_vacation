import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
export const BtnText = ({
  text,
  color = "rgba(1, 49, 91, 1)",
  bg = "white",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  return (
    <Button color={color} bg={bg} hover={hover}>
      {text}
    </Button>
  );
};


const Button = styled.button`
  ${tw`px-[12px] py-[8px] text-lg rounded-[8px] border-none`}
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  :hover {
    color: ${(props) => props.hover};
  }
`;