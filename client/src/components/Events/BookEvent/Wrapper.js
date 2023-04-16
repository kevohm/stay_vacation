import React from 'react'
import { RelatedWrapper } from '../Single/RelatedWrapper'
import BookSingle from './BookSingle'
import { useEvent } from '../context/EventContext'
import { Navigate } from 'react-router-dom'

const Wrapper = () => {
  const { book_event_id} = useEvent()
  if(! book_event_id)return <Navigate to="/events"/>
  return (
    <RelatedWrapper element={<BookSingle/>}/>
  )
}

export default Wrapper