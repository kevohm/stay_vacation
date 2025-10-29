import React from 'react'
import {CreatePayment,PaymentTable} from "../../components/paymentDashboard/index"
// import {Main} from "../styles"
const Payment = () => {
  return (
      <section className="w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0 overflow-y-scroll ">
      <CreatePayment/>
      <PaymentTable/>
    </section>
  )
}

export default Payment