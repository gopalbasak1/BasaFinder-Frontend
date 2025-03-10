import RentalDetailsComponentsPage from "@/components/modules/Rental/rental-details/RentalDetailsPageComponents";
import { getSingleRental } from "@/services/Rental";

const RentalDetailsPage = async ({
  params,
}: {
  params: Promise<{ rentalId: string }>;
}) => {
  const { rentalId } = await params;

  console.log(rentalId);

  const { data: rental } = await getSingleRental(rentalId);
  console.log(rental);
  return (
    <div>
      <div>
        <RentalDetailsComponentsPage rental={rental} />
      </div>
    </div>
  );
};

export default RentalDetailsPage;
