export interface ICartItem {
  id?: string;
  quantity: number;
  priceAtAdd: number;
  medicineId: string;
  pharmacieId: string;
}

export interface ICartItemList {
  id: string;
  quantity: number;
  priceAtAdd: number;
  addedAt: string;
  medicine: {
    name: string;
    genericName: string;
    brandName?: string;
    categorie: {
      name?: string;
    };
  };
}

export interface ICartItemUpdate {
  quantity: number;
}
