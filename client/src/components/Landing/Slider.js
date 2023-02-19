import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import front from "../../assets/img/slider.png"
const Slider = () => {
  return (
    <Main>
      <img src={front} alt="front pic" />
      <div>
        <p className="bold">Plan your trip with stay vacations</p>
        <p className="light">Experience the best travel journeys </p>
      </div>
    </Main>
  );
}
export default Slider

const Main = styled.section`
  ${tw`md:h-full h-[50vh] sm:h-[500px] w-full relative `}
  img {
    ${tw`w-full h-full object-cover`}
    filter: brightness(60%)
  }
  div {
    ${tw`text-white absolute w-max flex flex-col items-center space-y-5 md:space-y-10 top-1/2 left-1/2`}
    transform:translate(-50%, -50%);
    .bold {
      font-family: montserrratBold;
      ${tw`text-xl sm:text-4xl md:text-5xl`}
    }
    .light {
      font-family: poppinsMedium;
      ${tw`text-base sm:text-xl md:text-2xl`}
    }
  }
`;