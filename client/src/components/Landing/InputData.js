import React from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import { InputBtnRounded } from "../smaller/input/InputBtnRounded";
import { Input } from "../smaller/input/Input"
import {inputData} from "../utils/landing/services"
import { useState } from 'react';
const InputData = () => {
    const [data, setData] = useState(inputData);
    const [error, setError] = useState({msg:"", state:false});
    const handleChange = (e) => {
        const { name } = e.target
        const newData = data.map((item) => {
            const {error} = item
            if (item.name === name) {
                setError({msg:`${item.title} has an error`, state:true});
            return {...item, error:!error};
            }
            return item
        });
        setData(newData)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <header>
        <p>Where are you traveling to ?</p>
          </header>
          {
              error.state ? <p>{error.msg}</p> :<></>
          }
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
  ${tw`w-[calc(100% - 16px)] sm:w-full max-w-[450px]  md:max-w-[550px] lg:max-w-[700px] absolute top-0 left-1/2 flex flex-col items-start space-y-3 sm:space-y-5 bg-white rounded-lg text-darkBlue py-5 px-4 sm:px-6 md:px-12`}
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
