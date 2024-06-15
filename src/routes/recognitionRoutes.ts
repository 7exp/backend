import { Router } from "express";
import { accessValidation } from "../middleware/authMiddleware";
import { upload } from "../utils/multer";
import { recognition } from "../controllers/recognitionController";

const router = Router();

router.post("/", accessValidation, upload.single("image"), recognition);

export default router;
