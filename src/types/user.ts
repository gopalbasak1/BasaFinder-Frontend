export interface IUser {
  _id: string;
  userId: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "landlord" | "tenant";
  imageUrls?: string;
  name: string;
  isActive?: boolean;
  isListings?: boolean;
  iat?: number;
  exp?: number;
  status: "in-progress" | "blocked";
}
