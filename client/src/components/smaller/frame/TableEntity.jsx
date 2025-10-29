import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGlobal } from "../../../context/AppContext";
import { TableEntityData } from "./TableEntityData";
import { Loader } from "../load/Loader";

export const TableEntity = ({
  handleChange,
  type,
  typeData,
  headings,
  validation,
}) => {
  const { state, setLoading, setCurrentEvent, setCurrents } = useGlobal();
  const [selected, setSelected] = useState("");
  const [page, setPage] = useState(state[type].currentPage);
  const spanning = { users: 5, events: 10 };

  const handleInput = (e) => {
    e.preventDefault();
    const num = Number(e.target.value);
    if (num <= Number(state[type].pages) && num > 0) {
      handleChange(num);
      setLoading(type, true);
    }
    setPage(e.target.value);
  };

  const handleDir = (mov) => {
    const total = Number(state[type].pages);
    const current = Number(state[type].currentPage);
    if (mov === "next") {
      if (current < total)
        handleChange(current + 1), setPage(current + 1), setLoading(type, true);
      else if (current === total && total !== 1)
        handleChange(1), setPage(1), setLoading(type, true);
    }
    if (mov === "prev") {
      if (current > 1)
        handleChange(current - 1), setPage(current - 1), setLoading(type, true);
      else if (current === 1 && total !== 1)
        handleChange(total), setPage(total), setLoading(type, true);
    }
  };

  const handleSelect = (event) => {
    validation ? setCurrentEvent(event) : setCurrents(typeData, event);
    setSelected(event._id);
  };

  if (state[type].loading) return <Loader />;

  return (
    <table className="relative min-w-full w-max text-sm border-collapse">
      {/* Table Head */}
      <thead className="bg-[rgba(0,0,0,.02)]">
        <tr>
          {headings.map((i) => (
            <th
              key={i}
              className="capitalize p-5 text-start text-[rgba(0,0,0,.5)] font-medium"
            >
              {i}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {state[type].data.length === 0 ? (
          <tr>
            <td
              colSpan={spanning[type] + 2}
              className="text-center p-5 text-[rgba(0,0,0,.4)]"
            >
              {type === "events" ? "No expired events Yet" : `No ${type} yet`}
            </td>
          </tr>
        ) : (
          <TableEntityData
            type={type}
            selected={selected}
            handleSelect={handleSelect}
          />
        )}
      </tbody>

      {/* Table Footer / Pagination */}
      <tfoot>
        <tr>
          <td>
            <div
              className="w-max flex cursor-pointer px-2.5 py-1 items-center space-x-2.5 rounded-lg text-[rgba(0,0,0,.5)] border border-solid border-[rgba(0,0,0,.15)]"
              onClick={() => handleDir("prev")}
            >
              <FaArrowLeft className="text-[rgba(0,0,0,.5)] text-sm" />
              <p className="text-[rgba(0,0,0,.5)] text-sm">previous</p>
            </div>
          </td>
          <td colSpan={spanning[type]} className="w-[150px] mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <input
                id="input"
                type="text"
                value={page}
                onChange={handleInput}
                className="w-8 text-sm text-[rgba(0,0,0,.5)] text-center p-1 rounded-lg border border-solid border-[rgba(0,0,0,.15)]"
              />
              <p className="text-sm text-[rgba(0,0,0,.5)]">
                of {state[type].pages}
              </p>
            </div>
          </td>
          <td>
            <div
              className="w-max flex cursor-pointer px-2.5 py-1 items-center space-x-2.5 rounded-lg text-[rgba(0,0,0,.5)] border border-solid border-[rgba(0,0,0,.15)]"
              onClick={() => handleDir("next")}
            >
              <p className="text-[rgba(0,0,0,.5)] text-sm">next</p>
              <FaArrowRight className="text-[rgba(0,0,0,.5)] text-sm" />
            </div>
          </td>
        </tr>
      </tfoot>

      {/* Body Rows hover and active */}
      <style>
        {`
          tbody tr {
            cursor: pointer;
          }
          tbody tr:hover {
            background-color: rgba(0,0,0,.05);
            border-left: 1px solid rgba(0,0,0,.1);
            border-right: 1px solid rgba(0,0,0,.1);
            box-shadow: 0px 0px 1px 1px rgba(0,0,0,.1);
          }
          tbody > .active {
            background-color: rgba(0,0,0,.05);
          }
        `}
      </style>
    </table>
  );
};
