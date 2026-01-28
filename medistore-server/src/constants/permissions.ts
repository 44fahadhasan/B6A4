import { createAccessControl } from "better-auth/plugins";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import UserRole from "./roles";

export const Permission = {
  VIEW: "view",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
} as const;

const statement = {
  ...defaultStatements,
  [UserRole.customer]: [Permission.VIEW],
  [UserRole.seller]: [Permission.VIEW, Permission.ADD, Permission.EDIT],
  [UserRole.admin]: [
    Permission.VIEW,
    Permission.ADD,
    Permission.EDIT,
    Permission.DELETE,
  ],
} as const;

export const ac = createAccessControl(statement);

export const customerRole = ac.newRole({
  [UserRole.customer]: ["view"],
});

export const sellerRole = ac.newRole({
  [UserRole.seller]: ["add", "edit", "view"],
});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  [UserRole.admin]: ["add", "edit", "delete", "view"],
});
