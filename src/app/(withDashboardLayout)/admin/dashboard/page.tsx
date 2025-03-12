import AdminDashboardChart from "@/components/modules/admin/dashboard/cart/AdminDashboardChart";
import { getAllRentalsByAdmin } from "@/services/Rental";
import { getAllRentalRequestByAdmin } from "@/services/Request";
import { getAllUsersByAdmin } from "@/services/User";

const AdminDashboard = async () => {
  const { data: userData, meta: userMeta } = await getAllUsersByAdmin(
    undefined,
    "100"
  );
  const { data: rentalData, meta: rentalMeta } = await getAllRentalsByAdmin(
    undefined,
    "100"
  );
  const { data: requestData, meta: requestMeta } =
    await getAllRentalRequestByAdmin(undefined, "100");

  return (
    <div>
      <AdminDashboardChart
        userData={userData}
        rentalData={rentalData}
        requestData={requestData}
      />
    </div>
  );
};

export default AdminDashboard;
