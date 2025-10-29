import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
// import "./Category.css"; // for checkbox styling

export const Category = ({
  name,
  _id,
  index,
  setUpdate,
  handleChange,
  value = [],
  id,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (value.includes(_id)) setIsChecked(true);
  }, [value, _id]);

  return (
    <div
      className="flex items-center justify-start p-2 mr-2 mt-2 space-x-4 rounded-lg border border-solid"
      style={{ borderColor: "rgba(1, 49, 91, .5)" }}
    >
      <div id="inputPreview" className="flex items-center justify-start">
        <input
          className="css-checkbox"
          name="cssCheckbox"
          id={`index${id}${index}`}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(!isChecked);
            handleChange(_id, e.target.checked, index);
          }}
        />
        <label htmlFor={`index${id}${index}`}>{name}</label>
      </div>

      <div
        className="update-category flex items-center justify-center bg-[#01315B] w-5 h-full rounded-sm cursor-pointer"
        onClick={() => setUpdate({ status: true, data: name, id: _id })}
        title="update"
      >
        <FaEdit className="text-white text-xs cursor-pointer" />
      </div>
    </div>
  );
};
