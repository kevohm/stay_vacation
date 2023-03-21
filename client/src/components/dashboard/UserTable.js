import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Table } from "../smaller/cards/Table"
import { StatsHolder } from "../smaller/cards/StatsHolder"
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import { Loader } from '../smaller/load/Loader'
const UserTable = () => {
  const { state,getUsers } = useGlobal()
  useEffect(() => {
    getUsers()
  }, [])
  if (state.users.data.length === 0) {
    return <Loader/>
}
  return (
    <StatsHolder text="recent users">
      <Main>
        
          <Table
            data={state.users.data}
            title={["index", "username", "email", "phone_number"]}
            type="users"
          />
      </Main>
    </StatsHolder>
  );
}

export default UserTable

const Main = styled.div`
  ${tw`w-full rounded-lg p-0 m-0`}
  overflow-x:scroll;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;