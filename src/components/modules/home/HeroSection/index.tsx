import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const [search, setSearch] = useState({
    location: "",
    price: "",
    bedrooms: "",
  });

  const handleSearch = () => {
    // Redirect to search results page with query params
    router.push(
      `/search?location=${search.location}&price=${search.price}&bedrooms=${search.bedrooms}`
    );
  };

  return (
    <section className="bg-gray-100 py-12 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Find Your Perfect Rental House Today!
        </h1>
        <Button className="mb-6" onClick={() => router.push("/list-house")}>
          Post Rental House Info
        </Button>
        <div className="grid md:grid-cols-3 gap-4 bg-white p-5 rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="Location"
            value={search.location}
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={search.price}
            onChange={(e) => setSearch({ ...search, price: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Bedrooms"
            value={search.bedrooms}
            onChange={(e) => setSearch({ ...search, bedrooms: e.target.value })}
          />
          <Button className="col-span-3" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

const RentalHouseCard = ({ house }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={house.imageUrls[0]}
        alt="House"
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">
        {house.address}, {house.district}
      </h2>
      <p className="text-gray-600 text-sm">{house.description}</p>
      <div className="mt-3">
        <p className="font-bold">Rent: ৳{house.rentAmount}</p>
        <p className="text-sm">Bedrooms: {house.bedrooms}</p>
      </div>
      <Button
        className="mt-4 w-full"
        onClick={() => router.push(`/house/${house.holding}`)}
      >
        View Details
      </Button>
    </div>
  );
};

const RentalHouseList = ({ houses }) => {
  return (
    <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {houses.map((house) => (
        <RentalHouseCard key={house.holding} house={house} />
      ))}
    </div>
  );
};

export default function HomePages({ houses }) {
  return (
    <>
      <HeroSection />
      <RentalHouseList houses={houses} />
    </>
  );
}
