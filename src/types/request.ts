export interface Tenant {
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
}

export interface RentalRequest {
  _id: string;
  tenantId: Tenant;
  listingId: Listing;
  rentalDuration: number;
  status: string;
  paymentStatus: string;
  message: string;
}

export interface GroupedRequests {
  [listingId: string]: {
    listing: Listing;
    requests: RentalRequest[];
    hasApprovedRequest: boolean;
  };
}
