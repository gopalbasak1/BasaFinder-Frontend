import PaymentDetails from "@/components/modules/admin/payment/PaymentDetails";
import { getAllRentalRequestByAdmin } from "@/services/Request";
import { RentalFormData } from "@/types";

const PaymentPage = async () => {
  const { data, meta } = await getAllRentalRequestByAdmin();
  // Filter only paid rentals
  const paidRentals = data.filter(
    (payment: RentalFormData) => payment.paymentStatus === "paid"
  );
  return (
    <div>
      <PaymentDetails payment={paidRentals} meta={meta} />
    </div>
  );
};

export default PaymentPage;
