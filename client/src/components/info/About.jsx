import React from "react";

const About = () => {
  return (
    <div className="w-full p-5 flex flex-col space-y-5">
      <header className="font-[montserratSemi] text-base text-dark-blue">
        About stay vacations
      </header>

      <p className="about w-full text-[rgba(0,0,0,.7)] text-sm">
        Founded in 1996 in Amsterdam, Booking.com has grown from a small Dutch
        startup to one of the world’s leading digital travel companies. Part of
        Booking Holdings Inc. (NASDAQ: BKNG), Booking.com’s mission is to make
        it easier for everyone to experience the world. By investing in the
        technology that helps take the friction out of travel, Booking.com
        seamlessly connects millions of travellers with memorable experiences, a
        range of transport options and incredible places to stay - from homes to
        hotels and much more. As one of the world’s largest travel marketplaces
        for both established brands and entrepreneurs of all sizes, Booking.com
        enables properties all over the world to reach a global audience and
        grow their businesses. Booking.com is available in 43 languages and
        offers more than 28 million total reported accommodation listings,
        including over 6.6 million listings alone of homes, apartments and other
        unique places to stay. No matter where you want to go or what you want
        to do, Booking.com makes it easy and backs it all up with 24/7 customer
        support.
      </p>

      {/* <div className="contacts flex flex-col space-y-2.5">
        <div className="flex items-center space-x-2 font-[poppinsSemi]">
          <p className="w-24 text-[rgba(0,0,0,.7)]">Phone:</p>
          <a className="p-2.5 rounded-lg">+123 456 7890</a>
        </div>

        <div className="flex items-center space-x-2 font-[poppinsSemi]">
          <p className="w-24 text-[rgba(0,0,0,.7)]">Email:</p>
          <a className="p-2.5 rounded-lg">info@stayvacations.com</a>
        </div>
      </div> */}
    </div>
  );
};

export default About;
