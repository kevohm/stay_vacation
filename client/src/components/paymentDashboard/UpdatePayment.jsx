import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { FormError } from "../smaller/error/FormError";
import { FaTimes } from "react-icons/fa";

const UpdatePayment = () => {
  const { state, updateError, toggleUpdate, updatePayment } = useGlobal();
  const paymentId = state.payment_startUpdate.current._id;
  const prices = state.payment_startUpdate.current.event.price_choices;

  const [data, setData] = useState({
    state: state.payment_startUpdate.current.state,
    category: state.payment_startUpdate.current.category,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const changeErr = (err) => {
    updateError("payment", err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { state: paymentState, category } = data;
    const priceObj = prices.find((i) => i.category === category);
    const amount = priceObj ? priceObj.price : 0;

    if (!paymentState || !category) {
      changeErr({
        msg: "All fields are required",
        state: "",
        show: true,
      });
      return;
    }

    updatePayment(paymentId, { state: paymentState, category, amount });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full bg-white max-w-[300px] md:max-w-md space-y-5 p-5 rounded-lg shadow-xs border border-gray-200"
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center py-1">
        <p
          className="text-dark-blue text-base"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Update
        </p>
        <FaTimes
          className="text-dark-blue text-base cursor-pointer"
          onClick={() =>
            toggleUpdate("payment", {
              state: "",
            })
          }
        />
      </div>

      {/* State Selection */}
      <div className="w-full flex flex-col space-y-2">
        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] focus:outline-hidden"
          style={{ fontFamily: "poppinsMedium" }}
        >
          <option value="" disabled>
            Choose How The Event Was
          </option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      {/* Category Selection */}
      <div className="w-full flex flex-col space-y-2">
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] focus:outline-hidden"
          style={{ fontFamily: "poppinsMedium" }}
        >
          <option value="" disabled>
            Choose Category
          </option>
          {state.payment_startUpdate.current.event.price_choices.map(
            (i, index) => (
              <option key={index} value={i.category}>
                {i.category}
              </option>
            )
          )}
        </select>
      </div>

      {/* Total Price */}
      <div className="w-full">
        <p
          className="capitalize text-sm text-[rgba(1,49,91,0.9)]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Total Price:{" "}
          {prices.find((i) => i.category === data.category)
            ? prices.find((i) => i.category === data.category).price
            : 0}
        </p>
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-end">
        <input
          type="submit"
          value="Update"
          className="w-full cursor-pointer text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] bg-green-400 hover:bg-green-300 transition-all duration-200"
          style={{ fontFamily: "poppinsMedium" }}
        />
      </div>

      {/* Error Message */}
      <FormError
        show={state.payment_error?.show}
        msg={state.payment_error?.msg}
        state={state.payment_error?.state}
      />
    </form>
  );
};

export default UpdatePayment;
