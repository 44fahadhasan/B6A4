import type { User } from "better-auth";
import type { UserRole } from "../../constants/roles";
import { auth } from "../../lib/auth";

type TUser = User & { role?: UserRole };

const singUpSeller = async (payload: TUser) => {
  delete payload.role;

  const { user } = await auth.api.createUser({
    body: {
      ...payload,
      role: "seller",
    },
  });

  return user;
};

export const sellerService = {
  singUpSeller,
};
