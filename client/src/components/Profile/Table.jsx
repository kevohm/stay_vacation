import React, { useState } from "react";
import { Loader } from "../smaller/load/Loader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TableRow from "./TableRow";

export const Table = ({
  data,
  setLoading,
  current,
  total,
  loading,
  handleChange,
}) => {
  const headings = [
    "#",
    "image",
    "Name",
    "city",
    "country",
    "amount",
    "category",
    "state",
    "expires on",
    "created at",
    "actions",
  ];

  const [page, setPage] = useState(current);

  const handleInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const num = Number(value);
    if (num <= Number(total) && num > 0) {
      handleChange(value);
      setLoading(true);
    }
    if (!isNaN(num)) setPage(num);
  };

  const handleDir = (mov) => {
    const newTotal = Number(total);
    const newCurrent = Number(current);
    if (newTotal !== 1) {
      if (mov === "next") {
        setLoading(true);
        if (newCurrent < newTotal) {
          handleChange(newCurrent + 1);
        } else {
          handleChange(1);
        }
      } else if (mov === "prev") {
        setLoading(true);
        if (newCurrent > 1) {
          handleChange(newCurrent - 1);
        } else {
          handleChange(newTotal);
        }
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  const tableStyle = {
    position: "relative",
    minWidth: "100%",
    width: "max-content",
    fontSize: "14px",
    borderCollapse: "collapse",
  };

  const thStyle = {
    textTransform: "capitalize",
    padding: "20px",
    textAlign: "start",
    color: "rgba(0,0,0,0.5)",
    fontFamily: "poppinsMedium",
    backgroundColor: "rgba(0,0,0,0.02)",
  };

  const tdStyle = {
    padding: "20px",
    textAlign: "start",
    color: "rgba(0,0,0,0.4)",
  };

  const controlStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "4px 10px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.15)",
    color: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    gap: "10px",
    width: "max-content",
    margin: "auto",
  };

  const pageDivStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: "150px",
    margin: "auto",
  };

  const inputStyle = {
    width: "32px",
    textAlign: "center",
    padding: "4px",
    fontSize: "14px",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "6px",
    color: "rgba(0,0,0,0.5)",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {headings.map((heading) => (
            <th key={heading} style={thStyle}>
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={10} style={{ textAlign: "center", padding: "20px" }}>
              No Events Booked yet
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <TableRow key={index} index={index} {...item} />
          ))
        )}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div style={controlStyle} onClick={() => handleDir("prev")}>
              <FaArrowLeft style={{ fontSize: "12px" }} />
              <p>previous</p>
            </div>
          </td>
          <td colSpan={9} style={{ textAlign: "center" }}>
            <div style={pageDivStyle}>
              <input
                id="input"
                type="text"
                value={page}
                onChange={handleInput}
                style={inputStyle}
              />
              <p>of {total}</p>
            </div>
          </td>
          <td>
            <div style={controlStyle} onClick={() => handleDir("next")}>
              <p>next</p>
              <FaArrowRight style={{ fontSize: "12px" }} />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
