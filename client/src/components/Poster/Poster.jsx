import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../context/AppContext'

const Poster = ({image,event,_id}) => {
  const {deletePoster,getPosters,updateError,setOtherErrors} = useGlobal()
  const handleDelete = ()=>{
    deletePoster(_id).then((res)=>{
      getPosters()
      updateError({msg: "Successfully deleted poster",
      type: "success",
      show: true,})
    }).catch((err)=>setOtherErrors(err))
  }
  return (
    <Main>
      <img src={image} alt={event.name}/>
      <div>
        <p>{event.name}{`, ${event.city}`}</p>
        <button onClick={handleDelete}>delete</button>
      </div>
    </Main>
  )
}

export default Poster

const Main = styled.div`
${tw`w-full flex flex-col items-start space-y-2.5`}
>img{
  ${tw`w-full object-cover rounded-t-lg`}
}
>div{
  ${tw`w-full flex justify-between items-center`}
  p{
    font-family:poppins;
    ${tw`text-sm`}
  }
  button{
    ${tw`px-2.5 py-2 bg-orange text-white border-none rounded-lg cursor-pointer`}
  }
}
`