import type { Request } from "express";
import { prisma } from "../../config/prisma";
import { OrderStatus } from "../../constants/order.status";
import type {
  Order,
  OrderItem,
  Payment,
  PharmacieOrder,
  OrderStatus as TOrderStatus,
} from "../../generated/prisma/client";
import type { OrderWhereInput } from "../../generated/prisma/models";
import paginationOptions from "../../utils/pagination.util";

type TCreateOrder = Order & {
  pharmacyOrders: (PharmacieOrder & {
    orderItems: OrderItem[];
  })[];
  payment: Payment;
};

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
            {},
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
        pharmacieOrders: {
          include: {
            _count: true,
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
      deliveryAddress: true,
      pharmacieOrders: {
        include: {
          _count: true,
          orderItems: true,
          order: true,
          payments: true,
          pharmacie: true,
        },
      },
    },
  });
  return result;
};

const getOrderForAdmin = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
  });
  return result;
};

const createOrder = async (payload: TCreateOrder) => {
  const orderNumber = `ORD-${Date.now()}`;
  const result = await prisma.$transaction(async (tx) => {
    let grandTotal = 0;

    // create a new order
    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        totalAmount: 0,
        grandTotal: 0,
        userId: payload.userId,
        deliveryAddressId: payload.deliveryAddressId,
      },
    });

    // create a new pharmacy order
    for (const pharmacy of payload.pharmacyOrders) {
      let pharmacySubtotal = 0;

      const newPharmacieOrder = await tx.pharmacieOrder.create({
        data: {
          subtotal: 0,
          orderId: newOrder.id,
          pharmacieId: pharmacy.pharmacieId,
        },
      });

      // create order item for each pharmacy
      for (const orderItem of pharmacy.orderItems) {
        const inventories = await tx.inventory.findMany({
          where: {
            medicineId: orderItem.medicineId,
            pharmacieId: pharmacy.pharmacieId,
            isExpired: false,
          },
          orderBy: { expiryDate: "asc" },
        });

        const available = inventories.reduce(
          (sum, i) => sum + (i.stock - i.reservedQty - i.damagedQty),
          0,
        );

        if (available < orderItem.quantity) {
          throw new Error(`No stock medicine id is ${orderItem.medicineId}`);
        }

        let remaining = orderItem.quantity;

        for (const inv of inventories) {
          if (remaining <= 0) break;

          const free = inv.stock - inv.reservedQty - inv.damagedQty;
          if (free <= 0) continue;

          const take = Math.min(free, remaining);

          await tx.inventory.update({
            where: { id: inv.id },
            data: {
              reservedQty: { increment: take },
            },
          });

          remaining -= take;
        }

        const subtotal = orderItem.price * orderItem.quantity;
        pharmacySubtotal += subtotal;

        // create a new order item
        await tx.orderItem.create({
          data: {
            subtotal,
            price: orderItem.price,
            medicineId: orderItem.medicineId,
            quantity: orderItem.quantity,
            pharmacieOrderId: newPharmacieOrder.id,
          },
        });
      }

      // update new pharmacy order
      await tx.pharmacieOrder.update({
        where: { id: newPharmacieOrder.id },
        data: { subtotal: pharmacySubtotal },
      });

      // create a new payment for each pharmacy
      if (payload.payment.method === "cash") {
        await tx.payment.create({
          data: {
            method: "cash",
            userId: payload.userId,
            amount: pharmacySubtotal,
            pharmacieOrderId: newPharmacieOrder.id,
          },
        });
      }

      grandTotal += pharmacySubtotal;
    }

    const discount = 0;
    const taxable = grandTotal - discount;
    const tax = taxable * 0.1;
    const finalTotal = taxable + tax;

    // update new order
    await tx.order.update({
      where: { id: newOrder.id },
      data: {
        tax,
        discount,
        totalAmount: grandTotal,
        grandTotal: finalTotal,
      },
    });

    return newOrder;
  });

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
