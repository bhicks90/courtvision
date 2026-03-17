import { Router } from "express";
import * as playerController from "../controllers/playerController";

const router = Router();

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayerById);

export default router;