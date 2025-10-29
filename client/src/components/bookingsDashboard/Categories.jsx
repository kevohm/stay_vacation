// import React, { useEffect, useState } from "react";
// import { useGlobal } from "../../context/AppContext";
// import { BiLoaderAlt } from "react-icons/bi";
// import { FaPlus, FaEdit, FaTimes } from "react-icons/fa";
// import { Category } from "./Category";

// export const Categories = ({ value, setValue, changeErr, id = "1" }) => {
//   const { state, getCategories, addCategory, updateCategory, dispatch } =
//     useGlobal();
//   const [newCategory, setNewCategory] = useState("");
//   const [category, setCategory] = useState({});
//   const [update, setUpdate] = useState({ status: false, data: "", id: "" });

//   const changeCategory = (index, val) => {
//     setCategory({ ...category, [`${index}`]: val });
//   };

//   const handleChange = (val, checked, index) => {
//     let arr = category;
//     if (checked) {
//       arr[index] = val;
//       setCategory(arr);
//       setValue(Object.values(arr));
//     } else {
//       delete arr[index];
//       setCategory(arr);
//       setValue(Object.values(arr));
//     }
//   };

//   const changeUpdate = (e) => {
//     setUpdate({ ...update, data: e.target.value });
//   };

//   const changeCurrent = (e) => setNewCategory(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newCategory) {
//       return changeErr({ msg: "Please provide the required data", show: true });
//     }
//     addCategory({ name: newCategory });
//     setNewCategory("");
//   };

//   const submitUpdate = (e) => {
//     e.preventDefault();
//     if (!update.data) {
//       return changeErr({ msg: "Please provide the required data", show: true });
//     }
//     updateCategory(update.id, update.data).then(() =>
//       setUpdate({ data: "", id: "", status: false })
//     );
//   };

//   const fetchCategories = () => {
//     getCategories().then((res) => {
//       const { categories } = res.data;
//       let obj = {};
//       categories.forEach((i, index) => {
//         if (value.includes(i._id)) obj[index] = i._id;
//       });
//       dispatch({ type: "SET_EVENT_CATEGORY", payload: { categories } });
//       setCategory(obj);
//     });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   if (state.event_category.loading) {
//     return (
//       <div className="flex items-center justify-center w-full py-3 px-5 text-sm rounded-lg border border-[#01315b80] text-[#01315bb3]">
//         <p>Loading categories</p>
//         <BiLoaderAlt className="animate-spin text-[#01315b4d] ml-2" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full flex flex-wrap">
//       {update.status && (
//         <div className="absolute top-0 left-0 z-40 bg-white w-full h-[140px] rounded-lg border border-dark-blue p-3 flex flex-col space-y-2 items-center">
//           <div className="flex items-center justify-end w-full py-2">
//             <FaTimes
//               className="text-sm text-dark-blue cursor-pointer"
//               onClick={() => setUpdate({ ...update, status: false })}
//             />
//           </div>
//           <input
//             type="text"
//             className="p-2 text-xs border rounded-sm"
//             placeholder="Type here"
//             value={update.data}
//             onChange={changeUpdate}
//           />
//           <button
//             className="p-2 bg-green text-dark-blue w-full rounded-lg"
//             onClick={submitUpdate}
//           >
//             Update
//           </button>
//         </div>
//       )}

//       {state.event_category.data.map((i, index) => (
//         <Category
//           key={i._id}
//           id={id}
//           {...i}
//           index={index}
//           value={value}
//           setUpdate={setUpdate}
//           handleChange={handleChange}
//         />
//       ))}

//       <div className="flex items-center space-x-2 mt-2 mr-2">
//         <input
//           type="text"
//           className="w-[100px] py-2 px-2.5 text-sm border rounded-sm"
//           placeholder="Type here"
//           value={newCategory}
//           onChange={changeCurrent}
//         />
//         <button
//           className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-white text-orange border border-orange hover:bg-orange hover:text-white transition"
//           onClick={handleSubmit}
//         >
//           <FaPlus className="text-xs" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const MainLoad = styled.div`
//   .loader {
//     ${tw`flex space-x-2 rounded-lg items-center justify-center`}
//     ${tw`w-full text-sm py-2.5 px-5 rounded-lg border border-solid text-[rgba(1, 49, 91, .7)] border-[rgba(1, 49, 91, .5)]`}
//     .icon {
//       ${tw`animate-spin text-[rgba(1, 49, 91, .3)]`}
//     }
//   }
// `;

