import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {StatsHolder} from "../smaller/cards/StatsHolder"
import { UserForm } from './UserForm'
import users from "../../assets/svg/users.svg"
const ManageUser = () => {
  return (
    <StatsHolder text="Create User">
      <Main>
        <UserForm />
        <img src={users} alt="users"/>
      </Main>
    </StatsHolder>
  )
}

export default ManageUser
const Main = styled.section`
  ${tw`w-full flex items-center`}
  img { 
    ${tw`w-full hidden sm:block max-w-[180px] md:max-w-[250px] lg:max-w-xs ml-auto mr-0 lg:mr-24`}
  }
`;
