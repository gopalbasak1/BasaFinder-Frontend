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
import { toast } from "sonner";
import { deleteRentalByAdmin } from "@/services/Rental";
import DeleteConfirmationModal from "@/components/ui/core/BFModel/DeleteConfirmationModal";

const ManageAdminRental = ({
  rentals,
  meta,
}: {
  rentals: RentalFormData[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleView = (rental: RentalFormData) => {
    console.log("Viewing rental:", rental);
  };

  const handleDelete = (data: RentalFormData) => {
    setSelectedIds([data?._id]);
    setSelectedItem(data?.holding);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedIds) {
        const res = await deleteRentalByAdmin(selectedIds[0]);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<RentalFormData>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => {
        const serialNumber = (meta.page - 1) * meta.limit + row.index + 1;
        return <span>{serialNumber}</span>;
      },
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl =
          Array.isArray(row.original.imageUrls) &&
          row.original.imageUrls.length > 0
            ? row.original.imageUrls[0] // ✅ Use the first valid image
            : "/placeholder-image.jpg"; // ✅ Provide a fallback image

        // ✅ Ensure imageUrl is a valid absolute URL
        const validImageUrl =
          imageUrl.startsWith("http") || imageUrl.startsWith("/")
            ? imageUrl
            : "/placeholder-image.jpg"; // Fallback if invalid

        return (
          <Image
            src={validImageUrl}
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
      header: "Holding ID",
      cell: ({ row }) => <span>{row.original.holding}</span>,
    },
    {
      accessorKey: "unitNumber",
      header: "Unit Number",
      cell: ({ row }) => <span>{row.original.unitNumber}</span>,
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
            onClick={() => router.push(`/rental/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(`/admin/rental/update-rental/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
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
      </div>

      <BFTable columns={columns} data={rentals || []} />
      <TablePagination totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageAdminRental;
