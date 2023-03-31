import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobal } from "../../../context/AppContext";
import {Error} from "../error/Error"
export const TableHolder = ({ typeDataB, update, text, type, children, sort="createdAt", changeArrange, changeSort, data, arrange="desc" }) => {
  const {state} = useGlobal()
  return ( 
    <Main>
      {state[`${type}_error`].status && <Error type={type} />}
      {state[`${typeDataB}_startUpdate`].start && (
        <div className="update">
          {update}
        </div>
      )}
      <div className="select">
        <header>{text}</header>
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
  }
  .graph {
    ${tw`w-full`}
    .apexcharts-yaxis-label tspan, .apexcharts-xaxis-label tspan {
      ${tw`text-xs`}
      fill:rgba(0,0,0,.5);
    }
    .apexcharts-tooltip {
      background: #fff;
      color: rgba(0, 0, 0, 0.5);
    }
    .apexcharts-bar-area:hover,
    .apexcharts-bar-area:active {
      fill: rgba(255, 164, 2, 0.9);
    }
  }
  >.update{
    ${tw`flex items-start sm:items-center justify-center absolute left-0 top-0 bg-[rgba(0,0,0,.2)] w-full h-full z-20 rounded-lg`}
  }
`;

