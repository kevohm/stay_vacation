import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvent } from '../context/EventContext'
import {Main} from "./BookForm"

export const BookFormReadOnly = () => {
    const {stages,payNow,setGlobalErrors,setGlobalResponse} = useEvent()
    const {eventId} = useParams()
    const navigate= useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        payNow(eventId, stages.user.id).then((res)=>{
            const {data} = res.json()
            console.log(data)
            setGlobalErrors({
                msg:"Paid for Event. Check Profile for details.",
                type:"success",
                show:true
              })
            navigate("/events")
        }).catch((error)=>{
            setGlobalResponse(error)
        })
    }
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
    <header>payment details</header>
    <div className="all-input">
      <div className="left">
      <div className="input">
          <label>username</label>
          <p>{stages.user.username}</p>
        </div>
        <div className="input">
          <label>email</label>
          <p>{stages.user.email}</p>
        </div>
      </div>

      <div className="right"> 
        <div className="input">
          <label>phone number</label>
          <p>{stages.user.phone_number}</p>
        </div>
        <div className="input">
          <label>total amount</label>
          <p>{stages.price.price}</p>
        </div>
      </div>
    </div>
    <div className="submit">
        <input type="submit" value="Pay Now"/>
    </div>
  </Main>
  )
}