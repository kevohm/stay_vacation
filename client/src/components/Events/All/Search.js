import React, {useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {FaInfoCircle} from "react-icons/fa"
import { useEvent } from "../context/EventContext";
import { getCookie } from "../../../context/utils";
import Categories from "./Categories";
import { minDate,currentDate } from "../context/utils";

const Search = ({handleRefresh,filter}) => {
  const {removeFilterLocal} = useEvent()
  const [filterData, setfilterData] = useState(
    {
      search: getCookie("search") || filter.search,
      category: getCookie("category") || filter.category,
      price: { min: getCookie("min") || filter.price.min, max: getCookie("max") || filter.price.max},
      validity: getCookie("validity") || filter.validity,
      expired: getCookie("expired") === "true" ||  true
    }
  );
  const changeExpired = (val)=>{
    if(val){
      setfilterData({...filterData,expired:val,validity:minDate})
    }else{
      setfilterData({...filterData,expired:val,validity:currentDate})
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilterData({ ...filterData, [name]: value });
  };
  const handlePrice = (value) => {
    setfilterData({ ...filterData, price: { min: value[0], max: value[1] } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    removeFilterLocal()
    handleRefresh({...filterData})
  };
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <div className="classification">
        <button type="button" className={`${filterData.expired && "active"}`} onClick={()=>changeExpired(true)}>upcoming</button>
        <button type="button" className={`${filterData.expired || "active"}`} onClick={()=>changeExpired(false)}>past events</button>
      </div>
      <div className="input">
        <label>Search</label>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="keywords"
            value={filterData.search}
            onChange={(e) => handleChange(e)}
          />
          <input className="submit" type="submit" value="Apply" />
        </div>
      </div>
      <div className="input">
        <label>Price</label>
        <div className="range">
          <RangeSlider
            className="slider"
            min={0}
            max={900000}
            step={5000}
            value={[filterData.price.min, filterData.price.max]}
            onInput={handlePrice}
          />
          <div>
            <label>Ksh. {Number(filterData.price.min).toLocaleString()}</label>
            <label>ksh. {Number(filterData.price.max).toLocaleString()}</label>
          </div>
        </div>
      </div>
      <Categories handleChange={handleChange} category={filterData.category}/>
      <div className="input">
        <label>date</label>
        <div className="validity">
          <input
            type="date"
            name="validity"
            value={filterData.validity}
            min={filterData.expired ? minDate : ""}
            max={filterData.expired ? "":minDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="info">
        <FaInfoCircle/>
        {
          filterData.expired?<p>
            will show events that are valid till the date provided above
          </p>:<p>
          will show events that expired between now and the date provided above
          </p>
        }
      </div>
    </Main>
  );
};

export default Search;

const Main = styled.form`
${tw`bg-white h-auto md:h-[38.958rem] w-full max-w-none min-w-min md:min-w-[270px] lg:max-w-[424px] rounded-lg p-10 lg:p-12 flex flex-col space-y-6`}
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
.classification{
  ${tw`flex items-center justify-evenly w-full`}
  > button{
    ${tw`cursor-pointer p-2 px-2.5 rounded-lg bg-white border border-lightBlue border-solid text-lightBlue`}
  }
  .active{
    ${tw`bg-lightBlue text-white`}
  }
}
.info{
  ${tw`w-full text-sm text-lightBlue flex items-start space-x-2 justify-start`}
  >p{
    ${tw`text-xs`}
  }
}

.input{
  ${tw`flex flex-col space-y-4 `}
  >label{
    font-family:montserratSemi;
    ${tw`text-darkBlue capitalize`}
  }
  >div{
    ${tw`flex items-center space-x-2`}
    
  }
  .range{
    ${tw`flex flex-col space-y-2`}
    >div{
      ${tw`w-full flex justify-between`}
      label{
        font-family:montserratMedium;
        ${tw`text-[rgba(1, 49, 91, .7)] text-sm text-end`}
      }
    }
    .slider{
      ${tw`bg-[rgba(1, 49, 91, .3)] h-[2px]`}
    }
    .slider .range-slider__range, .slider .range-slider__thumb{
      ${tw`bg-orange`}
    }
    .slider .range-slider__thumb{
      ${tw`h-[15px] w-[15px]`}
    }
  }
  .validity{
    ${tw`w-full flex items-start space-x-0`}
    >input{
      font-family:poppins
      ${tw`w-full h-full px-3 py-[10px]  text-[rgba(1, 49, 91,.7)] rounded-lg border-[rgba(1, 49, 91, .3)]  border-solid border`}
      :placeholder{
        font-family:poppins;
        ${tw`text-[rgba(1, 49, 91, .7)] `}
      }
    }
  }
  .search{
    ${tw`w-full flex items-start space-x-0`}
    >input{
      font-family:poppins
      ${tw`w-full h-full px-3 py-[10px]  text-[rgba(1, 49, 91,.7)] rounded-l-lg border-[rgba(1, 49, 91, .3)]  border-solid border`}
      border-right:none;
      :placeholder{
        font-family:poppins;
        ${tw`text-[rgba(1, 49, 91, .7)] `}
      }
    }
    .submit{
      font-family:poppinsSemi;
      ${tw`w-max px-2.5 py-[7.5px] bg-orange text-white border-orange border-solid border rounded-none rounded-r-lg`}
    }
  }
  .radio{
    ${tw`grid grid-cols-2 sm:grid-cols-3 items-start md:grid-cols-2 gap-2 space-x-0 overflow-x-auto h-auto md:h-[5rem] overflow-y-auto md:overflow-y-scroll`}
    >div{
      ${tw`text-[rgba(1, 49, 91, .7)] flex items-center space-x-2`}
      input{
        ${tw`text-orange border-orange border border-solid`}
        appearance: none;
        background-color: #fff;
        margin: 0;
        font: inherit;
        width: 1.15em;
        height: 1.15em;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
      }
      input::before {
        content: "✔";
        ${tw`text-lg`}
        transform: scale(0);
        transition: 120ms transform ease-in-out;
      }
      
      input:checked::before {
        transform: scale(1);
      }
    }
  }
}
.error{
  ${tw`w-full`}
  >label{
    font-family:montserratSemi;
    ${tw`text-darkBlue`}
  }
  >div{
    ${tw`w-full flex items-center justify-center h-full max-h-[4rem]`}
    p{
      ${tw`text-sm text-darkBlue`}
    }
  }
}
`;
