import React from 'react'
import {EventContext} from "../../components/Events/context/EventContext"
import {Slider, Services, Popular, Faq, Reviews, Events} from "../../components/Landing/index"
const Landing = () => {
  return (
    <EventContext>
      <section className="flex flex-col items-center h-full">
        <Slider />
        <Services />
        <Popular />
        <Faq />
        <Reviews />
        <Events />
      </section>
    </EventContext>
  );
}

export default Landing