import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormError } from "../smaller/error/FormError";
import { useGlobal } from "../../context/AppContext";

const body = {
  email: "",
  password: "",
  confirm: "",
  username: "",
  phone_number: "",
};

const Form = () => {
  const { handleUser, state, getUser, setForm } = useGlobal();
  const [data, setData] = useState(body);
  const { pathname } = useLocation();
  const login = pathname === "/register/login";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      const { email, password } = data;
      handleUser({ email, password }, "login")
        .then(() => {
          getUser();
          changeErr({
            msg: "You are logged in. Redirecting...",
            state: "success",
            show: true,
          });
          setTimeout(() => navigate(-1), 3000);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            changeErr({
              msg: error.response.data.msg,
              state: "",
              show: true,
            });
          }
        });
    } else {
      const { email, password, username, phone_number } = data;
      handleUser({ email, password, username, phone_number }, "register")
        .then(() => {
          changeErr({
            msg: "Successfully registered. Redirecting...",
            state: "success",
            show: true,
          });
          setTimeout(() => navigate("/register/login"), 3000);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            changeErr({
              msg: error.response.data.msg,
              state: "",
              show: true,
            });
          }
        });
    }
  };

  const changeErr = (err) => {
    setForm(err);
  };

  const changeData = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-[250px] sm:min-w-[300px] max-w-[400px] py-7 px-12 space-y-9 bg-white rounded-lg flex flex-col"
      style={{
        boxShadow: "0px 4px 12px rgba(138, 154, 234, 0.25)",
        borderTop: "6px solid #8a9aea",
      }}
    >
      {/* Title */}
      <div className="w-full flex justify-center items-center">
        <header className="text-xl uppercase text-darkBlue font-semibold">
          {login ? "log in" : "sign up"}
        </header>
      </div>

      {/* Error Message */}
      {state.user_form.show && (
        <div className="w-full flex justify-center items-center">
          <FormError {...state.user_form} />
        </div>
      )}

      {/* Inputs */}
      <div className="flex flex-col space-y-5 items-start">
        <input
          type="text"
          placeholder="Email@gmail.com"
          name="email"
          onChange={changeData}
          value={data.email}
          className="w-full py-2 px-4 text-sm rounded-lg border border-lightBlue text-[rgba(0,0,0,.8)] outline-none focus:border-darkBlue"
          style={{ fontFamily: "poppinsSemi" }}
        />
        {!login && (
          <>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={changeData}
              className="w-full py-2 px-4 text-sm rounded-lg border border-lightBlue text-[rgba(0,0,0,.8)] outline-none focus:border-darkBlue"
              style={{ fontFamily: "poppinsSemi" }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value={data.phone_number}
              onChange={changeData}
              className="w-full py-2 px-4 text-sm rounded-lg border border-lightBlue text-[rgba(0,0,0,.8)] outline-none focus:border-darkBlue"
              style={{ fontFamily: "poppinsSemi" }}
            />
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={changeData}
          className="w-full py-2 px-4 text-sm rounded-lg border border-lightBlue text-[rgba(0,0,0,.8)] outline-none focus:border-darkBlue"
          style={{ fontFamily: "poppinsSemi" }}
        />
        {!login && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={data.confirm}
            onChange={changeData}
            className="w-full py-2 px-4 text-sm rounded-lg border border-lightBlue text-[rgba(0,0,0,.8)] outline-none focus:border-darkBlue"
            style={{ fontFamily: "poppinsSemi" }}
          />
        )}
      </div>

      {/* Submit */}
      <div className="w-full flex justify-center items-center">
        <input
          type="submit"
          value={login ? "login" : "sign up"}
          className="w-full text-sm px-3 py-2 bg-darkBlue text-white rounded-lg border-none cursor-pointer"
          style={{ fontFamily: "poppinsSemi" }}
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-xs text-[rgba(0,0,0,.7)]">
          {login ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-xs text-darkBlue font-medium underline-offset-2 hover:underline"
                style={{ fontFamily: "poppinsMedium" }}
              >
                sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/register/login"
                className="text-xs text-darkBlue font-medium underline-offset-2 hover:underline"
                style={{ fontFamily: "poppinsMedium" }}
              >
                login
              </Link>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Form;
