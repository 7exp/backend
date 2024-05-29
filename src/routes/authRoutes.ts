import { Router } from "express";
import { googleAuth, googleCallback, register, login, logout, getUserInfo } from "../controllers/authController";

const router = Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserInfo);
router.delete("/logout", logout);

export default router;
