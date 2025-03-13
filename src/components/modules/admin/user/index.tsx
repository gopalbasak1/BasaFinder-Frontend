"use client";
import { deleteRentalByLandlord } from "@/services/Rental";
import { IMeta, IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash, Plus } from "lucide-react";
import { BiBlock, BiRun } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BFTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import DeleteConfirmationModal from "@/components/ui/core/BFModel/DeleteConfirmationModal";
import { deleteUserByAdmin, statusChangeUserByAdmin } from "@/services/User";
import BlockConfirmationModal from "@/components/ui/core/BFModel/BlockConfirmationModal";

const ManageUsersByAdmin = ({
  users,
  meta,
}: {
  users: IUser[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBlockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<IUser | null>(null);

  const handleView = (user: IUser) => {
    console.log("Viewing user:", user);
  };

  const handleDelete = (user: IUser) => {
    setSelectedIds([user?._id]);
    setSelectedItem(user?.name);
    setModalOpen(true);
  };

  const handleBlock = (user: IUser) => {
    if (!user?._id) {
      toast.error("Invalid user data");
      return;
    }
    setUserToBlock(user);
    setBlockModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedIds.length) {
        const res = await deleteUserByAdmin(selectedIds[0]);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
          router.refresh(); // Refresh data after delete
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleBlockConfirm = async () => {
    if (!userToBlock) return;
    try {
      const newStatus = !userToBlock.isActive; // Toggle the status

      const res = await statusChangeUserByAdmin(userToBlock._id, newStatus);
      if (res.success) {
        toast.success(res.message);
        setBlockModalOpen(false);
        router.refresh(); // Refresh UI after change
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err: any) {
      console.error("Error changing status:", err.message);
      toast.error("Error changing status");
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "imageUrls",
      header: "Profile",
      cell: ({ row }) => {
        const imageUrl =
          Array.isArray(row.original.imageUrls) &&
          row.original.imageUrls.length > 0
            ? row.original.imageUrls[0]
            : "/placeholder-image.jpg";

        return (
          <Image
            src={imageUrl}
            alt="User Image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-md object-cover"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.original.role}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`capitalize font-bold ${
            row.original.isActive ? "text-green-500" : "text-red-500"
          }`}
        >
          {row.original.isActive ? (
            <BiRun className="w-5 h-5" />
          ) : (
            <BiBlock className="w-5 h-5" />
          )}
        </span>
      ),
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {row.original.isActive === true ? (
            <button
              className="text-gray-500 hover:text-yellow-500"
              title="In-Active"
              onClick={() => handleBlock(row.original)}
            >
              <BiBlock className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="text-gray-500 hover:text-green-500"
              title="Active"
              onClick={() => handleBlock(row.original)}
            >
              <BiRun className="w-5 h-5" />
            </button>
          )}

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
        <h1 className="text-xl font-bold">Manage Users</h1>
      </div>

      <BFTable columns={columns} data={users || []} />
      <TablePagination totalPage={meta?.totalPage} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />

      <BlockConfirmationModal
        name={userToBlock?.name}
        isOpen={isBlockModalOpen}
        onOpenChange={setBlockModalOpen}
        onConfirm={handleBlockConfirm}
      />
    </div>
  );
};

export default ManageUsersByAdmin;
