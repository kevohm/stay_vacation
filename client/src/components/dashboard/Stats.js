import React, {useEffect} from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { StatsCard } from "../smaller/cards/StatsCard"
import { statsData } from "../utils/DashboardWrapper/stats"
import { useGlobal } from '../../context/AppContext'
const Stats = () => {
  const { state, getStats } = useGlobal();
    useEffect(() => {
    getStats();
  }, []);
  return (
    <Main>
      {statsData.map((item) => (
        <StatsCard key={item.title} {...item} data={state.stats} />
      ))}
    </Main>
  );
}

export default Stats
const Main = styled.div`
  ${tw`grid grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] md:grid-cols-[repeat(auto-fit, minmax(100px, 1fr))] gap-5`}
`;