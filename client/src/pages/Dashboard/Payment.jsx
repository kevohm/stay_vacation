import React from 'react'
import {CreatePayment,PaymentTable} from "../../components/paymentDashboard/index"
import {Main} from "../styles"
const Payment = () => {
  return (
    <Main>
      <CreatePayment/>
      <PaymentTable/>
    </Main>
  )
}

export default Payment