import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import tw from 'twin.macro'
import {FormError} from "../smaller/error/FormError"
import { useGlobal } from '../../context/AppContext';
const body = {
  email: "",
  password: "",
  confirm: "",
  username: "",
  phone_number:""
}

const Form = () => {
  const {handleUser, state, getUser, setForm}  = useGlobal()
  const [data, setData] = useState(body)
    const { pathname } = useLocation()
  const login = (pathname === "/register/login")
  const navigate = useNavigate()
    const handleSubmit = (e)=>{
      e.preventDefault()
      if (login) {
        const {email, password} = data
        handleUser({ email, password }, "login").then(()=>{
          getUser()
          changeErr({
            msg: "You are logged in. Redirecting...",
            state: "success",
            show: true,
          });
          setTimeout(()=>navigate(-1), 3000);
        }).catch((error)=>{
          if (error.response && error.response.data) {
            changeErr({
              msg: error.response.data.msg,
              state: "",
              show: true,
            });
          }
        })
      } else {
        const { email,password,username,phone_number} = data;
        handleUser({ email, password, username, phone_number }, "register").then(()=>{
          changeErr({
            msg: "Successfully registered. redirecting...",
            state: "success",
            show: true,
          });
          setTimeout(()=>navigate("/register/login"), 3000);
        }).catch((error)=>{
          if (error.response && error.response.data) {
            changeErr({
              msg: error.response.data.msg,
              state: "",
              show: true,
            });
          }
        })
      }
  }
  const changeErr = (err)=>{
    setForm(err)
  }
  const changeData = (e) => {
    const { value, name } = e.target 
    setData({ ...data, [name]: value })
  }
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <div className="title">
        <header>{login ? "log in" : "sign up"}</header>
      </div>
      {state.user_form.show && <div className="input">
      <FormError {...state.user_form}/>
      </div>}
      <div className="input">
        <input
          type="text"
          placeholder="Email@gmail.com"
          name="email"
          onChange={(e) => changeData(e)}
          value={data.email}
        />
        {login || (
          <>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={(e) => changeData(e)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value={data.phone_number}
              onChange={(e) => changeData(e)}
            />
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) => changeData(e)}
        />
        {login || (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={data.confirm}
            onChange={(e) => changeData(e)}
          />
        )}
      </div>
      <div className="submit">
        <input type="submit" value={login ? "login" : "sign up"} />
      </div>
      <div className="text">
        {login ? (
          <p>
            Don't have an account ? <Link to="/register">sign up</Link>
          </p>
        ) : (
          <p>
            Already have an account ? <Link to="/register/login">login</Link>
          </p>
        )}
      </div>
    </Main>
  );
}

export default Form

const Main = styled.form`
  ${tw`w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] min-w-[250px] sm:min-w-[300px] py-7 px-12 space-y-9 bg-white rounded-lg`}
  box-shadow:0px 4px 12px 0px  rgba(138, 154, 234, .25);
  border-top: 6px solid #8a9aea;
  > div {
    ${tw`w-full flex justify-center items-center`}
  }
  .input {
    ${tw`flex flex-col space-y-5 items-start`}
    input {
      ${tw`w-full py-[8px] text-sm px-[15px] rounded-lg border text-[rgba(0,0,0,.8)] border-solid border-lightBlue`}
      font-family:poppinsSemi;
      ::placeholder {
        ${tw`text-sm text-[rgba(0,0,0,.5)]`}
      }
    }
    input:focus {
      ${tw`border-solid border-darkBlue`}
    }
    input:-webkit-autofill {
      -webkit-text-fill-color: rgba(0, 0, 0, 0.8) !important;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
  }

  .submit {
    input {
      font-family: poppinsSemi;
      ${tw`w-full text-sm px-[10px] py-[8px] border-none bg-darkBlue text-white`}
    }
  }
  .text {
    p {
      ${tw`text-xs`}
      a {
        font-family: poppinsMedium;
        ${tw`text-xs`}
      }
    }
  }
  .title {
    header {
      font-family: poppinsSemi;
      ${tw`text-xl uppercase text-darkBlue`}
    }
  }
`;