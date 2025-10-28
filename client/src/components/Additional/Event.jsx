import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {Link} from "react-router-dom"

const Event = ({name,image,city,description, category,_id}) => {
  return (
    <Main>
      <img src={image[0]} alt={name} />
      <div className='details'>
        <header>
          <p>{name}</p>
          <p>{`, ${city}`}</p>
        </header>
        <div className='details-more'>
          <p>{description.length > 200 ? `${description.slice(0, 200)}...` : description}</p>
          <div className='category'>{category.map((i) => <button>{i.name}</button>)}</div>
        </div>
      </div>
      <div className='actions'>
        <Link to={`/admin/additional/${_id}`}>Add posters</Link>
      </div>
    </Main>
  )
}

export default Event

const Main = styled.div`
${tw`w-full flex flex-col items-start space-y-2.5`}
>img{
  ${tw`w-full h-[250px] object-cover rounded-t-lg`}
}
.details{
  ${tw`flex flex-col items-start space-y-2.5`}
  >header{
    ${tw`flex items-start`}
    p{
      font-family:poppinsMedium;
      ${tw`text-sm text-darkBlue capitalize`}
    }
  }
  >div{
    ${tw`flex flex-col w-full items-start space-y-2 justify-center w-full`}
    p{
      ${tw`w-full text-sm`}
    }
    .category{
      ${tw`flex flex-wrap`}
      >button{
        ${tw`px-2 py-1 rounded-lg mr-2 border border-solid bg-white border-[rgba(0,0,0,.5)] text-[rgba(0,0,0,.5)]`}
      }
    }
  }
}
.actions{
  ${tw`w-full p-2.5 px-0 flex justify-center items-center`}
  >a{
    ${tw`px-2 py-1 text-xs bg-green cursor-pointer text-darkBlue border-none rounded`}
    font-family:poppins;
  }
}
`