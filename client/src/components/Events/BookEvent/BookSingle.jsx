import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Checkpoint from './Checkpoint'
import Search from './Search'
import WrapperLeft from './WrapperLeft'

const BookSingle = () => {
  return (
    <Main>
        <Checkpoint/>
        <div className='grid-cards'>
            <Search/>
            <WrapperLeft/>
        </div>
    </Main>
  )
}

export default BookSingle

const Main = styled.div`
${tw`w-full flex flex-col space-y-5`}
.grid-cards{
    ${tw`w-full flex flex-col md:grid md:grid-cols-[3fr, 7fr]  lg:grid-cols-[35%, 65%] md:gap-5 md:space-y-0 space-y-5`}
}
`