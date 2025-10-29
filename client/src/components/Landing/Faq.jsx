import React from 'react'

import { Header } from '../smaller/header/Header'
import { SingleFag } from "../smaller/faq/SingleFag"
import {faqData} from "../utils/landing/faq"
const Faq = () => {
  return (
    <div className="w-full pt-[50px] px-3 sm:px-12 pb-[150px] space-y-36 ">
      <Header text="Frequently Asked Questions !" />
      <div className="faq flex flex-col items-center space-y-5">
        {faqData.map((item, index) => (
          <SingleFag key={index} {...item} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default Faq

