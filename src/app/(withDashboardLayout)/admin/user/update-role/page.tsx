import ManageRoleAdmin from "@/components/modules/admin/user/manage-role";
import { getAllUsersByAdmin } from "@/services/User";

const UpdateRole = async () => {
  const { data, meta } = await getAllUsersByAdmin();
  console.log(data);
  return (
    <div>
      <ManageRoleAdmin users={data} meta={meta} />
    </div>
  );
};

export default UpdateRole;
