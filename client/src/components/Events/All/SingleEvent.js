import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'
import { useEvent } from '../context/EventContext'
const SingleEvent = ({grid, event}) => {
    const {setCurrentEvent} = useEvent()
  return (
    <Main grid={grid}>
        <Link to={`${event.name}`}>
        <img src={event.image[0]} alt={event.name}/>
        </Link>
        <div>
            <div className='header'>
            <header>{event.name}</header>
            <Link to={`${event.name}`} className="links">Details</Link>
            </div>
            <p>{event.description.length <= 100 ?event.description:`${event.description.slice(0,100)}...`}</p>
        </div>
    </Main>
  )
}

export default SingleEvent

const Main =styled.div`
${tw`w-full rounded-lg bg-white flex`}
${(props)=>props.grid ? tw`flex-col max-w-none md:max-w-[415px] `:tw` h-[150px] sm:h-[200px] items-start space-x-2 md:space-x-5`}
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
> a{
    ${tw`w-full h-full flex`}
    ${(props)=>props.grid?tw``:tw`max-w-[300px]`}
    >img{
        ${tw`w-full h-full object-cover`}
        ${(props)=>props.grid?tw`max-h-[274px] rounded-t-lg`:tw`min-w-[150px] max-w-[300px] max-h-[200px] rounded-lg`}
    }
}
>div{
    ${(props)=>props.grid?tw`w-full flex flex-col space-y-2.5 p-5 text-sm`:tw`w-[560px] flex flex-col space-y-2.5 p-2 pl-0 md:p-0 md:pt-5  text-sm`}
    font-family:montserratMedium;
    .header{
        ${tw`w-full flex items-center justify-between pr-5`}
        header{
            font-family:montserratSemi;
            ${tw`text-darkBlue`}
        }
        a{
            ${tw`border-orange p-1 text-orange border-solid border rounded-lg`}
        }
    }
    .links{
        ${tw`hidden md:block`}
    }
}
`