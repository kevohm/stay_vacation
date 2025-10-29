import React from "react";

export const FormError = ({ state, msg, show }) => {
  if (!show) return null;

  const isSuccess = state === "success";

  return (
    <div
      className={`px-2 py-1 rounded-lg z-50 text-sm ${
        isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      }`}
      style={{ transition: "all 0.3s ease" }}
    >
      {msg}
    </div>
  );
};
