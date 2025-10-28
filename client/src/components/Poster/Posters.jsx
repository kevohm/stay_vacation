import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Poster from './Poster'
import CreateForm from './CreateForm'
import { useGlobal } from '../../context/AppContext'
import {NoData} from "../smaller/error/NoData"
import poster from "../../assets/svg/posters.svg"

const Posters = () => {
  const {getPosters,state} = useGlobal()

  useEffect(()=>{
    getPosters()
  },[])
  if(state.posters.loading){
    return <Main>
        <CreateForm/>
        <header className='title-poster'>Posters</header>
        <div className='all-posters'>
            <p>loading...</p>
        </div>
    </Main>
  }
  return (
    <Main>
        <CreateForm/>
        <header className='title-poster'>Posters</header>
        <div className='all-posters'>
          {
            state.posters.data.length === 0 ?<NoData img={poster} text="No posters yet. Create some"/>:
            <>
            {state.posters.data.map((item)=><Poster {...item} key={item.event.name}/>)}
            </>
          }
        </div>
    </Main>
  )
}

export default Posters

const Main = styled.section`
${tw`bg-white rounded-lg p-5 flex flex-col space-y-5 items-start`}
.title-poster{
    font-family:poppinsSemi;
    ${tw`text-lg text-[rgba(0,0,0,.7)]`}
}
.all-posters{
    ${tw`w-full grid grid-cols-[repeat(auto-fit, minmax(150px, 300px))] gap-5`}
}
`