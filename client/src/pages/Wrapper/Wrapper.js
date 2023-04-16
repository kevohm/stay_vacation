import React from "react";
import { Outlet} from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index"
import {GlobalError} from "../../components/smaller/error/GlobalError"
import { Main } from "./css/Wrapper";
import { useEvent } from "../../components/Events/context/EventContext"
import styled from "styled-components";
import tw from "twin.macro";

const Wrapper = () => {
  const {MemberError,setDefaultGlobal} = useEvent()
  return (
    <Main>
      <Section>
      <GlobalError {...MemberError} close={setDefaultGlobal}/>
      <Navbar />
      <Breadcrumbs/> 
      <Outlet />
      <Footer/>
      </Section>
    </Main>
  );
};

export default Wrapper;

const Section = styled.section`
${tw`h-full relative bg-white max-w-[1440px] max-h-screen overflow-y-scroll overflow-x-auto`}
`
