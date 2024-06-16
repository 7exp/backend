import { Router } from "express";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { deleteImageHandicraft, deleteImageDetailHandicraft, deleteImageUser } from "../controllers/imageDeleteController";

const router = Router();

router.delete("/handicraft/:id", accessValidation, handicraftValidation, deleteImageHandicraft);
router.delete("/detailhandicraft/:id", accessValidation, handicraftValidation, deleteImageDetailHandicraft);
router.delete("/user/:id", accessValidation, deleteImageUser);

export default router;
