import React from 'react'
import { StatsHolder } from "../smaller/cards/StatsHolder"
import Chart from "react-apexcharts";
import { usersData as data } from '../utils/DashboardWrapper/users';
import { useGlobal } from '../../context/AppContext';
import { useEffect } from 'react';
const Users = () => {
  const { state, getTableStats } = useGlobal()
  useEffect(() => {
    getTableStats("users")
  },[])
  return (
    <StatsHolder text="user overview">
      <Chart
        options={data.options}
        series={data.series}
        type="area"
      />
    </StatsHolder>
  );
}

export default Users
