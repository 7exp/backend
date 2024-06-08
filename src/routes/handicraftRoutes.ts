import { Router } from "express";
import { createHandicraft, getAllHandicrafts, getHandicraftById, updateHandicraft, deleteHandicraft, searchHandicraft } from "../controllers/handicraftController";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { upload } from "../utils/multer";

const router = Router();

router.post("/", accessValidation, upload.single("image"), createHandicraft);
router.get("/search", accessValidation, searchHandicraft);
router.get("/", accessValidation, getAllHandicrafts);
router.get("/:id", accessValidation, getHandicraftById);
router.put("/:id", accessValidation, handicraftValidation, updateHandicraft);
router.delete("/:id", accessValidation, handicraftValidation, deleteHandicraft);

export default router;
