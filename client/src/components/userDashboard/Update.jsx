import styled from 'styled-components'
import tw from 'twin.macro'
export const Main = styled.form`
${tw`w-full bg-white max-w-[200px] sm:max-w-[250px] md:max-w-[300px] space-y-5 p-5 rounded-lg`}
.header {
  ${tw`flex justify-between items-center py-1`}
  p {
    font-family: poppinsMedium;
    ${tw`text-darkBlue text-base`}
  }
  .icon {
    ${tw`text-darkBlue text-base`}
  }
}
> div {
  ${tw`w-full max-w-none sm:max-w-[440px]`}
  input {
    font-family: poppinsMedium;
    ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
    ::placeholder {
      ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
    }
  }
}
.submit {
  ${tw`flex items-center justify-end`}
  input {
    ${tw`cursor-pointer bg-green border-none text-darkBlue hover:bg-[rgba(113, 242, 139, .9)]`}
  }
}
`;