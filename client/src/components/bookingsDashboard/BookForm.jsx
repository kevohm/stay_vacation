import React, { useRef }  from 'react'
import { ManageData } from "../smaller/frame/ManageData";
import CreateForm from "./CreateForm";
import events from "../../assets/svg/events.svg"
const BookForm = () => {
  const createInput = useRef()
  const handleScroll = ()=>{
    if(!createInput.current) return;
    createInput.current.scrollIntoView({ behavior: 'smooth' })
  }
  return <ManageData element={<CreateForm handleScroll={handleScroll} />} img={events} title="Create Booking" />;
}

export default BookForm