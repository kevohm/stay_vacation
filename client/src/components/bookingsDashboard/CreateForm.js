import React, { useEffect, useRef, useState } from 'react'
import { Main } from '../css/dashboard';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import moment from "moment"
import { uploadFiles,verifyData} from './uploadFiles';
import { useGlobal } from '../../context/AppContext';
import { FormError } from '../smaller/error/FormError';
import { Categories } from './Categories';
const body = {
  "image": [],
  "name": "",
  "description": "",
  "city": "",
  "country": "",
  "category": [],
  "price_choices":[],
  "validity": "",
  "Amenities":[]
}
const CreateForm = ({handleScroll}) => {
  const [priceNum, setPriceNum] = useState([{ price: "", category: "" }])
  const dateInput = useRef()
  const [files, setFiles] = useState([])
  const [amenities, setAmenities] = useState([""]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState(body);
  const {state,addEvent, updateError} = useGlobal()
  const handleAmenity = (val)=>{
    if (val === "add") {
      setAmenities(["",...amenities]);
    } else {
      let arr = [...amenities];
      if (arr.length !== 1) {
        arr.splice(0, 1);
        setAmenities(arr)
      }
    }
  }
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
  const changeAmenities = (e, index) => {
    const { value } = e.target;
    let newData = [...amenities];
    newData[index] = value;
    setAmenities(newData);
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
    handleScroll()
    let newData = {...data, category, Amenities:amenities, price_choices:priceNum}
    if(!verifyData(newData, changeErr)){
      return
    }
    
      try {
        
        changeErr({msg:"Please wait while we process your data...",show:true,type:"success"})
        const newFile = await uploadFiles(files,changeErr)
        if(newFile.length === 0){
          changeErr({msg:"Error while uploading files",show:true,type:"warning"})
          return 
        }
        newData = {...newData, image:newFile }
        setData(newData)
          addEvent(newData)
      } catch (error) {
        console.log(error)
      }
  }
  const changeErr = (err) => {
    updateError(err);
  }
  return (
    <Main onSubmit={(e)=>handleSubmit(e)}>
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
        <label className='characters'>
        {data.description.length} characters
        </label>
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
      <Categories value={category} setValue={setCategory} changeErr={changeErr}/>
      {amenities.map((item, index) => {
        return (
          <div className="lined-up" key={index}>
            <textarea
              type="number"
              min={1}
              className="price"
              placeholder="Amenity"
              value={item}
              name="amenity"
              onChange={(e) => changeAmenities(e, index)}
            />
            <div className="div-icon-add">
              {index === amenities.length - 1 ? (
                <AiOutlinePlus
                  className="icon-add"
                  onClick={() => handleAmenity("add")}
                />
              ) : (
                <AiOutlineMinus
                  className="icon-add"
                  onClick={() => handleAmenity("minus")}
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
