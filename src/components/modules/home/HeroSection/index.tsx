"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import RentalHouseCard from "./RentalHouseCard/RentalHouseCard";
import { RentalFormData } from "@/types";

// Define the type for rental data response
interface RentalResponse {
  data: RentalFormData[];
}

const HeroSection = ({ rentals }: { rentals: RentalResponse }) => {
  const router = useRouter();
  const [search, setSearch] = useState({
    location: "",
    price: "",
    bedrooms: "",
  });

  const handleSearch = () => {
    router.push(
      `/search?location=${search.location}&price=${search.price}&bedrooms=${search.bedrooms}`
    );
  };

  return (
    <section className="px-5 md:px-10 lg:px-20 py-10">
      {/* Hero Content */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Find Your Perfect Rental House Today!
        </h1>
        <Button className="mb-6" onClick={() => router.push("/list-house")}>
          Post Rental House Info
        </Button>
      </div>

      {/* Search Bar */}
      <div className=" p-5 rounded-lg shadow-md grid md:grid-cols-3 gap-4">
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

      {/* Rental Listings Section */}
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-3xl font-bold text-violet-700">Explore Rentals</h2>
        <Link href="/all-listings">
          <Button
            className="w-40 flex items-center justify-center gap-2 animate-move-right"
            variant="outline"
          >
            More Rentals <MoveRight className="transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Rental Grid */}
      {rentals?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {rentals.data.slice(0, 4).map((rental) => (
            <RentalHouseCard key={rental._id} rental={rental} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No rental properties available at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
