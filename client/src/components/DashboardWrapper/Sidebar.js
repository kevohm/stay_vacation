import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { ListDashboard } from "../smaller/list/ListDashboard"
import {sidebarData} from "../utils/DashboardWrapper/sidebar"
const Sidebar = () => {
  return (
    <Main>
      {sidebarData.map((item) => {
        const { text } = item;
        return <ListDashboard key={text} {...item} />
      })}
    </Main>
  );
}

export default Sidebar

const Main = styled.aside`
  ${tw`w-[60px] sm:w-[160px] md:w-[200px] h-full px-2.5 pt-8 space-y-5 flex flex-col items-center`}
  overflow-y:scroll;
`;