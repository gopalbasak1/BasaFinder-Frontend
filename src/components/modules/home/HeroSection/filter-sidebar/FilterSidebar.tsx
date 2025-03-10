"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Import API functions (Update these with actual API calls)
// import { getAllDivisions } from "@/services/Division";
// import { getAllCategories } from "@/services/Category";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0, 500000]);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchFilters = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }, { data: divisionsData }] =
          // await Promise.all([getAllCategories(), getAllDivisions()]);

          setCategories(categoriesData);
        setDivisions(divisionsData);
      } catch (error) {
        console.error("Failed to fetch filters", error);
        toast.error("Failed to load filters.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const selectedDiv = divisions.find(
        (div) => div.name === selectedDivision
      );
      if (selectedDiv) setDistricts(selectedDiv.districts || []);
    } else {
      setDistricts([]);
    }
  }, [selectedDivision, divisions]);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(query, value.toString());
    } else {
      params.delete(query);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => router.push(pathname, { scroll: false })}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rent Amount</h2>
        <Slider
          min={0}
          max={500000}
          step={1000}
          defaultValue={[0, 500000]}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("rentAmount", `${value[0]}-${value[1]}`);
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">
          Selected Range: ৳{price[0]} - ৳{price[1]}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Category</h2>
        {!isLoading ? (
          <RadioGroup className="space-y-2">
            {categories?.map((category) => (
              <div key={category._id} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => handleSearchQuery("category", category.name)}
                  value={category.name}
                  id={category._id}
                />
                <Label
                  htmlFor={category._id}
                  className="text-gray-500 font-light"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      {/* Division Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Division</h2>
        {!isLoading ? (
          <select
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              handleSearchQuery("division", e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Division</option>
            {divisions?.map((division) => (
              <option key={division._id} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>
        ) : (
          <p>Loading divisions...</p>
        )}
      </div>

      {/* District Filter */}
      {selectedDivision && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">District</h2>
          <select
            onChange={(e) => handleSearchQuery("district", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select District</option>
            {districts?.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Rating Filter */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("rating", rating)}
                value={`${rating}`}
                id={`rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    size={18}
                    key={i}
                    fill={i < rating ? "orange" : "lightgray"}
                    stroke={i < rating ? "orange" : "lightgray"}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
