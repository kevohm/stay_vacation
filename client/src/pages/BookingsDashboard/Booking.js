import React from "react";
import tw from "twin.macro";
import styled from "styled-components"
import {BookForm,BookTable} from "../../components/bookingsDashboard/index"
function Booking() {
 
  return (
    <Main>
      <BookForm />
      <BookTable/>
    </Main>
  );
}

export default Booking;
const Main = styled.section`
  ${tw`w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0`}
  overflow-y:scroll;
`;