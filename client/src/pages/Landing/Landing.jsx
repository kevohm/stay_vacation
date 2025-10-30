import React from 'react'
import {EventContext} from "../../components/Events/context/EventContext"
import {Slider, Services, Popular, Faq, Reviews, Events} from "../../components/Landing/index"
const Landing = () => {
  return (
      <section className="flex flex-col items-center h-auto">
        <Slider />
        <Services />
        <Popular />
        <Faq />
        <Reviews />
        <Events />
      </section>
  );
}

export default Landing