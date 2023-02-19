import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import dot from "../../../assets/svg/dot.svg"
export const PopularCard = ({ place, country, url }) => {
  return (
    <Main>
      <div className="img">
        <img src={url} alt={`${place}of${country}`} />
      </div>
      <div className="title">
        <p>{place}</p>
        <img src={dot} alt={`${place}`} />
        <p>{country}</p>
      </div>
    </Main>
  );
};

const Main = styled.div`
  ${tw`w-[calc(100% - 24px)] sm:w-full flex flex-col items-start space-y-5`}
  .img {
    ${tw`w-full h-full max-h-[360px]`}
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