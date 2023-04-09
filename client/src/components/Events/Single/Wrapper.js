import React from 'react'
import Single from './Single'
import { RelatedWrapper } from './RelatedWrapper'

const Wrapper = () => {
  return (
    <RelatedWrapper element={<Single/>} comments={true}/>
  )
}

export default Wrapper
