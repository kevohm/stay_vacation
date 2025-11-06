import moment from "moment";
import React, { useEffect, useState } from "react";
import { useEvent } from "../Events/context/EventContext";
import { Loader } from "../smaller/load/Loader";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { getBookingUser } = useEvent();
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    getBookingUser()
      .then((res) => {
        const { data } = res;
        setUser({ ...data.details, role: data.user.role });
      })
      .catch(() => {
        setUser([]);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="h-full order-2 md:order-1 p-5 flex flex-col space-y-5 row-span-2">
        <header
          className="text-base capitalize text-dark-blue pb-2.5"
          style={{ fontFamily: "montserratSemi" }}
        >
          your profile
        </header>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-sm w-full order-2 md:order-1 p-5 flex flex-col space-y-5 row-span-2">
      {/* Header section */}
      <div className="w-full flex justify-between items-center">
        <header
          className="text-base capitalize text-dark-blue pb-2.5"
          style={{ fontFamily: "montserratSemi" }}
        >
          your profile
        </header>
        {user.role === import.meta.env.VITE_ADMIN && (
          <Link
            to="/admin/"
            className="text-sm hover:underline"
            style={{ fontFamily: "poppins" }}
          >
            view Dashboard
          </Link>
        )}
      </div>

      {/* User info rows */}
      <div
        className="w-full flex items-center"
        style={{ fontFamily: "poppinsMedium" }}
      >
        <p className="capitalize w-32 text-[rgba(0,0,0,1)] text-sm">Username</p>
        <p className="text-sm text-[rgba(0,0,0,0.7)]">{user.username}</p>
      </div>

      <div
        className="w-full flex items-center"
        style={{ fontFamily: "poppinsMedium" }}
      >
        <p className="capitalize w-32 text-[rgba(0,0,0,1)] text-sm">Email</p>
        <p className="text-sm text-[rgba(0,0,0,0.7)]">{user.email}</p>
      </div>

      <div
        className="w-full flex items-center"
        style={{ fontFamily: "poppinsMedium" }}
      >
        <p className="capitalize w-32 text-[rgba(0,0,0,1)] text-sm">
          Phone number
        </p>
        <p className="text-sm text-[rgba(0,0,0,0.7)]">{user.phone_number}</p>
      </div>

      <div
        className="w-full flex items-center"
        style={{ fontFamily: "poppinsMedium" }}
      >
        <p className="capitalize w-32 text-[rgba(0,0,0,1)] text-sm">
          Joined Us at
        </p>
        <p className="text-sm text-[rgba(0,0,0,0.7)]">
          {moment(user.createdAt).format("ddd, MMM DD YYYY")}
        </p>
      </div>

      {/* Info footer */}
      <div className="flex text-light-blue text-xs justify-start space-x-2 items-center">
        <FaInfoCircle />
        <p
          className="text-light-blue rounded-lg text-sm border-none"
          style={{ fontFamily: "poppins" }}
        >
          <Link
            to="/info/contact"
            className=" text-sm hover:underline"
            style={{ fontFamily: "poppins" }}
          >
            Contact Us
          </Link>{" "}
          for any updates to the above information
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
