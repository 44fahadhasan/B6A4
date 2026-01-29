import { Router, type IRouter } from "express";
import cartItemRouter from "../../modules/cart-items/cart-item.route";
import categorieRouter from "../../modules/categories/categorie.route";
import deliveryAddressRouter from "../../modules/delivery-address/delivery-address.route";
import medicineRouter from "../../modules/medicines/medicine.route";
import pharmaceRouter from "../../modules/pharmacies/pharmace.route";
import sellerRouter from "../../modules/sellers/seller.route";

interface IModuleRouter {
  path: string;
  router: IRouter;
}

const v1Router = Router();

const moduleRouters: IModuleRouter[] = [
  { path: "/customers", router: deliveryAddressRouter },
  { path: "/customers", router: cartItemRouter },
  { path: "/seller", router: sellerRouter },
  { path: "/categories", router: categorieRouter },
  { path: "/pharmaces", router: pharmaceRouter },
  { path: "/medicines", router: medicineRouter },
];

moduleRouters.forEach(({ path, router }) => v1Router.use(path, router));

export default v1Router;
