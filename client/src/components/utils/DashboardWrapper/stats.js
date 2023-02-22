import { FaUsers, FaCheckCircle} from "react-icons/fa"
import { AiOutlineFileProtect } from "react-icons/ai"
import {IoIosWarning} from "react-icons/io"
export const statsData = [
  {
    icon: <FaUsers />,
    text: 200,
    title: "users",
    color: "#8A9AEA",
  },
  {
    icon: <AiOutlineFileProtect />,
    text: 200,
    title: "bookings",
    color: "#E87FA0",
  },
  {
    icon: <FaCheckCircle />,
    text: 200,
    title: "successful",
    color: "#71F28B",
  },
  {
    icon: <IoIosWarning />,
    text: 200,
    title: "failed",
    color: "#01315B",
  },
];