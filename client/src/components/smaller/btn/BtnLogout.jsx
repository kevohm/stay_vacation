import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGlobal } from '../../../context/AppContext';

export const BtnLogout = ({

    text="logout",
    color = "rgba(1, 49, 91, 1)",
    bg = "white",
    hover = "rgba(1, 49, 91, .8)"
}
) => {
    const {logout} = useGlobal()
  return <Button bg={bg} color={color} hover={hover} onClick={logout}>
      {text}
    </Button>
};

const Button = styled.button`
  ${tw`px-4 py-2 text-lg rounded-lg border-none`}
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  :hover {
    color: ${(props) => props.hover};
  }
`;
