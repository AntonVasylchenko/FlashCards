import { Router } from "express";
import { cardControllers } from "../controllers/index.js";
import { authenticateUser } from "../middleware/authentication.js"

const router = Router();

router
  .route("")
  .get(authenticateUser, cardControllers.getCards)
  .post(authenticateUser, cardControllers.createCard)

router
  .route("/:id")
  .get(authenticateUser, cardControllers.getCard)
  .patch(authenticateUser, cardControllers.updateCard)
  .delete(authenticateUser, cardControllers.deleteCard)

export default router;