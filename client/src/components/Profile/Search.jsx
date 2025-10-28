import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvent } from '../Events/context/EventContext'

const Search = () => {
  const {storeFilter} = useEvent()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault()
    storeFilter(search,moment(new Date).format("YYYY-MM-DD"),0,300000,"")
    navigate("/events")
  }
  return (
    <Main>
      <header className='header'>Search For Tours</header>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" placeholder='keywords' onChange={(e)=>setSearch(e.target.value)} value={search}/>
        <input type="submit" value="Search"/>
      </form>
    </Main>
  )
}

export default Search
const Main = styled.div`
${tw`h-full order-1 md:order-2 p-5 flex flex-col`}
>form{
  ${tw`w-full flex items-center`}
  >input{
    ${tw`w-full max-w-[300px]`}
    font-family:poppinsMedium;
    ${tw`px-2.5 py-2 text-[rgba(1, 49, 91, .7)] text-sm border-solid border rounded-l-lg border-[rgba(1, 49, 91, .3)]`}
    ::placeholder{
      font-family:poppinsMedium;
      ${tw`text-[rgba(1, 49, 91, .5)] text-sm capitalize`}
    }
  }
  input[type="text"]{
    ${tw``}
    border-right:none;
  }
  input[type="submit"]{
    font-family:poppinsSemi;
    ${tw`w-24 max-w-[80px] px-2.5 py-2 text-white text-sm rounded-none rounded-r-lg bg-orange border-orange`}
  }
}
`