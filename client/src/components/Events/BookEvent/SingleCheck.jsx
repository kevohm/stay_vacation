import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const SingleCheck = ({ text, check = false }) => {
  return (
    <div className="z-10 bg-white">
      <div className="px-1 bg-[rgba(138,154,234,0.1)] flex items-center space-x-2">
        <AiOutlineCheckCircle
          className={`text-lg ${check ? "text-green-500" : "text-[#01315B]"}`}
        />
        <p
          className="text-sm text-[#01315B] capitalize"
          style={{ fontFamily: "poppinsSemi" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default SingleCheck;
