"use client";
import { updateUserRoleByAdmin } from "@/services/User";
import { IMeta, IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BFTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const ManageRoleAdmin = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleView = (user: IUser) => {
    console.log("Viewing user:", user);
  };

  const handleRoleChange = async (user: IUser, newRole: string) => {
    if (user.role === newRole) return;
    setUpdatingUserId(user._id);
    try {
      const res = await updateUserRoleByAdmin(user._id, newRole);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error("Error updating role");
    } finally {
      setUpdatingUserId(null);
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
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Select
          disabled={updatingUserId === row.original._id}
          value={row.original.role}
          onValueChange={(newRole) => handleRoleChange(row.original, newRole)}
        >
          <SelectTrigger className="w-[150px]">
            {updatingUserId === row.original._id
              ? "Updating..."
              : row.original.role.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="landlord">Landlord</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
      ),
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
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Manage User Roles</h1>
      </div>

      <BFTable columns={columns} data={users || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageRoleAdmin;
