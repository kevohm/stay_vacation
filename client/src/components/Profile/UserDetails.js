import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useEvent } from '../Events/context/EventContext'
import {Loader} from "../smaller/load/Loader"
import {FaInfoCircle} from "react-icons/fa"
import { Link } from 'react-router-dom'

const UserDetails = () => {
  const {getBookingUser} = useEvent()
  const [user,setUser] = useState(null)
  const fetchUser = ()=>{
    getBookingUser().then((res)=>{
      const {data} = res
      setUser({...data.details,role:data.user.role})
    }).catch((err)=>{
      setUser([])
    })
  }
    useEffect(()=>{
        fetchUser()
    },[])
    if(!user){
      return <Main>
         <header>your profile</header>
         <Loader/>
      </Main>
    }
  return (
    <Main>
       <div className='header-div'>
      <header className='header'>your profile</header>
      {
        user.role === "96e0c255-1643-48d2-9c60-08a115fbda91" && <Link to="/admin">view Dashboard</Link>
      }
      </div>
      <div>
        <p>Username</p>
        <p>{user.username}</p>
      </div>
      <div>
        <p>Email</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p>Phone number</p>
        <p>{user.phone_number}</p>
      </div>
      <div>
        <p>Joined Us at</p>
        <p>{moment(user.createdAt).format("ddd, MMM DD YYYY")}</p>
      </div>
      <div className='submit'>
        <FaInfoCircle/>
        <p>Contact Admin for any updates to the above information</p>
      </div>
    </Main>
  )
}

export default UserDetails

const Main = styled.div`
${tw`h-full order-2 md:order-1 p-5 flex flex-col space-y-5 row-span-2`}
.header-div{
  ${tw`w-full flex justify-between items-center`}
  a{
    font-family:poppins;
    ${tw`text-sm hover:underline `}
  }
}
>div{
  ${tw`w-full flex items-center`}
  font-family:poppinsMedium;
  p{
    ${tw`text-sm text-[rgba(0,0,0,.7)]`}
  }
  p:first-child{
    ${tw`capitalize w-32 text-[rgba(0,0,0,1)]`}
  }
}
.submit{
  ${tw`flex text-lightBlue text-xs justify-start space-x-2 items-center`}
  p{
    font-family:poppins;
    ${tw`text-lightBlue rounded-lg border-none`}
  }
}
`