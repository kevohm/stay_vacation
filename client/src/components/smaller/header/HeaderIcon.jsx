import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import header from "../../../assets/svg/header.svg";
import blob from "../../../assets/svg/blob.svg"
export const HeaderIcon = ({ text }) => {
  return (
    <Main>
        <img src={header} alt="header" />
        <p>{text}</p>

    </Main>
  );
};

const Main = styled.div`
  ${tw`relative w-96 h-96 bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-start pt-20 space-y-[30px]`}
  background-image: url(${blob});
  img {
    ${tw`h-7 w-24`}
  }
  p {
    ${tw`text-darkBlue uppercase text-xl`}
    font-family:poppinsSemi;
  }
`;
