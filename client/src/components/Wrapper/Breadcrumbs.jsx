import React from "react";
import { useLocation, Link } from "react-router-dom";
import Home from "../../assets/svg/Home.svg";

const styles = {
  main: {
    overflowX: "scroll",
    overflowY: "scroll",
    height: "4rem",
    padding: "0.25rem 3rem 0 1.5rem",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    fontFamily: "poppinsSemi",
    borderTop: "1px solid rgba(1, 49, 91, .1)",
    borderBottom: "1px solid rgba(1, 49, 91, .1)",
    gap: "0.5rem",
    whiteSpace: "nowrap",
  },
  link: {
    color: "rgba(138,154,234,1)",
    minWidth: "fit-content",
    textDecoration: "none",
  },
  linkLast: {
    color: "rgba(1, 49, 91, 1)",
    pointerEvents: "none",
    cursor: "default",
  },
  arrow: {
    margin: "0 0.5rem",
    color: "rgba(1, 49, 91, 1)",
  },
  homeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  homeIcon: {
    width: "1rem",
    height: "1rem",
  },
};

const Breadcrumbs = () => {
  const location = useLocation();
  let address = "/";

  const segments = location.pathname
    .split("/")
    .filter((i) => i !== "")
    .map((i, index, arr) => {
      const label = decodeURIComponent(i);
      address += `${i}/`;

      const isLast = index === arr.length - 1;

      return (
        <React.Fragment key={index}>
          <span style={styles.arrow}>{">"}</span>
          <Link
            to={address}
            style={
              isLast ? { ...styles.link, ...styles.linkLast } : styles.link
            }
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Link>
        </React.Fragment>
      );
    });

  // do not show breadcrumb on root
  if (address === "/") return null;

  return (
    <div style={styles.main}>
      <div style={styles.homeContainer}>
        <img src={Home} alt="Home" style={styles.homeIcon} />
        <Link to="/" style={styles.link}>
          Home
        </Link>
      </div>
      {segments}
    </div>
  );
};

export default Breadcrumbs;
