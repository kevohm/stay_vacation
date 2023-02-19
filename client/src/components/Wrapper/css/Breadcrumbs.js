import tw from "twin.macro"
import styled from "styled-components"

const Main = styled.div`
  ${tw`h-[70px] pl-[50px] text-base flex items-center border-y border-x-0 border-solid border-[rgba(1, 49, 91, .1)]`}
  font-family:poppinsSemi;
  a {
    ${tw`text-lightBlue`}
  }

  .home:after,
  a:after {
    content: ">";
    ${tw`mx-[14px] text-darkBlue`}
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
    ${tw`space-x-[8px] `}
    a {
      ${tw`text-lightBlue`}
      pointer-events:auto;
      cursor: pointer;
    }
  }
`;
export {Main}