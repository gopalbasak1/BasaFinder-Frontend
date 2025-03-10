import AllRentalListingComponents from "@/components/modules/home/HeroSection/AllRentalListingComponent";

import { getAllRentalListing } from "@/services/Rental";
import { RentalFormData } from "@/types";

const AllListingsPage = () => {
  return (
    <div className="container mx-auto">
      <div className="">
        <AllRentalListingComponents />
      </div>
    </div>
  );
};

export default AllListingsPage;
