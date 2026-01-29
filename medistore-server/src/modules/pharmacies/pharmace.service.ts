import { prisma } from "../../config/prisma";
import type { Pharmacie } from "../../generated/prisma/client";

const pharmaceProfile = async (payload: Pharmacie) => {
  const result = await prisma.pharmacie.upsert({
    where: { licenceNumber: payload.licenceNumber },
    create: { ...payload },
    update: { ...payload },
  });
  return result;
};

export const pharmaceService = {
  pharmaceProfile,
};
