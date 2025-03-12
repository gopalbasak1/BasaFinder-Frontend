"use client";

import { IMeta, RentalFormData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash, PhoneCall } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BFTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRentalByLandlord } from "@/services/Rental";
import DeleteConfirmationModal from "@/components/ui/core/BFModel/DeleteConfirmationModal";
import { ContactLandlordModal } from "@/components/ui/core/BFModel/ContactLandlordModal";
import { makePayment } from "@/services/Request";

interface RequestStatusProps {
  requests: RentalFormData[];
  meta: IMeta;
}

interface LandlordInfo {
  name: string;
  email: string;
  phone: string;
}

const RequestStatus = ({ requests, meta }: RequestStatusProps) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [landlordPhone, setLandlordPhone] = useState("");

  const [landlordInfo, setLandlordInfo] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "Not available",
    email: "Not available",
    phone: "Not available",
  });

  const handlePayment = async (data: RentalFormData) => {
    const rentalRequestId = data?._id; // Ensure this exists

    if (!rentalRequestId) {
      toast.error("Invalid rental request ID");
      return;
    }

    console.log("📩 Sending Payment Payload:", { rentalRequestId });

    try {
      const response = await makePayment(rentalRequestId);
      console.log("✅ Payment Response:", response);

      if (response.success) {
        toast.success("Payment successful!");
        if (response?.data) {
          //   console.log(response.data);
          setTimeout(() => {
            window.location.href = response?.data;
          }, 1000);
        }
      } else {
        toast.error(response.message || "Payment failed.");
      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleContactLandlord = (data: any) => {
    setLandlordPhone(
      data?.listingId?.landlordId?.phoneNumber || "Not available"
    );

    setLandlordInfo({
      name: data?.listingId?.landlordId?.name || "Not available",
      email: data?.listingId?.landlordId?.email || "Not available",
      phone: data?.listingId?.landlordId?.phoneNumber || "Not available",
    });

    setContactModalOpen(true);
  };

  const columns: ColumnDef<RentalFormData>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original?.listingId?.imageUrls?.[0] || "/placeholder.jpg"}
          alt="Rental"
          width={40}
          height={40}
          className="rounded-md"
        />
      ),
    },
    {
      accessorKey: "holding",
      header: "Holding ID",
      cell: ({ row }) => <span>{row.original?.listingId?.holding}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original?.listingId?.category}</span>,
    },
    {
      accessorKey: "moveInDate",
      header: "Move-In Date",
      cell: ({ row }) => {
        const moveInDate = row.original?.moveInDate;
        return (
          <span>
            {moveInDate ? new Date(moveInDate).toLocaleDateString() : "N/A"}
          </span>
        );
      },
    },

    {
      accessorKey: "rentalDuration",
      header: "Rental Duration",
      cell: ({ row }) => <span>{row.original?.rentalDuration} months</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded ${
            row.original.status === "approved"
              ? "bg-green-200 text-green-700"
              : row.original.status === "rejected"
              ? "bg-red-200 text-red-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => <span>{row.original.paymentStatus || "Unpaid"}</span>,
    },
    {
      accessorKey: "rentalAmount",
      header: "Rental Amount",
      cell: ({ row }) => (
        <span>${row.original?.listingId?.rentAmount?.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "totalRentalAmount",
      header: "Total Rental Amount",
      cell: ({ row }) => (
        <span>
          $
          {(
            (row.original?.listingId?.rentAmount || 0) *
            (row.original?.rentalDuration || 0)
          ).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const { status, paymentStatus } = row.original;
        const isPaid = paymentStatus === "Paid";

        return (
          <div className="flex space-x-3">
            {status === "approved" && (
              <>
                <button
                  className={`px-3 py-1 rounded ${
                    isPaid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  onClick={() => !isPaid && handlePayment(row.original)}
                  disabled={isPaid}
                >
                  Pay Now
                </button>

                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
                  onClick={() => handleContactLandlord(row.original)}
                >
                  <PhoneCall /> Contact Landlord
                </button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Manage Rental Requests</h1>
      <BFTable columns={columns} data={requests || []} />
      <TablePagination totalPage={meta?.totalPage} />

      <ContactLandlordModal
        isOpen={isContactModalOpen}
        onOpenChange={setContactModalOpen}
        landlordInfo={landlordInfo}
      />
    </div>
  );
};

export default RequestStatus;
