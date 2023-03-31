import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {MdNotificationsActive} from "react-icons/md"

export const GlobalError = ({msg, type, show}) => {
    if(!show) return
    return (
    <Main type={type}>
        <header>
            <MdNotificationsActive className='icon'/> 
            <p>Notifications</p>
        </header>
        <div>
            {msg}
        </div>
    </Main>
  )
}

const Main =styled.div`
${tw`absolute top-[30px] left-[40%] bg-white max-w-[400px] border-solid border-2 flex flex-col space-y-2 border-transparent rounded-lg p-5 z-40`}
box-shadow:0px 4px 8px rgba(0,0,0,.15);

>header{
    ${(props)=>props.type === "warning" && tw`text-red-600`}
    ${(props)=>props.type === "success" && tw`text-[#16a34a]`}
    ${tw`flex items-center space-x-2 text-sm`}
    .icon{
        ${tw`text-sm`}

    }
}
>div{
    ${tw`relative text-sm`}
    
}

:before{
    ${(props)=>props.type === "warning" && tw`bg-red-600`}
    ${(props)=>props.type === "success" && tw`bg-[#16a34a]`}
    content:"";
    width:0px;
    height:2px;
    ${tw`absolute bottom-[1px] -left-0`}
    animation: spin 3s linear infinite;
}

@keyframes spin {
from {
width:0px;
}
to {
width:100%;
}


`
