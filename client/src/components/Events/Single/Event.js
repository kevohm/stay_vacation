import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

const Event = ({name,city,description,image}) => {
  return (
    <Main>
          <Link className='image' to={`/events/${name}`}>
          <img src={image[0]} alt="event"/>
          </Link>
          <div className='information'>
          <header>{`${name}, ${city}`}</header>
          <p>{description.length < 220?description:`${description.slice(0,220)}...`}</p>
          </div>
    </Main>
  )
}

export default Event

const Main = styled.div`
    ${tw`w-full h-min rounded-lg bg-white `}
    box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
    .image{
      ${tw`w-full relative`}
      img{
        ${tw`w-full rounded-t-lg h-[200px] object-cover`}
      }
    }
    .information{
      ${tw`p-2.5 flex flex-col space-y-2.5`}
      header{
        ${tw`text-sm capitalize text-darkBlue`}
        font-family:montserratSemi;
      }p{
        font-family:montserratMedium;
        ${tw`text-sm w-full text-black`}
      }

    }
`