import styled from "styled-components"
import tw from "twin.macro"
import back from "../../../assets/img/back.jpg"

const Main = styled.main`
background: rgba(138, 154, 234, .2); 
  ${tw`relative flex items-start justify-center w-full min-h-full mx-auto bg-no-repeat bg-center bg-cover bg-blend-screen`}
  background-image:url(${back});
  .animations{
    ${tw`absolute hidden 2xl:block`}
  }
  .plane{
    ${tw` left-0 top-0`}
  }
  .love{
    ${tw` right-0 top-[20%]`}
  }
  .happy{
    ${tw` left-0 top-1/2`}
  }
`;
export {Main}