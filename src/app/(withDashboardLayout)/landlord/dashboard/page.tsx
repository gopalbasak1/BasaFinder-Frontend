import LandlordChart from "@/components/modules/Rental/chart/LandlordChart";
import { useUser } from "@/context/UserContext";
import { getAllRentals } from "@/services/Rental";
import { getAllRentalRequestByLandlord } from "@/services/Request";

const LandlordDashboard = async () => {
  // Fetch rental data
  const { data: rentals, meta: rentalsMeta } = await getAllRentals(
    undefined,
    "100"
  );

  const { data: rentalRequests, meta: rentalRequestsMeta } =
    await getAllRentalRequestByLandlord();

  return (
    <div className="p-5">
      <LandlordChart
        rentals={rentals}
        rentalsMeta={rentalsMeta}
        rentalRequests={rentalRequests}
      />
    </div>
  );
};

export default LandlordDashboard;
