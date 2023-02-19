import React, { useState } from "react";
function Booking() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "stay_vacations");
    data.append("folder", "stay_vacations_images");
    fetch("https://api.cloudinary.com/v1_1/dxxbxjiox/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={(e) => uploadImage(e)}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            e.preventDefault();
            setImage(e.target.files[0]);
          }}
        />
        <input type="submit" value="Add" />
      </form>
      <img src={url} alt="upload" />
    </div>
  );
}

export default Booking;
