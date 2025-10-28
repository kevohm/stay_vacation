import React, { useEffect, useState } from 'react'
import Events from './Events'
import Search from './Search'
import Recent from './Recent'
import styled from 'styled-components'
import tw from 'twin.macro'
import {useEvent} from "../context/EventContext"
import { getCookie } from '../../../context/utils'

const Wrapper = () => {
  const {events,sortBy,filter,getAll,setFilter,setSort } = useEvent()
  const [page,setPage] = useState(events.currentPage)
  const [filterData, setfilterData] = useState(
    {
      search: getCookie("search") || filter.search,
      category: getCookie("category") || filter.category,
      price: { min: getCookie("min") || filter.price.min, max: getCookie("max") || filter.price.max},
      validity: getCookie("validity") || filter.validity,
      expired: getCookie("expired") === "true" ||  true
    }
  );

  const changePage = (value)=>{
    setPage(Number(value))
  }
  const handleRefresh = (data)=>{
    setfilterData(data)
    setFilter(data)
  }
  const handleSort = (sort, arrange)=>{
    setSort(sort, arrange)
  }
  const handleFetch = ()=>{
    const validity = (filterData.expired) ? "gte" : "lte"
    const date = new Date(`${filterData.validity} ${new Date().toLocaleTimeString()}`).toISOString()
    const max = filterData.price.max
    const min = filterData.price.min
    const category = filterData.category
    const search = filterData.search
    getAll(page,6,sortBy.sort,sortBy.arrange,min,max,category,search,validity,date)
}
  useEffect(()=>{
  handleFetch()
  },[filterData,sortBy,page])
  return (
    <Main>
        <Search handleRefresh={handleRefresh} filter={filterData}/>
        <Events loading={events.loading} eventsData={events.data} page={page} changePage={changePage} handleCategory={handleSort}/>
        <Recent/>
    </Main>
  )
}

export default Wrapper

const Err = styled.div`
${tw`w-full`}
`

const Main =styled.div`
${tw`flex flex-col space-y-12 md:space-y-0  md:grid  md:grid-cols-[repeat(3, 1fr)] grid-flow-col-dense md:grid-rows-[38.958rem, 780px, 1fr] gap-5 items-start`}
`