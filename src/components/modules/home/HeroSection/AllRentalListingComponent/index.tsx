import React from "react";
import RentalHouseCard from "../RentalHouseCard/RentalHouseCard";
import { RentalFormData } from "@/types";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import { getAllRentalListing } from "@/services/Rental";

const AllRentalListingComponents = async () => {
  const rental = await getAllRentalListing();
  return (
    <div className="flex gap-8 my-10">
      <div className="w-full max-w-sm">{/* <FilterSidebar /> */}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rental?.data?.map((rental: RentalFormData) => (
          <RentalHouseCard key={rental?._id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default AllRentalListingComponents;
