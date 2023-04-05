import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const NoData = ({img,text}) => {
  return (
    <Main>
            <img src={img} alt="no events"/> 
            <p>{text}</p>
    </Main>
  )
}

const Main = styled.div`
    ${tw`w-full  flex flex-col justify-center items-center space-y-10 py-10`}
    font-family:poppinsSemi;
    p{
      ${tw`w-full max-w-[250px] text-center text-sm text-darkBlue`}
    }
    >img{
      ${tw`w-full max-w-[250px] mx-auto`}
    }
`