import styled from "styled-components";
import tw from "twin.macro";
export const Main = styled.table`
  ${tw`relative min-w-full w-max text-sm`}
  
  border-collapse:collapse;
  thead,
  tbody > tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .desc{
        ${tw`max-w-[300px]`}
    }
    .edit {
      ${tw`flex space-x-5`}
      .delete, .edit{
         ${tw`cursor-pointer`}
      }
      .delete {
        ${tw`text-darkBlue text-sm`}
      }
      .edit {
        ${tw`text-orange text-sm`}
      }
    }
  }
  
  tbody,
  tfoot {
    tr {
      td {
        ${tw`p-5 text-start text-[rgba(0,0,0,.4)]`}
        img {
            ${tw`h-12 w-20 object-fill rounded-lg`}
        }
        ul{
            ${tw`space-y-1 list-none max-h-[50px]`}
            overflow-y:scroll;
        }
        .control {
          ${tw`w-max flex cursor-pointer px-2.5 py-1 items-center space-x-2.5 rounded-lg text-[rgba(0,0,0,.5)] border border-solid border-[rgba(0,0,0,.15)]`}
          p {
            ${tw`text-[rgba(0,0,0,.5)] text-sm`}
          }
          .icon {
            ${tw`text-[rgba(0,0,0,.5)] text-sm`}
          }
        }
      }
      .page {
        ${tw``}
        > div {
          ${tw`w-[150px] flex items-center justify-center space-x-2 mx-auto`}
          #input {
            ${tw`w-8 text-sm text-[rgba(0,0,0,.5)] text-center p-1 rounded-lg border border-solid border-[rgba(0,0,0,.15)]`}
          }
        }
      }
    }
  }
  thead {
    tr {
      ${tw`bg-[rgba(0,0,0,.02)]`}
      th {
        font-family: poppinsMedium;
        ${tw`capitalize p-5 text-start  text-[rgba(0,0,0,.5)]`}
      }
    }
  }
  tbody tr{
    ${tw`cursor-pointer hover:bg-[rgba(0,0,0,.05)]`}
    :hover{
      border-left: 1px solid rgba(0,0,0,.1);
      border-right: 1px solid rgba(0,0,0,.1);
      box-shadow: 0px 0px 1px 1px rgba(0,0,0,.1);
    }
  }
  tbody > .active{
    ${tw`bg-[rgba(0,0,0,.05)]`}
  }
  `;
