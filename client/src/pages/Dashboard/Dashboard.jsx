import React from 'react'
import { Stats, Graph, AllTable, Payments } from "../../components/dashboard/index";
const Dashboard = () => {
  return (
    <section  className='w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0 overflow-y-scroll'>
      <Stats />
      <Graph />
      <AllTable />
      <Payments/>
    </section>
  );
}

export default Dashboard

