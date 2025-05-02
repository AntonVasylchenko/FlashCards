import { Router } from "express";
import { deskControllers } from "../controllers/index.js";
import { authenticateUser } from "../middleware/authentication.js"

const router = Router();

router
  .route("")
  .get(authenticateUser, deskControllers.getDesks);

router
  .route("/:id")
  .get(authenticateUser, deskControllers.getDesk);

export default router;