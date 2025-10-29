import React from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../../../context/AppContext";
import { env } from "../../../context/appActions";

export const LinkList = ({ data = [], menu = false }) => {
  const { state } = useGlobal();

  if (data.length === 0) {
    return <p>provide data prop</p>;
  }

  return (
    <ul
      className={`${
        menu ? "flex" : "hidden"
      } list-none w-full md:w-auto flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-[25px] text-lg`}
      style={{ display: menu ? "flex" : "none" }}
    >
      {data.map((item) => {
        const { link, text } = item;
        if (text === "Contacts" && state.user.id && state.user.role) {
          return (
            <Link to="/profile" key="profile" className="w-full pl-5 md:p-0">
              <li
                className="hover:text-[rgba(1,49,91,.8)] transition-colors duration-200"
                style={{ cursor: "pointer" }}
              >
                Profile
              </li>
            </Link>
          );
        }
        return (
          <Link to={link} key={text} className="w-full pl-5 md:p-0">
            <li
              className="hover:text-[rgba(1,49,91,.8)] transition-colors duration-200"
              style={{ cursor: "pointer" }}
            >
              {text}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
