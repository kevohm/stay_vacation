import React from 'react'
import BookForm from './BookForm'
import EventDisplay from './EventDisplay'

const WrapperLeft = () => {
  return (
    <div className='w-full  flex flex-col space-y-5'>

      <EventDisplay/>
      <BookForm/>
    </div>
  )
}

export default WrapperLeft
