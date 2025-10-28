import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index";
import { GlobalError } from "../../components/smaller/error/GlobalError";
import { Main } from "./css/Wrapper";
import { useEvent } from "../../components/Events/context/EventContext";
import styled from "styled-components";
import tw from "twin.macro";
import plane from "../../assets/img/plane.gif";
import happy from "../../assets/img/happy.gif";
import love from "../../assets/img/love.gif";

const Wrapper = () => {
  const { MemberError, setDefaultGlobal } = useEvent();
  return (
    <section
      className="relative bg-[rgba(138, 154, 234, .2)] flex items-start justify-center w-full min-h-full mx-auto bg-no-repeat bg-center bg-cover bg-blend-screen"
      style={{
        backgroundImage: `url(${back})`,
      }}
    >
      <img
        className="animations absolute hidden 2xl:block left-0 top-0"
        src={plane}
        alt="plane"
      />
      <img
        className="animations absolute hidden 2xl:block  right-0 top-[20%]"
        src={love}
        alt="plane"
      />
      <img
        className="animations absolute hidden 2xl:block   left-0 top-1/2"
        src={happy}
        alt="plane"
      />
      <Section>
        <GlobalError {...MemberError} close={setDefaultGlobal} />
        <Navbar />
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </Section>
    </section>
  );
};

export default Wrapper;

const Section = styled.section`
  ${tw`h-full w-full relative bg-white max-w-[1440px] max-h-screen overflow-y-scroll overflow-x-auto`}
`;
