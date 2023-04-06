import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Loader } from '../../smaller/load/Loader'
import { useEvent } from '../context/EventContext'
import Event from './Event'

const Related = () => {
  const {related,getRelated} = useEvent()
  const {name} = useParams()
  useEffect(()=>{
      getRelated(name)
  },[name])
  if(related.loading){
    return <Main>
      <p>Related Posts</p>
        <Loader color="#8A9AEA"/>
    </Main>
  }
  return (
    <Main>
      <p>Related Posts</p>
      <div className='all-events'>
        {related.data.map((item)=><Event key={item.name} {...item}/>)}
      </div>
    </Main>
  )
}

export default Related

const Main = styled.div`
${tw`w-full flex flex-col space-y-5`}
p{
  ${tw`text-lg text-darkBlue`}
  font-family:montserratMedium;
}
.all-events{
  ${tw`grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))]  md:grid-cols-[repeat(auto-fit, 300px)] items-start gap-5 justify-items-center items-start`}
}
`