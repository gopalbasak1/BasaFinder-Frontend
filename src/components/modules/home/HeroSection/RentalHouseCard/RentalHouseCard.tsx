import { RentalFormData } from "@/types";
import Link from "next/link";

const RentalHouseCard = ({ rental }: { rental: RentalFormData }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg border dark:bg-gray-900 dark:text-white bg-white">
      {/* Image Section */}
      <div className="relative group">
        <img
          src={rental?.imageUrls?.[0] || "/placeholder.jpg"}
          alt="House Image"
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 bg-[#2a2626] hover:bg-violet-500 text-white px-3 py-1 text-sm font-semibold rounded-md shadow-md">
          ৳{rental.rentAmount}/month
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title & Location */}
        <h2 className="text-md font-bold truncate hover:text-violet-600 transition-colors duration-300">
          {rental.holding}, {rental.address}
        </h2>
        <span className="text-lg font-bold">{rental.district}</span>
        <p className="text-gray-600 text-sm line-clamp-2 pt-2">
          {rental.description}
        </p>

        {/* Features Section */}
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 mt-2">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold">
              {rental.bedrooms} Bedrooms
            </span>
          </div>
          <div className="flex items-center space-x-1"></div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link href={`/rental/${rental._id}`}>
            <button className="w-full py-2 text-center font-semibold bg-violet-600 text-white rounded-lg transition duration-300 hover:bg-violet-700 transform hover:scale-105">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalHouseCard;
