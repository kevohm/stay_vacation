import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
export const Review = ({text, author, num}) => {
  return (
    <Main>
      <h1>0{num}</h1>
          <p>{text}</p>
          <p className='author'>--{author}</p>
    </Main>
  )
}
const Main = styled.div`
  ${tw`relative w-full min-w-full sm:max-w-max sm:min-w-[calc(100% - 100px)] md:min-w-[629px] flex flex-col items-center p-5 lg:p-10 pt-10 lg:pt-10 space-y-10 sm:space-y-24 text-lg rounded-lg`}

  box-shadow:0px 2px 6px 0px rgba(138, 154, 234, .25);
  h1 {
    font-family: poppinsBold;
    ${tw`select-none absolute top-0 left-0 h-[140px] md:h-[180px] lg:h-[280px] text-[rgba(255, 181, 50, .15)] flex items-center justify-center text-[150px] md:text-[200px] lg:text-[300px]`}
  }
  p {
    ${tw`w-full max-w-[340px] sm:max-w-max sm:w-[80%] text-darkBlue`}
    text-center
  }
  .author {
    ${tw`w-auto`}
    font-family:poppinsSemi;
  }
`;
