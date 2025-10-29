import React, { useEffect, useState } from "react";
import Event from "./Event";
import { useGlobal } from "../../context/AppContext";
import load from "../../assets/img/loader.gif";

const Events = () => {
  const { getAllEvents } = useGlobal();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState({ current: 1, total: 1 });

  const fetchData = () => {
    setLoading(true);
    getAllEvents(1, limit, name).then((res) => {
      const { events, pages } = res.data;
      setData(events);
      setPages({ current: pages.currentPage, total: pages.pages });
      setLoading(false);
    });
  };

  const handleMore = () => {
    if (pages.current !== pages.total) {
      setLimit(limit + 10);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  if (loading) {
    return (
      <section className="rounded-lg bg-white h-max min-h-full">
        <div className="rounded-lg bg-white min-h-full pb-10">
          <div
            className="p-5 text-lg text-[rgba(0,0,0,.7)]"
            style={{ fontFamily: "poppinsSemi" }}
          >
            <header>Available events</header>
          </div>
          <div className="w-full h-full px-5 flex items-center justify-center">
            <img
              src={load}
              alt="loading"
              className="w-full my-auto max-w-[150px]"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg bg-white h-max min-h-full">
      <div className="rounded-lg bg-white min-h-full pb-10">
        <div
          className="p-5 text-lg text-[rgba(0,0,0,.7)]"
          style={{ fontFamily: "poppinsSemi" }}
        >
          <header>Available events</header>
        </div>
        <div className="px-5 h-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 gap-y-10">
          {data.map((item) => (
            <Event {...item} key={item.name} />
          ))}
        </div>
        {pages.current < pages.total && (
          <div className="w-full py-5 flex items-center justify-center">
            <button
              onClick={handleMore}
              className="px-2.5 py-2 border border-light-blue text-light-blue bg-white text-sm rounded-sm transition ease-in-out hover:bg-light-blue hover:text-white cursor-pointer"
            >
              load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
