import { Router } from "express";
import { categorieController } from "./categorie.controller";

const categorieRouter = Router();

categorieRouter.get("/", categorieController.getCategories);

categorieRouter.get("/list", categorieController.getCategoriesList);

categorieRouter.get(
  "/categorie/:categorieId",
  categorieController.getCategorie,
);

categorieRouter.post("/categorie/create", categorieController.createCategorie);

categorieRouter.patch(
  "/categorie/update/:categorieId",
  categorieController.updateCategorie,
);

categorieRouter.delete(
  "/categorie/delete/:categorieId",
  categorieController.deleteCategorie,
);

export default categorieRouter;
