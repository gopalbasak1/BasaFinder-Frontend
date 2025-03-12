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
import { useUser } from "@/context/UserContext"; // Import user context
import { RentalRequest } from "@/types";

const ManageRequest = ({ requests }: { requests: RentalRequest[] }) => {
  const { user } = useUser(); // Get logged-in user
  const isAdmin = user?.role === "admin"; // Check if the user is an admin

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No rental requests found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">
        Rental Requests by Listing
      </h2>
      {requests.map((request) => (
        <Card key={request._id} className="w-full max-w-7xl mx-auto">
          {/* Ensure landlords & listing info stack properly on mobile */}
          <div className="flex flex-wrap justify-between gap-4 p-4">
            <CardHeader className="w-full md:w-1/2">
              <CardTitle className="text-lg">
                🏠 {request.listingId.address} ({request.listingId.unitNumber})
              </CardTitle>
              <p className="text-sm text-gray-500">
                <strong>Rent Amount:</strong> {request.listingId.rentAmount} BDT
                |<strong>Category:</strong> {request.listingId.category} |
                <strong>Available From:</strong>{" "}
                {new Date(request.listingId.availableFrom).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardHeader className="w-full md:w-1/2">
              <CardTitle className="text-lg">
                Landlord: {request?.listingId?.landlordId?.name || "N/A"}
              </CardTitle>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Email:</strong>{" "}
                  {request?.listingId?.landlordId?.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {request?.listingId?.landlordId?.phoneNumber || "N/A"}
                </p>
              </div>
            </CardHeader>
          </div>

          {/* Responsive table wrapper */}
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Request Status</TableHead>
                    <TableHead>Rental Duration</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Move-In Date</TableHead>
                    <TableHead>Total Rent</TableHead>
                    {!isAdmin && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell className="text-sm">
                        {request.tenantId.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        <a
                          href={`mailto:${request.tenantId.email}`}
                          className="text-blue-500 underline"
                        >
                          {request.tenantId.email}
                        </a>
                        <br />
                        <a
                          href={`tel:${request.tenantId.phoneNumber}`}
                          className="text-blue-500 underline"
                        >
                          {request.tenantId.phoneNumber}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.paymentStatus}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.rentalDuration} months
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.status}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.moveInDate
                          ? new Date(request.moveInDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.rentalDuration * request.listingId.rentAmount}{" "}
                        BDT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManageRequest;
