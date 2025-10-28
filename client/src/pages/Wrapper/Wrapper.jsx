import React from "react";
import { Outlet} from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index"
import {GlobalError} from "../../components/smaller/error/GlobalError"
import { Main } from "./css/Wrapper";
import { useEvent } from "../../components/Events/context/EventContext"
import styled from "styled-components";
import tw from "twin.macro";
import plane from "../../assets/img/plane.gif"
import happy from "../../assets/img/happy.gif"
import love from "../../assets/img/love.gif"

const Wrapper = () => {
  const {MemberError,setDefaultGlobal} = useEvent()
  return (
    <Main>
      <img className="animations plane" src={plane} alt="plane"/>
      <img className="animations love" src={love} alt="plane"/>
      <img className="animations happy" src={happy} alt="plane"/>
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
${tw`h-full w-full relative bg-white max-w-[1440px] max-h-screen overflow-y-scroll overflow-x-auto`}
`
