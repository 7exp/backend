import { Router } from "express";
import { createLike, deleteLike, getLikeByUserId } from "../controllers/likeController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidation, createLike);
router.delete("/:id", accessValidation, deleteLike);
router.get("/:id", accessValidation, getLikeByUserId);

export default router;
