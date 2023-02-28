import React, { useState } from 'react'
import { StatsHolder } from "../smaller/cards/StatsHolder"
import Chart from "react-apexcharts";
import { usersData as data } from '../utils/DashboardWrapper/users';
import { useGlobal } from '../../context/AppContext';
import { useEffect } from 'react';
const Users = () => {
  const { state, getTableStats } = useGlobal()
  const [type, setType] = useState("day")
  const changeType = (e) => {
    const {value} = e.target
    setType(value)
    getTableStats("users", value);
  }
  useEffect(() => {
    getTableStats("users", type)
  },[])
  return (
    <StatsHolder text="user overview" button={true} type={type} changeType={changeType}>
      <Chart
        options={{
          ...data.options,
          xaxis: {
            ...data.options.xaxis,
            categories: state.table.users.category,
          },
        }}
        series={[{ ...data.series[0], data: state.table.users.series }]}
        type="area"
      />
    </StatsHolder>
  );
}

export default Users
