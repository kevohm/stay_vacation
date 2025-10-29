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
        <section className="inner-body w-full sm:w-[calc(100% - 160px)] md:w-[calc(100% - 200px)] h-full bg-[rgba(255, 164, 2, .1)] pr-5">
          <Outlet />
        </section>
      </div>
    </section>
  );
};

export default DashboardWrapper;
