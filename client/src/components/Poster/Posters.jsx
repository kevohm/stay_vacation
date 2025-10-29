import React, { useEffect } from "react";
import Poster from "./Poster";
import CreateForm from "./CreateForm";
import { useGlobal } from "../../context/AppContext";
import { NoData } from "../smaller/error/NoData";
import poster from "../../assets/svg/posters.svg";

const Posters = () => {
  const { getPosters, state } = useGlobal();

  useEffect(() => {
    getPosters();
  }, []);

  if (state.posters.loading) {
    return (
      <section
        className="bg-white rounded-lg p-5 flex flex-col space-y-5 items-start"
        style={{ boxShadow: "0px 2px 6px rgba(1, 49, 91, 0.15)" }}
      >
        <CreateForm />
        <header className="text-lg text-[rgba(0,0,0,0.7)] font-[poppinsSemi]">
          Posters
        </header>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,300px))] gap-5">
          <p>loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bg-white rounded-lg p-5 flex flex-col space-y-5 items-start"
      style={{ boxShadow: "0px 2px 6px rgba(1, 49, 91, 0.15)" }}
    >
      <CreateForm />
      <header className="text-lg text-[rgba(0,0,0,0.7)] font-[poppinsSemi]">
        Posters
      </header>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,300px))] gap-5">
        {state.posters.data.length === 0 ? (
          <NoData img={poster} text="No posters yet. Create some" />
        ) : (
          <>
            {state.posters.data.map((item) => (
              <Poster {...item} key={item.event.name} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Posters;
