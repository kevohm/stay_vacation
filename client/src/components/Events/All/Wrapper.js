import React, { useEffect, useState } from 'react'
import Events from './Events'
import Search from './Search'
import Recent from './Recent'
import styled from 'styled-components'
import tw from 'twin.macro'
import {useEvent} from "../context/EventContext"
import { useLocation } from 'react-router-dom'

const Wrapper = () => {
  const {events,sortBy,filter,getAll,setFilter,setSort } = useEvent()
  const [page,setPage] = useState(events.currentPage)
  const {state} = useLocation()
  const changePage = (value)=>{
    setPage(Number(value))
  }
  const handleRefresh = (data)=>{
    setFilter(data)
  }
  const handleSort = (sort, arrange)=>{
    setSort(sort, arrange)
  }
  useEffect(()=>{
    const validity = new Date(`${filter.validity} ${new Date().toLocaleTimeString()}`).toISOString()
    getAll(page,6,sortBy.sort,sortBy.arrange,filter.price.min,filter.price.max,filter.category,filter.search,validity,"greaterthan")
  },[filter,sortBy,page])
  return (
    <Main>
        <Search handleRefresh={handleRefresh}/>
        <Events loading={events.loading} eventsData={events.data} page={page} changePage={changePage} handleCategory={handleSort}/>
        <Recent/>
    </Main>
  )
}

export default Wrapper

const Main =styled.div`
${tw`flex flex-col space-y-12 md:space-y-0  md:grid  md:grid-cols-[repeat(3, 1fr)] grid-flow-col-dense md:grid-rows-[30rem, 780px, 1fr] gap-5 items-start`}
`