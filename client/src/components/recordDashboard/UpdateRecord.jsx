import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { FaTimes } from "react-icons/fa";

const UpdateRecord = () => {
  const { state, updateError, toggleUpdate, updateReport } = useGlobal();
  const reportId = state.report_startUpdate.current._id;

  const [data, setData] = useState({
    description: state.report_startUpdate.current.description,
    state: state.report_startUpdate.current.state,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const changeErr = (err) => {
    updateError(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, state: reportState } = data;

    if (!description || !reportState) {
      return changeErr({
        msg: "All fields are required",
        type: "warning",
        show: true,
      });
    }
    if (description.length < 60) {
      return changeErr({
        msg: "Description must be at least 60 characters",
        type: "warning",
        show: true,
      });
    }
    if (description.length > 400) {
      return changeErr({
        msg: "Description must be at most 400 characters",
        type: "warning",
        show: true,
      });
    }

    updateReport(reportId, { description, state: reportState });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-[300px] md:max-w-xl bg-white p-5 space-y-5 rounded-lg"
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center py-1">
        <p className="font-medium text-dark-blue text-base">Update</p>
        <FaTimes
          className="text-dark-blue text-base cursor-pointer"
          onClick={() =>
            toggleUpdate("report", {
              description: "",
              state: "",
              event: {},
            })
          }
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <p className="font-medium capitalize text-sm text-[rgba(1,49,91,0.9)]">
          {data.description.length} characters
        </p>
        <textarea
          placeholder="Description of event"
          value={data.description}
          name="description"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] outline-hidden resize-vertical font-medium placeholder:text-[rgba(1,49,91,0.5)]"
        />
      </div>

      {/* State selection */}
      <div className="flex flex-col space-y-2">
        <select
          value={data.state}
          name="state"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] font-medium outline-hidden"
        >
          <option value="" disabled>
            Choose How The Event Was
          </option>
          <option value="Success">Successful</option>
          <option value="Fail">Failed</option>
        </select>
      </div>

      {/* Submit button */}
      <div className="w-full flex items-center justify-end">
        <input
          type="submit"
          value="Update"
          className="cursor-pointer w-full md:w-auto bg-green text-dark-blue border-none font-medium text-sm py-2.5 px-5 rounded-lg hover:bg-[rgba(113,242,139,0.9)]"
        />
      </div>
    </form>
  );
};

export default UpdateRecord;
