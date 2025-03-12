"use client";

import { IMeta, RentalFormData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { BFTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";

const PaymentDetails = ({
  payment,
  meta,
}: {
  payment: RentalFormData[];
  meta: IMeta;
}) => {
  console.log(payment);
  const columns: ColumnDef<RentalFormData>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => (
        <span>{(meta.page - 1) * meta.limit + row.index + 1}</span>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl =
          row.original?.listingId?.imageUrls?.[0] || "/placeholder-image.jpg";
        return (
          <Image
            src={imageUrl}
            alt="Rental Image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-md object-cover"
          />
        );
      },
    },
    {
      accessorKey: "holding",
      header: "Rental Info",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">
            {row.original?.listingId?.holding}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            Unit: {row.original?.listingId?.unitNumber}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            Category: {row.original?.listingId?.category}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "addressInfo",
      header: "Address Info",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">
            {row.original?.listingId?.address}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.listingId?.citycorporation ||
              row.original?.listingId?.upazila ||
              "N/A"}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.listingId?.district}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "landlord",
      header: "Landlord Info",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">
            {row.original?.listingId?.landlordId?.name}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.listingId?.landlordId?.email}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.listingId?.landlordId?.phoneNumber}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "tenant",
      header: "Tenant Info",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.original?.tenantId?.name}</span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.tenantId?.email}
          </span>
          <span className="text-gray-500 dark:text-gray-300">
            {row.original?.tenantId?.phoneNumber}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "moveInDate",
      header: "Move-In Date",
      cell: ({ row }) => {
        const moveInDate = row.original?.moveInDate;
        return moveInDate ? (
          <span>{new Date(moveInDate).toLocaleDateString()}</span>
        ) : (
          <span className="text-gray-500">N/A</span> // Show "N/A" if undefined
        );
      },
    },
    {
      accessorKey: "rentalDuration",
      header: "Rental Duration",
      cell: ({ row }) => <span>{row.original?.rentalDuration}/month</span>,
    },

    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      cell: ({ row }) => <span>{row.original?.transaction?.id || "N/A"}</span>,
    },
    {
      accessorKey: "transactionDate",
      header: "Transaction Date",
      cell: ({ row }) => {
        const transactionDate = row.original?.transaction?.date_time;
        return transactionDate ? (
          <span>{new Date(transactionDate).toLocaleDateString()}</span>
        ) : (
          <span className="text-gray-500">N/A</span> // Show "N/A" if undefined
        );
      },
    },

    {
      accessorKey: "rentAmount",
      header: "Rent Amount",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          <p className="text-2xl">৳</p>{" "}
          {row.original?.listingId?.rentAmount?.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "totalRentAmount",
      header: "Total Rent Amount",
      cell: ({ row }) => {
        const rentAmount = row.original?.listingId?.rentAmount ?? 0; // Default to 0 if undefined
        const rentalDuration = row.original?.rentalDuration ?? 0; // Default to 0 if undefined
        const totalRent = (rentAmount * rentalDuration).toFixed(2);

        return (
          <span className="flex items-center gap-2">
            <p className="text-2xl">৳</p> {totalRent}
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-4 shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Payment Details</h1>
      </div>
      <BFTable columns={columns} data={payment || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default PaymentDetails;
