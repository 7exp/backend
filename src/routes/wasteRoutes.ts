import { Router } from "express";
import { accessValidationAdmin, accessValidation } from "../middleware/authMiddleware";
import { getAllWastes, getWasteById } from "../controllers/wasteController";

const router = Router();

router.get("/", accessValidation, getAllWastes);
router.get("/:id", accessValidation, getWasteById);

export default router;
