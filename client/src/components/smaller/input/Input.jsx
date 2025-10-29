import React from "react";
import moment from "moment";
import { minDate } from "../../Events/context/utils";

export const Input = ({
  type,
  placeholder,
  name,
  title,
  error,
  handleChange,
  width,
  value,
}) => {
  const baseInputClass =
    "w-full text-xs sm:text-sm p-1 sm:p-2 text-darkBlue bg-white rounded-lg border-none outline-none";
  const baseLabelClass = "font-poppins text-sm sm:text-base";
  const wrapperClass = "w-full flex flex-col space-y-2 sm:space-y-4";

  const commonInputStyle = {
    outline: "1px solid rgba(1, 49, 91, .2)",
    width: width || "100%",
  };

  const placeholderStyle = {
    color: "rgba(1, 49, 91, .6)",
  };

  const inputProps = {
    placeholder,
    name,
    value,
    onChange: handleChange,
    className: baseInputClass,
    style: commonInputStyle,
  };

  if (type === "date") {
    return (
      <div className={wrapperClass}>
        <label htmlFor={name} className={baseLabelClass}>
          {title}
        </label>
        <input
          type="date"
          min={minDate}
          {...inputProps}
          style={commonInputStyle}
        />
      </div>
    );
  }

  if (type === "number") {
    return (
      <div className={wrapperClass}>
        <label htmlFor={name} className={baseLabelClass}>
          {title}
        </label>
        <input type="number" min={0} {...inputProps} />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name} className={baseLabelClass}>
        {title}
      </label>
      <input
        type={type}
        {...inputProps}
        style={{ ...commonInputStyle }}
        placeholder={placeholder}
      />
    </div>
  );
};
