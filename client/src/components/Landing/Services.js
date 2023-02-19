import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Header} from "../smaller/header/Header"
import {Service} from "../smaller/cards/Service"
import { servicesData } from "../utils/services"
import InputData from "./InputData" 
const Services = () => {
  return (
    <Main>
      <InputData/>
      <Header text="Why you should choose us ?" />
      <div className='services'>
        {
        servicesData.map( 
          (item) => < Service key={item.title} {...item }/>
        )
      }
      </div>
    </Main>
  )
}

export default Services

const Main = styled.section`
  ${tw`w-full relative flex flex-col items-center space-y-[100px] pt-[100px] px-12 pb-[150px]`}
  .services {
    ${tw`w-full lg:max-w-max justify-items-center grid grid-cols-[repeat(auto-fit, minmax(235px, 1fr))] gap-12 md:gap-10 lg:flex lg:flex-row lg:items-center space-x-0 lg:space-x-[50px]`}
  }
`;