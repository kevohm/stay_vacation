import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvent } from '../context/EventContext'
import SingleCheck from './SingleCheck'

const Checkpoint = () => {
    const {stages} = useEvent()
    const check = stages.level > 1
  return (
    <Main check={check}>
        <div>
            <SingleCheck text="your selection" check={true}/>
            <SingleCheck text="payment details" check={check}/>
            <SingleCheck text="final step"/>
        </div>
    </Main>
  )
}

export default Checkpoint

const Main = styled.div`
${tw`w-full overflow-x-scroll overflow-y-auto py-5`}
>div{
    ${tw`min-w-[350px] w-full relative z-0 flex items-center justify-between`}
    ::before{
        content:" ";
        ${tw`absolute top-1/2 z-0 bg-green left-0 w-1/2 h-[2px]`}
    }
    ::after{
        content:" ";
        ${tw`absolute top-1/2 z-0 left-1/2 w-1/2 h-[2px] `}
        ${(props)=>props.check ?tw`bg-green`:tw`bg-[rgba(0,0,0,.5)]`}
    }
}
`