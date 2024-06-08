import { Router } from "express";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { upload } from "../utils/multer";
import { updateImageHandicraft, updateImageDetailHandicraft } from "../controllers/imageUploadController";

const router = Router();

router.put("/handicraft/:id", accessValidation, handicraftValidation, upload.single("image"), updateImageHandicraft);
router.put("/detailhandicraft/:id", accessValidation, handicraftValidation, upload.single("image"), updateImageDetailHandicraft);

export default router;
