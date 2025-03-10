import HeroSection from "@/components/modules/home/HeroSection";
import HomePages from "@/components/modules/home/HeroSection";
import Banner from "@/components/modules/home/HeroSection/Banner";
import { useUser } from "@/context/UserContext";
import { getAllRentalListing } from "@/services/Rental";

const HomePage = async () => {
  const rentals = await getAllRentalListing();
  console.log(rentals);
  return (
    <div className="container mx-auto">
      <Banner />
      <HeroSection rentals={rentals} />
    </div>
  );
};

export default HomePage;
