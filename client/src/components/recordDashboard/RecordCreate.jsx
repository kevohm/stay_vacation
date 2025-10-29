import React, { useState } from "react";
import { ManageData } from "../smaller/frame/ManageData";
import records from "../../assets/svg/record.svg";
import RecordForm from "./RecordForm";
import { UpdateForm } from "../bookingsDashboard/UpdateForm";
import { SelectEntityTable } from "../userDashboard/SelectEntityTable";

const RecordCreate = () => {
  const [open, setOpen] = useState(false);

  const sortData = [
    "created at",
    "name",
    "description",
    "validity",
    "city",
    "country",
  ];

  const headings = [
    "#",
    "image",
    "name",
    "description",
    "category",
    "price",
    "amenities",
    "city",
    "country",
    "validity",
    "createdAt",
    "UpdatedAt",
  ];

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <div className="relative w-full">
      {/* Popup overlay */}
      {open && (
        <div
          className="rounded-lg absolute top-1/2 left-1/2 w-full h-full bg-white z-20"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <SelectEntityTable
            changeOpen={handleChange}
            typeDataB="event"
            typeData="events"
            update={<UpdateForm />}
            sortData={sortData}
            headings={headings}
          />
        </div>
      )}

      {/* Main section */}
      <ManageData
        element={<RecordForm changeOpen={handleChange} />}
        img={records}
        title="Create Report"
      />
    </div>
  );
};

export default RecordCreate;
