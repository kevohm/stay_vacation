import React from "react";

export const Contact = ({ title, url, text, color, bg }) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="w-24 text-[rgba(0,0,0,.7)]">{title}</p>
      <a
        href={url}
        className="p-2.5 rounded-lg border transition"
        style={{
          borderColor: color,
          color: color,
          background: bg,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  );
};

const Contacts = () => {
  const data = [
    {
      title: "call us at",
      url: "tel:+254704591173",
      text: "+254704591173",
      color: "#01315B",
      bg: "#71F28B",
    },
    {
      title: "instagram",
      url: "https://www.instagram.com/stayvacationske/?hl=en",
      text: "stayvacationske",
      color: "#E87FA0",
      bg: "#fff",
    },
    {
      title: "facebook",
      url: "https://www.facebook.com/stayvacationske/",
      text: "Stay Vacations LTD",
      color: "#01315B",
      bg: "#fff",
    },
    {
      title: "email us",
      url: "mailto:reservations.stayvacations@gmail.com",
      text: "reservations.stayvacations@gmail.com",
      color: "#8A9AEA",
      bg: "#fff",
    },
  ];

  return (
    <div className="w-full p-5 flex flex-col space-y-5">
      <header className="font-[montserratSemi] text-base text-dark-blue">
        Contact Us
      </header>

      <div className="flex flex-col space-y-2.5">
        {data.map((item, index) => (
          <Contact key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
