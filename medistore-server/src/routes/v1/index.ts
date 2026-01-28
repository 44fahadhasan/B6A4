import { Router, type IRouter } from "express";
import categorieRouter from "../../modules/categories/categorie.route";
import sellerRouter from "../../modules/sellers/seller.route";

interface IModuleRouter {
  path: string;
  router: IRouter;
}

const v1Router = Router();

const moduleRouters: IModuleRouter[] = [
  { path: "/seller", router: sellerRouter },
  { path: "/categories", router: categorieRouter },
];

moduleRouters.forEach(({ path, router }) => v1Router.use(path, router));

export default v1Router;
