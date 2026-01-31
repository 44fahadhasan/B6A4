export interface ISidebarMenu {
  title: string;
  url: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
}
