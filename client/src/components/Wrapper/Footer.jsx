import React from "react";
import { ListFooter } from "../smaller/list/ListFooter";
import { footerData } from "../utils/landing/footer";
import { contactData } from "../utils/landing/contact";
import { Contact } from "./Contact";
import { Email } from "./Email";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col items-center">
      {/* Top section only on homepage */}
      {location.pathname === "/" && (
        <div className="w-full bg-white min-h-[188px]" />
      )}

      {/* Bottom section */}
      <div className="relative w-full flex flex-col justify-end bg-darkBlue space-y-16 sm:space-y-28 min-h-[495px] pt-0 sm:pt-24">
        {location.pathname === "/" && <Email />}

        {/* Links + Contact */}
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between px-5 sm:px-10">
          <div className="w-max flex items-start mt-12 sm:mt-0 space-x-16 md:space-x-48">
            {footerData.map((item) => (
              <ListFooter
                key={item.title}
                header={item.title}
                data={item.data}
              />
            ))}
          </div>

          <Contact data={contactData} />
        </div>

        {/* Copyright */}
        <div className="w-full text-white text-sm flex items-center justify-center p-5 border-t border-white">
          <p>&copy; 2018-{year} Stay Vacations - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
