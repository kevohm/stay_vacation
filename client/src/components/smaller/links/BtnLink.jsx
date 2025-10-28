import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
export const BtnLink = ({
  text = "sign up",
  url = "/register",
  color = "white",
  bg = "rgba(1, 49, 91, 1)",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  return (
      <Main color={color} bg={bg} hover={hover} to={url}>
      {text}
    </Main>
  );
};


const Main = styled(Link)`
  ${tw`px-[12px] py-[8px] text-lg rounded-[8px]`}
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  :hover {
    background: ${(props) => props.hover};
  }
`;
