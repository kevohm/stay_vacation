import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Navbar, Sidebar } from "../../components/DashboardWrapper/index" 
import { useGlobal } from "../../context/AppContext"
import { GlobalError } from '../../components/smaller/error/GlobalError'
import { Outlet } from 'react-router-dom'

const DashboardWrapper = () => { 
  const { state,closeGlobalErr } = useGlobal()
  return (
    <Main>
          <GlobalError {...state.GlobalError} close={closeGlobalErr}/>
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
  ${tw`relative w-full h-screen flex flex-col items-center bg-white `}
  .body {
    ${tw`w-full h-full flex`}
  }
  .inner-body {
    ${tw`w-full sm:w-[calc(100% - 160px)] md:w-[calc(100% - 200px)] h-full bg-[rgba(255, 164, 2, .1)] pr-5`}
  }
`;