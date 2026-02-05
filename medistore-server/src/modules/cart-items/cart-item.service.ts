import type { Request } from "express";
import { prisma } from "../../config/prisma";
import type { CartItem } from "../../generated/prisma/client";

const getCartItemsForOrder = async (userId: string) => {
  const result = await prisma.$queryRaw<
    {
      pharmacieId: string;
      order_items: {
        quantity: number;
        price: number;
        medicineId: string;
      };
    }[]
  >`
  select
  ci."pharmacieId",
  json_agg(
    json_build_object(
      'quantity', ci."quantity",
      'price', ci."priceAtAdd",
      'medicineId', ci."medicineId"
    )
  ) as "orderItems"
  from
    cart_items as ci
  where
    ci."userId" = ${userId}
  group by
    ci."pharmacieId"
  `;

  return result;
};

const getCartItems = async (req: Request) => {
  const { user } = req;

  if (!user?.id) {
    throw new Error("User id is required");
  }

  const result = await prisma.cartItem.findMany({
    where: { userId: user?.id },
    include: {
      medicine: {
        select: {
          id: true,
          name: true,
          genericName: true,
          brandName: true,
          categorie: {
            select: {
              name: true,
            },
          },
        },
      },
      pharmacie: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const mageCartItem = async (
  payload: CartItem & { actionLabel: "increment" | "decrement" },
) => {
  const inventory = await prisma.inventory.findFirstOrThrow({
    where: {
      isExpired: false,
      medicineId: payload.medicineId,
      pharmacieId: payload.pharmacieId,
    },
    orderBy: { expiryDate: "asc" },
  });

  if (inventory.stock - inventory.reservedQty - payload.quantity <= 0) {
    throw new Error("Stock not available");
  }

  const isAlreadyInCart = await prisma.cartItem.findUnique({
    where: {
      userId_medicineId: {
        userId: payload.userId,
        medicineId: payload.medicineId,
      },
    },
  });

  if (isAlreadyInCart) {
    if (isAlreadyInCart.quantity <= 1 && payload.actionLabel === "decrement") {
      return;
    }

    const result = prisma.cartItem.update({
      where: { id: isAlreadyInCart.id },
      data: {
        quantity: { [payload.actionLabel]: 1 },
        priceAtAdd: inventory.sellingPrice,
      },
    });

    return result;
  }

  const { actionLabel, quantity = 1, ...rest } = payload;

  const result = await prisma.cartItem.create({
    data: {
      ...rest,
      quantity,
      priceAtAdd: inventory.sellingPrice,
    },
  });

  return result;
};

const deleteCartItem = async (cartItemId: string) => {
  const result = await prisma.cartItem.delete({ where: { id: cartItemId } });
  return result;
};

export const cartService = {
  getCartItems,
  mageCartItem,
  deleteCartItem,
  getCartItemsForOrder,
};
