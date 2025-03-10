"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateRentalStatusRequestByLandlord } from "@/services/Request";
import { toast } from "sonner";
import { useState } from "react";

interface Tenant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface Listing {
  _id: string;
  address: string;
  unitNumber: string;
  rentAmount: number;
  category: string;
  availableFrom: string;
  keyFeatures: string[];
}

interface RentalRequest {
  _id: string;
  tenantId: Tenant;
  listingId: Listing;
  rentalDuration: number;
  status: string;
  paymentStatus: string;
  message: string;
}

interface GroupedRequests {
  [listingId: string]: {
    listing: Listing;
    requests: RentalRequest[];
    hasApprovedRequest: boolean;
  };
}

const ManageRequest = ({ requests }: { requests: RentalRequest[] }) => {
  const [updatedRequests, setUpdatedRequests] = useState(requests);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!updatedRequests || updatedRequests.length === 0) {
    return <div>No rental requests found.</div>;
  }

  const handleStatusUpdate = async (requestId: string, status: string) => {
    try {
      const result = await updateRentalStatusRequestByLandlord(
        requestId,
        status
      );
      if (result.success) {
        toast.success(result?.message);

        setUpdatedRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status } : req
          )
        );
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      console.error(`Error ${status} request:`, error);
      toast.error(error.message);
    }
  };

  const handleReadMore = (message: string) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const groupedRequests: GroupedRequests = updatedRequests.reduce(
    (acc, request) => {
      const listingId = request.listingId._id;
      if (!acc[listingId]) {
        acc[listingId] = {
          listing: request.listingId,
          requests: [],
          hasApprovedRequest: false,
        };
      }
      acc[listingId].requests.push(request);
      if (request.status === "approved") {
        acc[listingId].hasApprovedRequest = true;
      }
      return acc;
    },
    {} as GroupedRequests
  );

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">
        Rental Requests by Listing
      </h2>
      {Object.values(groupedRequests).map(
        ({ listing, requests, hasApprovedRequest }) => (
          <Card key={listing._id} className="w-full max-w-7xl mx-auto">
            <CardHeader>
              <CardTitle>
                🏠 {listing.address} ({listing.unitNumber})
              </CardTitle>
              <p className="text-sm text-gray-500">
                <strong>Rent Amount:</strong> {listing.rentAmount} BDT |
                <strong>Category:</strong> {listing.category} |
                <strong>Available From:</strong>
                {new Date(listing.availableFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>Facilities:</strong> {listing.keyFeatures.join(", ")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Rental Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request._id}>
                        <TableCell>{request.tenantId.name}</TableCell>
                        <TableCell>{request.tenantId.email}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${request.tenantId.phoneNumber}`}
                            className="text-blue-500 underline"
                          >
                            {request.tenantId.phoneNumber}
                          </a>
                        </TableCell>
                        <TableCell>{request.rentalDuration} months</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{request.paymentStatus}</TableCell>
                        <TableCell>
                          {request.message.split(" ").length > 4 ? (
                            <>
                              {request.message.split(" ").slice(0, 5).join(" ")}
                              ...
                              <Button
                                variant="link"
                                className="text-blue-500"
                                onClick={() => handleReadMore(request.message)}
                              >
                                Read more
                              </Button>
                            </>
                          ) : (
                            request.message
                          )}
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            className="bg-green-500"
                            onClick={() =>
                              handleStatusUpdate(request._id, "approved")
                            }
                            disabled={
                              hasApprovedRequest ||
                              request.status === "approved"
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleStatusUpdate(request._id, "rejected")
                            }
                            disabled={
                              hasApprovedRequest ||
                              request.status === "rejected"
                            }
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-red-500 border-2 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Full Message</h3>
            <p>{selectedMessage}</p>
            <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRequest;
