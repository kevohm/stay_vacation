import React, { useEffect, useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { useEvent } from "../Events/context/EventContext";
import { Table } from "./Table";
import { FaInfoCircle } from "react-icons/fa";

const EventsTable = () => {
  const { userPayments } = useEvent();
  const { state } = useGlobal();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState({ current: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    userPayments(state.user.id, page.current)
      .then((res) => {
        const { data } = res;
        setPayments(data.payments);
        setPage({ total: data.pages.pages, current: data.pages.currentPage });
        setLoading(false);
      })
      .catch(() => {
        setPayments([]);
        setPage({ total: 0, current: 0 });
        setLoading(false);
      });
  };

  const handleChange = (current) => {
    setPage({ ...page, current });
  };

  useEffect(() => {
    fetchData();
  }, [page.current]);

  return (
    <div className="h-max w-full bg-white rounded-lg shadow-sm order-3 md:order-4 p-5">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <header
          className="text-base font-semibold"
          style={{ fontFamily: "poppinsSemi" }}
        >
          Your bookings
        </header>
        <button
          onClick={fetchData}
          className="p-2 bg-[#01315B] rounded-lg cursor-pointer border-none text-white text-sm"
          style={{ fontFamily: "poppins" }}
        >
          Refresh
        </button>
      </div>

      {/* Info Message */}
      <div
        className="flex items-start justify-start space-x-2 pb-2.5 w-full text-[#8AAEEA] text-xs"
        style={{ fontFamily: "poppins" }}
      >
        <FaInfoCircle className="text-xs" />
        <p>
          Pending payments will automatically update after 30 seconds. Please
          wait for 15 minutes before making payments on the same event.
        </p>
      </div>

      {/* Table */}
      <div className="w-full border border-solid border-[rgba(0,0,0,0.3)] rounded-lg overflow-x-scroll overflow-y-auto">
        <Table
          data={payments}
          current={page.current}
          total={page.total}
          loading={loading}
          setLoading={setLoading}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EventsTable;
