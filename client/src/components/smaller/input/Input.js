import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
export const Input = ({
  type,
  placeholder,
  name,
  title,
  error,
  handleChange,
  width,
}) => {
  return (
    <Main error={error} width={width}>
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => handleChange(e)}
      />
    </Main>
  );
};

const Main = styled.div`
  ${tw`w-full flex flex-col space-y-2 sm:space-y-4`}
  label {
    font-family: poppins;
  }
  input {
    font-family: poppins;
    ${tw`w-full text-xs sm:text-sm p-1 sm:p-2 text-darkBlue bg-white rounded-lg border-none`}
    outline:1px solid ${(props) =>
      props.error ? "rgba(255, 0, 0, .5)" : "rgba(1, 49, 91, .2)"};
    width: ${(props) => props.width};
    ::placeholder {
      font-family: poppins;
      ${tw`text-xs sm:text-sm text-[rgba(1, 49, 91, .6)]`}
    }
  }
`;