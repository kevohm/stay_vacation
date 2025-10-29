import React, { useState } from "react";
import { useGlobal } from "../../../context/AppContext";
import { FormError } from "../../smaller/error/FormError";
import { useEvent } from "../context/EventContext";

const Comment = ({ user, description, _id, fetchComments, handleData }) => {
  const [err, setErr] = useState({ msg: "", state: "", show: false });
  const { state } = useGlobal();
  const { deleteComment } = useEvent();

  const changeErr = (data) => {
    const reset = { msg: "", state: "", show: false };
    setErr(data);
    setTimeout(() => setErr(reset), 3000);
  };

  const yours =
    state.user.id && state.user.role ? user._id === state.user.id : false;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteComment(_id)
      .then(() => {
        changeErr({ state: "success", show: true, msg: "Comment deleted" });
        fetchComments();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          changeErr({ ...err, show: true, msg: error.response.data.msg });
        }
      });
  };

  return (
    <div className="w-full bg-[rgba(138,154,234,.08)] rounded-lg p-3 max-w-[800px] flex flex-col space-y-2">
      <FormError {...err} />

      <header className="text-sm text-[rgba(1,49,91,.7)] font-semibold font-montserratSemi">
        {user.username}
      </header>

      <p className="text-sm font-poppins">{description}</p>

      {yours && (
        <div className="w-full flex items-center justify-between">
          <button
            className="cursor-pointer p-1 px-3 bg-orange text-white rounded-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="cursor-pointer p-1 px-3 bg-dark-blue text-white rounded-sm"
            onClick={() => handleData(description, _id)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
