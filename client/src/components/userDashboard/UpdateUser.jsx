import React, { useState } from 'react'
import { Main } from './Update'
import {FaTimes} from "react-icons/fa"
import { useGlobal } from '../../context/AppContext'
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