// const Main = styled.div`
//   ${tw`relative w-full flex flex-wrap`}
//   .update-popup {
//     ${tw`bg-white flex flex-col space-y-2 items-center top-0 left-0 w-full h-[140px] rounded-lg absolute z-40 p-3 border border-dark-blue border-solid`}
//     >div {
//       ${tw`w-full flex items-center py-2 justify-end`}
//       .icon {
//         ${tw`text-sm text-dark-blue`}
//       }
//     }
//     > input {
//       ${tw`p-2 text-xs`}
//       :placeholder {
//         ${tw`text-xs`}
//       }
//     }
//     button {
//       ${tw`p-2 w-full rounded-lg bg-green text-dark-blue border-none cursor-pointer`}
//     }
//   }
//   .add {
//     ${tw`flex items-center justify-start mr-2 mt-2 space-x-2`}
//     >input {
//       font-family: poppins;
//       ${tw`w-[100px] py-2 px-2.5 text-sm`}
//       ::placeholder {
//         font-family: poppins;
//         ${tw`text-sm`}
//       }
//     }
//     > button {
//       ${tw`w-[25px] hover:bg-orange text-orange hover:text-white h-[25px] flex items-center justify-center rounded-full bg-white border border-solid border-orange`}
//       .icon {
//         ${tw`text-xs`}
//       }
//     }
//   }
// `;

// // `
// // input{
// //     ${tw`text-orange border-orange border border-solid`}
// //     appearance: none;
// //     background-color: #fff;
// //     margin: 0;
// //     font: inherit;
// //     width: 10px;
// //     height: 10px;
// //     transform: translateY(-0.075em);
// //     display: grid;
// //     place-content: center;
// //   }
// //   input::before {
// //     content: "✔";
// //     ${tw`text-lg`}
// //     transform: scale(0);
// //     transition: 120ms transform ease-in-out;
// //   }

// //   input:checked::before {
// //     transform: scale(1);
// //   }
// // }
// // `



import React, { useEffect, useState } from "react";
import { useGlobal } from "../../context/AppContext";
import { BiLoaderAlt } from "react-icons/bi";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Category } from "./Category";

export const Categories = ({ value, setValue, changeErr, id = "1" }) => {
  const { state, getCategories, addCategory, updateCategory, dispatch } =
    useGlobal();
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState({});
  const [update, setUpdate] = useState({ status: false, data: "", id: "" });

  const changeCategory = (index, val) => {
    setCategory({ ...category, [`${index}`]: val });
  };

  const handleChange = (val, checked, index) => {
    let arr = category;
    if (checked) {
      arr[index] = val;
    } else {
      delete arr[index];
    }
    setCategory({ ...arr });
    setValue(Object.values(arr));
  };

  const changeUpdate = (e) => setUpdate({ ...update, data: e.target.value });

  const changeCurrent = (e) => setNewCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory) {
      return changeErr({ msg: "Please provide data", show: true });
    }
    addCategory({ name: newCategory });
    setNewCategory("");
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    if (!update.data) {
      return changeErr({ msg: "Please provide data", show: true });
    }
    updateCategory(update.id, update.data).then(() =>
      setUpdate({ data: "", id: "", status: false })
    );
  };

  const fetchCategories = () => {
    getCategories().then((res) => {
      const { categories } = res.data;
      let obj = {};
      categories.forEach((i, index) => {
        if (value.includes(i._id)) obj[index] = i._id;
      });
      dispatch({ type: "SET_EVENT_CATEGORY", payload: { categories } });
      setCategory(obj);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (state.event_category.loading) {
    return (
      <div className="flex items-center justify-center w-full py-3 px-5 text-sm rounded-lg border border-[#01315b80] text-[#01315bb3]">
        <p>Loading categories</p>
        <BiLoaderAlt className="animate-spin text-[#01315b4d] ml-2" />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-wrap">
      {/* UPDATE POPUP */}
      {update.status && (
        <div className="absolute top-0 left-0 z-40 bg-white w-full h-[140px] rounded-lg border border-dark-blue p-3 flex flex-col space-y-2 items-center shadow-md">
          <div className="flex items-center justify-end w-full py-2">
            <FaTimes
              className="text-sm text-dark-blue cursor-pointer"
              onClick={() => setUpdate({ ...update, status: false })}
            />
          </div>
          <input
            type="text"
            className="p-2 text-xs border rounded-sm w-full"
            placeholder="Type here"
            value={update.data}
            onChange={changeUpdate}
          />
          <button
            className="p-2 bg-green text-dark-blue w-full rounded-lg"
            onClick={submitUpdate}
          >
            Update
          </button>
        </div>
      )}

      {/* CATEGORY LIST */}
      {state.event_category.data.map((i, index) => (
        <Category
          key={i._id}
          id={id}
          {...i}
          index={index}
          value={value}
          setUpdate={setUpdate}
          handleChange={handleChange}
        />
      ))}

      {/* ADD NEW CATEGORY */}
      <div className="flex items-center space-x-2 mt-2 mr-2">
        <input
          type="text"
          className="w-[100px] py-2 px-2.5 text-sm border rounded-sm"
          placeholder="Type here"
          value={newCategory}
          onChange={changeCurrent}
        />
        <button
          className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-white text-orange border border-orange hover:bg-orange hover:text-white transition"
          onClick={handleSubmit}
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

