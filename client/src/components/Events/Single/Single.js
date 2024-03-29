import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useEvent } from '../context/EventContext'
import { Link } from 'react-router-dom'
import moment from 'moment'
import tw from 'twin.macro'
import { Loader } from '../../smaller/load/Loader'
import { useParams } from 'react-router-dom'
import {BsCheck2Circle} from "react-icons/bs"
import {FaInfoCircle} from "react-icons/fa"

import err from "../../../assets/svg/error.svg"
import dot from "../../../assets/svg/dot.svg"
import Likes from './Likes'

const Single = () => {
  const {currentEvent,getSingle} = useEvent()
  const {name} = useParams()
  useEffect(()=>{
    getSingle(name)
    },[name])
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
        <header className='title'><p>{currentEvent.data.name}</p><p>{`, ${currentEvent.data.city}`}</p></header>
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
          {
            currentEvent.data.Amenities.map(
              (item,index)=><div key={index} className='amenities'>
              <BsCheck2Circle className='icon'/>
              <p>{item}</p>
            </div>
            )
          }
          
        </div>
        <div>
          <header  className='title'>Category</header>
          <div className='categories'>
          {
            currentEvent.data.category.map(
              (item,index)=><div key={index} className='category'>
              <p>{item.name}</p>
            </div>
            )
          }
          </div>
          
        </div>
        <Likes eventId={currentEvent.data._id}/>
        <div>
          <header  className='title'>Expires at</header>
          <p>{`${moment(currentEvent.data.validity).format("dddd, MMMM DD YYYY")}`}</p>
          
        </div>
        <div className='submit'>
        <div className='info-div'>
          <FaInfoCircle className='icon'/>
          <p>You can only book an event 24hrs before it expires <Link to="/info/contact">contact Us</Link></p>
        </div>
        {!currentEvent.isExpired && <div className='book'>
          <Link to={`/events/${name}/book`}>Book now</Link> 
        </div>
        }
          
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
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
.images{
  ${tw`w-full max-w-[620px] grid grid-cols-[repeat(auto-fill, minmax(220px, 1fr))]
  md:grid-cols-[repeat(2, minmax(150px, 1fr))] gap-2.5`}
  >img{
    ${tw`w-full h-full h-[150px] md:h-[200px] rounded-lg object-cover`}
  }
}
.info{
  ${tw`w-full max-w-[720px] pl-5 flex flex-col space-y-10 pr-6`}
  p{
    font-family:montserratMedium;
    ${tw`text-sm`}
  }
  .title{
    font-family:montserratSemi;
    ${tw`flex items-center text-lg text-darkBlue`}
    >p{
      font-family:montserratSemi; 
    ${tw`w-auto text-lg capitalize text-darkBlue`}
    }
  }
  >div{
    ${tw`w-full flex flex-col space-y-2 `}
    .categories{
      ${tw`w-full grid grid-cols-[repeat(auto-fill, minmax(70px, 1fr))] gap-5`}
      .category{
        ${tw`w-max rounded-xl  text-darkBlue border border-solid border-darkBlue p-2 px-2.5`}
      }
    }
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
    .reaction{
      ${tw`flex space-x-5 text-xl items-center`}
      >div{
        ${tw`flex items-center space-x-2.5`}
        p{
          font-family:poppins;
          ${tw`text-sm text-[rgba(0,0,0,.5)]`}
          {cursor: default;}
        }
        .icon{
          ${tw`cursor-pointer text-[rgba(0,0,0,.7)] hover:text-[rgba(0,0,0,.9)]`}
        }
        .active{
          ${tw`text-lightBlue hover:text-lightBlue`}
        }
        .disabled{
          ${tw`text-[rgba(0,0,0,.5)] hover:text-[rgba(0,0,0,.5)]`}
          {cursor: wait;}
        }.inactive{
          ${tw`text-[rgba(0,0,0,.5)] hover:text-[rgba(0,0,0,.5)]`}
          {cursor: not-allowed;}
        }
      }
    }
    
  }
  div:first-child{
    ${tw`pt-0`}
  }
  .header-likes{
    font-family:montserratSemi;
    ${tw`flex items-center justify-start space-x-2.5 text-lg text-darkBlue`}
    >p{
      font-family:montserratSemi; 
    ${tw`w-auto text-lg capitalize text-darkBlue`}
    }
    >span{
      ${tw`text-lightBlue text-sm`}
    }
  }
  .submit{
    ${tw`py-10 flex space-y-5 items-start`}
    .book{
      ${tw`w-full flex items-center justify-end`}
      a{
        font-family:montserratMedium;
        ${tw`p-2.5 py-2 rounded-lg bg-green text-sm  text-darkBlue border-none`}
      }
    }
    .info-div{
      ${tw`space-y-0 flex flex-row items-center space-x-2  `}
      .icon{
        ${tw`text-lightBlue text-sm w-max`}
      }
      p{
        ${tw`w-full text-lightBlue text-sm`}
      }
      span{
        font-family:montserratSemi;
        ${tw`text-darkBlue text-sm`}
      }
    }
  }
  

  
}
`