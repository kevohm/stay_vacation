import React,{useState} from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import UpdateUser from "../userDashboard/UpdateUser"
import { UpdateForm } from '../bookingsDashboard/UpdateForm'
import { ManageData } from '../smaller/frame/ManageData'
import { SelectEntityTable } from '../userDashboard/SelectEntityTable'
import PaymentForm from './PaymentForm'
import payment from "../../assets/svg/payment.svg"
const CreatePayment = () => {
  const [open, setOpen] = useState(false)
  const [openUsers, setOpenUsers] = useState(false)
    const sortData = ['created at', 'name', ' description', 'validity', 'city', ' country']
  const headings = ['#','image','name','description','category','price','city','country','validity','createdAt','UpdatedAt']
  const sortDataUsers = ["email", "Phone number", "username", "created at", "updated at"]
  const headingsUsers = [
    "#",
    "email",
    "username",
    "Phone number",
    "created at",
    "updated at",
    "role",
    "edit",
  ]
  const handleChange = ()=>{
        setOpen(!open)
    }
    const changeUsers = ()=>{
      setOpenUsers(!openUsers)
  }
  return (
    <Main>
        {open && <div className='popup'>
        <SelectEntityTable changeOpen={handleChange} typeDataB="event" typeData="events" update={<UpdateForm/> } sortData={sortData} headings={headings} validation={false}/>
        </div>}
        {openUsers && <div className='popup'>
        <SelectEntityTable changeOpen={changeUsers} typeDataB="user" typeData="users" update={<UpdateUser/> } sortData={sortDataUsers} headings={headingsUsers} validation={false}/>
        </div>}
        <ManageData element={<PaymentForm changeOpen={handleChange} changeOpenUsers={changeUsers}/>} img={payment} title="Create Payment" />
    </Main>)
}

export default CreatePayment

const Main = styled.div`
${tw`relative`}
.popup{
    ${tw`rounded-lg absolute top-1/2 left-1/2 w-full h-full bg-white z-20`}
    transform:translate(-50%,-50%);
}
`