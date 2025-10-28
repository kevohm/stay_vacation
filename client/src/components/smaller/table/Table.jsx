import React, { useState } from "react";
import { Main } from "./css/Table";
import  {Loader} from "../load/Loader"

import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

import { useGlobal } from "../../../context/AppContext";
import {  TableData} from "./TableData";
export const Table = ({ handleChange, type, typeData, headings}) => {
  const { state, setLoading, deleteUser, toggleUpdate, removeEvent, deleteReport,deletePayment } = useGlobal();
  const [page, setPage] = useState(state[type].currentPage);
  const spanning = {"users":6,"events":10,"reports":7,"payments":10}
  const handleInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
      const num = Number(value);
    if (num <= Number(state[type].pages) && num > 0) {
        handleChange(value);
        setLoading(type, true)
    }
    setPage(value);
  };
  const handleDelete = (id) => {
    if (type === "users") {
      deleteUser(id);
    }
    if(type === "events"){
      removeEvent(id,page)
    }
    if(type === "reports"){
      deleteReport(id)
    }
    if(type === "payments"){
      deletePayment(id)
    }
  }
  const handleUpdate = (data) => {
      toggleUpdate(typeData, data)
  }
    const handleDir = (mov) => {
        const total = Number(state[type].pages);
        const current = Number(state[type].currentPage);
        if (mov === "next") {
            if (current < total) {
                handleChange(current + 1);
                setPage(current + 1);
              setLoading(type, true);
            } else if (current === total && total !== 1) {
                handleChange(1);
                setPage(1);
                setLoading(type, true);
            }
        }
        if(mov === "prev"){
            if ((current > 1)) {
                handleChange(current - 1);
                setPage(current - 1);
              setLoading(type, true);
            } else if (current === 1 && total !== 1) {
              handleChange(total);
              setPage(total);
              setLoading(type, true);
            }
        }
  }
  if (state[type].loading) {
    return <Loader />;
  }
  return (
    <Main>
      <thead>
        <tr>
          {headings.map((i) => (
            <th key={i}>{i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state[type].data.length === 0 ? (
          <tr>
            <td colSpan={spanning[type] + 2} style={{ textAlign: "center" }}>
              No {type} yet
            </td>
          </tr> 
        ) : (
          <TableData type={type} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div className="control" onClick={() => handleDir("prev")}>
              <FaArrowLeft className="icon" />
              <p>previous</p>
            </div>
          </td>
          <td colSpan={spanning[type]} className="page">
            <div>
              <input
                id="input"
                type="text"
                value={page}
                onChange={(e) => handleInput(e)}
              />
              <p>of {state[type].pages}</p>
            </div>
          </td>
          <td>
            <div className="control" onClick={() => handleDir("next")}>
              <p>next</p>
              <FaArrowRight className="icon" />
            </div>
          </td>
        </tr>
      </tfoot>
    </Main>
  );
};

