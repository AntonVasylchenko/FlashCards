import { Router } from "express";
import { deskControllers } from "../controllers/index.js";
import { authenticateUser } from "../middleware/authentication.js"

const router = Router();

router
  .route("")
  .get(authenticateUser, deskControllers.getDesks)
  .post(authenticateUser, deskControllers.createDesk)

router
  .route("/:id")
  .get(authenticateUser, deskControllers.getDesk)
  .delete(authenticateUser, deskControllers.deleteDesk)
  .patch(authenticateUser, deskControllers.updateDesk);

export default router;