import React from "react";
import { useEvent } from "../context/EventContext";
import SingleCheck from "./SingleCheck";

const Checkpoint = () => {
  const { stages } = useEvent();
  const check = stages.level > 1;

  return (
    <div className="w-full overflow-x-scroll overflow-y-auto py-5">
      <div className="min-w-[350px] w-full relative z-0 flex items-center justify-between">
        {/* Connecting line (left half) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: "2px",
            width: "50%",
            backgroundColor: "#22c55e", // green
            zIndex: 0,
            transform: "translateY(-50%)",
          }}
        />
        {/* Connecting line (right half) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "2px",
            width: "50%",
            backgroundColor: check ? "#22c55e" : "rgba(0,0,0,0.5)",
            zIndex: 0,
            transform: "translateY(-50%)",
          }}
        />

        {/* Checkpoints */}
        <SingleCheck text="your selection" check={true} />
        <SingleCheck text="payment details" check={check} />
        <SingleCheck text="final step" />
      </div>
    </div>
  );
};

export default Checkpoint;
