import styled from "styled-components"
import tw from "twin.macro"
import back from "../../../assets/img/back.jpg"

const Main = styled.main`
background: rgba(138, 154, 234, .2); 
  ${tw`flex items-start justify-center w-full min-h-screen mx-auto bg-no-repeat bg-center bg-cover bg-blend-screen`}
  background-image:url(${back});
`;
export {Main}