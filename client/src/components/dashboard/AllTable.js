import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import BookingTable from './BookingTable'
import UserTable from './UserTable'
const AllTable = () => {
  return (
      <Main>
          <UserTable/>
          <BookingTable/>
    </Main>
  )
}

export default AllTable
const Main = styled.div`
  ${tw`w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5`}
`;