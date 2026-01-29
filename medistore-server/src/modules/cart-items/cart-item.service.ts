import type { Request } from "express";
import { prisma } from "../../config/prisma";
import type { CartItem } from "../../generated/prisma/client";
import paginationOptions from "../../utils/pagination.util";

const getCartItems = async (req: Request) => {
  const { page, limit, skip } = paginationOptions(req);

  const [cart, total] = await prisma.$transaction([
    prisma.cartItem.findMany({
      skip,
      take: limit,
    }),
    prisma.cartItem.count(),
  ]);

  return { cart, meta: { page, limit, total } };
};

const addCartItem = async (payload: CartItem) => {
  const result = await prisma.cartItem.create({ data: payload });
  return result;
};

const updateCartItem = async (cartItemId: string, payload: CartItem) => {
  const result = await prisma.cartItem.update({
    data: payload,
    where: { id: cartItemId },
  });
  return result;
};

const deleteCartItem = async (cartItemId: string) => {
  const result = await prisma.cartItem.delete({ where: { id: cartItemId } });
  return result;
};

export const cartService = {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
