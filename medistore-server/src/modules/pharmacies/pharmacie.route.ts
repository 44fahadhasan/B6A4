import { Router } from "express";
import { Permission } from "../../constants/permissions";
import UserRole from "../../constants/roles";
import auth from "../../middlewares/auth.middleware";
import { pharmacieController } from "./pharmacie.controller";

const pharmacieRouter = Router();

pharmacieRouter.get(
  "/seller",
  auth(UserRole.seller, [Permission.VIEW]),
  pharmacieController.getPharmaciesForSeller,
);

pharmacieRouter.get(
  "/admin",
  auth(UserRole.admin, [Permission.VIEW]),
  pharmacieController.getPharmaciesForAdmin,
);

pharmacieRouter.get(
  "/pharmacie/:pharmacieId",
  pharmacieController.getPharmacie,
);

pharmacieRouter.get(
  "/pharmacie/:pharmacieId/admin",
  auth(UserRole.admin, [Permission.VIEW]),
  pharmacieController.getPharmacieForAdmin,
);

pharmacieRouter.post(
  "/pharmacie/create",
  auth(UserRole.seller, [Permission.ADD]),
  pharmacieController.createPharmacie,
);

pharmacieRouter.patch(
  "/pharmacie/update/:pharmacieId",
  auth(UserRole.seller, [Permission.EDIT]),
  pharmacieController.updatePharmacie,
);

pharmacieRouter.delete(
  "/pharmacie/delete/:pharmacieId",
  auth(UserRole.seller, [Permission.DELETE]),
  pharmacieController.deletePharmacie,
);

export default pharmacieRouter;
