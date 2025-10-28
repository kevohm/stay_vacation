import React, { useState } from "react";
import { Main } from "./css/Table";
import  {Loader} from "../smaller/load/Loader"
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import TableRow from "./TableRow";

export const Table = ({ data, setLoading, current, total, loading, handleChange}) => {
  const headings = ["#","image","Name","city","country","amount","category","state","expires on","created at","actions"]
  const [page,setPage] = useState(current)
  const handleInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
      const num = Number(value);
    if (num <= Number(total) && num > 0) {
        handleChange(value);
        setLoading(true)
    }if(!isNaN(num)){setPage(num)}
  };
    const handleDir = (mov) => {
        const newTotal = Number(total);
        const newCurrent = Number(current);
        if(newTotal !== 1){
          if (mov === "next") {
            setLoading(true)
              if (newCurrent < newTotal) {
                  handleChange(newCurrent + 1);
              } else if (newCurrent === newTotal) {
                  handleChange(1);
              }
          }else if(mov === "prev"){
            setLoading(true)
              if ((newCurrent > 1)) {
                  handleChange(newCurrent - 1);
              } else if (newCurrent === 1) {
                handleChange(newTotal);
              }
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
            data.map((item,index)=>{
              return <TableRow key={index} index={index} {...item}/>
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
          <td colSpan={9} className="page">
            <div>
              <input
                id="input"
                type="text"
                value={page}
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

