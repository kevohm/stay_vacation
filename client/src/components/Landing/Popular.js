import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { Header } from '../smaller/header/Header'
import { popularData } from "../utils/landing/popular";
import { PopularCard } from '../smaller/cards/PopularCard';
import { BtnLinkOutline } from '../smaller/links/BtnLinkOutline';
const Popular = () => {
  return (
    <Main>
      <Header text="Popular destinations" />
      <div className="popular-cards">
        {popularData.map((item) => (
          <PopularCard {...item} key={`${item.place}${item.country}`} />
        ))}
      </div>
      <div>
        <BtnLinkOutline
          text="explore"
          color="#FFA402"
          outline="#FFA402"
          url={"/events"}
        />
      </div>
    </Main>
  );
}

export default Popular

const Main = styled.section`
  ${tw`w-full flex flex-col items-center space-y-20 pt-12 px-0 sm:px-12 pb-36`}
  .popular-cards {
    ${tw`w-full grid grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] justify-items-center gap-x-5 gap-y-12`}
  }
`;