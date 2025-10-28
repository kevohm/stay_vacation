import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

const NavBar = () => {
  return (
    <Main>
        <div>
        <NavLink to="/info/about">About</NavLink>
        <NavLink to="/info/contact">Contacts</NavLink>
        <NavLink to="/info/">Terms and Conditions</NavLink>
        </div>
    </Main>
  )
}

export default NavBar

const Main = styled.div`
${tw`w-full h-max overflow-x-scroll overflow-y-auto `}
>div{
    ${tw`w-full max-w-[280px] md:max-w-none flex flex-row space-x-5 md:space-x-0 space-y-0 md:flex-col md:space-y-5`}
    a{
        font-family:montserratSemi;
        ${tw`p-2.5  text-sm rounded-lg`}
    }
    .active{
        ${tw`bg-[rgba(138, 154, 234, .2)]`}
    }
}
`