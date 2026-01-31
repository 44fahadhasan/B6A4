import { AppSidebar } from "@/components/layout/seller-and-admin/app-sidebar";
import SidebarBreadcrumb from "@/components/layout/seller-and-admin/sidebar-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <AppSidebar role={currentUserRole} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" />
          <SidebarBreadcrumb />
        </header>
        <div className="flex-1 p-4">
          {currentUserRole === UserRole.seller && seller}
          {currentUserRole === UserRole.admin && admin}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
