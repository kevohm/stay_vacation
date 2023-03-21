import React, {useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEvent } from "../context/EventContext";

const Search = ({handleRefresh}) => {
  const {filter} = useEvent()
  const [filterData, setfilterData] = useState(filter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilterData({ ...filterData, [name]: value });
  };
  const handlePrice = (value) => {
    setfilterData({ ...filterData, price: { min: value[0], max: value[1] } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRefresh(filterData)
  };
  return (
    <Main onSubmit={(e) => handleSubmit(e)}>
      <div className="input">
        <label>Search</label>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Keywords"
            value={filterData.search}
            onChange={(e) => handleChange(e)}
          />
          <input className="submit" type="submit" value="Search" />
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
            <label>Ksh {filterData.price.min}</label>
            <label>ksh {filterData.price.max}</label>
          </div>
        </div>
      </div>
      <div className="input">
        <label>Category</label>
        <div className="radio">
          {filterData.data.map((i) => {
            return (
              <div key={i}>
                <input
                  type="radio"
                  name="category"
                  value={i}
                  onChange={(e) => handleChange(e)}
                />
                <label>{i}</label>
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};

export default Search;

const Main = styled.form`
${tw`bg-white h-auto md:h-[25rem] w-full max-w-none min-w-min md:min-w-[270px] lg:max-w-[424px] rounded-lg p-10 lg:p-12 flex flex-col space-y-6`}
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
.input{
  ${tw`flex flex-col space-y-4 `}
  >label{
    font-family:montserratSemi;
    ${tw`text-darkBlue`}
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
`;
