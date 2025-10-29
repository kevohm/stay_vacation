import React from "react";
import { HeaderEmail } from "../smaller/header/HeaderEmail";

export const Email = () => {
  return (
    <div
      className="bg-white absolute top-0 left-1/2 py-8 space-y-9 w-full max-w-[300px] sm:max-w-[450px] md:max-w-[650px] border-darkBlue border border-solid rounded-lg flex flex-col items-center z-50"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <HeaderEmail text="subscribe for updates" />
      <div className="w-full mx-auto flex items-center justify-center">
        <input
          type="text"
          placeholder="email@gmail.com"
          className="w-full max-w-[150px] md:max-w-[300px] p-2 pl-2 sm:pl-4 pr-5 md:pr-10 rounded-l-lg text-[rgba(1,49,91,.7)] text-sm"
          style={{
            fontFamily: "poppinsMedium",
            border: "1px solid rgba(1, 49, 91, 0.3)",
            borderRight: "none",
          }}
        />
        <input
          type="submit"
          value="SEND"
          className="w-20 p-2.5 md:p-2 px-4 text-sm cursor-pointer bg-orange text-white rounded-r-lg border-2 md:border border-solid border-orange"
          style={{ fontFamily: "poppinsSemi" }}
        />
      </div>
    </div>
  );
};
