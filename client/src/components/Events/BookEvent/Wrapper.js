import React from 'react'
import { RelatedWrapper } from '../Single/RelatedWrapper'
import BookSingle from './BookSingle'

const Wrapper = () => {
  return (
    <RelatedWrapper element={<BookSingle/>}/>
  )
}

export default Wrapper