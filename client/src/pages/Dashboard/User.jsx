
import { ManageUser, UsersTable } from "../../components/userDashboard/index";
const User = () => {
  return (
    <section className="w-full h-[calc(100vh - 6rem)] flex flex-col space-y-5 p-5 pr-0">
      <ManageUser />
      <UsersTable />
    </section>
  );
};

export default User;
