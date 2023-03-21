import React, { useState } from 'react'
import styled from 'styled-components'
import {FaAngleLeft, FaAngleRight, FaList} from "react-icons/fa"
import {BsFillGrid3X3GapFill} from "react-icons/bs"
import tw from 'twin.macro'
import SingleEvent from './SingleEvent'
import { Loader } from '../../smaller/load/Loader'
import { useEvent } from '../context/EventContext'

const Events = ({loading,eventsData, page, changePage, handleCategory}) => {
  const {sortBy,events} = useEvent()
  const [filter, setFilter] = useState(sortBy)
  const [currentPage, setCurrentPage] = useState(page)
  const [grid,setGrid] = useState(false)
  const changeGrid = (grid)=>{
    setGrid(grid)
  }
  const handlePages = (val)=>{
    const pages = Number(events.pages)
      const num = Number(val)
      if(num <= pages && num > 0){
        changePage(num)
      }
      if(!isNaN(num) || num == ""){
        setCurrentPage(val)
      }
  }
  const handleDir = (dir)=>{
    const current = Number(events.currentPage)
    const max = Number(events.pages)
    if(1 !== max){
      if(dir === "next"){
        if(current === max){
          changePage(1)
          setCurrentPage(1)
        }else{
          changePage(current + 1)
          setCurrentPage(current + 1)
        }
    }else if(dir === "prev"){
      if(current === 1){
        changePage(max)
        setCurrentPage(max)
      }else{
        changePage(current - 1)
        setCurrentPage(current - 1)
      }
    }
    }

  }
  const changeCategory = (val)=>{
    const arr = val.split(" ")
    const data = {...sortBy, arrange:arr[1],sort:arr[0]}
    setFilter(data)
    handleCategory(arr[0],arr[1])
  }
  return (
    <Main grid={grid}>
     <div className='heading-sort'>
      <div>
        <label>Sort By</label>
        <select value={`${filter.sort} ${filter.arrange}`} onChange={(e)=>changeCategory(e.target.value)}>
        <option disabled={true} value="">Category</option>
        {
          filter.data.map((i,index)=><option key={index} value={i}>{i}</option>)
        }
        </select>
      </div>
      <div>
        <header>View</header> 
        <div className={`${grid && "active"}`} onClick={()=>changeGrid(true)}>
          <BsFillGrid3X3GapFill className='icon' />
        </div>
        <div className={`${grid || "active"}`}  onClick={()=>changeGrid(false)}>
          <FaList className='icon'/>
        </div>
      </div>
     </div>
     <div className='events'>
      {loading?<Loader color="#8A9AEA"/>:
        eventsData.map((item)=><SingleEvent key={item.name} grid={grid}  event={item}/>)
      }
     </div>
     <div className='pages'>
      <div className='icon-holder' title='previous' onClick={()=>handleDir("prev")}>
      <FaAngleLeft className='icon'/>
      </div>
      <div className='page-holder'>
        <input 
        type="text"
        value={currentPage}
        onChange={(e)=>handlePages(e.target.value)}
        />
        <p>of {events.pages}</p>
      </div>
      <div className='icon-holder' title='next' onClick={()=>handleDir("next")}>
      <FaAngleRight className='icon'/>
      </div>
     </div>
    </Main>
  )
}

export default Events

const Main = styled.div`
${tw`w-full max-w-[896px] flex flex-col space-y-5 rounded-lg col-span-2 row-span-3`}
.heading-sort{
  ${tw`flex justify-between items-center`}

  >div{
    ${tw`flex items-center space-x-2.5`}
    header, label{
      font-family:montserratSemi;
      ${tw`text-darkBlue hidden sm:block`}
    }
    select{
      font-family:montserratSemi;
      ${tw`bg-white capitalize text-sm text-lightBlue rounded-lg p-2.5 border-none`}
      option{
        ${tw`bg-white text-sm py-1`}
      }
    }
    >div{
      ${tw`h-10 w-10 p-1 bg-white text-lightBlue flex items-center justify-center rounded-lg`}
      .icon{
        ${tw`text-xl`}
      }
    }
    .active{
      ${tw`bg-lightBlue text-white`}
    }
  }
}
>.events{
  ${(props)=>props.grid ?tw`grid grid-cols-[1fr] sm:justify-items-center sm:grid-cols-[repeat(auto-fit, minmax(400px, 1fr))] lg:grid-cols-[repeat(auto-fit, minmax(350px, 1fr))] gap-5`: tw`flex flex-col space-y-5`}
}
>.pages{
  ${tw`bg-white flex space-x-5 items-center p-5 rounded-lg`}
  box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
  .page-holder{
    ${tw`flex items-center w-full justify-center space-x-4`}
    input{
      ${tw`appearance-none p-2 w-[30px] h-[30px] rounded-lg border border-solid border-[rgba(0,0,0,.2)] focus:border-[rgba(0,0,0,.4)]`}
    }
  }
  .icon-holder{
    ${tw`text-lg p-1 flex items-center justify-center rounded-lg border border-solid border-[rgba(0,0,0,.2)] hover:border-[rgba(0,0,0,.4)]`}
    .icon{
      ${tw`text-[rgba(0,0,0,.7)]`}
    }
  }
}
`