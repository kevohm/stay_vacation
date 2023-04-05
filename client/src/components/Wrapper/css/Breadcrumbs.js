import tw from "twin.macro"
import styled from "styled-components"

const Main = styled.div`
  ${tw`overflow-x-scroll overflow-y-auto h-16 px-12 pl-6 md:pl-12 text-sm flex items-center border-y border-x-0 border-solid border-[rgba(1, 49, 91, .1)]`}
  font-family:poppinsSemi;
  a {
    ${tw`min-w-fit text-lightBlue`}
  }

  .home:after,
  a:after {
    content: ">";
    ${tw`mx-2 md:mx-4 text-darkBlue`}
  }
  a:last-child {
    ${tw`text-darkBlue`}
    pointer-events: none;
    cursor: default;
    text-decoration: none;
  }
  a:last-child:after {
    display: none;
  }
  .home {
    ${tw`flex items-start space-x-2 `}
    a {
      ${tw`text-lightBlue`}
      pointer-events:auto;
      cursor: pointer;
    }
    >img{
      ${tw`w-4 h-4`}
    }
  }
`;
export {Main}