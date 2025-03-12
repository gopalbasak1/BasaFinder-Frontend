"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RentalFormData } from "@/types";
import { requestToRental } from "@/services/Request";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
// Import user authentication hook

interface RentalRequestModalProps {
  rental: RentalFormData;
  onClose: () => void;
}

const RentalRequestModal: React.FC<RentalRequestModalProps> = ({
  rental,
  onClose,
}) => {
  const { user } = useUser(); // Get logged-in user data
  const [moveInDate, setMoveInDate] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rentalDurationError, setRentalDurationError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Validate rental duration
  const validateRentalDuration = (value: string) => {
    if (!value || Number(value) < 1) {
      setRentalDurationError("Rental duration must be at least 1 month.");
    } else {
      setRentalDurationError("");
    }
    setRentalDuration(value);
  };

  // Check if form is valid
  const isFormValid =
    moveInDate &&
    rentalDuration &&
    !rentalDurationError &&
    specialRequest &&
    agreeTerms;

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields and agree to terms.");
      return;
    }
    setLoading(true);
    const requestData = {
      tenantId: user?._id, // Auto-populated user ID
      listingId: rental?._id, // Rental listing ID
      moveInDate,
      rentalDuration: Number(rentalDuration),
      message: specialRequest,
    };

    try {
      const response = await requestToRental(JSON.stringify(requestData));

      if (!response?.success) {
        throw new Error(response?.message || "Failed to submit rental request");
      }

      toast.success(response.message);
      router.push(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/tenant/request/request-status`
      );
      onClose(); // Close modal
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg bg-white shadow-lg rounded-md p-6 scroll-auto"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <DialogHeader>
          <DialogTitle>Request Rental for {rental?.holding}</DialogTitle>
        </DialogHeader>

        {/* Auto-Populated Contact Info */}
        <div className="mt-4">
          <label className="text-gray-600">Your Name</label>
          <Input type="text" value={user?.name || ""} disabled />
        </div>
        <div className="mt-4">
          <label className="text-gray-600">Your Email</label>
          <Input type="email" value={user?.email || ""} disabled />
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Your Phone Number</label>
          <Input type="text" value={user?.phoneNumber || ""} disabled />
        </div>

        {/* Move-in Date */}
        <div className="mt-4">
          <label className="text-gray-600">Move-in Date</label>
          <Input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
          />
        </div>

        {/* Rental Duration */}
        <div className="mt-4">
          <label className="text-gray-600">Rental Duration (in months)</label>
          <Input
            type="number"
            value={rentalDuration}
            onChange={(e) => validateRentalDuration(e.target.value)}
          />
          {rentalDurationError && (
            <p className="text-red-500 text-sm">{rentalDurationError}</p>
          )}
        </div>

        {/* Special Request */}
        <div className="mt-4">
          <label className="text-gray-600">Special Request</label>
          <Textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
              I agree to the terms and conditions.
            </label>
          </div>

          {/* Show Terms & Conditions only when checked */}
          {agreeTerms && (
            <div className="mt-2 p-3 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-700">
              <h3 className="font-semibold">Terms and Conditions</h3>
              <p>
                By submitting this rental request, you agree to abide by the
                terms and conditions set by the landlord. This includes timely
                rent payments, maintaining the property, and following community
                guidelines.
              </p>
              <p className="mt-2">
                Failure to comply with these conditions may result in penalties
                or lease termination.
              </p>
            </div>
          )}
        </div>

        {/* Submit & Cancel Buttons */}
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 2a10 10 0 000 20V2z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentalRequestModal;
