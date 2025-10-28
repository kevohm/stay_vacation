import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useGlobal } from "../../../context/AppContext";
import { FormError } from "../../smaller/error/FormError";
import { useEvent } from "../context/EventContext";

const Comment = ({user,description,_id,fetchComments,handleData}) => {
    const [err,setErr] = useState({msg:"",state:"",show:false})
    const {state} = useGlobal()
    const {deleteComment} = useEvent()
    const changeErr = (data)=>{
        const err = {msg:"",state:"",show:false}
        setErr(data)
        setTimeout(()=>setErr(err),3000)
    }
    const yours = (state.user.id && state.user.role) ? user._id === state.user.id : false
    const handleDelete = (e)=>{
        e.preventDefault();
        deleteComment(_id).then(()=>{
            changeErr({state:"success",show:true, msg:"Comment deleted"})
            fetchComments()
        }).catch((error)=>{
            if(error.response && error.response.data){
                changeErr({...err,show:true, msg:error.response.data.msg})
            }
        })
    }
  return (
    <Main>
        <FormError {...err}/>
      <header>{user.username}</header>
      <p>{description}</p>
     {yours && <div className="actions">
        <button className="delete" onClick={(e)=>handleDelete(e)}>delete</button>
        <button className="edit" onClick={()=>handleData(description,_id)}>edit</button>
      </div>}
    </Main>
  );
};

export default Comment;

const Main = styled.div`
    ${tw`w-full bg-[rgba(138, 154, 234, .08)] rounded-lg p-2 max-w-[800px] flex flex-col space-y-2`}
    >header{
        font-family:montserratSemi;
        ${tw`text-sm text-[rgba(1, 49, 91, .7)]`}
    }
    p{
        font-family:poppins;
        ${tw`text-sm `}
    }
    .actions{
        ${tw`w-full flex items-center justify-between`}
        >button{
            ${tw`cursor-pointer p-1 px-2 border-none text-white rounded`}
        }
        .delete{
            ${tw`bg-orange`}
        }
        .edit{
            ${tw`bg-darkBlue`}
        }
    }
`;
