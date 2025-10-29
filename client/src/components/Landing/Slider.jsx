import React, { useEffect, useState } from "react";
import { sliderData } from "../utils/landing/slider";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(index + 1);
  const slideImage = () => {
    const total = sliderData.length - 1;
    const prevIndex = index === total ? 0 : index + 1;
    setIndex(prevIndex);
  };
  useEffect(() => {
    const time = setTimeout(slideImage, 7000);
    return () => clearTimeout(time);
  }, [index]);

  return (
    <section className="md:h-[704px] h-[50vh] sm:h-[500px] w-full relative">
      <div className="md:h-[704px] h-[50vh] sm:h-[500px]">
        <div className="h-full flex items-center justify-start whitespace-nowrap">
          <div className="ease-in-out duration-700 transition-all min-w-full h-full">
            <img
              src={sliderData[index]}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(40%)" }}
              alt="front pic"
            />
          </div>
        </div>
      </div>
      <div
        className="z-10 text-white absolute w-max flex flex-col items-center space-y-5 md:space-y-10 top-1/2 left-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <p
          className="text-xl sm:text-4xl md:text-5xl"
          style={{ fontFamily: "montserratBold" }}
        >
          Plan your trip with stay vacations
        </p>
        <p
          className="text-base sm:text-xl md:text-2xl"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Experience the best travel journeys{" "}
        </p>
      </div>
    </section>
  );
};

export default Slider;
