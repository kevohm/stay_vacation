import React, { useEffect, useState } from "react";
import { Loader } from "../../smaller/load/Loader";
import { FormError } from "../../smaller/error/FormError";
import { useEvent } from "../context/EventContext";
import { verifyData } from "../../utils/Events/BookForm";
import { BookFormReadOnly } from "./BookFormReadOnly";
import { useGlobal } from "../../../context/AppContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  phone_number: "",
  confirmPassword: "",
};

const BookForm = () => {
  const [data, setData] = useState(initialState);
  const {
    book_event,
    stages,
    setBookingError,
    registerBoookingUser,
    getBookingUser,
    setBookingData,
    setBookingStage,
  } = useEvent();
  const { state } = useGlobal();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeErr = (err) => {
    setBookingError(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyData({ ...data, changeErr })) {
      changeErr({
        msg: "Processing your data. This may take a minute...",
        state: "success",
        show: true,
      });

      const { email, username, password, phone_number } = data;
      registerBoookingUser({ email, username, password, phone_number });
    }
  };

  useEffect(() => {
    getBookingUser()
      .then((res) => {
        setBookingStage(2);
        setBookingData("user", res.data.details);
      })
      .catch(() => setBookingStage(1));
  }, [state.user.id, state.user.role]);

  if (book_event.loading) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <header className="mb-4 font-semibold text-darkBlue">
          User details
        </header>
        <Loader />
      </div>
    );
  }

  if (stages.level === 2 && stages.user) {
    return <BookFormReadOnly />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-md w-full"
    >
      <header className="text-darkBlue font-semibold mb-5">User details</header>

      {stages.err.show && (
        <div className="mb-3 text-red-500">
          <FormError {...stages.err} />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5">
        {/* Left side */}
        <div className="flex flex-col gap-5">
          <InputField
            label="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="John254"
          />

          <InputField
            label="password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Strong password"
          />

          <InputField
            label="confirm password"
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-5">
          <InputField
            label="phone number"
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
            placeholder="+254712121212"
          />

          <InputField
            label="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
          />
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <input
          type="submit"
          value="Next"
          className="bg-green text-darkBlue py-2 px-4 rounded-lg cursor-pointer"
        />
      </div>
    </form>
  );
};

// ✅ Reusable input component
const InputField = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="capitalize text-darkBlue text-sm font-semibold">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-lightBlue/40 rounded-lg text-gray-700 text-sm focus:outline-orange"
    />
  </div>
);

export default BookForm;
