import React from "react";
import { Navbar, Sidebar } from "../../components/DashboardWrapper/index";
import { useGlobal } from "../../context/AppContext";
import { GlobalError } from "../../components/smaller/error/GlobalError";
import { Outlet } from "react-router-dom";

const DashboardWrapper = () => {
  const { state, closeGlobalErr } = useGlobal();
  return (
    <section className="relative w-full h-screen flex flex-col items-center bg-white ">
      <GlobalError {...state.GlobalError} close={closeGlobalErr} />
      <Navbar />
      <div className="body w-full h-full flex">
        <Sidebar />
        <section className="inner-body overflow-y-scroll w-full sm:w-[calc(100%-6rem)] md:w-[calc(100%-200px)] h-full bg-[rgba(255,164,2,.1)] pr-5"
        style={{
          height:"calc(100vh - 6rem)"
        }}
        >
          <Outlet />
        </section>
      </div>
    </section>
  );
};

export default DashboardWrapper;
