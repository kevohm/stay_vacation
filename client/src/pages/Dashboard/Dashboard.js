import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { Stats, Graph, AllTable, Payments } from "../../components/dashboard/index";
const Dashboard = () => {
  return (
    <Main>
      <Stats />
      <Graph />
      <AllTable />
      <Payments/>
    </Main>
  );
}

export default Dashboard
const Main = styled.section`
${tw`w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0`}
overflow-y:scroll;
`