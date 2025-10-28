import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobal } from '../../../context/AppContext';

export const Error = ({type}) => {
    const {state} = useGlobal()
  return (
    <Main success={`${state[`${type}_error`].state}`}>
      <p>{state[`${type}_error`].msg}</p>
    </Main>
  );
}
const Main = styled.div`
  ${tw`absolute left-1/2 top-[7%] px-2.5 py-1 bg-red-200 text-red-400 z-50 rounded-lg`}
  transform:translate(-50%, -50%);
  ${(props)=>props.success && tw`text-darkBlue bg-green`}
`;