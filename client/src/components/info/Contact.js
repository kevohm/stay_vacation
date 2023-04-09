import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Contact = ({title,url,text,color,bg}) => {
  return (
    <Main color={color} bg={bg}>
        <p>{title}</p>
        <a href={url}>{text}</a>
    </Main>
  )
}
const Main =styled.div`
${tw``}
a{
    border:1px solid ${(props)=>props.color};
    color:${(props)=>props.color};
    background:${(props)=>props.bg};
}
`