import React from "react";
import { useGlobal } from "../../../context/AppContext";

export const Error = ({ type }) => {
  const { state } = useGlobal();
  const errorData = state[`${type}_error`] || {};
  const success = errorData.state === "success";

  return (
    <div
      className={`absolute left-1/2 top-[7%] px-2.5 py-1 z-50 rounded-lg transform -translate-x-1/2 -translate-y-1/2 ${
        success ? "text-darkBlue bg-green-200" : "bg-red-200 text-red-400"
      }`}
    >
      <p>{errorData.msg}</p>
    </div>
  );
};
