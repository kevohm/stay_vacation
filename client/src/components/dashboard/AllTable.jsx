import React from 'react'
import BookingTable from './BookingTable'
import UserTable from './UserTable'
const AllTable = () => {
  return (
      <div className='w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5'>
          <UserTable/>
          <BookingTable/>
    </div>
  )
}

export default AllTable
