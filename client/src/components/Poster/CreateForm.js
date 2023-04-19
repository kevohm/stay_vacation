import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../context/AppContext'
import {Link, useParams} from "react-router-dom"

const CreateForm = () => {
    const [data,setData] = useState(null)
    const {eventId} = useParams()
    const {getSingle,createPoster,getPosters,updateError,setOtherErrors} = useGlobal()
    const [imageUri, setImageUri] = useState(null)
    const [event,setEvent] = useState(null)
    const changeData = (e)=>{
        const file = e.target.files[0]
        const fileData = new FormData()
        fileData.append("image",file)
        setData(fileData)
        const reader = new FileReader()
        reader.addEventListener(
            "load",
            () => {
                setImageUri(reader.result)
            },
            false
          );
        reader.readAsDataURL(file);
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!data){
            updateError({
                msg: "Please provide poster image",
                type: "warning",
                show: true,
              });
        }else{
            updateError({
                msg: "Creating poster...",
                type: "success",
                show: true,
              });
            createPoster(eventId,data).then((res)=>{
                getPosters()
                updateError({
                    msg: "Poster successfully created",
                    type: "success",
                    show: true,
                  });
            }).catch((error)=>setOtherErrors(error))
        }
    }

    useEffect(()=>{
        getSingle(eventId).then((res)=>{
            setEvent(res.data.event)
        })
    },[])
    if(!event){
       return <Main onSubmit={(e)=>handleSubmit(e)}>
        <header>Add Poster</header>
        <div>
            <input type="file" accept='image/*' onChange={(e)=>changeData(e)}/>
        </div>
        {imageUri &&<div>
            <img src={imageUri} alt="current"/>
        </div>
        }
        <div>
            <p>Event to add poster on:</p>
            <div><p>loading...</p></div>
        </div>
        <div className='submit'>
            <button>add poster</button>
        </div>
       </Main>
    }
  return (
   <Main onSubmit={(e)=>handleSubmit(e)}>
    <header>Add Poster</header>
    <div className='file'>
        <label>
            <span>choose file</span>
        <input type="file" accept='image/jpeg,,image/png' onChange={(e)=>changeData(e)}/>
        </label>
    </div>
    {imageUri &&<div>
        <img src={imageUri} alt="current"/>
    </div>
    }
    <div>
        <p>Event to add poster on:</p>
        <div><img src={event.image[0]} alt="event"/></div>
        <div><p>Name</p><p>{event.name}</p></div>
        <div><p>City</p><p>{event.city}</p></div>
        <div><p>Country</p><p>{event.country}</p></div>
    </div>
    <div className='submit'>
        <Link to={`/admin/additional`} >change event</Link>
        <button type="submit">add poster</button>
    </div>
   </Main>
  )
}

export default CreateForm

const Main =styled.form`
${tw`flex flex-col space-y-5 w-full max-w-[400px] items-start`}
>header{
    font-family:poppinsSemi;
    ${tw`text-lg text-[rgba(0,0,0,.7)]`}
}
>div{
    ${tw`w-full flex flex-col items-start space-y-2`}
    p{
        ${tw`text-[rgba(1, 49, 91, .7)] text-sm`}
    }
    img{
        ${tw`w-full max-w-[400px] rounded-lg object-cover`}
    }
    textarea, input, select {
        font-family: poppinsMedium;
        ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
        ::placeholder {
          ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
        }
      }
    >div{
        ${tw`w-full flex items-center space-x-2`}
        p:first-child{
            font-family: poppinsSemi;
            ${tw`w-24`}
        }
        p{
            ${tw`text-xs`}
        }
        img{
            ${tw`w-full max-w-[400px] rounded-lg h-[250px] object-cover`}
        }
    }
}
.file {
    ${tw``}
    label {
      ${tw`relative flex items-center`}
      span {
        font-family: poppinsMedium;
        ${tw`absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1, 49, 91, .6)] bg-[rgba(1, 49, 91, .1)] rounded-l-lg`}
      }
      input {
        ${tw`bg-white cursor-pointer`}
        ::file-selector-button {
          ${tw`cursor-pointer pl-8 `}
          opacity: 0;
        }
      }
    }
  }
.submit{
    ${tw`w-full flex flex-row items-center justify-between`}
    >button{
        font-family:poppins;
        ${tw`capitalize cursor-pointer bg-green text-darkBlue text-sm border-none rounded-lg px-2.5 py-2`}
    }
    >a{
        font-family:poppins;
        ${tw`capitalize cursor-pointer text-white bg-darkBlue text-sm border-none rounded-lg px-2.5 py-2`}
    }
}
`