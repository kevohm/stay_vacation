import React from 'react'
import { Main } from "./css/Landing"
import {EventContext} from "../../components/Events/context/EventContext"
import {Slider, Services, Popular, Faq, Reviews, Events} from "../../components/Landing/index"
const Landing = () => {
  return (
    <EventContext>
    <Main>
      <Slider />
      <Services />
      <Popular />
      <Faq />
      <Reviews />
      <Events/>
    </Main>
    </EventContext>
  )
}

export default Landing