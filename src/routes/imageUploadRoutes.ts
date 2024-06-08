import { Router } from "express";
import { accessValidation } from "../middleware/authMiddleware";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { upload } from "../utils/multer";
import { updateImageHandicraft, updateImageDetailHandicraft, updateImageUser } from "../controllers/imageUploadController";

const router = Router();

router.put("/handicraft/:id", accessValidation, handicraftValidation, upload.single("image"), updateImageHandicraft);
router.put("/detailhandicraft/:id", accessValidation, handicraftValidation, upload.single("image"), updateImageDetailHandicraft);
router.put("/user/:id", accessValidation, upload.single("image"), updateImageUser);

export default router;
