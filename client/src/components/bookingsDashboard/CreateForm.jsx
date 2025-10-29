import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { uploadFiles, verifyData } from "./uploadFiles";
import { useGlobal } from "../../context/AppContext";
import { Categories } from "./Categories";

const body = {
  image: [],
  name: "",
  description: "",
  city: "",
  country: "",
  category: [],
  price_choices: [],
  validity: "",
  Amenities: [],
};

const CreateForm = ({ handleScroll }) => {
  const [priceNum, setPriceNum] = useState([{ price: "", category: "" }]);
  const dateInput = useRef();
  const [files, setFiles] = useState([]);
  const [amenities, setAmenities] = useState([""]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState(body);
  const { state, addEvent, updateError } = useGlobal();

  const handleAmenity = (val) => {
    if (val === "add") {
      setAmenities(["", ...amenities]);
    } else {
      let arr = [...amenities];
      if (arr.length !== 1) arr.splice(0, 1);
      setAmenities(arr);
    }
  };

  const handlePrice = (val) => {
    if (val === "add") {
      setPriceNum([...priceNum, { price: "", category: "" }]);
    } else {
      let arr = [...priceNum];
      if (arr.length !== 1) arr.splice(arr.length - 1, 1);
      setPriceNum(arr);
    }
  };

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
    setFiles(e.target.files);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleScroll();
    let newData = {
      ...data,
      category,
      Amenities: amenities,
      price_choices: priceNum,
    };

    if (!verifyData(newData, changeErr)) return;

    try {
      changeErr({
        msg: "Please wait while we process your data...",
        show: true,
        type: "success",
      });
      const newFile = await uploadFiles(files, changeErr);
      if (newFile.length === 0) {
        changeErr({
          msg: "Error while uploading files",
          show: true,
          type: "warning",
        });
        return;
      }
      newData = { ...newData, image: newFile };
      setData(newData);
      addEvent(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const changeErr = (err) => updateError(err);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-none sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5"
    >
      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          name="name"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium placeholder:text-[rgba(1,49,91,.5)]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs text-[rgba(1,49,91,.5)] font-medium">
          {data.description.length} characters
        </label>
        <textarea
          placeholder="Description"
          value={data.description}
          name="description"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium placeholder:text-[rgba(1,49,91,.5)] resize-vertical"
        />
      </div>

      {/* Price choices */}
      {priceNum.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-5 text-[rgba(1,49,91,1)]"
        >
          <input
            type="number"
            min={1}
            placeholder="Price"
            name="price"
            value={item.price}
            onChange={(e) => changePrice(e, index)}
            className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
          />
          <p>Per</p>
          <input
            type="text"
            placeholder="Payment Type"
            name="category"
            value={item.category}
            onChange={(e) => changePrice(e, index)}
            className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
          />
          <div className="flex items-center text-[rgba(1,49,91,1)]">
            {index === priceNum.length - 1 ? (
              <AiOutlinePlus
                className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-4xl"
                onClick={() => handlePrice("add")}
              />
            ) : (
              <AiOutlineMinus
                className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-4xl"
                onClick={() => handlePrice("minus")}
              />
            )}
          </div>
        </div>
      ))}

      {/* File input */}
      <div className="relative flex items-center">
        <label className="relative flex items-center">
          <span className="absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1,49,91,.6)] bg-[rgba(1,49,91,.1)] rounded-l-lg font-medium">
            Choose Files
          </span>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleImage}
            className="bg-white cursor-pointer"
          />
        </label>
      </div>

      {/* Category */}
      <Categories
        value={category}
        setValue={setCategory}
        changeErr={changeErr}
      />

      {/* Amenities */}
      {amenities.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-5 text-[rgba(1,49,91,1)]"
        >
          <textarea
            placeholder="Amenity"
            value={item}
            name="amenity"
            onChange={(e) => changeAmenities(e, index)}
            className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium resize-vertical"
          />
          <div className="flex items-center text-[rgba(1,49,91,1)]">
            {index === amenities.length - 1 ? (
              <AiOutlinePlus
                className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-4xl"
                onClick={() => handleAmenity("add")}
              />
            ) : (
              <AiOutlineMinus
                className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-4xl"
                onClick={() => handleAmenity("minus")}
              />
            )}
          </div>
        </div>
      ))}

      {/* Validity */}
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
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
        />
      </div>

      {/* City & Country */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-5 md:space-y-0 md:space-x-5">
        <input
          type="text"
          placeholder="City"
          value={data.city}
          name="city"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
        />
        <input
          type="text"
          placeholder="Country"
          value={data.country}
          name="country"
          onChange={handleChange}
          className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] font-medium"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <input
          type="submit"
          value="Create"
          className="cursor-pointer bg-green border-none text-darkBlue w-max hover:bg-[rgba(113,242,139,.9)] px-5 py-2.5 rounded-lg"
        />
      </div>
    </form>
  );
};

export default CreateForm;
