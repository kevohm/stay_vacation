import React from 'react'
import { useParams } from 'react-router-dom'

import NavBar from './NavBar'

const Wrapper = ({element}) => {
  return (
    <section className="flex flex-col space-y-5 md:space-y-0 md:grid md:grid-cols-[32%68%] md:gap-5">
      <NavBar />
      <div className="rounded-lg bg-white p-5">{element}</div>
    </section>
  );
}

export default Wrapper

