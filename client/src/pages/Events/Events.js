import React from 'react'
import { Main } from './styles'
import Wrapper from '../../components/Events/All/Wrapper'
import { EventContext } from '../../components/Events/context/EventContext'
const Events = () => {

  return (
    <EventContext>
   <Main>
    <Wrapper/>
   </Main>
    </EventContext>
  )
}

export default Events