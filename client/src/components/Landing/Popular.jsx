import React, { useEffect, useState } from "react";
import { Header } from "../smaller/header/Header";
import { PopularCard } from "../smaller/cards/PopularCard";
import { BtnLinkOutline } from "../smaller/links/BtnLinkOutline";
import { useGlobal } from "../../context/AppContext";
import load from "../../assets/img/loader.gif";

const Popular = () => {
  const { getPopular } = useGlobal();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopular()
      .then((res) => {
        const { events } = res.data;
        setData(events);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full flex flex-col items-center space-y-20 pt-12 px-0 sm:px-12 pb-36">
        <Header text="Popular destinations" />
        <div className="w-full h-[500px] flex items-center justify-center">
          <img src={load} alt="loading" className="w-[180px]" />
        </div>
        <div>
          <BtnLinkOutline
            text="explore"
            color="#FFA402"
            outline="#FFA402"
            url={"/events"}
          />
        </div>
      </section>
    );
  }

  return (
    data.length === 0 || (
      <section className="w-full flex flex-col items-center space-y-20 pt-12 px-0 sm:px-12 pb-36">
        <Header text="Popular destinations" />
        <div
          className="w-full grid justify-items-center gap-x-5 gap-y-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {data.map((item) => (
            <PopularCard {...item} key={item.name} />
          ))}
        </div>
        <div>
          <BtnLinkOutline
            text="explore"
            color="#FFA402"
            outline="#FFA402"
            url={"/events"}
          />
        </div>
      </section>
    )
  );
};

export default Popular;
