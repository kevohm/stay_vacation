import React from 'react'
import styled from "styled-components"
import tw from "twin.macro"
import { ListFooter } from '../smaller/list/ListFooter'
import { footerData } from "../utils/landing/footer"
import { contactData } from "../utils/landing/contact";
import { Contact } from "./Contact";
import {Email} from "./Email"
import { useLocation } from 'react-router-dom'
const Footer = () => {
  const location = useLocation()
  return (
      <Main>
          <div className="top">
      </div>
          <div className="bottom">
        {(location.pathname === "/") ? <Email /> : <></>}
              <div className='links'>
                  <div className='list-links'>
                  {
                      footerData.map((item)=><ListFooter header={item.title} data={item.data}/>)
                  }
                  </div>
                  <Contact data={contactData} />
              </div>
        <div className='copyright'>
          <p>&copy; 2018-2022 Stay Vacations - All Rights Reserved.</p>
        </div>
      </div>
    </Main>
  );
}

export default Footer
const Main = styled.footer`
  ${tw`w-full flex flex-col items-center`}
  .top {
    ${tw` w-full bg-white min-h-[188px]`}
  }
  .bottom {
    ${tw`relative w-full flex flex-col justify-end bg-darkBlue space-y-16 sm:space-y-28 min-h-[495px] pt-0 sm:pt-24`}
    .links {
      ${tw`w-full flex flex-col-reverse sm:flex-row justify-between px-5 sm:px-10`}
      .list-links {
        ${tw`w-max flex items-start mt-12 sm:mt-0 space-x-16 md:space-x-48`}
      }
    }
    .copyright {
      ${tw`w-full text-white text-sm flex items-center justify-center p-5 `}
      border-top:1px solid white;
    }
  }
`;