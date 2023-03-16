import React from "react";
import { Main } from "../styles";
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
