import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.div`
  ${tw`transition ease-in-out h-auto md:h-[100px] w-full p-2 pb-5 md:p-5 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0`}
  .image {
    ${tw`h-[60px] md:h-full w-full md:w-auto flex justify-between`}
    img {
      ${tw`w-auto md:w-full h-full`}
    }
    .dropdown {
      ${tw`w-[50px] h-full text-3xl flex items-center justify-center text-darkBlue md:hidden`}
    }
    .active{
      ${tw`text-2xl`}
    }
  }
  .register {
    ${tw`items-center space-x-10 hidden md:flex`}
    display: ${(props)=>props.menu ? "flex" : "hidden"};
  }
  .active{
    ${tw`hidden`}
  }
`;
export { Main }