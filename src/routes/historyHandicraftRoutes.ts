import { Router } from "express";
import { createHistoryHandicraft, deleteHistoryHandicraft, editHistoryHandicraft, getAllHistoryHandicraft, getHistoryHandicraft } from "../controllers/historyHandicraftController";
import { accessValidation } from "../middleware/authMiddleware";
import { historyHandicraftValidation } from "../middleware/historyHandicraftController";
import { handicraftValidation } from "../middleware/handicraftMiddleware";

const router = Router();

router.post("/", accessValidation, handicraftValidation, createHistoryHandicraft);
router.get("/", accessValidation, getAllHistoryHandicraft);
router.get("/:id", accessValidation, getHistoryHandicraft);
router.put("/:id", accessValidation, historyHandicraftValidation, editHistoryHandicraft);
router.delete("/:id", accessValidation, historyHandicraftValidation, deleteHistoryHandicraft);

export default router;
