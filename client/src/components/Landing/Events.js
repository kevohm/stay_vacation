import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Header } from "../smaller/header/Header"
import { eventData } from "../utils/landing/events"
import {PrevEvent} from "../smaller/cards/PrevEvent"
import {BtnLinkOutline} from "../smaller/links/BtnLinkOutline"
const Events = () => {
  return (
    <Main>
      <Header text="here are some previous events" />
      <div className="events">
        {eventData.map((item) => (
          <PrevEvent {...item} key={item.img} />
        ))}
      </div>
      <BtnLinkOutline
        text="View More"
        color="#FFA402"
        outline="#FFA402"
        url={"/events"}
      />
    </Main>
  );
}

export default Events

const Main = styled.section`
  ${tw`w-full flex flex-col items-center space-y-16 pt-[30px] px-0 sm:px-12 pb-[150px]`}
  .events {
    ${tw`w-full max-w-[1266px] grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5`}
  }
`;