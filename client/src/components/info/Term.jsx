import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Term = ({title,info}) => {
  return (
    <Main>
        <header>{title}</header>
        <ul>
            {info.map((i, index)=><li key={index}>{i}</li>)}
        </ul>
    </Main>
  )
}
const Main = styled.div`
${tw`text-[rgba(0,0,0,.7)] text-sm flex flex-col space-y-2.5`}
>header{
    font-family:poppinsSemi;
    ${tw``}
}
>ul{
    ${tw`pl-5`}
    >li{
        ${tw`w-full`}
    }
}
`
