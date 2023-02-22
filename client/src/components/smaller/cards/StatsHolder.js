import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StatsHolder = ({text, children}) => {
  return (
    <Main>
          <header>{text}</header>
      <div className='graph'>
          {children}
          </div>
    </Main>
  )
}
const Main = styled.div`
  ${tw`h-max bg-white flex flex-col items-start space-y-5 p-5 rounded-lg `}
  header {
    ${tw`capitalize text-lg text-[rgba(0,0,0,.7)]`}
    font-family:poppinsSemi;
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
