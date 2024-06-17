import { Router } from "express";
import { googleAuth, googleCallback, register, login, logout, getUserInfo, getUserSelf } from "../controllers/authController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserInfo);
router.get("/self", accessValidation, getUserSelf);
router.post("/logout", accessValidation, logout);

export default router;
