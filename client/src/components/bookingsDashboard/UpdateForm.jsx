import React, { useEffect, useState } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import moment from "moment";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useGlobal } from "../../context/AppContext";
import { verifyData, uploadFiles } from "./uploadFiles";
import { Categories } from "./Categories";
export const UpdateForm = () => {
  const { state, toggleUpdate, updateError, updateEvent } = useGlobal();
  const [data, setData] = useState({
    image: state.event_startUpdate.current.image,
    name: state.event_startUpdate.current.name,
    description: state.event_startUpdate.current.description,
    city: state.event_startUpdate.current.city,
    country: state.event_startUpdate.current.country,
    category: state.event_startUpdate.current.category,
    price_choices: state.event_startUpdate.current.price_choices,
    Amenities: state.event_startUpdate.current.Amenities,
    validity: moment(new Date(state.event_startUpdate.current.validity)).format(
      "YYYY-MM-DD"
    ),
  });
  const [priceNum, setPriceNum] = useState(
    state.event_startUpdate.current.price_choices
  );
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(
    state.event_startUpdate.current.category.map((i) => i._id)
  );
  const [amenities, setAmenities] = useState(
    state.event_startUpdate.current.Amenities
  );
  const handlePrice = (val) => {
    if (val === "add") {
      setPriceNum([...priceNum, { price: "", category: "" }]);
    } else {
      let arr = [...priceNum];
      if (arr.length !== 1) {
        arr.splice(arr.length - 1, 1);
        setPriceNum(arr);
      }
    }
  };
  const changePrice = (e, index) => {
    const { value, name } = e.target;
    let newData = [...priceNum];
    newData[index][name] = value;
    setPriceNum(newData);
  };
  const handleAmenity = (val) => {
    if (val === "add") {
      setAmenities(["", ...amenities]);
    } else {
      let arr = [...amenities];
      if (arr.length !== 1) {
        arr.splice(0, 1);
        setAmenities(arr);
      }
    }
  };
  const changeAmenities = (e, index) => {
    const { value } = e.target;
    let newData = [...amenities];
    newData[index] = value;
    setAmenities(newData);
  };
  const handleImage = (e) => {
    const { files } = e.target;
    setFiles(files);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let nData = {
      ...data,
      category,
      price_choices: priceNum,
      Amenities: amenities,
    };
    if (!verifyData(nData, changeErr)) {
      console.log("error", nData);
      return;
    }
    try {
      changeErr({
        msg: "Please wait while we process your data...",
        type: "success",
        show: true,
      });
      let newData = { ...nData };
      if (files.length !== 0) {
        const newFile = await uploadFiles(files, changeErr);
        if (newFile.length === 0) {
          return;
        }
        newData = { ...data, image: newFile };
      }
      setData(newData);
      updateEvent(state.event_startUpdate.current._id, newData);
    } catch (error) {
      changeErr({
        msg: "Error occurred while uploading images",
        type: "warning",
        show: true,
      });
    }
  };
  const changeErr = (err) => {
    updateError(err);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full bg-white max-w-[300px] md:max-w-max space-y-5 p-5 rounded-lg"
    >
      <div className="header flex flex-row justify-between items-center py-1">
        <p className="font-semibold text-[rgba(1,49,91,.9)] text-base capitalize">
          Update
        </p>
        <FaTimes
          className="text-[rgba(1,49,91,.9)] cursor-pointer"
          onClick={() =>
            toggleUpdate("event", { email: "", phone_number: "", username: "" })
          }
        />
      </div>

      <div className="flex-it flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10">
        {/* Column 1 */}
        <div className="w-full flex flex-col space-y-5 max-w-[440px]">
          <div>
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">Name</p>
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] placeholder-[rgba(1,49,91,.5)]"
            />
          </div>

          <div>
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">
              Description ({data.description.length} characters)
            </p>
            <textarea
              placeholder="Description"
              value={data.description}
              name="description"
              onChange={handleChange}
              className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)] placeholder-[rgba(1,49,91,.5)] resize-y"
            />
          </div>

          {/* Price Fields */}
          <div className="space amenities max-h-[150px] overflow-y-scroll">
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">
              Price per category
            </p>
            {priceNum.map((item, index) => (
              <div
                className="flex items-center space-x-5 mb-5 text-[rgba(1,49,91,1)]"
                key={index}
              >
                <input
                  type="number"
                  min={1}
                  placeholder="Price"
                  value={item.price}
                  name="price"
                  onChange={(e) => changePrice(e, index)}
                  className="w-full py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-sm text-[rgba(1,49,91,.7)]"
                />
                <p className="p-2 text-[rgba(1,49,91,.5)]">Per</p>
                <input
                  type="text"
                  placeholder="Payment Type"
                  value={item.category}
                  name="category"
                  onChange={(e) => changePrice(e, index)}
                  className="w-full py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-sm text-[rgba(1,49,91,.7)]"
                />

                <div className="flex items-center text-[rgba(1,49,91,1)]">
                  {index === priceNum.length - 1 ? (
                    <AiOutlinePlus
                      className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-2xl cursor-pointer"
                      onClick={() => handlePrice("add")}
                    />
                  ) : (
                    <AiOutlineMinus
                      className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-2xl cursor-pointer"
                      onClick={() => handlePrice("minus")}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Images */}
          <div>
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">Images</p>
            <label className="relative flex items-center cursor-pointer">
              <span className="absolute h-full flex items-center px-5 pr-3 text-sm text-[rgba(1,49,91,.6)] bg-[rgba(1,49,91,.1)] rounded-l-lg">
                Choose Files
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={handleImage}
                className="pl-20 cursor-pointer"
              />
            </label>
            <div className="flex items-center space-x-1 pt-2 text-xs text-[rgba(1,49,91,.5)]">
              <FaInfoCircle />{" "}
              <p>Leave blank if you don’t want to replace images</p>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full flex flex-col space-y-5 max-w-[440px]">
          {/* Amenities */}
          <div className="max-h-[150px] overflow-y-scroll">
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">
              Amenity
            </p>
            {amenities.map((item, index) => (
              <div
                className="flex items-center space-x-5 mb-5 text-[rgba(1,49,91,1)]"
                key={index}
              >
                <textarea
                  placeholder="Amenity"
                  value={item}
                  onChange={(e) => changeAmenities(e, index)}
                  className="w-full py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-sm text-[rgba(1,49,91,.7)] resize-y"
                />
                <div className="flex items-center text-[rgba(1,49,91,1)]">
                  {index === amenities.length - 1 ? (
                    <AiOutlinePlus
                      className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-2xl cursor-pointer"
                      onClick={() => handleAmenity("add")}
                    />
                  ) : (
                    <AiOutlineMinus
                      className="p-2 rounded-full border border-[rgba(1,49,91,1)] text-2xl cursor-pointer"
                      onClick={() => handleAmenity("minus")}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <Categories
            value={category}
            setValue={setCategory}
            changeErr={changeErr}
            id="2"
          />

          {/* Validity */}
          <div>
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">
              Validity
            </p>
            <input
              type="date"
              min={moment(new Date()).format("YYYY-MM-DD")}
              value={data.validity}
              name="validity"
              onChange={handleChange}
              className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
            />
          </div>

          {/* City & Country */}
          <div>
            <p className="capitalize text-sm text-[rgba(1,49,91,.9)]">
              City & Country
            </p>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
              <input
                type="text"
                placeholder="City"
                value={data.city}
                name="city"
                onChange={handleChange}
                className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
              />
              <input
                type="text"
                placeholder="Country"
                value={data.country}
                name="country"
                onChange={handleChange}
                className="w-full text-sm py-2.5 px-5 rounded-lg border border-[rgba(1,49,91,.5)] text-[rgba(1,49,91,.7)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="w-full flex items-center justify-end">
        <input
          type="submit"
          value="Update"
          className="w-full bg-[rgba(113,242,139,.9)] hover:bg-[rgba(113,242,139,1)] 
        text-[rgba(1,49,91,1)] font-semibold py-2.5 px-5 rounded-lg cursor-pointer"
        />
      </div>
    </form>
  );
};

// export const Main = styled.form`
//   ${tw`relative w-full bg-white max-w-[300px] md:max-w-max space-y-5 p-5 rounded-lg`}
//   .flex-it {
//     ${tw`flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-10`}
//     > div {
//       ${tw`w-full max-w-none sm:max-w-[440px] flex flex-col space-y-5`}
//       p {
//         font-family: poppinsMedium;
//         ${tw`capitalize text-sm text-[rgba(1, 49, 91, .9)]`}
//       }
//       textarea,
//       input {
//         font-family: poppinsMedium;
//         ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
//         ::placeholder {
//           ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
//         }
//       }
//       textarea {
//         ${tw`w-full`}
//         resize: vertical;
//       }
//       .amenities {
//         ${tw`max-h-[150px] overflow-y-scroll`}
//       }
//     }
//   }
//   .flex-row {
//     ${tw`flex-row`}
//   }
//   .file {
//     ${tw``}
//     label {
//       ${tw`relative flex items-center`}
//       span {
//         font-family: poppinsMedium;
//         ${tw`absolute h-full text-center text-sm flex items-center px-5 pr-3 text-[rgba(1, 49, 91, .6)] bg-[rgba(1, 49, 91, .1)] rounded-l-lg`}
//       }
//       input {
//         ${tw`bg-white cursor-pointer`}
//         ::file-selector-button {
//           ${tw`cursor-pointer pl-8 `}
//           opacity: 0;
//         }
//       }
//     }
//     .info {
//       ${tw`flex items-center space-x-1 pt-2`}
//       p {
//         ${tw`text-xs text-[rgba(1, 49, 91, .5)]`}
//       }
//       .info-icon {
//         ${tw`text-xs text-[rgba(1, 49, 91, .7)]`}
//       }
//     }
//   }
//   .lined-up-now {
//     ${tw`flex flex-col md:flex-row items-start space-y-5 md:items-center md:space-y-0 space-x-0 md:space-x-5 `}
//   }
//   .lined-up {
//     ${tw`text-[rgba(1, 49, 91, 1)] flex items-center space-x-5 mb-5`}
//     > input {
//       ${tw``}
//     }

//     p {
//       ${tw`p-2 text-[rgba(1, 49, 91, .5)]`}
//     }
//     .div-icon-add {
//       ${tw`flex items-center text-[rgba(1, 49, 91, 1)]`}
//     }
//     .icon-add {
//       ${tw`p-2 rounded-full border-solid border border-[rgba(1, 49, 91, 1)] text-[rgba(1, 49, 91, 1)] text-4xl `}
//     }
//   }
//   .header {
//     ${tw`flex flex-row justify-between items-center py-1`}
//     p {
//       font-family: poppinsMedium;
//       ${tw`text-darkBlue text-base`}
//     }
//     .icon {
//       ${tw`text-darkBlue text-base`}
//     }
//   }
//   .submit {
//     ${tw`w-full flex items-center justify-end`}
//     input {
//       font-family: poppinsMedium;
//       ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
//       ::placeholder {
//         ${tw`text-sm text-[rgba(1, 49, 91, .5)]`}
//       }
//       ${tw`cursor-pointer bg-green border-none text-darkBlue w-full hover:bg-[rgba(113, 242, 139, .9)]`}
//     }
//   }
//   .update-message {
//     ${tw`py-5 border border-[rgba(0,0,0,.2)] border-solid w-3/4 min-w-[200px] flex items-center rounded-lg bg-white absolute top-1/2 left-1/2`}
//     transform:translate(-50%, -50%);
//   }
// `;
