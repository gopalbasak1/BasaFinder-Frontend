"use client";
import { Button } from "@/components/ui/button";
import RentalRequestModal from "@/components/ui/core/BFModel/RentalRequestModal";
import { RentalFormData } from "@/types";
import { Star, MapPin, Bed, CheckCircle, CalendarCheck } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const RentalDetailsComponentsPage = ({
  rental,
}: {
  rental: RentalFormData;
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    rental?.imageUrls?.[0] || ""
  );
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  console.log(rental);
  return (
    <div className="max-w-5xl mx-auto p-5 bg-white shadow-md rounded-md">
      {/* Image Gallery & Rental Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div>
          <Image
            src={selectedImage || "/fallback-image.jpg"}
            alt="Rental image"
            width={500}
            height={500}
            className="rounded-md w-full object-cover h-80"
          />
          <div className="grid grid-cols-3 gap-4 mt-3">
            {rental?.imageUrls?.map((image: string, idx: number) => (
              <Image
                key={idx}
                src={image || "fallback-image.jpg"}
                alt="rental image"
                width={150}
                height={150}
                className={`rounded-md w-full object-cover h-24 cursor-pointer border ${
                  selectedImage === image
                    ? "border-violet-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Rental Info */}
        <div className="p-4">
          <h2 className="font-bold text-2xl mb-2">
            {rental?.holding} - {rental?.address}
          </h2>
          <p className="font-bold">Unit: {rental?.unitNumber}</p>
          <p className="text-gray-500">{rental?.description}</p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-5 h-5 text-violet-500" />
            <span>
              {rental?.citycorporation}, {rental?.district}, {rental?.division},{" "}
              {rental?.postalCode}
            </span>
          </div>

          {/* Rent Price & Bedrooms */}
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-4">
            <p className="text-lg font-semibold text-violet-600">
              ৳ {rental?.rentAmount} / month
            </p>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-gray-600" />
              <span>{rental?.bedrooms} Bedrooms</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="grid grid-cols-2 gap-2 text-gray-600">
              {rental?.keyFeatures?.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings */}
          {/* <div className="mt-4 flex items-center gap-2 text-gray-600">
            <Star className="w-5 h-5 text-orange-400" />
            <span>
              {rental?.averageRating} Ratings ({rental?.ratingCount} Reviews)
            </span>
          </div> */}
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-gray-50 p-4 rounded-md mt-6">
        <h3 className="font-semibold text-lg mb-3">Specifications:</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          {Object.entries(rental?.specification || {}).map(
            ([key, value], idx) => (
              <p key={idx}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {String(value)}
              </p>
            )
          )}

          <p>
            <strong>Available From:</strong>{" "}
            <span className="font-medium text-yellow-800">
              {rental?.availableFrom
                ? new Date(rental?.availableFrom).toDateString()
                : "N/A"}
            </span>
          </p>
          <p>
            <strong>Category:</strong> {rental?.category}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        {rental?.isAvailable ? (
          <Button className="w-1/2" onClick={() => setIsRequestModalOpen(true)}>
            Request Rental
          </Button>
        ) : (
          <Button className="bg-red-500 font-semibold w-1/2">Booked</Button>
        )}
      </div>

      {/* Rental Request Modal */}
      {isRequestModalOpen && (
        <RentalRequestModal
          rental={rental}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RentalDetailsComponentsPage;
