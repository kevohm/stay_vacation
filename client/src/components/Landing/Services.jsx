import React from "react";
import { Header } from "../smaller/header/Header";
import { Service } from "../smaller/cards/Service";
import { servicesData } from "../utils/landing/services";
import InputData from "./InputData";

const Services = () => {
  return (
    <section className="w-full relative flex flex-col items-center space-y-[100px] pt-[100px] px-12 pb-[150px]">
      <InputData />
      <Header text="Why you should choose us ?" />
      <div
        className="w-full lg:max-w-max justify-items-center grid gap-12 md:gap-10 lg:flex lg:flex-row lg:items-center space-x-0 lg:space-x-[50px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))" }}
      >
        {servicesData.map((item) => (
          <Service key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Services;
