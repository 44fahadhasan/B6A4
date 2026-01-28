import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { categorieController } from "./categorie.controller";

const categorieRouter = Router();

categorieRouter.get(
  "/",
  auth(UserRole.admin, [Permission.VIEW]),
  categorieController.getCategories,
);

categorieRouter.get("/list", categorieController.getCategoriesList);

categorieRouter.get(
  "/categorie/:categorieId",
  auth(UserRole.admin, [Permission.VIEW]),
  categorieController.getCategorie,
);

categorieRouter.post(
  "/categorie/create",
  auth(UserRole.admin, [Permission.ADD]),
  categorieController.createCategorie,
);

categorieRouter.patch(
  "/categorie/update/:categorieId",
  auth(UserRole.admin, [Permission.EDIT]),
  categorieController.updateCategorie,
);

categorieRouter.delete(
  "/categorie/delete/:categorieId",
  auth(UserRole.admin, [Permission.DELETE]),
  categorieController.deleteCategorie,
);

export default categorieRouter;
