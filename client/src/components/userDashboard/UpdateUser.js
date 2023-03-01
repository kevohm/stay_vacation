import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {FaTimes} from "react-icons/fa"
import { useGlobal } from '../../context/AppContext'
import { FormError } from '../smaller/error/FormError'
import { verifyUpdate } from '../utils/userDashboard/verifyForm'
const UpdateUser = () => {
    const { state, toggleUpdate, updateError, updateUser } = useGlobal();
    const { email, username, phone_number } = state.user_startUpdate.current;
    const [body, setBody] = useState({
      email,
      username,
      phone_number
    });
    const handleChange = (e) => {
        const { name, value } = e.target
        setBody({...body, [name]:value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!verifyUpdate(body, changeErr)) {
            updateUser(state.user_startUpdate.current._id, body);
        }
    }
    const changeErr = (err) => {
        updateError('user', err)
    }
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <div className="header">
        <p>Update</p>
        <FaTimes
          className="icon"
          onClick={() =>
            toggleUpdate("user",{ email: "", phone_number: "", username: "" })
          }
        />
      </div>
      {state.user_startUpdate.err.show && (
        <FormError err={state.user_startUpdate.err} />
      )}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={body.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={body.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          value={body.phone_number}
          name="phone_number"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="submit">
        <input type="submit" value="update"/>
      </div>
    </Main>
  );
}

export default UpdateUser
const Main = styled.form`
  ${tw`w-full bg-white max-w-[200px] sm:max-w-[250px] md:max-w-[300px] space-y-5 p-5 rounded-lg`}
  .header {
    ${tw`flex justify-between items-center py-1`}
    p {
      font-family: poppinsMedium;
      ${tw`text-darkBlue text-base`}
    }
    .icon {
      ${tw`text-darkBlue text-base`}
    }
  }
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
      ${tw`cursor-pointer bg-green border-none text-darkBlue hover:bg-[rgba(113, 242, 139, .9)]`}
    }
  }
`;