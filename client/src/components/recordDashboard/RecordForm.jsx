import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { FormError } from "../smaller/error/FormError";

const initialBody = {
  description: "",
  state: "",
};

const RecordForm = ({ changeOpen }) => {
  const { state, createReport, defaultSingleData, updateError } = useGlobal();
  const [data, setData] = useState(initialBody);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const changeErr = (err) => {
    updateError(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = state.report_on.event._id;

    if (id) {
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

      createReport(id, { description, state: reportState });
    } else {
      changeErr({
        msg: "Please provide an event to report on",
        type: "warning",
        show: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-full sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5"
    >
      {/* Description */}
      <div className="w-full max-w-full sm:max-w-[440px]">
        <label
          className="text-xs text-[rgba(1,49,91,0.5)] font-medium"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {data.description.length} characters
        </label>
        <textarea
          placeholder="Description of event"
          value={data.description}
          name="description"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] placeholder:text-[rgba(1,49,91,0.5)] focus:ring-2 focus:ring-blue-500"
          style={{ fontFamily: "poppinsMedium", resize: "vertical" }}
        />
      </div>

      {/* State Select */}
      <div className="w-full max-w-full sm:max-w-[440px]">
        <select
          value={data.state}
          name="state"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,0.5)] text-[rgba(1,49,91,0.7)] focus:ring-2 focus:ring-blue-500"
          style={{ fontFamily: "poppinsMedium" }}
        >
          <option value="" disabled>
            Choose How Event Was
          </option>
          <option value="Success">Successful</option>
          <option value="Fail">Failed</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <input
          type="submit"
          value="Create"
          className="cursor-pointer bg-green-300 border-none text-[rgba(1,49,91,1)] font-medium py-2 px-6 rounded-lg hover:bg-green-400 transition"
        />
      </div>

      {/* Event Viewer */}
      {Object.keys(state.report_on.event).length !== 0 && (
        <div className="flex flex-col space-y-2.5 text-[rgba(1,49,91,0.9)]">
          <p className="text-sm font-medium">
            Event you are writing a report on
          </p>
          <div className="flex text-sm">
            <p className="w-[75px] font-medium">Name</p>
            <p>{state.report_on.event.name}</p>
          </div>
          <div className="flex text-sm">
            <p className="w-[75px] font-medium">City</p>
            <p>{state.report_on.event.city}</p>
          </div>
          <div className="flex text-sm">
            <p className="w-[75px] font-medium">Country</p>
            <p>{state.report_on.event.country}</p>
          </div>
          <div className="flex flex-col items-start space-y-2.5">
            <p className="text-sm font-medium">Image</p>
            <img
              src={state.report_on.event.image[0]}
              alt="event"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Change Event */}
      <div className="flex items-center justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            defaultSingleData("events");
            changeOpen();
          }}
          className="py-2.5 px-5 cursor-pointer border-none bg-[rgba(1,49,91,1)] text-white rounded-lg hover:bg-[rgba(1,49,91,0.9)] transition"
        >
          Change Event
        </button>
      </div>
    </form>
  );
};

export default RecordForm;
