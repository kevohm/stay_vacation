// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FormError } from "../error/FormError";
// import { useGlobal } from "../../../context/AppContext";

// const initialData = {
//   email: "",
//   password: "",
//   confirm: "",
//   username: "",
//   phone_number: "",
// };

// const Form = () => {
//   const { handleUser, state, getUser, setForm } = useGlobal();
//   const [data, setData] = useState(initialData);
//   const { pathname } = useLocation();
//   const login = pathname === "/register/login";
//   const navigate = useNavigate();

//   const changeErr = (err) => setForm(err);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (login) {
//       const { email, password } = data;
//       handleUser({ email, password }, "login")
//         .then(() => {
//           getUser();
//           changeErr({
//             msg: "You are logged in. Redirecting...",
//             state: "success",
//             show: true,
//           });
//           setTimeout(() => navigate(-1), 3000);
//         })
//         .catch((error) => {
//           if (error.response?.data) {
//             changeErr({
//               msg: error.response.data.msg,
//               state: "",
//               show: true,
//             });
//           }
//         });
//     } else {
//       const { email, password, username, phone_number } = data;
//       handleUser({ email, password, username, phone_number }, "register")
//         .then(() => {
//           changeErr({
//             msg: "Successfully registered. Redirecting...",
//             state: "success",
//             show: true,
//           });
//           setTimeout(() => navigate("/register/login"), 3000);
//         })
//         .catch((error) => {
//           if (error.response?.data) {
//             changeErr({
//               msg: error.response.data.msg,
//               state: "",
//               show: true,
//             });
//           }
//         });
//     }
//   };

//   const changeData = (e) => {
//     const { value, name } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col items-center space-y-5 w-full max-w-md py-8 px-10 bg-white rounded-xl"
//       style={{
//         boxShadow: "0 4px 12px rgba(138, 154, 234, 0.25)",
//         borderTop: "6px solid #8a9aea",
//       }}
//     >
//       {/* Header */}
//       <h2 className="text-xl uppercase font-semibold text-dark-blue">
//         {login ? "Log In" : "Sign Up"}
//       </h2>

//       {/* Error */}
//       {state.user_form.show && (
//         <div className="w-full">
//           <FormError {...state.user_form} />
//         </div>
//       )}

//       {/* Inputs */}
//       <div className="flex flex-col w-full space-y-4">
//         <input
//           type="email"
//           placeholder="Email@gmail.com"
//           name="email"
//           value={data.email}
//           onChange={changeData}
//           className="w-full py-2 px-4 text-sm rounded-lg border border-light-blue text-gray-800 outline-hidden focus:border-dark-blue"
//           style={{ fontFamily: "poppinsSemi" }}
//         />
//         {!login && (
//           <>
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               value={data.username}
//               onChange={changeData}
//               className="w-full py-2 px-4 text-sm rounded-lg border border-light-blue text-gray-800 outline-hidden focus:border-dark-blue"
//               style={{ fontFamily: "poppinsSemi" }}
//             />
//             <input
//               type="text"
//               placeholder="Phone Number"
//               name="phone_number"
//               value={data.phone_number}
//               onChange={changeData}
//               className="w-full py-2 px-4 text-sm rounded-lg border border-light-blue text-gray-800 outline-hidden focus:border-dark-blue"
//               style={{ fontFamily: "poppinsSemi" }}
//             />
//           </>
//         )}
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={data.password}
//           onChange={changeData}
//           className="w-full py-2 px-4 text-sm rounded-lg border border-light-blue text-gray-800 outline-hidden focus:border-dark-blue"
//           style={{ fontFamily: "poppinsSemi" }}
//         />
//         {!login && (
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             name="confirm"
//             value={data.confirm}
//             onChange={changeData}
//             className="w-full py-2 px-4 text-sm rounded-lg border border-light-blue text-gray-800 outline-hidden focus:border-dark-blue"
//             style={{ fontFamily: "poppinsSemi" }}
//           />
//         )}
//       </div>

//       {/* Submit Button */}
//       <input
//         type="submit"
//         value={login ? "Login" : "Sign Up"}
//         className="w-full text-sm py-2 bg-dark-blue text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
//         style={{ fontFamily: "poppinsSemi" }}
//       />

//       {/* Footer Text */}
//       <p className="text-xs text-gray-600 text-center">
//         {login ? (
//           <>
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-dark-blue font-medium underline-offset-2 hover:underline"
//               style={{ fontFamily: "poppinsMedium" }}
//             >
//               Sign up
//             </Link>
//           </>
//         ) : (
//           <>
//             Already have an account?{" "}
//             <Link
//               to="/register/login"
//               className="text-dark-blue font-medium underline-offset-2 hover:underline"
//               style={{ fontFamily: "poppinsMedium" }}
//             >
//               Login
//             </Link>
//           </>
//         )}
//       </p>
//     </form>
//   );
// };

// export default Form;



import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export const SingleFag = ({ text, info, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5 py-3 w-full max-w-[800px] border border-dark-blue rounded-lg space-y-5 transition ease-in-out">
      <div className="flex items-center justify-between space-x-5">
        <div className="flex items-center space-x-5">
          <div className="w-[36px] h-[36px] bg-orange rounded-lg flex items-center justify-center text-white">
            {index}
          </div>
          <p className="text-dark-blue text-lg">{text}</p>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-[16px] cursor-pointer"
        >
          {open ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>

      {open && <p className="text-dark-blue text-base">{info}</p>}
    </div>
  );
};
