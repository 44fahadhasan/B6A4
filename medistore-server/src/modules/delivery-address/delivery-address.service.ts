import { prisma } from "../../config/prisma";
import type { DeliveryAddress } from "../../generated/prisma/client";

const deliveryAddress = async (payload: DeliveryAddress) => {
  const result = await prisma.deliveryAddress.upsert({
    where: {
      userId_contactNumber: {
        userId: payload.userId,
        contactNumber: payload.contactNumber,
      },
    },
    create: { ...payload },
    update: { ...payload },
  });
  return result;
};

const getDeliveryAddress = async (userId: string) => {
  const result = await prisma.deliveryAddress.findMany({
    where: { userId },
  });
  return result;
};

export const deliveryAddressService = {
  deliveryAddress,
  getDeliveryAddress,
};
