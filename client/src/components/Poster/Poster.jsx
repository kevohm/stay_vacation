import React from "react";
import { useGlobal } from "../../context/AppContext";

const Poster = ({ image, event, _id }) => {
  const { deletePoster, getPosters, updateError, setOtherErrors } = useGlobal();

  const handleDelete = () => {
    deletePoster(_id)
      .then(() => {
        getPosters();
        updateError({
          msg: "Successfully deleted poster",
          type: "success",
          show: true,
        });
      })
      .catch((err) => setOtherErrors(err));
  };

  return (
    <div className="w-full flex flex-col items-start space-y-2.5">
      <img
        src={image}
        alt={event.name}
        className="w-full object-cover rounded-t-lg"
      />
      <div className="w-full flex justify-between items-center">
        <p className="text-sm font-[poppins]">
          {event.name}
          {`, ${event.city}`}
        </p>
        <button
          onClick={handleDelete}
          className="px-2.5 py-2 bg-orange text-white border-none rounded-lg cursor-pointer"
          style={{
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s ease",
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Poster;
