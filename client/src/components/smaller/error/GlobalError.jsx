import React from "react";
import { MdNotificationsActive } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

export const GlobalError = ({ msg, type, show, close }) => {
  if (!show) return null;

  const isWarning = type === "warning";
  const isSuccess = type === "success";
  const colorClass = isWarning
    ? "text-red-600"
    : isSuccess
    ? "text-[#16a34a]"
    : "";

  return (
    <div
      className={`min-w-[200px] absolute top-[30px] left-[20px] sm:left-[40%] bg-white max-w-[400px] border-2 border-transparent flex flex-col space-y-2 rounded-lg p-5 z-50 shadow-[0px_4px_8px_rgba(0,0,0,0.15)]`}
    >
      {/* Header */}
      <div className="flex justify-between">
        <header className={`flex items-center space-x-2 text-sm ${colorClass}`}>
          <MdNotificationsActive className="text-sm" />
          <p>Notifications</p>
        </header>
        <div
          onClick={close}
          className="cursor-pointer flex items-center justify-center p-1"
        >
          <FaTimes className={`text-lg ${colorClass}`} />
        </div>
      </div>

      {/* Message */}
      <div className="relative text-sm">{msg}</div>
    </div>
  );
};

// const Main = styled.div`
//   ${tw`min-w-[200px] absolute top-[30px] left-[20px] sm:left-[40%] bg-white max-w-[400px] border-solid border-2 flex flex-col space-y-2 border-transparent rounded-lg p-5 z-50`}
//   box-shadow:0px 4px 8px rgba(0,0,0,.15);
//   .header {
//     ${tw`flex justify-between`}
//     >header {
//       ${(props) => props.type === "warning" && tw`text-red-600`}
//       ${(props) => props.type === "success" && tw`text-[#16a34a]`}
//         ${tw`flex items-center space-x-2 text-sm`}
//         .icon {
//         ${tw`text-sm`}
//       }
//     }
//     > div {
//       ${tw`cursor-pointer flex items-center justify-center p-1`}
//       .icon {
//         ${tw`text-lg`}
//         ${(props) => props.type === "warning" && tw`text-red-600`}
//             ${(props) => props.type === "success" && tw`text-[#16a34a]`}
//       }
//     }
//   }
//   .message {
//     ${tw`relative text-sm`}
//   }
// `;
