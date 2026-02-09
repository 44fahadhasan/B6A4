import { INavItem, ISidebarMenu } from "@/types";

export const adminNavs: INavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

export const adminSidebarMenus: ISidebarMenu[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
  },
  {
    title: "Medicines",
    url: "/dashboard/medicines",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
  {
    title: "Users",
    url: "/dashboard/users",
  },
  {
    title: "Home",
    url: "/",
  },
];
