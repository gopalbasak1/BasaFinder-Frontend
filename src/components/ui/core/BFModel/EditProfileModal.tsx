"use client";
// Import logout function
import { useState } from "react";
import { updateUser } from "@/services/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ImagePreviewer from "../BFImageUploader/ImagePreviewer";
import BFImageUploader from "../BFImageUploader";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";

// Define types for props
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrls: string[];
}

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    imageUrls: user?.imageUrls || [], // ✅ Ensure this is an array
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    formData.imageUrls
  ); // ✅ Set as array
  const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = {
        ...formData,
        imageUrls:
          imagePreview.length > 0 ? imagePreview[0] : formData.imageUrls, // ✅ Send only a single string
      };

      const response = await updateUser(updatedUser, user?._id);

      if (response?.success) {
        toast.success(response.message);
        window.location.reload();
        const emailChanged = user.email !== formData.email;
        const phoneChanged = user.phoneNumber !== formData.phoneNumber;

        if (emailChanged || phoneChanged) {
          toast.info(
            "Your email or phone number was updated. Please log in again."
          );
          setTimeout(() => {
            logout();
            router.push("/login"); // 🔄 Redirect to login page
          }, 1500);
        } else {
          onUpdate(response.data);
        }

        onClose();
      } else {
        toast.error(response?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Section */}
          <div className="flex items-center space-x-4">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <BFImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Profile Picture"
              />
            )}
          </div>

          {/* Input Fields */}
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
