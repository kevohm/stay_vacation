import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from "react-router-dom"
import { useGlobal } from '../../../context/AppContext'

export const ListFooter = ({ data, header }) => {
  const {state} = useGlobal()
  return (
    <Main>
      <li className="title">{header}</li>
      {data.map((item) => {
        if (item.text === "join us" && state.user.role && state.user.id) {
          return (
            <Link to="/profile" key="profile">
              <li>profile</li>
            </Link>
          );
        }
        return <Link to={item.url} key={item.text}>
          <li>{item.text}</li>
        </Link>
      } 
      )}
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
