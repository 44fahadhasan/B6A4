export interface IOrderItem {
  medicineId: string;
  quantity: number;
  priceAtAdd: number;
}

export interface IOrder {
  pharmacieId?: string;
  deliveryAddressId: string;
  discount?: number;
  tax?: number;
  items: {
    medicineId: string;
    quantity: number;
    priceAtAdd: number;
  }[];
}

export type TOrders = IOrder & IOrderItem;
