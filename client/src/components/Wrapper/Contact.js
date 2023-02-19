import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Contact = ({data}) => {
  return (
    <Main>
      <header>contacts</header>
      <div className="link-main">
        {data.map((item) => (
          <a
            href={item.to}
            target="_blank"
            style={{ color: item.color }}
            rel="noopener noreferrer"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </Main>
  );
}

const Main = styled.div`
  ${tw`flex flex-col items-start space-y-5`}
  header{
    font-family:poppinsSemi;
    ${tw`uppercase text-white`}
  }
  .link-main{
    ${tw`flex items-center space-x-5`}
    a{
        color:${(props)=>props.color};
    }
  }
`;