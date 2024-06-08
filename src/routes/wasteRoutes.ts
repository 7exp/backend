import { Router } from "express";
import { accessValidationAdmin, accessValidation } from "../middleware/authMiddleware";
import { createWaste, getAllWastes, getWasteById, updateWaste, deleteWaste } from "../controllers/wasteController";
import { upload } from "../utils/multer";

const router = Router();

router.post("/", accessValidationAdmin, upload.single("file"), createWaste); // Apply multer middleware here
router.get("/", accessValidation, getAllWastes);
router.get("/:id", accessValidation, getWasteById);
router.put("/:id", accessValidationAdmin, upload.single("file"), updateWaste); // Apply multer middleware here
router.delete("/:id", accessValidationAdmin, deleteWaste);
// router.post("/upload", accessValidationAdmin, upload);

export default router;
