import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Events/All/Wrapper'
import { useEvent } from '../../components/Events/context/EventContext'
import { useLocation } from 'react-router-dom'
const Events = () => {
  const {filter, setFilter} = useEvent()
  const {state} = useLocation()
  // const [loading,setLoading] = useState(true)
  // const handleRedirect = ()=>{
  //   setFilter({...filter,
  //     search:state.city,
  //     price: { min: state.min,max: state.max},
  //     validity: state.date
  //   })
  //   setTimeout(()=>setLoading(false), 3000)
  // }
  // useEffect(
  //   ()=>{
  //     if(state){
  //       handleRedirect()
  //     }
  //   },[]
  // )
  return (
<section className='min-h-[calc(100vh - 653px)] bg-[rgba(1, 49, 91, .05)] p-6 md:p-12'>
    <Wrapper/>
   </section>
  )
}

export default Events