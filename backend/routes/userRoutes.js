import { Router } from "express";
import { userControllers } from "../controllers/index.js";

const router = Router();

router
  .route("/check")
  .post(userControllers.checkUser);

export default router;