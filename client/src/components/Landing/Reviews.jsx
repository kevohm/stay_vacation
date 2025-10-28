import React from 'react'
import { HeaderIcon } from '../smaller/header/HeaderIcon'
import { Review } from '../smaller/cards/Review'
import {reviewData} from "../utils/landing/review"
import styled from 'styled-components'
import tw from 'twin.macro'
import { useRef } from 'react'
import { useState } from 'react'
const Reviews = () => {
  return (
    <Main>
      <HeaderIcon text="what users say about us" />
      <div
        className="reviews"
      >
        {reviewData.map((item, index) => (
          <Review num={index + 1} {...item} key={index} />
        ))}
      </div>
    </Main>
  );
}

export default Reviews
const Main = styled.section`
  ${tw`w-full flex flex-col items-center space-y-14 px-0 sm:px-12 pb-36`}
  .reviews {
    overflow: scroll;
    ${tw`flex items-center overflow-y-auto space-x-12 w-full p-3 sm:p-5`}
    ::-webkit-scrollbar {
      width: 1em;
    }
     
    ::-webkit-scrollbar-track {
      background:white;
    }
     
    ::-webkit-scrollbar-thumb {
      background-color: white;
    }
  }
`;