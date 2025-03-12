"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactLandlordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  landlordInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const ContactLandlordModal = ({
  isOpen,
  onOpenChange,
  landlordInfo,
}: ContactLandlordModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Landlord</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {landlordInfo.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {landlordInfo.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {landlordInfo.phone}
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
