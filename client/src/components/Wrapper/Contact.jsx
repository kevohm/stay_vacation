import React from "react";

export const Contact = ({ data }) => {
  return (
    <div className="flex flex-col items-start space-y-5">
      <header
        className="uppercase text-white"
        style={{ fontFamily: "poppinsSemi" }}
      >
        contacts
      </header>

      <div className="flex items-center space-x-5">
        {data.map((item) => (
          <a
            key={item.to}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: item.color }}
            className="transition-transform duration-200 hover:scale-110"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};
