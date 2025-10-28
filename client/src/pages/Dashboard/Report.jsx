import React from 'react'
import {RecordCreate,RecordsTable} from "../../components/recordDashboard/index"
import {Main} from "../styles"
const Report = () => {
  return (
    <Main>
      <RecordCreate/>
      <RecordsTable/>
    </Main>
  )
}

export default Report