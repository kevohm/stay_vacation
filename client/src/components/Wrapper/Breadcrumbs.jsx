import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { Main } from "./css/Breadcrumbs"
import Home from "../../assets/svg/Home.svg"
const Breadcrumbs = () => {
  const location = useLocation();

  let address = "/";
  const current = location.pathname.split("/").filter((i) => i !== "").map(
    (i, index) => {
      const d = i.replaceAll("%20", " ")
      address += `${i}/`
      return <Link to={`${address}`} key={index}>
        {d.charAt(0).toUpperCase() + d.slice(1, d.length)}
      </Link>
    }
  )
  if (address === "/") {
    return <></>
  }
  return (
    <Main>
      <div className='home'>
        <img src={Home} alt="Home"/>
      <Link to={"/"}>
        Home
      </Link>
      </div>
      {current}
    </Main>
  );
}

export default Breadcrumbs