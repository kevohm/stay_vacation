import { IoGrid } from "react-icons/io5";
import { FaUsers, FaHome } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md"
import { HiDocumentReport } from "react-icons/hi"
import {AiTwotoneReconciliation} from "react-icons/ai"
export const sidebarData = [
  {
    text: "dashboard",
    icon: <IoGrid />,
    url: "/admin/",
  },
  {
    text: "users",
    icon: <FaUsers />,
    url: "/admin/users",
  },
  {
    text: "bookings",
    icon: <MdLibraryBooks />,
    url: "/admin/bookings",
  },
  {
    text: "reports",
    icon: <HiDocumentReport />,
    url: "/admin/reports",
  },
  {
    text: "payments",
    icon: <AiTwotoneReconciliation />,
    url: "/admin/payments",
  },
  {
    text: "home",
    icon: <FaHome />,
    url: "/",
  },
];