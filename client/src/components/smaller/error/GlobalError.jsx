import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {MdNotificationsActive} from "react-icons/md"
import { useGlobal } from '../../../context/AppContext'
import { FaTimes } from 'react-icons/fa'

export const GlobalError = ({msg, type, show, close}) => {
    if(!show) return
    return (
    <Main type={type}>
        <div className='header'>
        <header>
            <MdNotificationsActive className='icon'/> 
            <p>Notifications</p>
        </header>
        <div onClick={close}>
            <FaTimes className='icon'/>
        </div>
        </div>
        <div className='message'>
            {msg}
        </div>
    </Main>
  )
}

const Main =styled.div`
${tw`min-w-[200px] absolute top-[30px] left-[20px] sm:left-[40%] bg-white max-w-[400px] border-solid border-2 flex flex-col space-y-2 border-transparent rounded-lg p-5 z-50`}
box-shadow:0px 4px 8px rgba(0,0,0,.15);
.header{
    ${tw`flex justify-between`}
    >header{
        ${(props)=>props.type === "warning" && tw`text-red-600`}
        ${(props)=>props.type === "success" && tw`text-[#16a34a]`}
        ${tw`flex items-center space-x-2 text-sm`}
        .icon{
            ${tw`text-sm`}
    
        }
    }
    >div{
        ${tw`cursor-pointer flex items-center justify-center p-1`}
        .icon{
            ${tw`text-lg`}
            ${(props)=>props.type === "warning" && tw`text-red-600`}
            ${(props)=>props.type === "success" && tw`text-[#16a34a]`}
        }
    }
}
.message{
    ${tw`relative text-sm`}
    
}
`
