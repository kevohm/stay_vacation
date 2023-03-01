import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../context/AppContext'
import { verify } from '../utils/userDashboard/verifyForm'
import { FormError } from '../smaller/error/FormError'
const body = {
  "email": "",
  "username": "",
  "phone_number":"",
  "password": "",
  "confirm_password":""
}
export const UserForm = () => {
  const [data, setData] = useState(body)
  const { handleUser, state, setForm, getUsers } = useGlobal();
  const handleChange = (e) => {  
    e.preventDefault()
    const { name, value } = e.target 
    setData({...data, [name]:value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const { username, email, phone_number, password } = data
    if (!verify(data, changeErr)) {
      handleUser({ username, email, phone_number, password }, "register");
      getUsers(1,10)
    }
  }
  const changeErr = (err) => {
    setForm("user",err);
  }
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      {state.user_form.show && <FormError err={state.user_form} />}
      <div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          value={data.phone_number}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          value={data.confirm_password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="submit">
        <input type="submit" value="Create" />
      </div>
    </Main>
  );
}
const Main = styled.form`
  ${tw`w-full max-w-none sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5`}
  > div {
    ${tw`w-full max-w-none sm:max-w-[440px]`}
    input {
      font-family: poppinsMedium;
      ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
      ::placeholder {
        ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
      }
    }
  }
  .submit {
    ${tw`flex items-center justify-end`}
    input {
      ${tw`cursor-pointer bg-green border-none text-darkBlue w-max hover:bg-[rgba(113, 242, 139, .9)]`}
    }
  }
`; 
