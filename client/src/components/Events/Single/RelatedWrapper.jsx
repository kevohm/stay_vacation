import React from 'react'
import Related from './Related'
import Comments from './Comments'
import { useEvent } from '../context/EventContext'

export const RelatedWrapper = ({element,comments=false}) => {
  const {currentEvent} = useEvent()
  return (
   <section className='flex flex-col space-y-12 items-start'>
    {element}
    {(comments && !currentEvent.loading) && <Comments/>}
    <Related/>
   </section>
  )
}

