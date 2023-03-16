import React, { useEffect, useRef, useState } from 'react'
import { Main } from '../css/dashboard';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import moment from "moment"
import { uploadFiles,verifyData} from './uploadFiles';
import { useGlobal } from '../../context/AppContext';
import { FormError } from '../smaller/error/FormError';
const body = {
  "image": [],
  "name": "",
  "description": "",
  "city": "",
  "country": "",
  "category": [],
  "price_choices":[],
  "validity": "",
}
const CreateForm = () => {
  const [priceNum, setPriceNum] = useState([{ price: "", category: "" }])
  const dateInput = useRef()
  const [files, setFiles] = useState([])
  const [category, setCategory] = useState([""]);
  const [data, setData] = useState(body);
  const {state,addEvent,setForm} = useGlobal()
  const handlePrice = (val) => {
    if (val === "add") {
      setPriceNum([...priceNum, { price: "", category: "" }]);
    } else {
      let arr = [...priceNum];
      if (arr.length !== 1) {
        arr.splice(arr.length - 1, 1);
        setPriceNum(arr)
      }
    }
  }
  const changePrice = (e, index) => {
    const { value, name } = e.target;
    let newData = [...priceNum];
    newData[index][name] = value;
    setPriceNum(newData);
  };
  const handleCategory = (val) => {
    if (val === "add") {
      setCategory([...category, ""]);
    } else {
      let arr = [...category];
      if (arr.length !== 1) {
        arr.splice(arr.length - 1, 1);
        setCategory(arr);
      }
    }
  }
  const changeCategory = (e, index) => {
    const { value } = e.target;
    let newData = [...category];
    newData[index] = value;
    setCategory(newData);
  };
    const handleImage = (e) => {
      const { files } = e.target
      setFiles(files)
  };
  const handleChange = (e) => {
    const { value, name } = e.target
    setData({...data, [name]:value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let newData = {...data, category, price_choices:priceNum}
    if(!verifyData(newData, changeErr)){
      return
    }
      try {
        changeErr({
          msg: "Please wait while we process your data...",
          state: "success",
          show: true,
        })
        const newFile = await uploadFiles(files,changeErr)
        if(newFile.length === 0){
          return
        }
        newData = {...newData, image:newFile }
        setData(newData)
        console.log(newData)
          addEvent(newData)
      } catch (error) {
        console.log(error)
      }
  }
  const changeErr = (err) => {
    setForm("event",err);
  }
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
      {state.event_form.show && <FormError err={state.event_form} />}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <textarea
          type="text"
          placeholder="Description"
          value={data.description}
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </div>
      {priceNum.map((item, index) => {
        return (
          <div className="lined-up" key={index}>
            <input
              type="number"
              min={1}
              className="price"
              placeholder="Price"
              value={item.price}
              name="price"
              onChange={(e) => changePrice(e, index)}
            />
            <p>Per</p>
            <input
              type="text"
              className="payment-type"
              placeholder="Payment Type"
              value={item.category}
              name="category"
              onChange={(e) => changePrice(e, index)}
            />
            <div className="div-icon-add">
              {index === priceNum.length - 1 ? (
                <AiOutlinePlus
                  className="icon-add"
                  onClick={() => handlePrice("add")}
                />
              ) : (
                <AiOutlineMinus
                  className="icon-add"
                  onClick={() => handlePrice("minus")}
                />
              )}
            </div>
          </div>
        );
      })}
      <div className="file">
        <label htmlFor="image">
          <span>Choose Files</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple={true}
            onChange={(e)=>handleImage(e)}
          />
        </label>
      </div>
      {category.map((item, index) => {
        return (
          <div className="lined-up" key={index}>
            <input
              type="text"
              placeholder="Category"
              value={item}
              name="category"
              onChange={(e) => changeCategory(e, index)}
            />
            <div className="div-icon-add">
              {index === category.length - 1 ? (
                <AiOutlinePlus
                  className="icon-add"
                  onClick={() => handleCategory("add")}
                />
              ) : (
                <AiOutlineMinus
                  className="icon-add"
                  onClick={() => handleCategory("minus")}
                />
              )}
            </div>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          placeholder="Validity" 
          ref={dateInput}
          min={moment(new Date()).format("YYYY-MM-DD")}
          value={data.validity}
          onBlur={() => dateInput.current.setAttribute("type", "date")}
          onFocus={() => dateInput.current.setAttribute("type", "date")}
          name="validity"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="lined-up-now">
        <input
          type="text"
          placeholder="city"
          value={data.city}
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Country"
          value={data.country}
          name="country"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="submit">
        <input type="submit" value="Create" />
      </div>
    </Main>
  );
}

export default CreateForm
