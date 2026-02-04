import { INavItem, ISidebarMenu } from "@/types";

export const sellerNavs: INavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

export const sellerSidebarMenus: ISidebarMenu[] = [
  {
    title: "Pharmacies",
    url: "/dashboard/pharmacies",
  },
  {
    title: "Medicines",
    url: "/dashboard/medicines",
  },
  {
    title: "Inventories",
    url: "/dashboard/inventories",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
];
