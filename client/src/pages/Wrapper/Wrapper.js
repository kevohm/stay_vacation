import React from "react";
import { Outlet} from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index"
import {GlobalError} from "../../components/smaller/error/GlobalError"
import { Main } from "./css/Wrapper";
import { useEvent } from "../../components/Events/context/EventContext";

const Wrapper = () => {
  const {MemberError,setDefaultGlobal} = useEvent()
  return (
    <Main>
      <GlobalError {...MemberError} close={setDefaultGlobal}/>
      <Navbar />
      <Breadcrumbs/> 
      <Outlet />
      <Footer/>
    </Main>
  );
};

export default Wrapper;
