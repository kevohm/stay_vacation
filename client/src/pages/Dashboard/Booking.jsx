import React from "react";
// import { Main } from "../styles";
import {BookForm,BookTable} from "../../components/bookingsDashboard/index"
function Booking() {
 
  return (
    <section className="w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0 overflow-y-scroll">
      <BookForm />
      <BookTable/>
    </section>
  );
}

export default Booking;
