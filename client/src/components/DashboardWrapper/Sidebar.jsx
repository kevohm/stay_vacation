import React from "react";
import { ListDashSmall } from "../smaller/list/ListDashSmall";
import { sidebarData } from "../utils/DashboardWrapper/sidebar";
const Sidebar = () => {
  return (
    <aside
      className="w-[60px] sm:w-[160px] md:w-[200px] h-full px-2.5 pt-8 space-y-5 hidden sm:flex flex-col items-center"
      style={{
        overflowY: "scroll",
      }}
    >
      {sidebarData.map((item) => {
        const { text } = item;
        return <ListDashSmall key={text} {...item} />;
      })}
    </aside>
  );
};

export default Sidebar;

