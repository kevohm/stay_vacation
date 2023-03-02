import React  from 'react'
import { ManageData } from "../smaller/frame/ManageData";
import CreateForm from "./CreateForm";
import events from "../../assets/svg/events.svg"
const BookForm = () => {
     
  return <ManageData element={<CreateForm />} img={events} />;
}

export default BookForm