import React from 'react'
import { Table } from '../smaller/cards/Table'
import { StatsHolder } from '../smaller/cards/StatsHolder'
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import {Loader} from "../smaller/load/Loader"

const Payments = () => {
    const { getPayments, state } = useGlobal()
    useEffect(() => {
        getPayments()
    }, [])

    return (
      <StatsHolder text="recent payments">
        <div className='w-full p-0 m-0 overflow-y-scroll'>
        {(state.payments.data.length === 0)?<Loader/>:
            <Table
              data={state.payments.data}
              title={["index", "status", "category", "amount", "Event Paid"]}
              type="payments"
            />
          }
        </div>
      </StatsHolder>
    );
}

export default Payments

