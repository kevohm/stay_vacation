import React from 'react'
import { Main } from "./css/Landing"
import {Slider, Services, Popular, Faq, Reviews, Events} from "../../components/Landing/index"
const Landing = () => {
  return (
    <Main>
      <Slider />
      <Services />
      <Popular />
      <Faq />
      <Reviews />
      <Events/>
    </Main>
  )
}

export default Landing