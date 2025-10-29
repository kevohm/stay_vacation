import React from 'react'
// import {Main} from "../styles"
import {Posters} from "../../components/Poster/index"

const Poster = () => {
  return (
    <section className="w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0 overflow-y-scroll ">
        <Posters/>
    </section>
  )
}

export default Poster