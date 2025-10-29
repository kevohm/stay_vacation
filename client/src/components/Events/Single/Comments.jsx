import React, { useEffect, useState } from "react";
import { Loader } from "../../smaller/load/Loader";
import { useEvent } from "../context/EventContext";
import { FormError } from "../../smaller/error/FormError";
import Comment from "./Comment";
import { useGlobal } from "../../../context/AppContext";

const Comments = () => {
  const { getComments, currentEvent, addComment, updateComment } = useEvent();
  const [comments, setComments] = useState([]);
  const { state } = useGlobal();
  const [data, setData] = useState({ description: "" });
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState({ msg: "", state: "", show: false });

  const handleData = (description, id) => {
    setCurrent(id);
    setData({ description });
  };

  const changeErr = (data) => {
    const reset = { msg: "", state: "", show: false };
    setErr(data);
    setTimeout(() => setErr(reset), 3000);
  };

  const fetchComments = () => {
    if (currentEvent.loading) return;
    getComments(currentEvent.data._id)
      .then((res) => {
        const { data } = res;
        setComments(data.comments);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(currentEvent.data._id, data)
      .then(() => {
        changeErr({ state: "success", show: true, msg: "Comment created" });
        fetchComments();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          changeErr({ ...err, show: true, msg: error.response.data.msg });
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateComment(current, data)
      .then(() => {
        changeErr({ state: "success", show: true, msg: "Comment updated" });
        setCurrent(null);
        fetchComments();
      })
      .catch((error) => {
        setCurrent(null);
        if (error.response && error.response.data) {
          changeErr({ ...err, show: true, msg: error.response.data.msg });
        }
      });
  };

  useEffect(() => {
    fetchComments();
  }, [currentEvent.loading]);

  if (!currentEvent.isExpired) return null;

  if (loading) {
    return (
      <div className="w-full">
        <header
          className="text-base capitalize text-[#01315B] pb-2.5"
          style={{ fontFamily: "montserratSemi" }}
        >
          Comments
        </header>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <header
        className="text-base capitalize text-[#01315B] pb-2.5"
        style={{ fontFamily: "montserratSemi" }}
      >
        Comments
      </header>

      <div
        className="max-h-[500px] overflow-y-scroll overflow-x-auto bg-white p-5 rounded-lg w-full flex flex-col space-y-5"
        style={{ boxShadow: "0px 2px 6px 0px rgba(1, 49, 91, .25)" }}
      >
        {state.user.id && state.user.role ? (
          <form
            onSubmit={current ? handleUpdate : handleSubmit}
            className="w-full max-w-[600px] flex flex-col space-y-2.5"
          >
            <FormError {...err} />

            <div className="w-full">
              <textarea
                placeholder="Type a comment"
                value={data.description}
                onChange={(e) => setData({ description: e.target.value })}
                className="w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1,49,91,0.7)] border-[rgba(1,49,91,0.5)]"
                style={{ fontFamily: "poppinsMedium", resize: "vertical" }}
              />
            </div>

            <div className="flex items-center justify-end">
              <input
                type="submit"
                value={`${current ? "Update" : "Add"} Comment`}
                className="text-sm cursor-pointer py-2 px-2.5 text-white rounded-lg bg-[rgba(1,49,91,1)] border-none"
                style={{ fontFamily: "poppinsMedium" }}
              />
            </div>
          </form>
        ) : (
          <div className="w-full max-w-[600px] text-sm bg-[#8A9AEA] p-2.5 rounded text-white">
            <p>Please login to comment on event</p>
          </div>
        )}

        {comments.length === 0 ? (
          <p>No Comments Yet. Be first to comment</p>
        ) : (
          comments.map((item) => (
            <Comment
              key={item._id}
              {...item}
              fetchComments={fetchComments}
              handleData={handleData}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
