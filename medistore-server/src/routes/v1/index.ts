import { Router, type IRouter } from "express";
import cartItemRouter from "../../modules/cart-items/cart-item.route";
import categorieRouter from "../../modules/categories/categorie.route";
import deliveryAddressRouter from "../../modules/delivery-address/delivery-address.route";
import inventoryRouter from "../../modules/inventories/inventory.route";
import medicineRouter from "../../modules/medicines/medicine.route";
import orderRouter from "../../modules/orders/order.route";
import pharmacieRouter from "../../modules/pharmacies/pharmacie.route";
import reviewRouter from "../../modules/reviews/review.route";
import sellerRouter from "../../modules/sellers/seller.route";

interface IModuleRouter {
  path: string;
  router: IRouter;
}

const v1Router = Router();

const moduleRouters: IModuleRouter[] = [
  { path: "/customers", router: deliveryAddressRouter },
  { path: "/customers", router: cartItemRouter },
  { path: "/customers", router: orderRouter },
  { path: "/customers", router: reviewRouter },
  { path: "/seller", router: sellerRouter },
  { path: "/seller", router: orderRouter },
  { path: "/categories", router: categorieRouter },
  { path: "/pharmacies", router: pharmacieRouter },
  { path: "/medicines", router: medicineRouter },
  { path: "/inventories", router: inventoryRouter },
  { path: "/orders", router: orderRouter },
  { path: "/reviews", router: reviewRouter },
];

moduleRouters.forEach(({ path, router }) => v1Router.use(path, router));

export default v1Router;
