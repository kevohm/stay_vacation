import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { FormError } from "../smaller/error/FormError";

const PaymentForm = ({ changeOpen, changeOpenUsers }) => {
  const { state, setForm, defaultSingleData, createPayment, updateError } =
    useGlobal();
  const [price, setPrice] = useState("");
  const [data, setData] = useState({
    currency: "Ksh",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = state.payment_on.event._id;
    const userID = state.payment_on.user._id;
    if (!id) {
      return changeErr({
        msg: "Please provide an event to make payments on",
        type: "warning",
        show: true,
      });
    }
    if (!userID) {
      return changeErr({
        msg: "Please provide a user to pay for event",
        type: "warning",
        show: true,
      });
    }

    const { category, currency } = data;
    if (!category || !currency) {
      changeErr({
        msg: "All fields are required",
        type: "warning",
        show: true,
      });
      return;
    }
    createPayment(id, userID, category, currency);
  };

  const changeErr = (err) => {
    updateError(err);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-none sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5"
    >
      {/* CATEGORY SELECTION */}
      <div className="w-full sm:max-w-[440px]">
        <select
          value={data.category}
          name="category"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {Object.keys(state.payment_on.event).length === 0 ? (
            <option value="" disabled>
              Choose an event first
            </option>
          ) : (
            <>
              <option value="" disabled>
                Choose Category
              </option>
              {state.payment_on.event.price_choices.map((i, index) => (
                <option key={index} value={i.category}>
                  {i.category}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* CURRENCY SELECTION */}
      <div className="w-full sm:max-w-[440px]">
        <select
          value={data.currency}
          name="currency"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
          style={{ fontFamily: "poppinsMedium" }}
        >
          <option value="" disabled>
            Choose Currency For Payment
          </option>
          <option value="Ksh">Kenyan Shillings</option>
        </select>
      </div>

      {/* PRICES DISPLAY */}
      {Object.keys(state.payment_on.event).length !== 0 && (
        <div className="w-full flex flex-col space-y-2 text-[rgba(1,49,91,.9)]">
          {state.payment_on.event.price_choices.map((i, index) => (
            <div key={index} className="flex w-full">
              <p>
                Price {i.price} Per {i.category}
              </p>
            </div>
          ))}
          <div
            className="total font-medium"
            style={{ fontFamily: "poppinsMedium" }}
          >
            <p>
              Total Price:{" "}
              {state.payment_on.event.price_choices.find(
                (i) => i.category === data.category
              )
                ? state.payment_on.event.price_choices.find(
                    (i) => i.category === data.category
                  ).price
                : 0}
            </p>
          </div>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="flex items-center justify-end">
        <input
          type="submit"
          value="Create"
          className="cursor-pointer bg-green border-none text-dark-blue w-max hover:bg-[rgba(113,242,139,.9)] py-2 px-5 rounded-lg"
        />
      </div>

      {/* EVENT DETAILS */}
      {Object.keys(state.payment_on.event).length !== 0 && (
        <div className="flex flex-col space-y-2.5 text-[rgba(1,49,91,.9)]">
          <p className="text-sm">Event you are writing a report on</p>
          <div className="flex">
            <p className="w-[75px] text-sm">Name</p>
            <p className="text-sm">{state.payment_on.event.name}</p>
          </div>
          <div className="flex">
            <p className="w-[75px] text-sm">City</p>
            <p className="text-sm">{state.payment_on.event.city}</p>
          </div>
          <div className="flex">
            <p className="w-[75px] text-sm">Country</p>
            <p className="text-sm">{state.payment_on.event.country}</p>
          </div>
          <div className="flex flex-col items-start space-y-2.5">
            <p className="text-sm">Image</p>
            <img
              src={state.payment_on.event.image[0]}
              alt="event"
              className="w-full rounded-lg ml-0"
            />
          </div>
        </div>
      )}

      {/* CHANGE EVENT BUTTON */}
      <div className="flex items-center justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            defaultSingleData("events");
            changeOpen();
          }}
          className="py-2.5 px-5 cursor-pointer border-none bg-dark-blue text-white rounded-lg"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Change Event
        </button>
      </div>

      {/* USER DETAILS */}
      {Object.keys(state.payment_on.user).length !== 0 && (
        <div className="flex flex-col space-y-2.5 text-[rgba(1,49,91,.9)]">
          <p className="text-sm">User to make payments for</p>
          <div className="flex">
            <p className="w-[75px] text-sm">Username</p>
            <p className="text-sm">{state.payment_on.user.username}</p>
          </div>
          <div className="flex">
            <p className="w-[75px] text-sm">Email</p>
            <p className="text-sm">{state.payment_on.user.email}</p>
          </div>
          <div className="flex">
            <p className="w-[75px] text-sm">Phone</p>
            <p className="text-sm">{state.payment_on.user.phone_number}</p>
          </div>
        </div>
      )}

      {/* CHANGE USER BUTTON */}
      <div className="flex items-center justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            defaultSingleData("users");
            changeOpenUsers();
          }}
          className="py-2.5 px-5 cursor-pointer border-none bg-dark-blue text-white rounded-lg"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Change User
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
