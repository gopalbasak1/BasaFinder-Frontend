import RentalDetailsComponentsPage from "@/components/modules/Rental/rental-details/RentalDetailsPageComponents";
import { getSingleRental } from "@/services/Rental";

const RentalDetailsPage = async ({
  params,
}: {
  params: Promise<{ rentalId: string }>;
}) => {
  const { rentalId } = await params;
  const { data: rental } = await getSingleRental(rentalId);

  return (
    <div>
      <RentalDetailsComponentsPage rental={rental} />
    </div>
  );
};

export default RentalDetailsPage;
