import TenantCart from "@/components/modules/tenant/chart/TenantCart";
import { getAllRentalRequestStatusByTenant } from "@/services/Request";

const TenantDashboard = async () => {
  const { data } = await getAllRentalRequestStatusByTenant();
  console.log(data);
  return (
    <div>
      <TenantCart requests={data} />
    </div>
  );
};

export default TenantDashboard;
