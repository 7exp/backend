import { Router } from "express";
import { healthCheck } from "../controllers/healthController";
import { accessValidationAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", healthCheck);

export default router;
