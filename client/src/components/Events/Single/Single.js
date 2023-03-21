import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useEvent } from '../context/EventContext'
import tw from 'twin.macro'
import { Loader } from '../../smaller/load/Loader'
import { useParams } from 'react-router-dom'
import {BsCheck2Circle} from "react-icons/bs"
import {FaInfoCircle} from "react-icons/fa"
import err from "../../../assets/svg/error.svg"
import dot from "../../../assets/svg/dot.svg"

const Single = () => {
  const {currentEvent,getSingle} = useEvent()
  const {eventId} = useParams()
  useEffect(()=>{
    getSingle(eventId)
    },[eventId])
    if(currentEvent.loading){
      return <Err>
        <Loader color="#8A9AEA"/>
      </Err>
    }
    if(!currentEvent.id){
      return <Err>
        <img src={err} alt="error"/>
        <p>Opps! Event does not exist.</p>
      </Err>
    }
    console.log(currentEvent.data)
  return (
    <Main>
      <div className='images'>
        {
          currentEvent.data.image.map(
            (item, index)=>{
              const {name} = currentEvent.data
              const key = `${name} ${index}`
            return <img key={key} src={item} alt={key}/>
          }
          )
        }
      </div>
      <div className='info'>
        <div>
        <header className='title'>{currentEvent.data.name}</header>
        <p>{currentEvent.data.description}</p>
        </div>
        <div>
          <header  className='title'>Price</header>
          <div className='price'>
            <ul>
            {
              currentEvent.data.price_choices.map((item, index)=> <li key={index}>
                <img src={dot} alt={index}/>
                <p>ksh. {item.price.toLocaleString("en-US")} per {item.category}</p>
              </li>)
            }
            </ul>
          </div>
        </div>
        <div>
          <header  className='title'>Amenities</header>
          <div className='amenities'>
            <BsCheck2Circle className='icon'/>
            <p>Transport in 6 seater luxury open roof tour vans / landcruisers for 3 days</p>
          </div>
        </div>
        <div className='submit'>
          <button>Book now</button>
        </div>
        <div className='info-div'>
          <FaInfoCircle className='icon'/>
          <p>For more information, contact us at <span>+254704591173</span></p>
        </div>
      </div>
    </Main>

  )
}

export default Single
const Err = styled.div`
${tw`w-full flex-col space-y-10 flex bg-white rounded-lg py-12 items-center justify-center`}
>img{
  ${tw`w-full max-w-[400px]`}
}
`
const Main = styled.div`
${tw`w-full bg-white rounded-lg p-2.5 flex flex-col items-center md:items-start  space-y-5 md:grid md:grid-cols-[48%, 52%] md:gap-2.5`}
.images{
  ${tw`w-full max-w-[620px] grid grid-cols-[repeat(auto-fill, minmax(120px, 1fr))] 
  sm:grid-cols-[repeat(auto-fill, minmax(130px, 1fr))]  md:grid-cols-[repeat(auto-fill, minmax(150px, 1fr))] 
  lg:grid-cols-[repeat(auto-fill, minmax(200px, 1fr))] xl:grid-cols-[repeat(auto-fill, minmax(220px, 1fr))] gap-2.5`}
  >img{
    ${tw`w-full h-full max-h-[200px] rounded-lg`}
  }
}
.info{
  ${tw`w-full max-h-[850px] max-w-[720px] pl-5 flex flex-col space-y-5 pr-6 overflow-y-scroll`}
  p{
    font-family:montserratMedium;
    ${tw`text-sm`}
  }
  .title{
    font-family:montserratSemi;
    ${tw`text-lg text-darkBlue`}
  }
  >div{
    ${tw`w-full flex flex-col space-y-2 py-8`}
    .amenities{
      ${tw`flex items-center space-x-4 pl-1`}
      .icon{
        ${tw`text-orange text-sm`}
      }
    }
    .price{
      ${tw`flex items-start pl-1`}
      ul{
        ${tw`list-none`}
        li{
          ${tw`flex items-center space-x-4`}
        }
      }
    }
    
    
  }
  div:first-child{
    ${tw`pt-0`}
  }
  .submit{
    ${tw`py-10 items-end`}
    button{
      ${tw`p-2.5 py-2 rounded-lg bg-green text-darkBlue border-none`}
    }
  }
  .info-div{
    ${tw`w-full pb-0 max-w-[430px] mx-auto space-y-0 flex-row items-center space-x-5 `}
    .icon{
      ${tw`text-lightBlue w-max`}
    }
    p{
      ${tw`w-full text-lightBlue text-sm`}
    }
    span{
      font-family:montserratSemi;
      ${tw`text-darkBlue`}
    }
  }
  
}
`