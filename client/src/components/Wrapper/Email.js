import React from 'react'
import styled from 'styled-components'
import {HeaderEmail} from "../smaller/header/HeaderEmail"
import tw from "twin.macro"
export const Email = () => {
  return (
    <Main>
      <HeaderEmail text="subscribe for updates" />
      <div className="input">
        <input
          type="text"
          placeholder="email@gmail.com"
          className="input-text"
        />
        <input type="submit" value="SEND" className="submit" />
      </div>
    </Main>
  );
}
const Main = styled.div`
  ${tw`bg-white absolute top-0 left-1/2 py-8 space-y-9 w-full max-w-[300px] sm:max-w-[450px] md:max-w-[650px] border-darkBlue border border-solid rounded-lg flex flex-col items-center z-50`}
  transform:translate(-50%, -50%);
  .input {
    ${tw`mx-auto`}
    .input-text {
      ${tw`p-2 pl-2 sm:pl-4 pr-0 sm:pr-10 rounded-l-lg text-[rgba(1, 49, 91, .7)]`}
      font-family:poppinsMedium;
      border: 1px solid rgba(1, 49, 91, 0.3);
      border-right: 1px solid #ffa402;
      ::placeholder {
        ${tw`text-[rgba(1, 49, 91, .3)]`}
      }
    }
    .submit {
      font-family: poppinsSemi;
      ${tw`p-2 px-4 cursor-pointer bg-orange text-white rounded-r-lg border border-solid border-orange`}
    }
  }
`;
