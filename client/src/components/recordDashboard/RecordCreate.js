import React, { useState } from 'react'
import {ManageData} from "../smaller/frame/ManageData"
import records from "../../assets/svg/record.svg"
import RecordForm from './RecordForm'
import styled from 'styled-components'
import { UpdateForm } from '../bookingsDashboard/UpdateForm'
import { SelectEntityTable } from '../userDashboard/SelectEntityTable'
import tw from 'twin.macro'
const RecordCreate = () => {
    const [open, setOpen] = useState(false)
    const sortData = ['created at', 'name', ' description', 'validity', 'city', ' country']
  const headings = ['#','image','name','description','category','price','city','country','validity','createdAt','UpdatedAt']
    const handleChange = ()=>{
        setOpen(!open)
    }
  return (
    <Main>
        {open && <div className='popup'>
        <SelectEntityTable changeOpen={handleChange} typeDataB="event" typeData="events" update={<UpdateForm/> } sortData={sortData} headings={headings}/>
        </div>}
        <ManageData element={<RecordForm changeOpen={handleChange}/>} img={records} title="Create Report" />
    </Main>
  )
}

export default RecordCreate

const Main = styled.div`
${tw`relative`}
.popup{
    ${tw`rounded-lg absolute top-1/2 left-1/2 w-full h-full bg-white z-20`}
    transform:translate(-50%,-50%);
}
`