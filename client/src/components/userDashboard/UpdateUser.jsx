import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobal } from "../../context/AppContext";
import { verifyUpdate } from "../utils/userDashboard/verifyForm";

const UpdateUser = () => {
  const { state, toggleUpdate, updateError, updateUser } = useGlobal();
  const { email, username, phone_number } = state.user_startUpdate.current;

  const [body, setBody] = useState({
    email,
    username,
    phone_number,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const changeErr = (err) => {
    updateError("user", err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verifyUpdate(body, changeErr)) {
      updateUser(state.user_startUpdate.current._id, body);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white space-y-5 p-5 rounded-lg max-w-[300px]"
    >
      {/* Header */}
      <div className="flex justify-between items-center py-1">
        <p
          className="text-base text-darkBlue"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Update
        </p>
        <FaTimes
          className="text-darkBlue text-base cursor-pointer"
          onClick={() =>
            toggleUpdate("user", {
              email: "",
              phone_number: "",
              username: "",
            })
          }
        />
      </div>

      {/* Username */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Username"
          value={body.username}
          name="username"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1,49,91,.7)] border-[rgba(1,49,91,.5)] outline-none"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Email */}
      <div className="w-full">
        <input
          type="email"
          placeholder="Email"
          value={body.email}
          name="email"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1,49,91,.7)] border-[rgba(1,49,91,.5)] outline-none"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Phone */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Phone Number"
          value={body.phone_number}
          name="phone_number"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1,49,91,.7)] border-[rgba(1,49,91,.5)] outline-none"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <input
          type="submit"
          value="update"
          className="cursor-pointer bg-green border-none text-darkBlue rounded-lg px-4 py-2 font-medium hover:bg-[rgba(113,242,139,.9)]"
        />
      </div>
    </form>
  );
};

export default UpdateUser;
