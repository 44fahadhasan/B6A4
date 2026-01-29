import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { OrderStatus } from "../../constants/order.status";
import type {
  Order,
  OrderStatus as TOrderStatus,
} from "../../generated/prisma/client";
import type { OrderWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

const getOrdersForCustomer = async (req: Request) => {
  const { search, status } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: OrderWhereInput = {
    ...(status && OrderStatus.includes(status as string)
      ? {
          status: status as TOrderStatus,
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              orderNumber: {
                contains: search as string,
                mode: "insensitive",
              },
              pharmacie: {
                name: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),
  };

  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        orderItems: {
          select: {
            medicine: {
              select: {
                name: true,
                categorie: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
            price: true,
            discount: true,
            subtotal: true,
            quantity: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, meta: { page, limit, total } };
};

const getOrdersForAdmin = async (req: Request) => {
  const { search, status } = req.query;
  const { page, limit, skip, orderBy, order } = paginationOptions(req);

  const where: OrderWhereInput = {
    ...(status && OrderStatus.includes(status as string)
      ? {
          status: status as TOrderStatus,
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              orderNumber: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              user: {
                name: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
            {
              pharmacie: {
                name: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
          ],
        }
      : {}),
  };

  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      skip,
      take: limit,
      where,
      orderBy: { [orderBy]: order },
      include: {
        orderItems: {
          select: {
            medicine: {
              select: {
                name: true,
                categorie: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            price: true,
            discount: true,
            quantity: true,
            subtotal: true,
          },
        },
        deliveryAddress: {
          select: {
            country: true,
            division: true,
            city: true,
            area: true,
            addressLine: true,
            contactNumber: true,
          },
        },
        pharmacie: {
          select: {
            name: true,
          },
        },
        payments: {
          select: {
            method: true,
            status: true,
            amount: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, meta: { page, limit, total } };
};

const getOrderForCustomer = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        select: {
          price: true,
          discount: true,
          quantity: true,
          subtotal: true,
          medicine: {
            select: {
              name: true,
              categorie: {
                select: {
                  name: true,
                },
              },
              image: true,
            },
          },
        },
      },
      payments: {
        select: {
          method: true,
          amount: true,
          status: true,
          createdAt: true,
          paymentDate: true,
        },
      },
      pharmacie: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
  return result;
};

const getOrderForAdmin = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true,
      payments: true,
      pharmacie: true,
      reviews: true,
      user: true,
      deliveryAddress: true,
    },
  });
  return result;
};

const createOrder = async (payload: Order) => {
  const result = await prisma.order.create({ data: payload });
  return result;
};

const updateOrder = async (orderId: string, payload: Order) => {
  const result = await prisma.order.update({
    data: payload,
    where: { id: orderId },
  });
  return result;
};

const deleteOrder = async (orderId: string) => {
  const result = await prisma.order.delete({ where: { id: orderId } });
  return result;
};

export const orderService = {
  getOrdersForCustomer,
  getOrdersForAdmin,
  getOrderForCustomer,
  getOrderForAdmin,
  createOrder,
  updateOrder,
  deleteOrder,
};
