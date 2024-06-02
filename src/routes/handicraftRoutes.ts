import { Router } from "express";
import { createHandicraft, getAllHandicrafts, getHandicraftById, updateHandicraft, deleteHandicraft } from "../controllers/handicraftController";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";

const router = Router();

router.post("/", accessValidation, createHandicraft);
router.get("/", accessValidation, getAllHandicrafts);
router.get("/:id", accessValidation, getHandicraftById);
router.put("/:id", accessValidation, handicraftValidation, updateHandicraft);
router.delete("/:id", accessValidation, handicraftValidation, deleteHandicraft);

export default router;
