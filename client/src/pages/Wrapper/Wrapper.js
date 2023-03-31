import React from "react";
import { Outlet} from "react-router-dom";
import { EventContext, useEvent } from "../../components/Events/context/EventContext";
import { GlobalError } from "../../components/smaller/error/GlobalError";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index"
import { Main } from "./css/Wrapper";
const Wrapper = () => {
  const {MemberError} = useEvent()

  return (
    <Main>
      <GlobalError {...MemberError}/>
      <Navbar />
      <Breadcrumbs/> 
      <Outlet />
      <Footer/>
    </Main>
  );
};

export default Wrapper;
