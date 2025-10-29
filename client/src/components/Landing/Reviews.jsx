import React from "react";
import { HeaderIcon } from "../smaller/header/HeaderIcon";
import { Review } from "../smaller/cards/Review";
import { reviewData } from "../utils/landing/review";

const Reviews = () => {
  return (
    <section className="w-full flex flex-col items-center space-y-14 px-0 sm:px-12 pb-36">
      <HeaderIcon text="what users say about us" />
      <div className="flex items-center space-x-12 w-full p-3 sm:p-5 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
        {reviewData.map((item, index) => (
          <Review num={index + 1} {...item} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
