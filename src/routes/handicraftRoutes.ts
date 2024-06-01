import { Router } from "express";
import { createHandicraft, getAllHandicrafts, getHandicraftById, updateHandicraft, deleteHandicraft } from "../controllers/handicraftController";
import { accessValidationAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidationAdmin, createHandicraft);
router.get("/", getAllHandicrafts);
router.get("/:id", getHandicraftById);
router.put("/:id", accessValidationAdmin, updateHandicraft);
router.delete("/:id", accessValidationAdmin, deleteHandicraft);

export default router;
