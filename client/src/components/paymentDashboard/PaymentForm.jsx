import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { Main } from "../css/dashboard";
import { FormError } from "../smaller/error/FormError";
const body = {
  currency: "Ksh",
  category: "",
};
const PaymentForm = ({ changeOpen, changeOpenUsers }) => {
  const { state, setForm, defaultSingleData, createPayment ,updateError } = useGlobal();
  const [price,setPrice] = useState("")
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = state.payment_on.event._id;
    const userID = state.payment_on.user._id;
    if (!id) {
      changeErr({
        msg: "Please provide an event to make payments on",
        type: "warning",
        show: true,
      });
      return
    }
    if (!userID) {
      changeErr({
        msg: "Please provide a user to pay for event",
        type: "warning",
        show: true,
      });
      return
    }
      const { category,currency} = data;
      if (!category || !currency) {
        changeErr({
          msg: "All fields are required",
          type: "warning",
          show: true,
        });
        return;
      }
      createPayment(id,userID,category,currency);
  };
  const changeErr = (err) => {
    updateError(err);
  };
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      {<div>
        <select
          value={data.category}
          name="category"
          onChange={(e) => handleChange(e)}
        >
          {
            Object.keys(state.payment_on.event).length === 0 ?
            <option value="" disabled={true}>
            Choose an event first
          </option>
            :<>
            <option value="" disabled={true}>
            Choose Category
          </option>{
          state.payment_on.event.price_choices.map((i,index)=><option key={index} value={i.category}>{i.category}</option>)
          }
            </>
              
          }
          
        </select>
      </div>}
      <div>
        <select
          value={data.currency}
          name="currency"
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled={true}>
            Choose Currency For Payment
          </option>
          <option value="Ksh">Kenyan Shillings</option>
        </select>
      </div>
      {Object.keys(state.payment_on.event).length  === 0 || <div className="prices">
        
      {
            state.payment_on.event.price_choices.map((i,index)=>{
         return  <div key={index}>
            <p>Price {i.price} Per {i.category}</p>
          </div>
            })
          }
          <div className="total">
            <p>Total Price: {state.payment_on.event.price_choices.find((i)=>i.category === data.category) ?
            state.payment_on.event.price_choices.find((i)=>i.category === data.category).price : 0
            }</p>
          </div>
      </div>}
      <div className="submit">
        <input type="submit" value="Create" />
      </div>
      {Object.keys(state.payment_on.event).length === 0 || (
        <div className="event-viewer">
          <p>Event you are writting a report on</p>
          <div>
            <p>Name</p>
            <p>{state.payment_on.event.name}</p>
          </div>
          <div>
            <p>City</p>
            <p>{state.payment_on.event.city}</p>
          </div>
          <div>
            <p>Country</p>
            <p>{state.payment_on.event.country}</p>
          </div>
          <div className="image">
            <p>Image</p>
            <img src={state.payment_on.event.image[0]} alt="event" />
          </div>
        </div>
      )}
      <div className="submit">
        <button
          className="choice-btn"
          onClick={(e) => {
            e.preventDefault();
            defaultSingleData("events");
            changeOpen();
          }}
        >
          Change Event
        </button>
      </div>
      {Object.keys(state.payment_on.user).length === 0 || (
        <div className="event-viewer">
          <p>User to make payments for</p>
          <div>
            <p>Username</p>
            <p>{state.payment_on.user.username}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{state.payment_on.user.email}</p>
          </div>
          <div>
            <p>Phone</p>
            <p>{state.payment_on.user.phone_number}</p>
          </div>
        </div>
      )}
      <div className="submit">
        <button
          className="choice-btn"
          onClick={(e) => {
            e.preventDefault();
            defaultSingleData("users");
            changeOpenUsers();
          }}
        >
          Change User
        </button>
      </div>
    </Main>
  );
};

export default PaymentForm;
