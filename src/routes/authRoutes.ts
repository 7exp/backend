import { Router } from "express";
import { googleAuth, googleCallback, register, login } from "../controllers/authController";

const router = Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/register", register);
router.post("/login", login);

export default router;
