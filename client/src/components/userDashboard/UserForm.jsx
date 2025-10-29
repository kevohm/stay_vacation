import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { verify } from "../utils/userDashboard/verifyForm";
import { FormError } from "../smaller/error/FormError";

const body = {
  email: "",
  username: "",
  phone_number: "",
  password: "",
  confirm_password: "",
};

export const UserForm = () => {
  const [data, setData] = useState(body);
  const { state, updateError, addUser } = useGlobal();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone_number, password } = data;
    if (!verify(data, changeErr)) {
      addUser({ username, email, phone_number, password });
    }
  };

  const changeErr = (err) => {
    updateError(err);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-none sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5"
    >
      {state.user_form.show && <FormError err={state.user_form} />}

      {/* Username */}
      <div className="w-full sm:max-w-[440px]">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Email */}
      <div className="w-full sm:max-w-[440px]">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Phone Number */}
      <div className="w-full sm:max-w-[440px]">
        <input
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          value={data.phone_number}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Password */}
      <div className="w-full sm:max-w-[440px]">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Confirm Password */}
      <div className="w-full sm:max-w-[440px]">
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          value={data.confirm_password}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <input
          type="submit"
          value="Create"
          className="cursor-pointer bg-green border-none text-darkBlue w-max hover:bg-[rgba(113,242,139,.9)] py-2.5 px-5 rounded-lg"
        />
      </div>
    </form>
  );
};
