import styled from "styled-components";
import tw from "twin.macro";


export const Main = styled.div`
${tw`w-full p-5 flex flex-col space-y-5`}
>header{
    font-family:montserratSemi;
    ${tw`text-base text-darkBlue`}
}
.about{
    ${tw`w-full text-[rgba(0,0,0,.7)] text-sm`}
}
.contacts{
    ${tw`flex flex-col space-y-2.5`}
    >div{
        ${tw`flex items-center space-x-2`}
        font-family:poppinsSemi;
        p{
            ${tw`w-24 text-[rgba(0,0,0,.7)]`}
        }
        a{
            ${tw`p-2.5 rounded-lg`}
        }
    }
}
`