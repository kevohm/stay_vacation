import React from "react";
import { useGlobal } from "../../../context/AppContext";
import useLogout from "../../../features/user/useLogout";

export const BtnLogout = ({
  text = "logout",
  color = "rgba(1, 49, 91, 1)",
  bg = "white",
  hover = "rgba(1, 49, 91, .8)",
}) => {
  // const { logout } = useGlobal();
  const { isError, isLoading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 text-lg rounded-lg border-none transition-colors duration-200"
      style={{
        background: bg,
        color,
        fontFamily: "poppins",
      }}
      onMouseEnter={(e) => (e.target.style.color = hover)}
      onMouseLeave={(e) => (e.target.style.color = color)}
    >
      {isLoading ? "Logging out..." : text}
    </button>
  );
};
