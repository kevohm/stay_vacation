import React from 'react'
import { Table } from '../smaller/cards/Table'
import { StatsHolder } from '../smaller/cards/StatsHolder'
import { useGlobal } from '../../context/AppContext'
import { useEffect } from 'react'
import {Loader} from "../smaller/load/Loader"

const BookingTable = () => {
  const { getEvents, state } = useGlobal()
  useEffect(() => {
    getEvents()
  }, [])
  return (
    <StatsHolder text="recent booking">
      <div className='w-full p-0 m-0 overflow-y-scroll'>
        {
          (state.events.data.length === 0)?<Loader/>:
          <Table
            data={state.events.data}
            title={["name", "image", "description", "city", "country"]}
            type="events"
          />
        }
          
      </div>
    </StatsHolder>
  );
}

export default BookingTable
