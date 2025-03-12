export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Landlord {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Listing {
  _id: string;
  address: string;
  unitNumber: string;
  rentAmount: number;
  category: string;
  availableFrom: string;
  keyFeatures: string[];
  landlordId: Landlord; // ✅ Add landlordId here
}

export interface RentalRequest {
  _id: string;
  tenantId: Tenant;
  listingId: Listing;
  rentalDuration: number;
  status: string;
  paymentStatus: string;
  message: string;
  moveInDate?: string; // ✅ Add moveInDate as optional (if it may be missing)
}

export interface GroupedRequests {
  [listingId: string]: {
    listing: Listing;
    requests: RentalRequest[];
    hasApprovedRequest: boolean;
  };
}
