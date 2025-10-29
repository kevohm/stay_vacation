import React from "react";
import error from "../../assets/svg/error.svg";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-start pt-12 space-y-10">
      <img className="w-full max-w-[600px]" src={error} alt="error" />
      <p
        className="text-dark-blue hover:underline font-PoppinsSemi"
        style={{
          fontFamily: "PoppinsSemi",
        }}
      >
        Opps! page does not exist{" "}
        <Link
          to="/"
          className="text-dark-blue hover:underline"
          style={{
            fontFamily: "PoppinsSemi",
          }}
        >
          Go Home
        </Link>
      </p>
    </section>
  );
};

export default Error;
