import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StatsCard = ({ icon, title, color, data }) => {
  const text = data[title]
  return (
      <Main>
          <div className="stats" style={{background:color}}>{icon}</div>
          <div className='title'>
              <h5>{text}</h5>
              <p>{title}</p>
          </div>
    </Main>
  )
}

const Main = styled.div`
  ${tw`w-full bg-white p-5 flex items-center justify-start space-x-5 rounded-lg`}
  .stats {
    ${tw`p-2 px-3 text-xl flex items-center justify-center rounded-lg text-white`}
  }
  .title {
    ${tw`flex flex-col items-start`}
    p {
      ${tw`text-sm text-[rgba(0,0,0,.5)]`}
      font-family:poppinsMedium;
    }
    h5 {
      ${tw`text-lg`}
      font-family:montserratSemi;
    }
  }
`;
