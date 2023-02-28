import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import { BiLoaderAlt } from "react-icons/bi";

export const Loader = () => {
  return (
    <Load>
      <BiLoaderAlt className="loading" />
    </Load>
  );
}
const Load = styled.div`
  ${tw`min-w-full w-full h-[150px]  flex items-center justify-center`}
  .loading {
    ${tw`animate-spin text-4xl text-[rgba(0, 0, 0, 0.3)]`}
  }
`;
