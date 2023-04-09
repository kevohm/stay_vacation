import React, { useState } from "react";
import { Main } from "./css/Table";
import  {Loader} from "../smaller/load/Loader"
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import moment from "moment";

export const Table = ({ data, current, total, loading, handleChange}) => {
  const headings = ["#","image","Name","city","country","amount","category","state","expires on","created at","actions"]
  const handleInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
      const num = Number(value);
    if (num <= Number(total) && num > 0) {
        handleChange(value);
    }
  };
    const handleDir = (mov) => {
        const total = Number(total);
        const current = Number(current);
        if (mov === "next") {
            if (current < total) {
                handleChange(current + 1);
            } else if (current === total && total !== 1) {
                handleChange(1);
            }
        }
        if(mov === "prev"){
            if ((current > 1)) {
                handleChange(current - 1);
            } else if (current === 1 && total !== 1) {
              handleChange(total);
            }
        }
  }
  if (loading) {
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
        {data.length === 0 ? (
          <tr>
            <td colSpan={10} style={{ textAlign: "center" }}>
              No Events Booked yet
            </td>
          </tr> 
        ) : (
            data.map((item, index)=>{
              const {amount,category,createdAt,state,event} = item
              return <tr key={index}>
              <td>0{index + 1}</td>
              <td><img src={event.image[0]} alt="event"/></td>
              <td>{event.name}</td>
              <td>{event.city}</td>
              <td>{event.country}</td>
              <td>{amount}</td>
              <td>{category}</td>
              <td className="status"><button className={`${state.toLowerCase()}`}>
              {state}
                </button></td>
              <td>{moment(event.validity).format("ddd, MMM DD YYYY")}</td>
              <td>{moment(createdAt).format("ddd, MMM DD YYYY")}</td>
              <td  className="status"><Link to={`/events/${event.name}`}>view</Link></td>
              </tr>
            })
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
          <td colSpan={8} className="page">
            <div>
              <input
                id="input"
                type="text"
                value={current}
                onChange={(e) => handleInput(e)}
              />
              <p>of {total}</p>
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

