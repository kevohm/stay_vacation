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
  ${tw`min-w-[4rem] max-w-[5rem] sm:max-w-max sm:min-w-min w-full sm:w-64 h-full px-2.5 pt-8 space-y-5 flex flex-col items-center`}
  overflow-y:scroll;
`;