import ManageRequest from "@/components/modules/Request";
import { getAllRentalRequestByLandlord } from "@/services/Request";

const RequestPage = async () => {
  const { data } = await getAllRentalRequestByLandlord();
  console.log(data);
  return (
    <div>
      <ManageRequest requests={data} />
    </div>
  );
};

export default RequestPage;
