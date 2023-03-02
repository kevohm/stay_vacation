import React from "react";
import { UserForm } from "./UserForm";
import users from "../../assets/svg/users.svg";
import { ManageData } from "../smaller/frame/ManageData";
const ManageUser = () => {
  return <ManageData element={<UserForm />} img={users} />;
};

export default ManageUser;
