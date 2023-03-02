import React, { useState } from 'react'
import { Main } from '../css/dashboard';
import { GrAdd } from "react-icons/gr";
const CreateForm = () => {
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
    <Main>
      <div>
        <input type="text" placeholder="Name" />
      </div>
      <div>
        <textarea type="text" placeholder="Description" />
      </div>
      <div className="lined-up">
        <input type="text" className="price" placeholder="Price" />
        <p>Per</p>
        <input
          type="text"
          className="payment-type"
          placeholder="Payment Type"
        />
        <div className="div-icon-add">
          <GrAdd className="icon-add" />
        </div>
      </div>
      <div>
        <input type="file" accept="image/*" multiple={true} />
      </div>
      <div className="lined-up">
        <input type="text" placeholder="Category" />
        <div className="div-icon-add">
          <GrAdd className="icon-add" />
        </div>
      </div>
      <div>
        <input type="text" placeholder="Max People" />
      </div>
      <div>
        <input type="date" placeholder="Max People" />
      </div>
      <div className="lined-up-now">
        <input type="text" placeholder="city" />
        <input type="text" placeholder="Country" />
      </div>
      <div className="submit">
        <input type="submit" value="Create" />
      </div>
    </Main>
  );
}

export default CreateForm
