import React, {useState}from 'react'
import styled from 'styled-components'
import { useGlobal } from "../../context/AppContext";
import { FormError } from "../smaller/error/FormError";
import { FaTimes } from 'react-icons/fa';
import tw from 'twin.macro'

const UpdatePayment = () => {
  const {state,updateError,toggleUpdate,updatePayment} = useGlobal()
  const paymentId = state.payment_startUpdate.current._id
  const prices = state.payment_startUpdate.current.event.price_choices
  const [data, setData] = useState({
    state: state.payment_startUpdate.current.state,
    category: state.payment_startUpdate.current.category
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    const {state,category} = data
    const amount =  prices.find((i)=>i.category === category).price
        if(!state || !category){
          changeErr({
              msg: "All fields are required",
              state: "",
              show: true,
            })
            return
        }
        updatePayment(paymentId ,{state,category,amount})
  }
  const changeErr = (err) => {
    updateError('payment', err)
}
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
      <div className="header">
                <p>Update</p>
                <FaTimes
                    className="icon"
                    onClick={() =>
                        toggleUpdate("payment", {
                          "state": "",
                        })
                    }
                />
            </div>
            {state.payment_startUpdate.err.show && (<FormError err={state.payment_startUpdate.err}/>)}
      <div>
        <select
          value={data.state}
          name="state"
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled={true}>
            Choose How The Event Was
          </option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <div>
        <select
          value={data.category}
          name="category"
          onChange={(e) => handleChange(e)}
        >
            <option value="" disabled={true}>
            Choose Category
          </option>{
          state.payment_startUpdate.current.event.price_choices.map((i,index)=><option key={index} value={i.category}>{i.category}</option>)
          }
        </select>
      </div>
      <div className="total">
            <p>Total Price: {prices.find((i)=>i.category === data.category) ?
            prices.find((i)=>i.category === data.category).price : 0
            }</p>
          </div>
      <div className="submit">
        <input type="submit" value="Update" />
      </div>
    </Main>
  )
}

export default UpdatePayment

const Main = styled.form`
${tw`relative w-full bg-white max-w-[300px] md:max-w-max space-y-5 p-5 rounded-lg`}
      > div {
        ${tw`w-full max-w-none sm:max-w-[440px] flex flex-col space-y-5`}
        p{
            font-family: poppinsMedium;
            ${tw`capitalize text-sm text-[rgba(1, 49, 91, .9)]`}
        }
        textarea, input, select {
          font-family: poppinsMedium;
          ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
          ::placeholder {
            ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
          }
        }
        textarea {
          ${tw`w-full`}
          resize: vertical;
        }
      }
  .flex-row{
    ${tw`flex-row`}
  }
  .file {
    ${tw``}
    label {
      ${tw`relative flex items-center`}
      span {
        font-family: poppinsMedium;
        ${tw`absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1, 49, 91, .6)] bg-[rgba(1, 49, 91, .1)] rounded-l-lg`}
      }
      input {
        ${tw`bg-white cursor-pointer`}
        ::file-selector-button {
          ${tw`cursor-pointer pl-8 `}
          opacity: 0;
        }
      }
    }
    .info{
        ${tw`flex items-center space-x-1 pt-2`}
        p{
            ${tw`text-xs text-[rgba(1, 49, 91, .5)]`}
        }.info-icon{
            ${tw`text-xs text-[rgba(1, 49, 91, .7)]`}
        }
    }
  }
  .lined-up-now {
    ${tw`flex flex-col md:flex-row items-start space-y-5 md:items-center md:space-y-0 space-x-0 md:space-x-5 `}
  }
  .lined-up {
    ${tw`text-[rgba(1, 49, 91, 1)] flex items-center space-x-5 mb-5`}
    > input {
      ${tw``}
    }

    p {
      ${tw`p-2 text-[rgba(1, 49, 91, .5)]`}
    }
    .div-icon-add {
      ${tw`flex items-center text-[rgba(1, 49, 91, 1)]`}
    }
    .icon-add {
      ${tw`p-2 rounded-full border-solid border border-[rgba(1, 49, 91, 1)] text-[rgba(1, 49, 91, 1)] text-4xl `}
    }
  }
  .header {
    ${tw`flex flex-row justify-between items-center py-1`}
    p { 
      font-family: poppinsMedium;
      ${tw`text-darkBlue text-base`}
    }
    .icon {
      ${tw`text-darkBlue text-base`}
    }
  }
  .submit {
    
    ${tw`w-full flex items-center justify-end`}
    input {
        font-family: poppinsMedium;
          ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
          ::placeholder {
            ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
          }
      ${tw`cursor-pointer bg-green border-none text-darkBlue w-full hover:bg-[rgba(113, 242, 139, .9)]`}
    }
  }
  .header {
    ${tw`flex flex-row justify-between items-center space-y-0 space-x-0 py-1`}
    p { 
      font-family: poppinsMedium;
      ${tw`text-darkBlue text-base`}
    }
    .icon {
      ${tw`text-darkBlue text-base cursor-pointer`}
    }
  }
  .update-message{
    ${tw`py-5 border border-[rgba(0,0,0,.2)] border-solid w-3/4 min-w-[200px] flex items-center rounded-lg bg-white absolute top-1/2 left-1/2`}
    transform:translate(-50%, -50%);
  }
`;
