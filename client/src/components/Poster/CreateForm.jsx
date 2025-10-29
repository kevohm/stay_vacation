import React, { useEffect, useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const CreateForm = () => {
  const [data, setData] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const { getSingle, createPoster, getPosters, updateError, setOtherErrors } =
    useGlobal();

  const changeData = (e) => {
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append("image", file);
    setData(fileData);

    const reader = new FileReader();
    reader.addEventListener("load", () => setImageUri(reader.result), false);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) {
      updateError({
        msg: "Please provide poster image",
        type: "warning",
        show: true,
      });
    } else {
      updateError({
        msg: "Creating poster...",
        type: "success",
        show: true,
      });
      createPoster(eventId, data)
        .then(() => {
          getPosters();
          updateError({
            msg: "Poster successfully created",
            type: "success",
            show: true,
          });
        })
        .catch((error) => setOtherErrors(error));
    }
  };

  useEffect(() => {
    getSingle(eventId).then((res) => {
      setEvent(res.data.event);
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-5 w-full max-w-[400px] items-start"
    >
      <header
        className="text-lg text-[rgba(0,0,0,.7)]"
        style={{ fontFamily: "poppinsSemi" }}
      >
        Add Poster
      </header>

      {/* File Input */}
      <div className="w-full flex flex-col items-start space-y-2">
        <label className="relative flex items-center">
          <span
            className="absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1,49,91,.6)] bg-[rgba(1,49,91,.1)] rounded-l-lg"
            style={{ fontFamily: "poppinsMedium" }}
          >
            choose file
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={changeData}
            className="bg-white cursor-pointer w-full py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] text-sm"
            style={{ fontFamily: "poppinsMedium" }}
          />
        </label>
      </div>

      {/* Preview Image */}
      {imageUri && (
        <div className="w-full flex flex-col items-start space-y-2">
          <img
            src={imageUri}
            alt="current"
            className="w-full max-w-[400px] rounded-lg object-cover"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="w-full flex flex-col items-start space-y-2">
        <p className="text-[rgba(1,49,91,.7)] text-sm">
          Event to add poster on:
        </p>

        {!event ? (
          <div>
            <p>loading...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2 w-full">
              <img
                src={event.image[0]}
                alt="event"
                className="w-full max-w-[400px] rounded-lg h-[250px] object-cover"
              />
            </div>
            <div className="flex items-center space-x-2 w-full">
              <p
                className="w-24 text-[rgba(1,49,91,.7)] text-xs"
                style={{ fontFamily: "poppinsSemi" }}
              >
                Name
              </p>
              <p className="text-xs text-[rgba(1,49,91,.7)]">{event.name}</p>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <p
                className="w-24 text-[rgba(1,49,91,.7)] text-xs"
                style={{ fontFamily: "poppinsSemi" }}
              >
                City
              </p>
              <p className="text-xs text-[rgba(1,49,91,.7)]">{event.city}</p>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <p
                className="w-24 text-[rgba(1,49,91,.7)] text-xs"
                style={{ fontFamily: "poppinsSemi" }}
              >
                Country
              </p>
              <p className="text-xs text-[rgba(1,49,91,.7)]">{event.country}</p>
            </div>
          </>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="w-full flex flex-row items-center justify-between">
        <Link
          to="/admin/additional"
          className="capitalize cursor-pointer text-white bg-dark-blue text-sm border-none rounded-lg px-2.5 py-2"
          style={{ fontFamily: "poppins" }}
        >
          change event
        </Link>
        <button
          type="submit"
          className="capitalize cursor-pointer bg-green text-dark-blue text-sm border-none rounded-lg px-2.5 py-2"
          style={{ fontFamily: "poppins" }}
        >
          add poster
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
