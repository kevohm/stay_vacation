import React, {useEffect} from 'react'
import { useEvent } from '../Events/context/EventContext'
import { Event } from '../Events/All/Event'
import { Loader } from '../smaller/load/Loader'


const Recent = () => {
  const {recent,getRecent } = useEvent()
  useEffect(()=>{
    getRecent()
  },[])
  if(recent.loading){
    return <div className='h-max order-4 md:order-3 row-span-2 p-5'>
    <header className='header'>Recent posts</header>
    <Loader/>
  </div>
  }
  return (
    <div className="h-max order-4 md:order-3 row-span-2 p-5">
      <header className="header">Recent posts</header>
      <div className="flex flex-col space-y-5">
        {recent.data.map((item) => (
          <Event key={item.name} event={item} />
        ))}
      </div>
    </div>
  );
}

export default Recent
