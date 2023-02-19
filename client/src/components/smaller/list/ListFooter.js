import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from "react-router-dom"
export const ListFooter = ({data, header}) => {
  return (
    <Main>
      <li className="title">{header}</li>
      {data.map((item) => (
        <Link to={item.url}>
          <li>{item.text}</li>
        </Link>
      ))}
    </Main>
  );
}

const Main = styled.ul`
  ${tw`w-full min-w-max sm:min-w-[180px] list-none flex flex-col space-y-5 text-white`}
  a {
    ${tw`w-full text-white`}
    li {
      ${tw`w-full capitalize`}
    }
  }a:active{
    ${tw`underline`}
  }
  .title {
    font-family: poppinsSemi;
    ${tw``}
  }
`;
