import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Loader } from '../../smaller/load/Loader'
import nodata from "../../../assets/svg/nodata.svg"
import dot from "../../../assets/svg/dot.svg"
import { FaInfoCircle } from 'react-icons/fa'
import { useEvent } from '../context/EventContext'
import { NoData } from '../../smaller/error/NoData'

const EventDisplay = () => {
    const {eventId} = useParams()

    const {getSingleById,book_event} = useEvent()
    useEffect(()=>{
        getSingleById(eventId)
    },[eventId])
    if(book_event.loading){
        return <Main>
            <Loader/>
        </Main>
    }
    if(!book_event.data){
        return <Main>
            <NoData img={nodata} text="Event not found"/>
        </Main>
    }
  return ( 
    <Main>
      <div className='image'>
        <img src={book_event.data.image[0]} alt="event"/>
      </div>
        <div className='details'>
        <div>
            <header>{`${book_event.data.name}, ${book_event.data.city}`}</header>
            <p>{book_event.data.description}</p>
        </div>
        <div>
          <header  className='title'>Price</header>
            <ul>
            {
              book_event.data.price_choices.map((item, index)=> <li key={index}>
                <img src={dot} alt={index}/>
                <p>ksh. {item.price.toLocaleString("en-US")} per {item.category}</p>
              </li>)
            }
            </ul>
        </div>
        <div className='info-div'>
          <FaInfoCircle className='icon'/>
          <p>For more information, contact us at <span>+254704591173</span></p>
        </div>
        </div>
    </Main>
  )
}

export default EventDisplay


const Main = styled.div`
${tw`bg-white w-full rounded-lg flex flex-col items-start space-y-2.5`}
box-shadow:0px 2px 6px 0px rgba(1, 49, 91, .25);
.image{
  ${tw`w-full h-[250px] md:h-[350px]`}
  >img{
      object-position: center;
      ${tw`w-full h-[250px] md:h-full object-cover rounded-t-lg`}
  }
}
.details{
    ${tw`w-full flex flex-col space-y-2.5 h-full px-5`}
    >div{
        ${tw` md:px-0 py-2.5`}
        >header{
            font-family:montserratSemi;
            ${tw`text-darkBlue text-base mb-2.5`}
        }
        >p{
            font-family:montserratMedium;
            ${tw`w-full text-sm`}
        }
        >ul{
            ${tw`flex flex-col`}
            >li{
                ${tw`flex items-center space-x-2`}
                p{
                    font-family:montserratMedium;
                    ${tw`text-sm`}
                }
            }
        }
    }
    .info-div{
        ${tw`space-y-0 flex flex-row items-center space-x-2  `}
        .icon{
          ${tw`text-lightBlue text-xs w-max`}
        }
        p{
          ${tw`w-full text-lightBlue text-xs`}
        }
        span{
          font-family:montserratSemi;
          ${tw`text-darkBlue text-xs`}
        }
      }
}
`