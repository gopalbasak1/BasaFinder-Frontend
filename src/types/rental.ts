export type RentalFormData = {
  _id: string;
  listingId?: Listing; // ✅ Use listingId for holding/unit/rent
  tenantId?: Tenant; // ✅ Added tenantId
  address: string;
  division: string;
  holding: string;
  unitNumber: string;
  bedrooms: number;
  rentAmount: number;
  district: string;
  upazila: string;
  postalCode: 0;
  citycorporation: string;
  availableFrom: string;
  category: string;
  description: string;
  keyFeatures: string[]; // ✅ Fixed
  specification: { key: string; value: string }[]; // ✅ Fixed
  imageUrls: string[]; // ✅ Fixed
  ratingCount?: number;
  averageRating?: number;
  rentalDuration?: number;
  status?: string;
  paymentStatus?: string;
  moveInDate?: string | Date | undefined; // ✅ Better type
  transaction?:
    | {
        id: string;
        method: string;
        date_time: string;
      }
    | undefined; // ✅ Allow undefined
};

// ✅ Define the Tenant Type
export type Tenant = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

export interface Listing {
  _id: string;
  holding: string;
  unitNumber: string; // ✅ Added
  category: string;
  rentAmount: number;
  imageUrls?: string[];
  address: string;
  district: string;
  upazila: string;
  citycorporation: string;
  landlordId?: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
