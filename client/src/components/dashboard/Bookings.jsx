import React, {useEffect, useState} from 'react'
import { StatsHolder } from "../smaller/cards/StatsHolder"
import Chart from "react-apexcharts"
import {bookingData as data} from "../utils/DashboardWrapper/bookings"
import { useGlobal } from '../../context/AppContext'
const Bookings = () => {
  const { state, getTableStats } = useGlobal();
  const [type, setType] = useState("day");
  const changeType = (e) => {
    const { value } = e.target;
    setType(value);
    getTableStats("events", value);
  };
  useEffect(() => {
    getTableStats("events", type);
  }, []);
  return (
    <StatsHolder
      text="bookings overview"
      button={true}
      type={type}
      changeType={changeType}
    >
      <Chart
        options={{
          ...data.options,
          xaxis: {
            ...data.options.xaxis,
            categories: state.table.events.category,
          },
        }}
        series={[{ ...data.series[0], data: state.table.events.series }]}
        type="bar"
      />
    </StatsHolder>
  );
}

export default Bookings