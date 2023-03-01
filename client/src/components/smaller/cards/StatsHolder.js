import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StatsHolder = ({ text, children, button=false, type, changeType }) => {
  return (
    <Main>
      {button ? (
        <div className="select">
          <header>{text}</header>
          <select onChange={(e) => changeType(e)} value={type}>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
          </select>
        </div>
      ) : (
        <header>{text}</header>
      )}

      <div className="graph">{children}</div>
    </Main>
  );
};
const Main = styled.div`
  ${tw`w-full h-max bg-white flex flex-col items-start space-y-5 p-5 rounded-lg `}
  header {
    ${tw`capitalize text-lg text-[rgba(0,0,0,.7)]`}
    font-family:poppinsSemi;
  }
  .select{
    ${tw`flex justify-between w-full`}
    select{
      font-family:poppinsMedium;
      ${tw`capitalize border-none bg-none text-darkBlue px-2`}
      option{
        ${tw`capitalize text-white bg-darkBlue`}
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
`;
