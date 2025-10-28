import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import NavBar from './NavBar'

const Wrapper = ({element}) => {
  return (
    <Main>
        <NavBar/>
        {element}
    </Main>
  )
}

export default Wrapper

const Main = styled.div`
${tw`flex flex-col space-y-5 md:space-y-0 md:grid md:grid-cols-[32% 68%] md:gap-5`}
>div{
    ${tw`rounded-lg bg-white p-5`}
}
`