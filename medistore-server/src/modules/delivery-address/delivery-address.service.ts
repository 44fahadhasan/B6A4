import { prisma } from "../../config/prisma";
import type { DeliveryAddress } from "../../generated/prisma/client";

const customerdeliveryAddress = async (payload: DeliveryAddress) => {
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

export const deliveryAddressService = {
  customerdeliveryAddress,
};
