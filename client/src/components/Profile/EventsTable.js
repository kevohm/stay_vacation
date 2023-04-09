import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../context/AppContext'
import { useEvent } from '../Events/context/EventContext'
import {Table} from "./Table"

const EventsTable = () => {
  const {userPayments} = useEvent()
  const  {state} = useGlobal()
  const [payments,setPayments] = useState([])
  const [page,setPage] = useState({current:1,total:0})
  const [loading,setLoading] = useState(true)
  const fetchData = ()=>{
    setLoading(true)
    userPayments(state.user.id, page.current).then((res)=>{
      const {data} = res
      setPayments(data.payments)
      setPage({total:data.pages.pages,current:data.pages.currentPage})
      setLoading(false)
    }).catch((err)=>{
      setPayments([])
      setPage({total:0,current:0})
      setLoading(false)
    })
  }
  const handleChange = (current)=>{
    setPage({...page, current})
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Main>
      <header className='header'>your bookings</header>
      <div>
        <Table data={payments} current={page.current} total={page.current} loading={loading} handleChange={handleChange}/>
      </div>
    </Main>
  )
}

export default EventsTable
const Main = styled.div`
${tw`h-max order-3 md:order-4 p-5`}
>div{
  ${tw`w-full border border-solid border-[rgba(0,0,0,.3)] rounded-lg overflow-x-scroll overflow-y-auto`}
}
`