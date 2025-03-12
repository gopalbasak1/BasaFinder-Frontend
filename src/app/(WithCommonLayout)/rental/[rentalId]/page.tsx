import RentalDetailsComponentsPage from "@/components/modules/Rental/rental-details/RentalDetailsPageComponents";
import { getSingleRental } from "@/services/Rental";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { rentalId: string };
}): Promise<Metadata> {
  const { data: rental } = await getSingleRental(params.rentalId);

  return {
    title: rental?.holding
      ? `${rental.holding} - Rental Details`
      : "Rental Details",
    description:
      rental?.description ||
      "Find the best rental properties with all necessary details.",
    openGraph: {
      title: rental?.holding || "Rental Details",
      description:
        rental?.description ||
        "Explore rental property details with full specifications.",
      images: rental?.imageUrls?.length
        ? rental.imageUrls[0]
        : "/default-image.jpg",
    },
  };
}

const RentalDetailsPage = async ({
  params,
}: {
  params: { rentalId: string };
}) => {
  const { data: rental } = await getSingleRental(params.rentalId);

  return (
    <div>
      <RentalDetailsComponentsPage rental={rental} />
    </div>
  );
};

export default RentalDetailsPage;
