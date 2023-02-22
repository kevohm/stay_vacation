import React from 'react'
import { HeaderIcon } from '../smaller/header/HeaderIcon'
import { Review } from '../smaller/cards/Review'
import {reviewData} from "../utils/landing/review"
import styled from 'styled-components'
import tw from 'twin.macro'
import { useRef } from 'react'
import { useState } from 'react'
const Reviews = () => {
  const reviews = useRef()
  const [drag, setDrag] = useState(false);
  const [prev, setPrev] = useState({ prev: 0, scroll: 0 });
  const startDrag = (e) => {
    setDrag(true)
    setPrev({
      prev: e.pageX,
      scroll: reviews.current.scrollLeft
    })
  }
  const stopDrag = () => {
    setDrag(false);
  }
  const handleSlide = (e) => {
    e.preventDefault()
    if (!drag) return
    let diff = e.pageX - prev.prev
    reviews.current.scrollLeft = prev.scroll - diff;
  }
  return (
    <Main>
      <HeaderIcon text="what users say about us" />
      <div
        className="reviews"
        ref={reviews}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={(e) => handleSlide(e)}
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
    overflow: hidden;
    ${tw`flex items-center space-x-12 w-full p-3 sm:p-5`}
  }
`;