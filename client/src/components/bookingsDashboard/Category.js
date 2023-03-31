
import styled from 'styled-components'
import tw from 'twin.macro'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

export const Category = ({name,_id,index, setUpdate, handleChange, value=[], id}) => {
  const [isChecked, setIsChecked] = useState(false)
  const changeCheck = ()=>{
    if(value.includes(_id)){setIsChecked(true)}
  }
  useEffect(
    ()=>{
      changeCheck()
    },[]
  )
  return (
    <Main >
            <div id="inputPreview">
            <input
              className="css-checkbox"
              name="cssCheckbox"
              id={`index${id}${index}`} 
              type="checkbox"
              checked={isChecked}
              onChange={(e) =>{
                setIsChecked(!isChecked)
                handleChange(_id, e.target.checked,index)
              }
              }
            />
            <label htmlFor={`index${id}${index}`}>{name}</label>
          </div>
            <div className="update-category" onClick={()=>setUpdate({status:true, data:name, id:_id})} title="update">
            <FaEdit className="icon"/>
          </div>
          
        </Main>
  )
}


export  const Main = styled.div`
${tw``}
    ${tw`flex items-center justify-start p-0 m-0 p-2 mr-2 mt-2 space-x-4 rounded-lg border-[rgba(1, 49, 91, .5)] border border-solid`}
    #input-div{
        ${tw`p-2`}
        width:min-content;
    }
    >div { 
        ${tw`flex items-center `}

      .css-checkbox {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
      }
      #inputPreview {
        ${tw`flex items-center justify-start`}
      }
      .css-checkbox + label {
        position: relative;
        font-size: 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        height: 16px;
        color: rgba(1, 49, 91, .7);
        ${tw`text-sm`}
      }
      .css-checkbox + label::before {
        content: " ";
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        width: 14px;
        height: 14px;
        background-color: rgb(255, 255, 255);
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 166, 0);
        border-radius: 3px;
        box-shadow: none;
      }
      .css-checkbox:checked + label::after {
        content: " ";
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZhYTAwIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ii8+PC9zdmc+");
        background-repeat: no-repeat;
        background-size: 10px 10px;
        background-position: center center;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0px;
        left: 0px;
        top: 0px;
        text-align: center;
        background-color: transparent;
        font-size: 10px; 
        height: 16px;
        width: 16px; 
      }
      
      
    }
    .update-category{
      ${tw`flex items-center justify-center bg-darkBlue w-5 h-full rounded-sm`}
      cursor:pointer;
      .icon{
        ${tw`text-white text-xs`}
        cursor:pointer;
      }
    }

`