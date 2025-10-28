import React from 'react'
import { SelectTable } from '../userDashboard/SelectTable'
import UpdatePayment from './UpdatePayment'

const PaymentTable = () => {
    const sortData = ['state', 'description',]
    const headings = ['#','name','city','country','amount','category','state','username','Phone number','updated at','created at',"edit"]
    return (
      <SelectTable typeDataB="payment" typeData="payments" update={<UpdatePayment/> } sortData={sortData} headings={headings}/>
    )
}

export default PaymentTable