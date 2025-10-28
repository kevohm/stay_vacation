import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import {Link} from "react-router-dom"
export const BtnLinkOutline = ({outline, color, hover, text, url}) => {
  return (
    <Main outline={outline} color={color} hover={hover} to={url}>
      {text}
    </Main>
  );
}
const Main = styled(Link)`
  ${tw`capitalize px-[12px] py-[8px] text-lg rounded-[8px] border-none`}
  background: white;
  outline: 1px solid ${(props) => props.outline};
  color: ${(props) => props.color};
  :hover {
    outline: 1px solid ${(props) => props.hover};
    color: ${(props) => props.hover};
  }
`;