import React from 'react'
import {RecordCreate,RecordsTable} from "../../components/recordDashboard/index"
// import {Main} from "../styles"
const Report = () => {
  return (
      <section className="w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0 overflow-y-scroll ">
      <RecordCreate/>
      <RecordsTable/>
    </section>
  )
}

export default Report