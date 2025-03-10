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
  keyFeatures: string[]; // 🔥 FIXED (Array of strings)
  specification: { key: string; value: string }[]; // 🔥 FIXED (Array of objects)
  imageUrls: string[]; // 🔥 FIXED (Array of strings)
  ratingCount?: number;
  averageRating?: number;
};
