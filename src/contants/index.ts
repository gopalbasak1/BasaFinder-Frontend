export const protectedRoutes = [
  /^\/login$/,
  /^\/admin(\/.*)?$/,
  /^\/landlord(\/.*)?$/,
  /^\/tenant(\/.*)?$/,
  /^\/settings\/profile$/,
  /^\/settings\/password$/,
  /^\/rental\/[^/]+$/, // Matches rental/:id (e.g., /rental/67cf297036b1c6f250a712ae)
];
