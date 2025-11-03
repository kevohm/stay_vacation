import React, { useEffect } from "react";
import { StatsCard } from "../smaller/cards/StatsCard";
import { statsData } from "../utils/DashboardWrapper/stats";
import { useGlobal } from "../../context/AppContext";
const Stats = () => {
  const { state, getStats } = useGlobal();
  useEffect(() => {
    getStats();
  }, []);
  return (
    <div className="grid md:flex grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
      {statsData.map((item) => (
        <StatsCard key={item.title} {...item} data={state.stats} />
      ))}
    </div>
  );
};

export default Stats;
