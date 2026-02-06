import type {
  OrderStatus,
  PharmacieOrderStatus,
} from "../generated/prisma/enums";

function calculateOrderStatus(statuses: PharmacieOrderStatus[]): OrderStatus {
  if (statuses.every((s) => s === "canceled")) return "canceled";

  if (statuses.every((s) => s === "delivered")) return "delivered";

  if (statuses.every((s) => s === "shipped" || s === "delivered"))
    return "shipped";

  if (
    statuses.every(
      (s) => s === "confirmed" || s === "shipped" || s === "delivered",
    )
  )
    return "confirmed";

  return "pending";
}

export default calculateOrderStatus;
