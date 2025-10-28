import React, {useState} from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { FaCaretDown, FaCaretUp} from "react-icons/fa";
export const SingleFag = ({ text, info, index }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
  return (
    <Main>
      <div className="title">
        <div className='title-inner'>
          <div>
          <div className="number">{index}</div>
          </div>
          <p>{text}</p>
        </div>
        <div onClick={handleClick} className="icon">
          {open ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>
      {open && <p>{info}</p>}
    </Main>
  );
}

const Main = styled.div`
  ${tw`p-5 py-3 w-full max-w-[800px] border-none outline-darkBlue rounded-lg outline outline-1 space-y-5 transition ease-in-out`}
  p {
    ${tw`text-darkBlue text-base`}
  }
  .title {
    ${tw`flex items-center justify-between space-x-5`}
    .title-inner {
      ${tw`flex items-center justify-between space-x-5`}
      .number {
        ${tw`w-[36px] h-[36px] bg-orange rounded-lg flex items-center justify-center text-white`}
      }
      p {
        ${tw`text-lg`}
      }
    }
  }
  .icon{
    ${tw`text-[16px]`}
  }
`;
