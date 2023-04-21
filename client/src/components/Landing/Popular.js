import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from "twin.macro"
import { Header } from '../smaller/header/Header'
import { PopularCard } from '../smaller/cards/PopularCard';
import { BtnLinkOutline } from '../smaller/links/BtnLinkOutline';
import { useGlobal } from '../../context/AppContext';
import load from "../../assets/img/loader.gif"

const Popular = () => {
  const {getPopular} = useGlobal()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    getPopular().then((res)=>{
      const {events} = res.data
      setData(events)
      setLoading(false)
    }).catch((err)=>{
      setData([])
      setLoading(false)
    })
  },[])
  if(loading){
    return (
      <Main>
        <Header text="Popular destinations" />
        <div className="loading">
          <img src={load} alt="loading"/>
        </div>
        <div>
          <BtnLinkOutline
            text="explore"
            color="#FFA402"
            outline="#FFA402"
            url={"/events"}
          />
        </div>
      </Main>
    );
  }
  return (
    data.length === 0 || <Main>
      <Header text="Popular destinations" />
      <div className="popular-cards">
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
    </Main>
  );
}

export default Popular

const Main = styled.section`
  ${tw`w-full flex flex-col items-center space-y-20 pt-12 px-0 sm:px-12 pb-36`}
  .popular-cards {
    ${tw`w-full grid grid grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] justify-items-center gap-x-5 gap-y-12`}
  }
  .loading{
    ${tw`w-full h-[500px] flex items-center justify-center`}
    >img{
      ${tw`w-[180px]`}
    }
  }
`;