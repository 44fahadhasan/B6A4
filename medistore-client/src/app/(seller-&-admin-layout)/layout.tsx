import { UserRole } from "@/constants/role.const";
import { userService } from "@/services/user.service";

export default async function Layout({
  seller,
  admin,
}: {
  seller: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { success, data } = await userService.getUserSession();

  let currentUserRole = "";
  if (success && data) {
    currentUserRole = data.user.role;
  }

  return (
    <div>
      {currentUserRole === UserRole.seller && seller}
      {currentUserRole === UserRole.admin && admin}
    </div>
  );
}
