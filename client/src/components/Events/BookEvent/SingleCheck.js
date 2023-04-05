import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import tw from 'twin.macro'

const SingleCheck = ({text,check=false}) => {
  return (
    <Main check={check}>
        <div>
        <AiOutlineCheckCircle className='icon'/>
        <p>{text}</p>
        </div>
    </Main>
  )
}

export default SingleCheck


const Main = styled.div`
${tw`z-10 bg-white`}
>div{
    ${tw` px-1 bg-[rgba(138, 154, 234, .1)] flex items-center space-x-2`}
    .icon{
        ${(props)=>props.check ? tw`text-green`:tw`text-darkBlue`}
        ${tw`text-lg`}
    }
    p{
        ${tw`text-sm text-darkBlue capitalize`}
        font-family:poppinsSemi;
    }
}
`