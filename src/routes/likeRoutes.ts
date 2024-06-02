import { Router } from "express";
import { createLike, deleteLike } from "../controllers/likeController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidation, createLike);
router.delete("/:id", accessValidation, deleteLike);

export default router;
