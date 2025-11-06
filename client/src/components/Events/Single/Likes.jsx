import React, { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { useGlobal } from "../../../context/AppContext";
import { useEvent } from "../context/EventContext";

const Likes = ({ eventId }) => {
  const { state } = useGlobal();
  const {
    unlikeEvent,
    undislikeEvent,
    likeEvent,
    dislikeEvent,
    getReaction,
    fetchEvent,
  } = useEvent();

  const [data, setData] = useState({ like: 0, dislike: 0 });
  const [status, setStatus] = useState({ like: false, dislike: false });
  const [loading, setLoading] = useState(true);
  const [deactivated, setDeactivated] = useState(false);

  const fetchUpdates = () => {
    if (state.user.id || state.user.role) {
      getReaction(eventId).then((res) => {
        const { reaction } = res.data;
        setStatus(reaction);
      });
      fetchEvent(eventId)
        .then((res) => {
          const { event } = res.data;
          setData({ like: event.like, dislike: event.dislike });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      fetchEvent(eventId)
        .then((res) => {
          const { event } = res.data;
          setData({ like: event.like, dislike: event.dislike });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  const handleLike = (like) => {
    setDeactivated(true);
    if (like) {
      likeEvent(eventId)
        .then(() => {
          if (status.dislike) {
            setStatus({ like: true, dislike: false });
            setData({ like: data.like + 1, dislike: data.dislike - 1 });
          } else {
            setStatus({ ...status, like: true });
            setData({ ...data, like: data.like + 1 });
          }
          setDeactivated(false);
        })
        .catch(() => setDeactivated(false));
    } else {
      unlikeEvent(eventId)
        .then(() => {
          setStatus({ ...status, like: false });
          setData({ ...data, like: data.like - 1 });
          setDeactivated(false);
        })
        .catch(() => setDeactivated(false));
    }
  };

  const handleDislike = (dislike) => {
    setDeactivated(true);
    if (dislike) {
      dislikeEvent(eventId).then(() => {
        if (status.like) {
          setStatus({ dislike: true, like: false });
          setData({ dislike: data.dislike + 1, like: data.like - 1 });
        } else {
          setStatus({ ...status, dislike: true });
          setData({ ...data, dislike: data.dislike + 1 });
        }
        setDeactivated(false);
      });
    } else {
      undislikeEvent(eventId).then(() => {
        setStatus({ ...status, dislike: false });
        setData({ ...data, dislike: data.dislike - 1 });
        setDeactivated(false);
      });
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, [state.user]);

  // Skeleton / Loading
  if (loading) {
    return (
      <div className="p-4 border rounded-xl bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Reaction</h3>
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  // Requires login
  if (!state.user.id || !state.user.role) {
    return (
      <div className="p-4 border rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Reaction</h3>
          <FaInfoCircle
            className="text-gray-400"
            title="Requires login to react on event"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm">{data.like}</p>
            <AiFillLike className="text-gray-300 text-2xl" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm">{data.dislike}</p>
            <AiFillDislike className="text-gray-300 text-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Default (interactive)
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Reaction</h3>

      <div className="flex items-center gap-6">
        {/* Like */}
        <div className="flex items-center gap-2">
          {deactivated ? (
            status.like ? (
              <AiFillLike className="text-blue-500 text-2xl opacity-50" />
            ) : (
              <AiOutlineLike className="text-gray-400 text-2xl opacity-50" />
            )
          ) : status.like ? (
            <AiFillLike
              className="text-blue-500 text-2xl cursor-pointer hover:scale-110 transition"
              onClick={() => handleLike(false)}
            />
          ) : (
            <AiOutlineLike
              className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500 hover:scale-110 transition"
              onClick={() => handleLike(true)}
            />
          )}
          <p className="text-gray-700 text-sm">{data.like}</p>
        </div>

        {/* Dislike */}
        <div className="flex items-center gap-2">
          {deactivated ? (
            status.dislike ? (
              <AiFillDislike className="text-red-500 text-2xl opacity-50" />
            ) : (
              <AiOutlineDislike className="text-gray-400 text-2xl opacity-50" />
            )
          ) : status.dislike ? (
            <AiFillDislike
              className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition"
              onClick={() => handleDislike(false)}
            />
          ) : (
            <AiOutlineDislike
              className="text-gray-500 text-2xl cursor-pointer hover:text-red-500 hover:scale-110 transition"
              onClick={() => handleDislike(true)}
            />
          )}
          <p className="text-gray-700 text-sm">{data.dislike}</p>
        </div>
      </div>
    </div>
  );
};

export default Likes;
