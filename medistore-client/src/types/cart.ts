export interface ICartItem {
  id?: string;
  quantity: number;
  priceAtAdd?: number;
  medicineId: string;
  pharmacieId: string;
  actionLabel: "increment" | "decrement";
}

export interface ICartItemList {
  id: string;
  quantity: number;
  priceAtAdd: number;
  medicine: {
    id: string;
    name: string;
    genericName: string;
    brandName?: string;
    categorie: {
      name?: string;
    };
  };
  pharmacie: {
    id: string;
  };
}
