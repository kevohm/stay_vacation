import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {ManageUser, UsersTable} from "../../components/userDashboard/index"
const User = () => {
  return (
    <Main>
      <ManageUser />
      <UsersTable/>
    </Main>
  )
}

export default User
const Main = styled.section`
  ${tw`w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0`}
  overflow-y:scroll;
`;