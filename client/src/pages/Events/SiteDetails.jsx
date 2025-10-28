import React from 'react'
import {Main} from "./styles"
import Wrapper from '../../components/info/Wrapper'

const SiteDetails = ({children}) => {
  return (
    <Main>
      <Wrapper element={children}/>
    </Main>
  )
}

export default SiteDetails