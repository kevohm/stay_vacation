import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumbs, Navbar, Footer } from "../../components/Wrapper/index";
import { GlobalError } from "../../components/smaller/error/GlobalError";
import { useEvent } from "../../components/Events/context/EventContext";
import plane from "../../assets/img/plane.gif";
import happy from "../../assets/img/happy.gif";
import love from "../../assets/img/love.gif";
import back from "../../assets/img/back.jpg";

const Wrapper = () => {
  const { MemberError, setDefaultGlobal } = useEvent();

  return (
    <section
      style={{
        position: "relative",
        background: "rgba(138, 154, 234, .2)",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        minHeight: "100%",
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "screen",
        overflow: "hidden",
      }}
    >
      {/* Floating Images */}
      <img
        src={plane}
        alt="plane"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "none",
        }}
        className="animations 2xl:block"
      />

      <img
        src={love}
        alt="love"
        style={{
          position: "absolute",
          right: 0,
          top: "20%",
          display: "none",
        }}
        className="animations 2xl:block"
      />

      <img
        src={happy}
        alt="happy"
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          display: "none",
        }}
        className="animations 2xl:block"
      />

      {/* Main content container */}
      <section
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          background: "white",
          maxWidth: "1440px",
          maxHeight: "100vh",
          overflowY: "auto",
          overflowX: "auto",
          paddingBottom: "30px",
        }}
      >
        <GlobalError {...MemberError} close={setDefaultGlobal} />
        <Navbar />
        <Breadcrumbs />
        <Outlet />
        <Footer />
      </section>
    </section>
  );
};

export default Wrapper;
