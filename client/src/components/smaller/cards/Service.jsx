import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
export const Service = ({img, title, text, color, bg}) => {
  return (
    <Main color={color} bg={bg}>
      <div>{img}</div>
      <p className="title">{title}</p>
      <p className="text">{text}</p>
    </Main>
  );
}


const Main = styled.div`
  ${tw`w-full max-w-[233px] flex flex-col space-y-[12px] items-center`}
  div {
    ${tw`w-24 h-24 rounded-[100%] flex items-center justify-center text-4xl`}
    background:${(props) => props.bg};
    color: ${(props) => props.color};
  }
  p {
    ${tw`text-darkBlue`}
  }
  .title {
    font-family: poppinsSemi;
  }
  .text {
    ${tw`text-center text-base`}
  }
`;