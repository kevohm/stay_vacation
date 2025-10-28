import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Loader } from '../../smaller/load/Loader'
import { useEvent } from '../context/EventContext'
import {FormError} from "../../smaller/error/FormError"
import Comment from './Comment'
import { useGlobal } from '../../../context/AppContext'

const Comments = () => {
    const {getComments,currentEvent,addComment,updateComment} = useEvent()
    const [comments,setComments] = useState([])
    const {state} = useGlobal()
    const [data,setData] = useState({description:""})
    const [current,setCurrent] = useState(null)
    const [loading,setLoading] = useState(true)
    const [err,setErr] = useState({msg:"",state:"",show:false})
    const handleData = (description,id)=>{
        setCurrent(id)
        setData({description})
    }
    const changeErr = (data)=>{
        const err = {msg:"",state:"",show:false}
        setErr(data)
        setTimeout(()=>setErr(err),3000)
    }
    const fetchComments = ()=>{
        if(currentEvent.loading)return
        getComments(currentEvent.data._id).then((res)=>{
            const {data} = res
            setComments(data.comments)
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault(e)
        addComment(currentEvent.data._id,data).then(()=>{
            changeErr({state:"success",show:true, msg:"Comment created"})
            fetchComments()
        }).catch((error)=>{
            if(error.response && error.response.data){
                changeErr({...err,show:true, msg:error.response.data.msg})
            }
        })
    }
    const handleUpdate= (e)=>{
        e.preventDefault(e)
        updateComment(current,data).then(()=>{
            changeErr({state:"success",show:true, msg:"Comment updated"})
            setCurrent(null)
            fetchComments()
        }).catch((error)=>{
            setCurrent(null)
            if(error.response && error.response.data){
                changeErr({...err,show:true, msg:error.response.data.msg})
            }
        })
    }
    useEffect(()=>{
        fetchComments()
    },[currentEvent.loading])
    if(!currentEvent.isExpired){
        return
    }
    if(loading){
        return <Main>
        <header className='header'>Comments</header>
       <Loader/>
    </Main>
    }
  return (
    <Main>
        <header className='header'>Comments</header>
        <div>
            {(state.user.id && state.user.role) ? <form onSubmit={(current)?(e)=>handleUpdate(e):(e)=>handleSubmit(e)}>
            <FormError {...err}/>
                <div className='input'>
                    <textarea placeholder='Type a comment' value={data.description} onChange={(e)=>setData({description:e.target.value})}/>
                </div>
                <div className='submit'>
                    <input type="submit" value={`${current ? "Update": "Add"} Comment`}/>
                </div>
            </form>:<div className='errors'>
                <p>Please login to comment on event</p>
                </div>}
            {
                comments.length === 0?<p>No Comments Yet. Be first to comment</p> :
                comments.map((item)=>{
                    return <Comment key={item._id} {...item} fetchComments={fetchComments} handleData ={handleData}/>
                })
            }
        </div>
    </Main>
  )
}

export default Comments

const Main = styled.div`
${tw`w-full `}
.header{
  font-family:montserratSemi;
  ${tw`text-base  capitalize text-darkBlue pb-2.5`}
}
>div{
    ${tw`max-h-[500px] overflow-y-scroll overflow-x-auto bg-white p-5 rounded-lg w-full flex flex-col space-y-5`}
    box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
    .errors{
        ${tw`w-full  max-w-[600px] text-sm bg-lightBlue p-2.5 rounded text-white`}
    }
    >form{
        ${tw`w-full max-w-[600px] flex flex-col space-y-2.5`}
        .input {
            ${tw`w-full`}
            textarea, input, select {
              font-family: poppinsMedium;
              ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
              ::placeholder {
                ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
              }
            }
            textarea {
              ${tw`w-full`}
              resize: vertical;
            }
            .characters{
              font-family: poppinsMedium;
              ${tw`text-xs text-[rgba(1, 49, 91, .5)]`}
            }
          }
          .submit{
            ${tw`flex items-center justify-end`}
            input{
                font-family: poppinsMedium;
                ${tw`text-sm cursor-pointer py-2 px-2.5 text-white rounded-lg border border-solid bg-[rgba(1, 49, 91, 1)] border-none`}
              }
          }
    }
}
`