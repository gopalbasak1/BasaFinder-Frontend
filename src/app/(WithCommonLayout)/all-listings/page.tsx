import AllRentalListingComponents from "@/components/modules/home/HeroSection/AllRentalListingComponent";

const AllListingsPage = ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = searchParams?.page || "1"; // Extract page number from URL

  return (
    <div className="container mx-auto my-10">
      <AllRentalListingComponents page={page} />
    </div>
  );
};

export default AllListingsPage;
