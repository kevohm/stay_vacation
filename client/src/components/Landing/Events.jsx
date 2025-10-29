import React, { useEffect } from "react";
import { Header } from "../smaller/header/Header";
import { PrevEvent } from "../smaller/cards/PrevEvent";
import { BtnLinkOutline } from "../smaller/links/BtnLinkOutline";
import { useGlobal } from "../../context/AppContext";
import load from "../../assets/img/loader.gif";

const Events = () => {
  const { getPosters, state } = useGlobal();

  useEffect(() => {
    getPosters();
  }, []);

  if (state.posters.loading) {
    return (
      <section className="w-full flex flex-col items-center space-y-16 pt-[30px] px-0 sm:px-12 pb-[150px]">
        <Header text="here are some previous events" />
        <div className="w-full h-[500px] flex items-center justify-center">
          <img src={load} alt="loading" className="w-[180px]" />
        </div>
        <BtnLinkOutline
          text="View More"
          color="#FFA402"
          outline="#FFA402"
          url={"/events"}
        />
      </section>
    );
  }

  return (
    state.posters.data.length === 0 || (
      <section className="w-full flex flex-col items-center space-y-16 pt-[30px] px-0 sm:px-12 pb-[150px]">
        <Header text="here are some previous events" />
        <div className="w-full max-w-[1266px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {state.posters.data.map((item) => (
            <PrevEvent {...item} key={item.event.name} />
          ))}
        </div>
        <BtnLinkOutline
          text="View More"
          color="#FFA402"
          outline="#FFA402"
          url={"/events"}
        />
      </section>
    )
  );
};

export default Events;
