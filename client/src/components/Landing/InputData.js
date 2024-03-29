import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import { InputBtnRounded } from "../smaller/input/InputBtnRounded";
import { Input } from "../smaller/input/Input"
import {inputData} from "../utils/landing/services"
import { useState } from 'react';
import { useEvent } from '../Events/context/EventContext';
import { useNavigate } from 'react-router-dom';
import { minDate } from '../Events/context/utils';

const InputData = () => {
    const [data, setData] = useState(inputData);
    const [body,setBody] = useState({city:"",date:minDate,min:0,max:300000})
    const navigate = useNavigate()
    const {storeFilter,setFilter} = useEvent()
    const handleChange = (e) => {
        const { name , value} = e.target
        setBody({...body,[name.toLowerCase()]:value})
        const newData = data.map((item) => {
            if (item.name === name) {
            return {...item, value};
            }
            return item
        });
        setData(newData)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        storeFilter(body.city,body.date,body.min,body.max,"",false)
        setFilter({
          search: body.city,
          category: "",
          price: { min: body.min, max: body.max},
          validity: body.date,
          expired: false
        })
        navigate("/events")
    }
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <header>
        <p>Where are you traveling to ?</p>
          </header>
      <div className="inputData">
        {data.map((item) => (
          <Input key={item.title} {...item} handleChange={handleChange}/>
        ))}
      </div>
      <div className="submitData">
        <InputBtnRounded text="Search" bg="#FFA402" />
      </div>
    </Main>
  );
}

export default InputData
const Main = styled.form`
  ${tw`z-10 w-[calc(100% - 16px)] sm:w-full max-w-[450px]  md:max-w-[550px] lg:max-w-[700px] absolute top-0 left-1/2 flex flex-col items-start space-y-3 sm:space-y-5 bg-white rounded-lg text-darkBlue py-5 px-4 sm:px-6 md:px-12`}
  transform:translate(-50%, -50%);
  box-shadow: 0px 4px 16px 0px rgba(138, 154, 234, 0.25);
  header {
    p {
      ${tw`text-lg sm:text-xl`}
      font-family: poppinsMedium;
    }
  }
  .inputData {
    ${tw`w-full flex items-center space-x-3 sm:space-x-5`}
  }
   .submitData {
    ${tw`w-full flex flex-col items-end`}
  }
`;
