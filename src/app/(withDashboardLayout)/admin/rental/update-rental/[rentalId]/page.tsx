import UpdateRentalFormByAdmin from "@/components/modules/Rental/admin/update-rental/UpdateRentalFormByAdmin";
import UpdateRentalForm from "@/components/modules/Rental/update-rental/UpdateRentalForm";
import { getSingleRental } from "@/services/Rental";

const UpdateRentalPage = async ({
  params,
}: {
  params: Promise<{ rentalId: string }>;
}) => {
  const { rentalId } = await params;
  console.log(rentalId);

  const { data: rental } = await getSingleRental(rentalId);
  console.log(rental);

  return (
    <div className="flex justify-center items-center">
      <UpdateRentalFormByAdmin rental={rental} />
    </div>
  );
};

export default UpdateRentalPage;
