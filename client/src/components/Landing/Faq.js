import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Header } from '../smaller/header/Header'
import { SingleFag } from "../smaller/faq/SingleFag"
import {faqData} from "../utils/faq"
const Faq = () => {
  return (
    <Main>
      <Header text="Frequently Asked Questions !"/>
      <div className='faq'>
        {faqData.map((item, index) => (
          <SingleFag key={index} {...item} index={index + 1} />
        ))}
      </div>
    </Main>
  );
}

export default Faq

const Main = styled.section`
${tw`w-full pt-[50px] px-3 sm:px-12 pb-[150px] space-y-36 `}

.faq{
  ${tw`flex flex-col items-center space-y-5`}
}
`