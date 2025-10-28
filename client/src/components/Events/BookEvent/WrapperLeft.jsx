import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import BookForm from './BookForm'
import EventDisplay from './EventDisplay'

const WrapperLeft = () => {
  return (
    <Main>
        <EventDisplay/>
        <BookForm/>
    </Main>
  )
}

export default WrapperLeft
const Main = styled.div`
${tw`w-full  flex flex-col space-y-5`}
`