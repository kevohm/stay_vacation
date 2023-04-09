import React, {useEffect} from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvent } from '../Events/context/EventContext'
import { Event } from '../Events/All/Event'
import { Loader } from '../smaller/load/Loader'


const Recent = () => {
  const {recent,getRecent } = useEvent()
  useEffect(()=>{
    getRecent()
  },[])
  if(recent.loading){
    return <Main>
    <header className='header'>Recent posts</header>
    <Loader/>
  </Main>
  }
  return (
    <Main>
      <header className='header'>Recent posts</header>
      <div>
        {recent.data.map((item)=><Event key={item.name} event={item}/>)}
      </div>
    </Main>
  )
}

export default Recent

const Main = styled.div`
${tw`order-4 md:order-3 row-span-2 p-5`}
>div{
  ${tw`flex flex-col space-y-5`}
}
`