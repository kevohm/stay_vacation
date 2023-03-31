import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobal } from "../../context/AppContext";
import { BiLoaderAlt } from "react-icons/bi";
import {FaPlus,FaEdit, FaTimes} from "react-icons/fa"
import { Category } from "./Category";

export const Categories = ({ value, setValue, changeErr, id="1"}) => {
  const { state, getCategories,addCategory ,updateCategory,dispatch} = useGlobal();
  const [newCategory,setNewCategory] = useState("")
  const [category,setCategory] = useState({})
  const [update, setUpdate] = useState({status:false,data:"", id:""})

  const changeCategory = (index, val)=>{
    setCategory({...category, [`${index}`]:val})
    console.log(category,value,index,val)
  }
  const handleChange = (val, checked, index) => {
    console.log(value,category)
    let arr = category
    if (checked) {
      arr[index] = val
      setCategory(arr)
      setValue(Object.values(arr)); 
    } else {
      delete arr[index]
      setCategory(arr)
      setValue(Object.values(arr));
    }
  };
  const changeUpdate = (e)=>{
    const {value} = e.target
    setUpdate({...update, data:value})
  }
  const changeCurrent = (e)=>{
    const {value} = e.target
    setNewCategory(value)
  }
  const handleSubmit = (e, value)=>{
    e.preventDefault()
    if(newCategory.length === 0){
      changeErr({
        msg: "Please provide the required data",
        state: "",
        show: true,
      })
    }else{
      addCategory({name:newCategory})
    }
  }
  const submitUpdate = (e)=>{
    e.preventDefault()
    if(!update.data){
      changeErr({
        msg: "Please provide the required data",
        state: "",
        show: true,
      })
    }else{
     updateCategory(update.id, update.data).then(
      ()=>setUpdate({data:"",id:"",status:false})
     )     
    }
  }
  const fetchCategories = ()=>{
    getCategories().then(
      (res)=>{
        const {categories} = res.data
        let obj = {}
        categories.forEach((i,index)=>{
          if(value.includes(i._id)){
            obj[index] = i._id
          }
        })
        dispatch({
          type:"SET_EVENT_CATEGORY",
          payload:{categories}
        })
        setCategory(obj)
      }
      )
      
    }
    useEffect(() => {
      fetchCategories()
    }, []);
    if (state.event_category.loading) {
      return (
        <MainLoad>
        <div className="loader">
          <p>Loading categories</p>
          <BiLoaderAlt className="icon" />
        </div>
      </MainLoad>
    );
  }
  return (
    <Main>
      {update.status && <div className="update-popup">
        <div>
          <FaTimes className="icon" onClick={()=>setUpdate({...update,status:false})}/>
        </div>
      <input type="text" placeholder="Type here" value={update.data} onChange={(e)=>changeUpdate(e)}/>
        <button title="update category"  onClick={(e)=>submitUpdate(e)}>update</button>
      </div>}
      {state.event_category.data.map((i, index) => <Category key={i.name} id={id} {...i} index={index} value={value} setUpdate={setUpdate} handleChange={handleChange}/>)}
      <div className="add">
        <input type="text" placeholder="Type here" value={newCategory} onChange={(e)=>changeCurrent(e)}/>
        <button title="add new category"  onClick={(e)=>handleSubmit(e)}>
        <FaPlus className="icon"/>
        </button>
      </div>
    </Main>
  );
};
const MainLoad = styled.div`
  .loader {
    ${tw`flex space-x-2 rounded-lg items-center justify-center`}
    ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
    .icon {
      ${tw`animate-spin text-[rgba(1, 49, 91, .3)]`}
    }
  }
`;

const Main = styled.div`
  ${tw`relative w-full flex flex-wrap`}
  .update-popup{
    ${tw`bg-white flex flex-col space-y-2 items-center top-0 left-0 w-full h-[140px] rounded-lg absolute z-40 p-3 border border-darkBlue border-solid`}
    >div{
      ${tw`w-full flex items-center py-2 justify-end`}
      .icon{
        ${tw`text-sm text-darkBlue`}
      }
    }
    >input{
      ${tw`p-2 text-xs`}
      :placeholder{
        ${tw`text-xs`}
      }
    }
    button{
      ${tw`p-2 w-full rounded-lg bg-green text-darkBlue border-none cursor-pointer`}
    }
  }
  .add{
    ${tw`flex items-center justify-start mr-2 mt-2 space-x-2`}
    >input{
        font-family:poppins;
        ${tw`w-[100px] py-2 px-2.5 text-sm`}
        ::placeholder{
            font-family:poppins;
            ${tw`text-sm`}
        }
    }
    >button{
        ${tw`w-[25px] hover:bg-orange text-orange hover:text-white h-[25px] flex items-center justify-center rounded-full bg-white border border-solid border-orange`}
        .icon{
            ${tw`text-xs`}
        }
    }
  }
  
`;

// `
// input{
//     ${tw`text-orange border-orange border border-solid`}
//     appearance: none;
//     background-color: #fff;
//     margin: 0;
//     font: inherit;
//     width: 10px;
//     height: 10px;
//     transform: translateY(-0.075em);
//     display: grid;
//     place-content: center;
//   }
//   input::before {
//     content: "✔";
//     ${tw`text-lg`}
//     transform: scale(0);
//     transition: 120ms transform ease-in-out;
//   }

//   input:checked::before {
//     transform: scale(1);
//   }
// }
// `
