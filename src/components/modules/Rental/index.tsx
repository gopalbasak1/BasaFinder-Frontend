"use client";

import { IMeta, RentalFormData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BFTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useState } from "react";

const ManageRental = ({
  rentals,
  meta,
}: {
  rentals: RentalFormData[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleView = (rental: RentalFormData) => {
    console.log("Viewing rental:", rental);
  };

  const handleDelete = (rentalId: string) => {
    console.log("Deleting rental with ID:", rentalId);
  };

  const columns: ColumnDef<RentalFormData>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => <span>{row.index + 1}</span>, // Serial Number
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.imageUrls[0] || "/placeholder.jpg"}
          alt="Rental Image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-md object-cover"
        />
      ),
    },
    {
      accessorKey: "holding",
      header: "Holding ID",
      cell: ({ row }) => <span>{row.original.holding}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category}</span>,
    },
    {
      accessorKey: "bedrooms",
      header: "Bedrooms",
      cell: ({ row }) => <span>{row.original.bedrooms}</span>,
    },
    {
      accessorKey: "rentAmount",
      header: "Rent Amount",
      cell: ({ row }) => {
        const rent = Number(row.original.rentAmount); // Convert to number
        return (
          <span className="flex items-center gap-2">
            <p className="text-2xl">৳</p> {rent.toFixed(2)}
          </span>
        ); // Use <span> correctly
      },
    },

    {
      accessorKey: "district",
      header: "District",
      cell: ({ row }) => <span>{row.original.district}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/user/shop/products/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage Rental Listings</h1>
        <Button
          onClick={() => router.push("/user/shop/products/add-product")}
          size="sm"
        >
          Add Rental <Plus />
        </Button>
      </div>

      <BFTable columns={columns} data={rentals || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageRental;
