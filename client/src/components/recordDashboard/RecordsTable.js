import React from 'react'
import {SelectTable} from "../userDashboard/SelectTable"
import UpdateRecord from './UpdateRecord'
const RecordsTable = () => {
  const sortData = ['state', 'description',]
  const headings = ['#','description','state','name','city','country','updated at','created at',"edit"]
  return (
    <SelectTable typeDataB="report" typeData="reports" update={<UpdateRecord/> } sortData={sortData} headings={headings}/>
  )
}

export default RecordsTable