import LandlordChart from "@/components/modules/Rental/chart/LandlordChart";
import { getAllRentals } from "@/services/Rental";
import { getAllRentalRequestByLandlord } from "@/services/Request";

const LandlordDashboard = async () => {
  try {
    // Fetch rental data
    const rentalResponse = await getAllRentals(undefined, "100");
    const requestResponse = await getAllRentalRequestByLandlord();

    const rentals = rentalResponse?.data || [];
    const rentalsMeta = rentalResponse?.meta || null;
    const rentalRequests = requestResponse?.data || [];

    return (
      <div className="p-5">
        {rentals.length === 0 && rentalRequests.length === 0 ? (
          <p className="text-center text-gray-500">No data found.</p>
        ) : (
          <LandlordChart
            rentals={rentals}
            rentalsMeta={rentalsMeta}
            rentalRequests={rentalRequests}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching landlord data:", error);
    return (
      <div className="p-5 text-center text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }
};

export default LandlordDashboard;
