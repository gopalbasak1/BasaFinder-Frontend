"use client";
import React, { useEffect, useState } from "react";
import RentalHouseCard from "../RentalHouseCard/RentalHouseCard";
import { RentalFormData } from "@/types";
import { getAllRentalListing } from "@/services/Rental";
import { Slider } from "@/components/ui/slider";

const AllRentalListingComponents = ({ page }: { page: string }) => {
  const [allRentals, setAllRentals] = useState<RentalFormData[]>([]);
  const [filteredData, setFilteredData] = useState<RentalFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filters
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [rentRange, setRentRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    const fetchAllRentals = async () => {
      setIsLoading(true);
      try {
        let allFetchedData: RentalFormData[] = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const data = await getAllRentalListing(currentPage.toString());
          allFetchedData = [...allFetchedData, ...data?.data];
          totalPages = data?.meta?.totalPage;
          currentPage++;
        }

        // Convert rentAmount to numbers (Ensure numeric values)
        allFetchedData = allFetchedData.map((r) => ({
          ...r,
          rentAmount: Number(r.rentAmount) || 0, // Convert to number, default 0 if undefined
        }));

        setAllRentals(allFetchedData);
        setFilteredData(allFetchedData);

        // Set initial rent range dynamically based on fetched data
        if (allFetchedData.length) {
          const minRent = Math.min(...allFetchedData.map((r) => r.rentAmount));
          const maxRent = Math.max(...allFetchedData.map((r) => r.rentAmount));
          setRentRange([minRent, maxRent]);
        }
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRentals();
  }, []);

  useEffect(() => {
    let filtered = [...allRentals];

    if (selectedDistrict) {
      filtered = filtered.filter(
        (rental) => rental.district === selectedDistrict
      );
    }
    if (selectedDivision) {
      filtered = filtered.filter(
        (rental) => rental.division === selectedDivision
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (rental) => rental.category === selectedCategory
      );
    }

    // Apply rent range filter with debug logs
    filtered = filtered.filter((rental) => {
      const rent = Number(rental.rentAmount) || 0;
      return rent >= rentRange[0] && rent <= rentRange[1];
    });

    setFilteredData(filtered);
  }, [
    selectedDistrict,
    selectedDivision,
    selectedCategory,
    rentRange,
    allRentals,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!filteredData.length) return <p>No listings found</p>;

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Find Your Perfect Rental House Today!
        </h1>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="border p-2 w-full rounded-md"
        >
          <option value="">All Divisions</option>
          {[...new Set(allRentals.map((rental) => rental.division))].map(
            (division) => (
              <option key={division} value={division}>
                {division}
              </option>
            )
          )}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border p-2 w-full rounded-md"
        >
          <option value="">All Districts</option>
          {[...new Set(allRentals.map((rental) => rental.district))].map(
            (district) => (
              <option key={district} value={district}>
                {district}
              </option>
            )
          )}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 w-full rounded-md"
        >
          <option value="">All Categories</option>
          {[...new Set(allRentals.map((rental) => rental.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {/* Rent Range Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Rent Range (৳)</label>
        <Slider
          value={rentRange}
          onValueChange={(value) => setRentRange([value[0], value[1]])}
          min={Math.min(...allRentals.map((r) => r.rentAmount), 0)}
          max={Math.max(...allRentals.map((r) => r.rentAmount), 100000)}
          step={1000}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>৳{rentRange[0]}</span>
          <span>৳{rentRange[1]}</span>
        </div>
      </div>

      {/* Rental Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedData.length > 0 ? (
          paginatedData.map((rental) => (
            <RentalHouseCard key={rental._id} rental={rental} />
          ))
        ) : (
          <p>No rentals match your search.</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 my-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-5 py-2.5 flex items-center gap-2 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-md hover:from-violet-600 hover:to-violet-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅️ Prev
        </button>

        <span className="flex items-center gap-2 text-lg font-semibold">
          Page
          <span className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
            {currentPage}
          </span>
          of
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
            {totalPages}
          </span>
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-5 py-2.5 flex items-center gap-2 text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-md hover:from-violet-600 hover:to-violet-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default AllRentalListingComponents;
