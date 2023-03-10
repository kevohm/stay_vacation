import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Navbar, Sidebar } from "../../components/DashboardWrapper/index" 
import { useGlobal } from "../../context/AppContext"
import {env} from "../../context/appActions"
const DashboardWrapper = () => { 
  const { state } = useGlobal()
  if (state.user.role !== env.ADMIN) {
    return <Navigate to="/" />
  }
  return (
    <Main>
          <Navbar />
          <div className='body'>
              <Sidebar />
              <section className='inner-body'>
              <Outlet/>
              </section>
      </div>
    </Main>
  ); 
}

export default DashboardWrapper

const Main = styled.main`
  ${tw`w-full h-screen flex flex-col items-center`}
  .body {
    ${tw`w-full h-full flex`}
  }
  .inner-body {
    ${tw`w-[calc(100% - 60px)] sm:w-[calc(100% - 160px)] md:w-[calc(100% - 200px)] h-full bg-[rgba(255, 164, 2, .1)] pr-5`}
  }
`;