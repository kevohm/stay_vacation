import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import dot from "../../../assets/svg/dot.svg"
import { Link } from 'react-router-dom'

export const PopularCard = ({ name, city, image }) => {
  return (
    <Main to={`/events/${name}`}>
      <div className="img">
        <img src={image[0]} alt={name} />
      </div>
      <div className="title">
        <p>{name}</p>
        <img src={dot} alt={name} />
        <p>{city}</p>
      </div>
    </Main>
  );
};

const Main = styled(Link)`
  ${tw`w-[calc(100% - 24px)] sm:w-full flex flex-col items-start space-y-5`}
  .img {
    ${tw`w-full h-full h-[360px]`}
    img {
      ${tw`w-full h-full object-cover rounded-t-lg`}
    }
  }
  .title {
    ${tw`flex items-center space-x-[8px]`}
    p {
      ${tw`text-base capitalize`}
    }
  }
`;