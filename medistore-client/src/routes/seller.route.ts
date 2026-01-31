import { INavItem, ISidebarMenu } from "@/types";

export const sellerNavs: INavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

export const sellerSidebarMenus: ISidebarMenu[] = [
  {
    title: "Medicines",
    url: "/dashboard/medicines",
  },
  {
    title: "Stocks",
    url: "/dashboard/stocks",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
];
