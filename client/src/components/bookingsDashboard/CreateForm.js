import React, { useEffect, useRef, useState } from 'react'
import { Main } from '../css/dashboard';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import moment from "moment"
const body = {
  "image": [],
  "max_people": "",
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
  const [category, setCategory] = useState([""]);
  const [data, setData] = useState(body);
  const [images, setImage] = useState([""]);
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
      e.preventDefault();
      const { files } = e.target
      const formData = new FormData();
      for (let i = 0; i < files.length; i++){
        formData.append("file", files[i]);
        formData.append("upload_preset", "stay_vacations");
        formData.append("folder", "stay_vacations_images");
        fetch("https://api.cloudinary.com/v1_1/dxxbxjiox/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setImage([...images, data.url]);
          })
          .catch((err) => console.log(err));

      }
  };
  const handleChange = (e) => {
    const { value, name } = e.target
    setData({...data, [name]:value})
  }
  return (
    <Main>
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
              type="text"
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
            onChange={(e) => handleImage(e)}
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
          placeholder="Max People"
          value={data.max_people}
          name="max_people"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Validity"
          ref={dateInput}
          min={moment(new Date()).format("YYYY-MM-DD")}
          value={data.validity}
          onBlur={() => dateInput.current.setAttribute("type", "text")}
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
