import React from 'react'
import {Wrapper} from "../../components/Events/Single/index"
import {Main} from "./styles"
import { EventContext } from '../../components/Events/context/EventContext'
const SingleEvent = () => {
  return (
    <EventContext>
   <Main>
    <Wrapper/>
   </Main>
    </EventContext>
  )
}

export default SingleEvent