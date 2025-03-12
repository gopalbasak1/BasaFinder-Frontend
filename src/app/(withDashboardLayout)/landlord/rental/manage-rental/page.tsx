import ManageRental from "@/components/modules/Rental";
import { getAllRentals } from "@/services/Rental";

const RentalPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllRentals(page);
  //console.log(data, meta);
  return (
    <div>
      <ManageRental rentals={data} meta={meta} />
    </div>
  );
};

export default RentalPage;
