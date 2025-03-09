import ManageAdminRental from "@/components/modules/Rental/admin";
import { getAllRentalsByAdmin } from "@/services/Rental";

const RentalPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  //   const { data, meta } = await getAllRentalsByAdmin(page, "3");
  const { data, meta } = await getAllRentalsByAdmin(page);
  console.log(data);
  return (
    <div>
      <ManageAdminRental rentals={data} meta={meta} />
    </div>
  );
};

export default RentalPage;
