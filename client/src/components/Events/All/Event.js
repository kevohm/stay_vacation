import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import tw from 'twin.macro'

export const Event = ({event}) => {
  return (
    <Main to={`/events/${event.name}`}>
        <div>
        <img src={event.image[0]} alt="event"/>
        </div>
        <div>
            <header>{event.name}</header>
            <p>{event.description.length <= 70 ?event.description:`${event.description.slice(0,70)}...`}</p>
        </div> 
    </Main>
  )
}

const Main = styled(Link)`
${tw`w-full h-auto md:h-[100px] flex flex-col space-y-2 md:space-y-0 md:flex-row items-start text-black`}

div:first-child{
    ${tw`flex items-center justify-center h-full w-full max-w-none md:max-w-[100px]`}
    >img{
        ${tw`object-cover w-full max-w-none md:max-w-[100px] h-full max-h-[200px]  rounded-lg`}
    }
}
div:last-child{
    ${tw`w-full flex flex-col space-y-2.5 p-2.5 text-sm pt-0`}
    header{
        font-family:montserratSemi;
        ${tw`text-sm capitalize`}
    }
    p{
        font-family:montserrat;
        ${tw`w-full w-fit text-sm`}
    }
}
`