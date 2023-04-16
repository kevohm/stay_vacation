import React , {useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGlobal } from '../../../context/AppContext'
import { useEvent } from '../context/EventContext'
import { FormError } from '../../smaller/error/FormError'
import {Main} from "./BookForm"

export const BookFormReadOnly = () => {
    const { book_event_id,stages,payNow,setGlobalErrors,setGlobalResponse,book_event,setBookingError} = useEvent()
    const [data,setData] = useState({price:0,category:""})
    const {name} = useParams()
    const navigate= useNavigate()
    const handlePrice = (price,category)=>{
      setData({price,category})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(data.price === 0){
          setBookingError({
            msg:"Please choose a price plan.",
            state:"warning",
            show:true
          })
          return
        }
        payNow( book_event_id, stages.user.id,data.category).then((res)=>{
          setBookingError({
            msg:"Paid for Event. Check Profile for details.",
            state:"success",
            show:true
          })
            setGlobalErrors({
                msg:"Paid for Event. Check Profile for details.",
                type:"success",
                show:true
              })
            setTimeout(()=>navigate(`/events/${name}`),3000)
        }).catch((error)=>{
          if(error.response && error.response.data){
            setBookingError({
              msg:error.response.data.msg,
              state:"warning",
              show:true
            })
          }
            setGlobalResponse(error)
        })
    }
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
    <header>payment details</header>
    {stages.err.show && <div className="error">
        <FormError {...stages.err}/>
      </div>}
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
        {
          book_event.data && <>  
        <div className="input">
        <label>Price</label>
        <div className="prices">
        {
          book_event.data.price_choices.map((item,index)=>{
            const {price,category} = item
            const checked = price === data.price && category === data.category
          return <div className="price" key={index}>
          <input type="radio" name="price_choice" onChange={()=>handlePrice(price,category)}  checked={checked}/>
          <label>ksh. {price.toLocaleString("en-US")} per {category}</label>
          </div>
          })
        }
        </div>
      </div>
      <div className="total">
          <span>total amount</span>
          <p>{data.price.toLocaleString("en-us")}</p>
      </div>
          </>
        }
      </div>
    </div>
    <div className="submit">
        <input type="submit" value="Pay Now"/>
    </div>
  </Main>
  )
}