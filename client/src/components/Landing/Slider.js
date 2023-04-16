import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import { sliderData } from '../utils/landing/slider'

const Slider = () => {
  const [index,setIndex] = useState(0)
  const [next,setNext] = useState(index + 1)
  const slideImage = ()=>{
    const total = sliderData.length - 1
    const prevIndex = index === total ? 0 : index + 1
    setIndex(prevIndex) 
}
  useEffect(()=>{
    const time = setTimeout(slideImage,7000)
    return ()=>clearTimeout(time)
  },[index])
  return (
    <Main>
      <div className='image'>
        <div className='images' >
          <div className='single '><img src={sliderData[index]} alt="front pic" /></div>
        </div>
      </div>
      <div  className='details'>
        <p className="bold">Plan your trip with stay vacations</p>
        <p className="light">Experience the best travel journeys </p>
      </div>
    </Main>
  );
}
export default Slider

const Main = styled.section`
  ${tw`md:h-[704px] h-[50vh] sm:h-[500px] w-full relative `}
  .image{
    ${tw`md:h-[704px] h-[50vh] sm:h-[500px]`}
    .images{
      ${tw`h-full flex items-center justify-start whitespace-nowrap`}
      .single{
        ${tw`ease-in-out duration-700 transition-all min-w-full h-full`}
        img {
          ${tw`w-full h-full  object-cover `}
          filter: brightness(40%)
        }
      }
    }
  }
  .details{
    ${tw`z-10 text-white absolute w-max flex flex-col items-center space-y-5 md:space-y-10 top-1/2 left-1/2`}
    transform:translate(-50%, -50%);
    .bold {
      font-family: montserratBold;
      ${tw`text-xl sm:text-4xl md:text-5xl`}
    }
    .light {
      font-family: poppinsMedium;
      ${tw`text-base sm:text-xl md:text-2xl`}
    }
  }

`;