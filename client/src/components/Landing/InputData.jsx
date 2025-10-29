import React, { useState } from "react";
import { InputBtnRounded } from "../smaller/input/InputBtnRounded";
import { Input } from "../smaller/input/Input";
import { inputData } from "../utils/landing/services";
import { useEvent } from "../Events/context/EventContext";
import { useNavigate } from "react-router-dom";
import { minDate } from "../Events/context/utils";

const InputData = () => {
  const [data, setData] = useState(inputData);
  const [body, setBody] = useState({
    city: "",
    date: minDate,
    min: 0,
    max: 300000,
  });
  const navigate = useNavigate();
  const { storeFilter, setFilter } = useEvent();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name.toLowerCase()]: value });
    setData((prev) =>
      prev.map((item) => (item.name === name ? { ...item, value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeFilter(body.city, body.date, body.min, body.max, "", false);
    setFilter({
      search: body.city,
      category: "",
      price: { min: body.min, max: body.max },
      validity: body.date,
      expired: false,
    });
    navigate("/events");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="z-10 w-[calc(100% - 16px)] sm:w-full max-w-[450px] md:max-w-[550px] lg:max-w-[700px] absolute top-0 left-1/2 flex flex-col items-start space-y-3 sm:space-y-5 bg-white rounded-lg text-darkBlue py-5 px-4 sm:px-6 md:px-12 -translate-x-1/2 -translate-y-1/2 shadow-[0_4px_16px_rgba(138,154,234,0.25)]"
    >
      <header>
        <p className="text-lg sm:text-xl font-poppinsMedium">
          Where are you traveling to?
        </p>
      </header>

      <div className="w-full flex items-center space-x-3 sm:space-x-5">
        {data.map((item) => (
          <Input key={item.title} {...item} handleChange={handleChange} />
        ))}
      </div>

      <div className="w-full flex flex-col items-end">
        <InputBtnRounded text="Search" bg="#FFA402" />
      </div>
    </form>
  );
};

export default InputData;
