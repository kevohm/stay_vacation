import React, {useEffect} from 'react'
import { StatsHolder } from "../smaller/cards/StatsHolder"
import Chart from "react-apexcharts"
import {bookingData as data} from "../utils/DashboardWrapper/bookings"
import { useGlobal } from '../../context/AppContext'
const Bookings = () => {
  const { state, getTableStats } = useGlobal();
  useEffect(() => {
    getTableStats("events");
  }, []);
  console.log(state);
  return (
    <StatsHolder text="bookings overview">
          <Chart
              options={data.options}
        series={data.series}
        type="bar"
      />
    </StatsHolder>
  );
}

export default Bookings