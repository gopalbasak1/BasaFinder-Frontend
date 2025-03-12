"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import RentalHouseCard from "./RentalHouseCard/RentalHouseCard";
import { RentalFormData } from "@/types";

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
    const params = new URLSearchParams();

    if (search.location.trim()) params.append("location", search.location);
    if (search.price) params.append("price", String(Number(search.price)));
    if (search.bedrooms)
      params.append("bedrooms", String(Number(search.bedrooms)));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="px-5 md:px-10 lg:px-20 py-10">
      {/* Rental Listings Section */}
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-3xl font-bold text-violet-700">Explore Rentals</h2>
        <Link href="/all-listings">
          <Button
            className="w-40 flex items-center justify-center gap-2 hover:bg-violet-600 transition duration-300"
            variant="outline"
            aria-label="View More Rentals"
          >
            More Rentals
            <MoveRight className="transition-transform group-hover:translate-x-1" />
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
