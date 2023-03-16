import tw from "twin.macro";
import styled from "styled-components";
export const Main = styled.form`
  ${tw`w-full max-w-none sm:max-w-[250px] md:max-w-[300px] lg:max-w-none mr-0 sm:mr-20 lg:mr-24 space-y-5`}
  > div {
    ${tw`w-full max-w-none sm:max-w-[440px]`}
    .choice-btn{
      ${tw`py-2.5 px-5 cursor-pointer  border-none bg-darkBlue text-white rounded-lg`}
    }
    textarea, input, select {
      font-family: poppinsMedium;
      ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
      ::placeholder {
        ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
      }
    }
    textarea {
      ${tw`w-full`}
      resize: vertical;
    }
  }
  .file {
    ${tw``}
    label {
      ${tw`relative flex items-center`}
      span {
        font-family: poppinsMedium;
        ${tw`absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1, 49, 91, .6)] bg-[rgba(1, 49, 91, .1)] rounded-l-lg`}
      }
      input {
        ${tw`bg-white cursor-pointer`}
        ::file-selector-button {
          ${tw`cursor-pointer pl-8 `}
          opacity: 0;
        }
      }
    }
  }
  .lined-up-now {
    ${tw`flex flex-col md:flex-row items-start space-y-5 md:items-center md:space-y-0 space-x-0 md:space-x-5 `}
  }
  .lined-up {
    ${tw`text-[rgba(1, 49, 91, 1)] flex items-center space-x-5`}
    > input {
      ${tw``}
    }

    p {
      ${tw`p-2 text-[rgba(1, 49, 91, .5)]`}
    }
    .div-icon-add {
      ${tw`flex items-center text-[rgba(1, 49, 91, 1)]`}
    }
    .icon-add {
      ${tw`p-2 rounded-full border-solid border border-[rgba(1, 49, 91, 1)] text-[rgba(1, 49, 91, 1)] text-4xl `}
    }
    
  }
  .submit {
    ${tw`flex items-center justify-end`}
    input {
      ${tw`cursor-pointer bg-green border-none text-darkBlue w-max hover:bg-[rgba(113, 242, 139, .9)]`}
    }
  }
  .event-viewer{
    ${tw`flex flex-col space-y-2.5 text-[rgba(1, 49, 91, .9)]`}
    p{
      ${tw`text-sm`}
    }
    > div{
    ${tw`flex`}
    p{
      ${tw`text-sm`}
    }
    p:first-child{
      ${tw`w-[75px]`}
    }
    }
    .image{
      ${tw`flex-col items-start space-y-2.5`}
      > img{
        ${tw`w-full rounded-lg ml-0`}
      }
    }
  }
  .prices{
    ${tw`w-full flex flex-col space-y-2`}
    >div{
      ${tw`flex w-full text-[rgba(1, 49, 91, .9)]`}
      
    }
    .total{
      font-family:poppinsMedium;
    }
  }
`; 