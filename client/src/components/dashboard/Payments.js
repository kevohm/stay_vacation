import React from 'react'
import { Table } from '../smaller/cards/Table'
import { StatsHolder } from '../smaller/cards/StatsHolder'
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Loader} from "../smaller/load/Loader"

const Payments = () => {
    const { getPayments, state } = useGlobal()
    useEffect(() => {
        getPayments()
    }, [])
    if (state.events.data.length === 0){
        return <Loader/>
    }
    return (
      <StatsHolder text="recent payments">
        <Main>
            <Table
              data={state.payments.data}
              title={["index", "status", "category", "amount", "Event Paid"]}
              type="payments"
            />
        </Main>
      </StatsHolder>
    );
}

export default Payments

const Main = styled.div`
  ${tw`w-full p-0 m-0`}
  overflow-x:scroll;
`;