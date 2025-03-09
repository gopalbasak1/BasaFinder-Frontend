export type RentalFormData = {
  _id: string;
  holding: string;
  unitNumber: string;
  address: string;
  division: string;
  district: string;
  upazila: string;
  postalCode: string;
  citycorporation: string;
  bedrooms: string;
  rentAmount: string;
  availableFrom: string;
  category: string;
  description: string;
  keyFeatures: { value: string }[];
  specification: { key: string; value: string }[];
  imageUrls: string; // ✅ Ensure images are stored as an array
};
