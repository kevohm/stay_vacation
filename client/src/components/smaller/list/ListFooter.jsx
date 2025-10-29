import React from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../../../context/AppContext";

export const ListFooter = ({ data, header }) => {
  const { state } = useGlobal();

  return (
    <ul className="w-full min-w-max sm:min-w-[180px] list-none flex flex-col space-y-5 text-white">
      <li
        className="capitalize"
        style={{
          fontFamily: "poppinsSemi",
        }}
      >
        {header}
      </li>

      {data.map((item) => {
        if (item.text === "join us" && state.user.role && state.user.id) {
          return (
            <Link to="/profile" key="profile" className="w-full text-white">
              <li
                className="w-full capitalize hover:underline"
                style={{ transition: "all 0.2s ease-in-out" }}
              >
                profile
              </li>
            </Link>
          );
        }

        return (
          <Link to={item.url} key={item.text} className="w-full text-white">
            <li
              className="w-full capitalize hover:underline"
              style={{ transition: "all 0.2s ease-in-out" }}
            >
              {item.text}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
