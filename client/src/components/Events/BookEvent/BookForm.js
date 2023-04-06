import React, {useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Loader } from "../../smaller/load/Loader";
import { FormError } from "../../smaller/error/FormError";
import { useEvent } from "../context/EventContext";
import { verifyData } from "../../utils/Events/BookForm";
import { BookFormReadOnly } from "./BookFormReadOnly";
import { useGlobal } from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const body = {
  username:"",
  email:"",
  password:"",
  phone_number:"",
  confirmPassword:""
}

const BookForm = () => {
  const [data,setData] = useState(body)
  const {book_event,stages,setBookingError,registerBoookingUser,getBookingUser,setBookingData,setBookingStage} = useEvent()
  const {state} = useGlobal()
  const handleData = (e)=>{
    const {name,value} = e.target
    setData({...data, [name]:value})
  }
const handleSubmut = (e)=>{
  e.preventDefault()
  if(verifyData({...data, changeErr})){
    changeErr({
      msg:"Processing your data. This may take a minute...",
      state:"success",
      show:true
    })
    const {email,username,password,phone_number} = data
    registerBoookingUser({email,username,password,phone_number})
  }
}
  const changeErr = (err)=>{
    setBookingError(err)
  }
  useEffect(()=>{
    getBookingUser().then((res)=>{
      const {data} = res
      console.log(data)
      setBookingStage(2)
      setBookingData("user",data.details)
    }).catch((err)=>{
      setBookingStage(1)
    })
},[state.user.id]) 
  if(book_event.loading){
    return <Main>
       <header>payment details</header>
        <Loader/>
    </Main>
}

if(stages.level && Number(stages.level) === 2 && stages.user !== null){
  return <BookFormReadOnly/>
}
  return (
    <Main onSubmit={(e)=>handleSubmut(e)}>
      <header>payment details</header>
      {stages.err.show && <div className="error">
        <FormError {...stages.err}/>
      </div>}
      <div className="all-input">
        <div className="left">
        <div className="input">
            <label>username</label>
            <input type="text" name="username" value={data.username} onChange={(e)=>handleData(e)} placeholder="(e.g) John254"/>
          </div>
          <div className="input">
            <label>password</label>
            <input type="password" name="password" value={data.password} onChange={(e)=>handleData(e)}  placeholder="Please use a strong password" />
          </div>
          <div className="input">
            <label>confirm password</label>
            <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={(e)=>handleData(e)}  placeholder="Confirm your password" />
          </div>
          
        </div>
        <div className="right"> 
          <div className="input">
            <label>phone number</label>
            <input type="text" value={data.phone_number} name="phone_number" onChange={(e)=>handleData(e)}  placeholder="(e.g) +254712121212"/>
          </div>
          <div className="input">
            <label>email</label>
            <input type="email" name="email" value={data.email} onChange={(e)=>handleData(e)}  placeholder="(e.g) john@gmail.com" />
          </div>
        </div>
      </div>
      <div className="submit">
        <input type="submit" value="next"/>
      </div>
    
    </Main>
  );
};

export default BookForm;
export const Main = styled.form`
  box-shadow: 0px 2px 6px 0px rgba(1, 49, 91, 0.25);
  ${tw`bg-white w-full rounded-lg p-5`}
  >header {
    font-family: montserratSemi;
    ${tw`capitalize text-darkBlue text-base mb-5`}
  }
  .error{
    ${tw`my-2`}
  }
  .all-input {
    ${tw`w-full max-w-[400px] md:max-w-none flex flex-col md:flex-row space-x-0 space-y-5 md:space-y-0 md:space-x-5`}
    >div{
      ${tw`flex flex-col space-y-5`}
      .input {
        ${tw`flex flex-col space-y-2 items-start`}
        label {
          font-family: montserratSemi;
          ${tw`capitalize text-darkBlue text-sm`}
        }
        input {
          ${tw`w-full py-2 text-sm px-2.5 rounded-lg border text-[rgba(0,0,0,.7)] border-solid border-[rgba(138, 154, 234, .5)]`}
          font-family:poppinsMedium;
          ::placeholder {
            ${tw`text-sm text-[rgba(0,0,0,.3)]`}
          }
        }
        input:focus {
          ${tw`border border-solid border-[rgba(138, 154, 234, .5)]`}
        }
        input:-webkit-autofill {
          -webkit-text-fill-color: rgba(0, 0, 0, 0.7) !important;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
        .prices{
          ${tw`flex flex-wrap`}
          .price{
            ${tw`w-max mr-2.5 mb-2.5 flex space-x-2`}
            label{
              font-family:montserratMedium;
              ${tw`text-sm text-[rgba(0,0,0,.8)]`}
            }
            input{
              ${tw`text-white border-orange border border-solid`}
              appearance: none;
              width:.5em;
              height:.8em;
              ${tw`bg-white`}
              ${tw`flex items-center justify-center`}
            }
            input::before {
              content: "✔";
              ${tw`text-xs`}
              transform: scale(0);
              transition: 120ms transform ease-in-out;
            }
            input:checked{
              ${tw`bg-orange`}
            }
            input:checked::before {
              transform: scale(1);
            }
          }
        }
      }
    }
  }

  .submit{
    ${tw`flex items-center justify-end mt-5`}
    input {
          ${tw`w-max py-2 text-sm px-2.5 rounded-lg border-none bg-green text-darkBlue`}
          font-family:poppinsMedium;
        }
  }
  .total{
    ${tw`flex space-x-2 text-sm`}
    p{
      font-family:poppinsMedium;
      ${tw`text-[rgba(0,0,0,.5)]`}
    }
    span{
      font-family:montserratSemi;
      ${tw`text-darkBlue capitalize`}
    }
  }
`;
