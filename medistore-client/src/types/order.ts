export interface IOrderItem {
  medicineId: string;
  quantity: number;
  priceAtAdd: number;
}

export interface IOrder {
  deliveryAddressId: string;
  payment: { method: string };
}

export type TOrderUpdate = {
  status: string;
  orderId: string;
};

export type TOrders = IOrder & IOrderItem;
