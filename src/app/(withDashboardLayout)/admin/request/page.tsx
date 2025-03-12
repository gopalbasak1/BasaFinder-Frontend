import ManageRequest from "@/components/modules/admin/request/ManageRequest";
import { getAllRentalRequestByAdmin } from "@/services/Request";

const RequestPage = async () => {
  const { data } = await getAllRentalRequestByAdmin();

  return (
    <div>
      <ManageRequest requests={data} />
    </div>
  );
};

export default RequestPage;
