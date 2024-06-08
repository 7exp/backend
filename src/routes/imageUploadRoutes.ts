import { Router } from "express";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { upload } from "../utils/multer";
import { updateImageHandicraft, updateImageDetailHandicraft, updateImageUser } from "../controllers/imageUploadController";

const router = Router();

router.put("/:id/updateHandicraft", accessValidation, handicraftValidation, upload.single("image"), updateImageHandicraft);
router.put("/:id/updateDetailHandicraft", accessValidation, handicraftValidation, upload.single("image"), updateImageDetailHandicraft);
router.put("/:id/updateUser", accessValidation, upload.single("image"), updateImageUser);

export default router;
