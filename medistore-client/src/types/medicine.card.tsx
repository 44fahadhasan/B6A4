export interface IMedicineCard {
  id: string;
  name: string;
  slug: string;
  genericName: string;
  manufacturer: string | null;
  dosageForm: string;
  strength: string | null;
  categorie: { name: string | null };
  pharmacie: { name: string };
  reviews: any[];
  isOutOfStock: boolean;
  stock: {
    mrp: number;
    sellingPrice: number;
    discount: number;
    availableQty: number;
    expiryDate: string;
  } | null;
}
