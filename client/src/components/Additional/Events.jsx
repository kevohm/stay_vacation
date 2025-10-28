import React, { useEffect, useState } from 'react'
import Event from './Event'
import styled from "styled-components"
import tw from "twin.macro"
import { useGlobal } from '../../context/AppContext'
import load from "../../assets/img/loader.gif"

const Events = () => {
  const {getAllEvents } = useGlobal()
  const [data,setData] = useState([])
  const [name,setName] = useState("")
  const [limit, setLimit] = useState(10)
  const [loading,setLoading] = useState(true)
  const [pages,setPages] = useState({current:1,total:1})
  const fetchData = ()=>{
    setLoading(true)
    getAllEvents(1,limit,name).then((res)=>{
      const {events, pages} = res.data
      setData(events)
      setPages({current:pages.currentPage, total:pages.pages})
      setLoading(false)
    })
  }
  const handleMore = ()=>{
    if(pages.current !== pages.total){
      setLimit(limit + 10)
    }
  }
  useEffect(()=>{
    fetchData()
  },[limit])
  if(loading){
    return <Main>
      <div className='wrapper'>
    <div className='title-main'>
        <header>Available events</header>
    </div>
    <div className='loading'>
        <img src={load} alt="loading"/>
    </div>
      </div>
</Main>
  }

  return (
    <Main>
      <div className='wrapper'>
        <div className='title-main'>
            <header>Available events</header>
        </div>
        <div className='all-events'>
           {data.map((item)=><Event {...item} key={item.name} />)} 
        </div>
        {pages.current < pages.total &&
        <div className='load-more'>
          <button onClick={handleMore}>load more</button>
        </div>}
      </div>
    </Main>
  )
}

export default Events

const Main = styled.section`
${tw`rounded-lg bg-white h-max min-h-full`}
.wrapper{
  ${tw`rounded-lg bg-white min-h-full pb-10`}
  .title-main{
    font-family:poppinsSemi;
    ${tw`p-5 text-lg text-[rgba(0,0,0,.7)]`}
  }
  .all-events{
    ${tw`px-5 h-full grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] gap-5 gap-y-10`}
  }
  .load-more{
    ${tw`w-full py-5 flex items-center justify-center`}
    > button{
      ${tw`px-2.5 py-2 border-solid border border-lightBlue cursor-pointer text-lightBlue bg-white text-sm rounded transition  ease-in-out hover:bg-lightBlue hover:text-white`}
    }
  }
  .loading{ 
    ${tw`w-full h-full  px-5 flex items-center justify-center`}
    img{
      ${tw`w-full my-auto max-w-[150px]`}
    }
  }
}
`