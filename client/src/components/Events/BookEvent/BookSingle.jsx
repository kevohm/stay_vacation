import React from 'react'
import Checkpoint from './Checkpoint'
import Search from './Search'
import WrapperLeft from './WrapperLeft'

const BookSingle = () => {
  return (
    <div className="w-full flex flex-col space-y-5">
      <Checkpoint />
      <div className="w-full flex flex-col md:grid md:grid-cols-[3fr, 7fr]  lg:grid-cols-[35%, 65%] md:gap-5 md:space-y-0 space-y-5">
        <Search />
        <WrapperLeft />
      </div>
    </div>
  );
}

export default BookSingle

