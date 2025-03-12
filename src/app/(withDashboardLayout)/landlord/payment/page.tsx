import ManagePayment from "@/components/modules/payment";
import { getAllRentalRequestByLandlord } from "@/services/Request";
import { RentalFormData } from "@/types";

const PaymentPage = async () => {
  const { data, meta } = await getAllRentalRequestByLandlord();

  // Filter only paid rentals
  const paidRentals = data.filter(
    (rental: RentalFormData) => rental.paymentStatus === "paid"
  );

  return (
    <div>
      <ManagePayment rentals={paidRentals} meta={meta} />
    </div>
  );
};

export default PaymentPage;
