import RequestStatus from "@/components/modules/Request/Request-Status/RequestStatus";
import { getAllRentalRequestStatusByTenant } from "@/services/Request";

const RequestStatusPage = async () => {
  const { data, meta } = await getAllRentalRequestStatusByTenant();
  console.log(data);
  return (
    <div>
      <RequestStatus requests={data} meta={meta} />
    </div>
  );
};

export default RequestStatusPage;
