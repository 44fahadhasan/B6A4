export const UserRole = {
  customer: "customer",
  seller: "seller",
  admin: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
