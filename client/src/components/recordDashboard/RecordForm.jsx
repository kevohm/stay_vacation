import React, { useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { Main } from "../css/dashboard";
import { FormError } from "../smaller/error/FormError";
const body = {
  description: "",
  state: ""
};
const RecordForm = ({changeOpen}) => {
    const {state,createReport,defaultSingleData,updateError} = useGlobal()
  const [data, setData] = useState(body);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    const id = state.report_on.event._id
    if(id){
        const {description,state} = data
        if(!description || !state){
          changeErr({
              msg: "All fields are required",
              type: "warning",
              show: true,
            })
            return
        }if(description.length < 60){
          changeErr({
            msg: "Description must be atleast 60 characters",
            type: "warning",
            show: true,
          })
          return
        }
        if(description.length > 400){
          changeErr({
            msg: "Description must be atmost 400 characters",
            type: "warning",
            show: true,
          })
          return
        }
        createReport(id, {description,state})
    }else{changeErr({
      msg: "Please provide an event to report on",
      type: "warning",
      show: true,
    })}
  }
  const changeErr = (err) => {
    updateError(err);
  }
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
      <div>
        <label className="characters">{data.description.length} characters</label>
        <textarea
          placeholder="Description of event"
          value={data.description}
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <select
          value={data.state}
          name="state"
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled={true}>
            Choose How Event Was
          </option>
          <option value="Success">Successful</option>
          <option value="Fail">Failled</option>
        </select>
      </div>
      <div className="submit">
        <input type="submit" value="Create" />
      </div>
      {
        (Object.keys(state.report_on.event).length === 0) ||
      <div className="event-viewer">
        <p>Event you are writting a report on</p>
        <div>
          <p>Name</p>
          <p>{state.report_on.event.name}</p>
        </div>
        <div>
          <p>City</p>
          <p>{state.report_on.event.city}</p>
        </div>
        <div>
          <p>Country</p>
          <p>{state.report_on.event.country}</p>
        </div>
        <div className="image">
          <p>Image</p>
          <img src={state.report_on.event.image[0]} alt="event"/>
        </div>
      </div>
      }
      <div className="submit">
        <button className="choice-btn" onClick={(e)=>{
          e.preventDefault()
          defaultSingleData("events")
          changeOpen()}}>Change Event</button>
      </div>
    </Main>
  );
};

export default RecordForm;
