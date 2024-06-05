import { Router } from "express";
import { accessValidationAdmin, accessValidation } from "../middleware/authMiddleware";
import { createWaste, getAllWastes, getWasteById, updateWaste, deleteWaste } from "../controllers/wasteController";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 1024 * 1024 * 5, 5 MB
  //   },
});

router.post("/", accessValidationAdmin, upload.single("file"), createWaste); // Apply multer middleware here
router.get("/", accessValidation, getAllWastes);
router.get("/:id", accessValidation, getWasteById);
router.put("/:id", accessValidationAdmin, upload.single("file"), updateWaste); // Apply multer middleware here
router.delete("/:id", accessValidationAdmin, deleteWaste);
// router.post("/upload", accessValidationAdmin, upload);

export default router;
