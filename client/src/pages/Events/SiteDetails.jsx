import React from 'react'
// import {Main} from "./styles"
import Wrapper from '../../components/info/Wrapper'

const SiteDetails = ({children}) => {
  return (
   <section className='min-h-[calc(100vh - 653px)] bg-[rgba(1, 49, 91, .05)] p-6 md:p-12'>
      <Wrapper element={children}/>
    </section>
  )
}

export default SiteDetails