import React from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { ListDashSmall } from '../smaller/list/ListDashSmall'
import {sidebarData} from "../utils/DashboardWrapper/sidebar"
const Sidebar = () => {
  return (
    <Main>
      {sidebarData.map((item) => {
        const { text } = item;
        return <ListDashSmall key={text} {...item} />
      })}
    </Main>
  );
}

export default Sidebar

const Main = styled.aside`
  ${tw`w-[60px] sm:w-[160px] md:w-[200px] h-full px-2.5 pt-8 space-y-5 hidden sm:flex flex-col items-center`}
  overflow-y:scroll;
`;