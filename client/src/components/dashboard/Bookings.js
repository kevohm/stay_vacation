import React, {useEffect, useState} from 'react'
import { StatsHolder } from "../smaller/cards/StatsHolder"
import Chart from "react-apexcharts"
import {bookingData as data} from "../utils/DashboardWrapper/bookings"
import { useGlobal } from '../../context/AppContext'
const Bookings = () => {
  const { state, getTableStats } = useGlobal();
  const [series, setSeries] = useState(data.series);
  const changeSeries = () => {
    const newData = series.map((item) => {
      return item
    })
    setSeries(newData)
  }
  useEffect(() => {
    getTableStats("events");
    changeSeries()
  }, []);
  return (
    <StatsHolder text="bookings overview">
          <Chart
              options={data.options}
        series={series}
        type="bar"
      />
    </StatsHolder>
  );
}

export default Bookings