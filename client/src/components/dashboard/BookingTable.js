import React from 'react'
import { Table } from '../smaller/cards/Table'
import { StatsHolder } from '../smaller/cards/StatsHolder'
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import {Loader} from "../smaller/load/Loader"
import styled from 'styled-components'
import tw from 'twin.macro'
const BookingTable = () => {
  const { getEvents, state } = useGlobal()
  useEffect(() => {
    getEvents()
  }, [])
  if (state.events.data.length === 0){
    return <Loader/>
}
  return (
    <StatsHolder text="recent booking">
      <Main>
          <Table
            data={state.events.data}
            title={["name", "image", "description", "city", "country"]}
            type="events"
          />
      </Main>
    </StatsHolder>
  );
}

export default BookingTable
const Main = styled.div`
  ${tw`w-full p-0 m-0`}
  overflow-x:scroll;
`;