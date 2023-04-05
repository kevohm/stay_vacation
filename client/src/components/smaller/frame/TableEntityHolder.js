import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobal } from "../../../context/AppContext";
import { FaTimes } from "react-icons/fa";
import {Error} from "../error/Error"
export const TableEntityHolder = ({ changeOpen, typeDataB, update, text, type, children, sort="createdAt", changeArrange, changeSort, data, arrange="desc" }) => {
  const {state} = useGlobal()
  return ( 
    <Main>
      {state[`${typeDataB}_startUpdate`].start && (
        <div className="update">
          {update}
        </div>
      )}
      <div className="select">
        <div className="close-popup">
        <div onClick={changeOpen}>
            <FaTimes title="close popup"/>
        </div>
        <header>{text}</header>
        </div>
            
        <div>
          <select onChange={(e) => changeArrange(e)} value={arrange}>
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
          <select onChange={(e) => changeSort(e)} value={sort}>
            {data.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="graph">{children}</div>
    </Main>
  );
};
const Main = styled.div`
  ${tw`relative h-max bg-white flex flex-col items-start space-y-5 p-5 rounded-lg `}
  
  header {
    ${tw`capitalize text-lg text-[rgba(0,0,0,.7)]`}
    font-family:poppinsSemi;
  }
  .select {
    ${tw`flex justify-between w-full`}
    > div {
      ${tw``}
      select {
        font-family: poppinsMedium;
        ${tw`capitalize border-none bg-none text-sm text-darkBlue px-2`}
        option {
          ${tw`capitalize text-white text-sm bg-darkBlue`}
        }
      }
    }
    .close-popup{
        ${tw`flex items-center space-x-5`}
    }
  }
  .graph {
    ${tw`w-full`}
  }
  .update{
    ${tw`flex items-start sm:items-center justify-center absolute left-0 top-0 bg-[rgba(0,0,0,.2)] w-full h-full z-20 rounded-lg`}
  }
`;
