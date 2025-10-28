import React from 'react'
import { UpdateForm } from './UpdateForm'
import {SelectTable} from "../userDashboard/SelectTable"
const BookTable = () => {
  const sortData = ['created at', 'name', ' description', 'validity', 'city', ' country']
  const headings = ['#','image','name','description','category','price','amenities','city','country','validity','createdAt','UpdatedAt',"edit"]
  return (
    <SelectTable typeDataB="event" typeData="events" update={<UpdateForm/> } sortData={sortData} headings={headings}/>
  )
}

export default BookTable