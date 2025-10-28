import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../context/AppContext'
import { useEvent } from '../Events/context/EventContext'
import {Table} from "./Table"
import { FaInfoCircle } from 'react-icons/fa'

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
  },[page.current])
  return (
    <Main>
      <div className='header'>
      <header>your bookings</header>
      <button onClick={()=>fetchData()}>refresh</button>
      </div>
      <div className='info'>
        <FaInfoCircle className='icon'/>
        <p>Pending payments will automatically updated after 30 seconds. Please wait for 15 minutes before making payments on the same event.</p>
      </div>
      <div className='table'>
        <Table data={payments} current={page.current} total={page.total} loading={loading} setLoading={setLoading} handleChange={handleChange}/>
      </div>
    </Main>
  )
}

export default EventsTable
const Main = styled.div`
${tw`h-max order-3 md:order-4 p-5`}
.table{
  ${tw`w-full border border-solid border-[rgba(0,0,0,.3)] rounded-lg overflow-x-scroll overflow-y-auto`}
}
.header{
  ${tw`flex items-center justify-between w-full`}
  >button{
    ${tw`p-2 bg-darkBlue rounded-lg cursor-pointer border-none text-white text-sm`}
  }
}
.info{
  font-family:poppins;
  ${tw`flex items-start justify-start space-x-2 pb-2.5 w-full text-lightBlue text-xs`}
  .icon{
    ${tw`text-xs`}
  }
}
`