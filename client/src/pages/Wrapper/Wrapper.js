import React from "react";
import { Outlet} from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index"
import { Main } from "./css/Wrapper";
const Wrapper = () => {
  return (
    <Main>
      <Navbar />
      <Breadcrumbs/> 
      <Outlet />
      <Footer/>
    </Main>
  );
};

export default Wrapper;
