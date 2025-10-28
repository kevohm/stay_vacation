import React, { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Header } from "../smaller/header/Header"
import { eventData } from "../utils/landing/events"
import {PrevEvent} from "../smaller/cards/PrevEvent"
import {BtnLinkOutline} from "../smaller/links/BtnLinkOutline"
import { useGlobal } from '../../context/AppContext'
import load from "../../assets/img/loader.gif"

const Events = () => {
  const {getPosters,state} = useGlobal()
  useEffect(
    ()=>{
      getPosters()
    },[]
  )
  if(state.posters.loading){
    return <Main>
    <Header text="here are some previous events" />
    <div className="loading">
          <img src={load} alt="loading"/>
    </div>
    <BtnLinkOutline
      text="View More"
      color="#FFA402"
      outline="#FFA402"
      url={"/events"}
    />
  </Main>
  }
  return (
    state.posters.data.length === 0 || <Main>
      <Header text="here are some previous events" />
      <div className="events">
        {state.posters.data.map((item) => (
          <PrevEvent {...item} key={item.event.name} />
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
  .loading{
    ${tw`w-full h-[500px] flex items-center justify-center`}
    >img{
      ${tw`w-[180px]`}
    }
  }
`;