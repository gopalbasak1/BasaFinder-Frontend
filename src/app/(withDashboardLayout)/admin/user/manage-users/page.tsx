import ManageUsersByAdmin from "@/components/modules/admin/user";
import { getAllUsersByAdmin } from "@/services/User";

const ManageUsers = async () => {
  const { data, meta } = await getAllUsersByAdmin();
  //console.log(data);
  return (
    <div>
      <ManageUsersByAdmin users={data} meta={meta} />
    </div>
  );
};

export default ManageUsers;
