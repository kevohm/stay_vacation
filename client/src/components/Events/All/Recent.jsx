import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Loader} from "../../smaller/load/Loader"
import { Event } from './Event'
import { useEvent } from '../context/EventContext'
const Recent = () => {
  const {recent,getRecent } = useEvent()
  useEffect(()=>{
    getRecent()
  },[])
  
  return (
    <Main>
      <header className='header'>Recent Posts</header>
      {
      recent.loading?<Loader/>:<div className='events'>
        {recent.data.length !== 0
        ?
        recent.data.map((item)=><Event key={item._id} event={item}/>
          )
          :
          <div>No Events Available</div>
          
        }
        </div>
      }
  
    </Main>
  )
}

export default Recent

const Main = styled.div`
${tw`w-full max-w-none lg:max-w-[424px] flex flex-col space-y-5 rounded-lg bg-white p-6 lg:p-12 pr-5`}
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
.header{
  font-family:montserratSemi;
  ${tw`text-[rgba(1, 49, 91, 1)] text-lg`}
}
.events{
  ${tw`grid grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-5 md:flex md:flex-col space-y-0 md:space-y-5`}
}

`