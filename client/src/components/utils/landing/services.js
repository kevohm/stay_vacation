import { FaCameraRetro, FaHotel, FaTrain, FaCar } from "react-icons/fa";
export const servicesData = [
  {
    title: "Day Trips",
    img: <FaCameraRetro />,
    text: "The users travel their dream location for a day.",
    color: "#8A9AEA",
    bg: "rgba(138, 154, 234, .3)",
  },
  {
    title: "Hotel Booking",
    img: <FaHotel />,
    text: "The users travel their dream location for a day.",
    color: "#71F28B",
    bg: "rgba(113, 242, 139, .3)",
  },
  {
    title: "SGR",
    img: <FaTrain />,
    text: "The users travel their dream location for a day.",
    color: "#E87FA0",
    bg: "rgba(232, 127, 160, .3)",
  },
  {
    title: "Car Rental",
    img: <FaCar />,
    text: "The users travel their dream location for a day.",
    color: "#FFA402",
    bg:"rgba(255, 164, 2, .3)"
  },
];
export const inputData = [
  {
    type: "text",
    placeholder: "Nairobi",
    name: "Location",
    title: "Location",
    error: false,
  },
  {
    type: "number",
    placeholder: "8",
    name: "Person",
    title: "Person",
    error: false,
  },
  {
    type: "number",
    placeholder: "10000",
    name: "Min",
    title: "Min price",
    error:false
  },
  {
    type: "number",
    placeholder: "10000",
    name: "Max",
    title: "Max price",
    error:false
  },
];