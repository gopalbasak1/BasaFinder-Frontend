"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const FilterSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for filter options fetched from the backend
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[];
    divisions: string[];
    districts: Record<string, string[]>; // Fixing the type here
  }>({
    categories: [],
    divisions: [],
    districts: {}, // Now correctly typed
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for selected filters
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    rentalAmount: searchParams.get("rentAmount") || "",
    division: searchParams.get("division") || "",
    district: searchParams.get("district") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  });

  // Fetch filter options dynamically from the backend
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/all-listings/filters`
        );

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched filter data:", data); // Debugging log

        setFilterOptions({
          categories: data.categories || [],
          divisions: data.divisions || [],
          districts: data.districts || {}, // Expecting { divisionName: ["district1", "district2"] }
        });

        setLoading(false);
      } catch (error) {
        setError("Failed to load filters. Please try again.");
        console.error("Error fetching filter options:", error);
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Reset district if division changes
    if (name === "division") {
      setFilters((prev) => ({
        ...prev,
        division: value,
        district: "", // Reset district when division changes
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Apply filters by updating the URL
  const applyFilters = () => {
    const query = new URLSearchParams(filters);
    router.push(`/all-listings?page=1&${query.toString()}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Filter Rentals</h2>

      {/* Show error message if API fails */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show loading state */}
      {loading ? (
        <p className="text-gray-500">Loading filters...</p>
      ) : (
        <>
          {/* Category Filter (Dynamic) */}
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">All Categories</option>
            {filterOptions.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Rent Amount Filter */}
          <input
            type="number"
            name="rentalAmount"
            value={filters.rentalAmount}
            onChange={handleChange}
            placeholder="Max Rent Amount"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Division Filter (Dynamic) */}
          <select
            name="division"
            value={filters.division}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">All Divisions</option>
            {filterOptions.divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>

          {/* District Filter (Depends on Selected Division) */}
          <select
            name="district"
            value={filters.district}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            disabled={!filters.division} // Disable until a division is selected
          >
            <option value="">All Districts</option>
            {filters.division &&
            filterOptions.districts[filters.division]?.length > 0 ? (
              filterOptions.districts[filters.division].map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))
            ) : (
              <option disabled>No Districts Available</option>
            )}
          </select>

          {/* Bedrooms Filter */}
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            placeholder="Min Bedrooms"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Apply Filters
          </button>
        </>
      )}
    </div>
  );
};

export default FilterSidebar;
