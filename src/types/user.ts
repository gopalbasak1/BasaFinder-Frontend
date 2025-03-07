export interface IUser {
  userId: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "landlord" | "tenant";
  image?: string;
  name: string;
  isActive?: boolean;
  isListings?: boolean;
  iat?: number;
  exp?: number;
}
