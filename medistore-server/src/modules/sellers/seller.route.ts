import { Router } from "express";
import { sellerController } from "./seller.controller";

const sellerRouter = Router();

sellerRouter.post("/sing-up", sellerController.singUpSeller);

export default sellerRouter;
