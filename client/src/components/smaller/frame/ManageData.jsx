import React from "react";
import { StatsHolder } from "../cards/StatsHolder";

export const ManageData = ({ element, img, title }) => {
  return (
    <StatsHolder text={title}>
      <section className="w-full flex items-center">
        {element}
        <img
          id="image-manage-data"
          src={img}
          alt="users"
          className="w-full hidden sm:block max-w-[180px] md:max-w-[250px] lg:max-w-xs ml-auto mr-0 lg:mr-24"
        />
      </section>
    </StatsHolder>
  );
};
