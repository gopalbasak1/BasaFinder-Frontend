"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/User";
import Image from "next/image";
import EditProfileModal from "@/components/ui/core/BFModel/EditProfileModal";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMe();
      if (response?.success) {
        setUser(response.data);
      } else {
        setError(response?.message || "Failed to load user data");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  console.log(user);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">User Profile</h1>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 relative">
            <Image
              src={user?.imageUrls[0] ?? "/placeholder-image.jpg"}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-xl font-bold">{user?.name}</p>
            <p className="text-gray-600">
              {user?.role
                ? user.role.replace(/\b\w/g, (c: string) => c.toUpperCase())
                : "No Role"}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsEditOpen(true)}
            className="text-blue-500 font-bold"
          >
            Edit
          </button>
        </div>
      </div>

      <EditProfileModal
        user={user}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={
          (updatedUser: any) =>
            setUser({ ...updatedUser, imageUrls: updatedUser.imageUrls || [] }) // ✅ Ensure it's always an array
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p>
            <strong className="text-gray-500">Email:</strong> {user?.email}
          </p>
          <p>
            <strong className="text-gray-500">Phone Number:</strong>{" "}
            {user?.phoneNumber}
          </p>
          <p>
            <strong className="text-gray-500">Account Status:</strong>{" "}
            {user?.isActive ? (
              <span className="text-green-500 font-semibold">Active</span>
            ) : (
              <span className="text-red-500 font-semibold">Inactive</span>
            )}
          </p>
        </div>
        <div className="space-y-4">
          <p>
            <strong className="text-gray-500">Last Login:</strong>{" "}
            {new Date(user?.lastLogin).toLocaleString()}
          </p>
          <p>
            <strong className="text-gray-500">Account Created:</strong>{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-gray-500">Status:</strong> {user?.status}
          </p>
        </div>
      </div>

      {user?.needsPasswordChange && (
        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>
            Your password needs to be changed. Please update it for better
            security.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
