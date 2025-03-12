import AllRentalListingComponents from "@/components/modules/home/HeroSection/AllRentalListingComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Rental Listings - Find Your Perfect Home",
  description:
    "Browse all available rental listings and discover the home that suits your lifestyle. Filter by location, price, and more.",
};

const AllListingsPage = ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = searchParams?.page || "1"; // Extract page number from URL

  return (
    <div className="container mx-auto my-10 px-5">
      <AllRentalListingComponents page={page} />
    </div>
  );
};

export default AllListingsPage;
