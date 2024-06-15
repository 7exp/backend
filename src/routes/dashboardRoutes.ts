import { Router } from "express";
import { fyp, trendingHandicrafts, continueHandicraft, recentlyAdded } from "../controllers/dashboardController";

const router = Router();

router.get("/fyp/:id", fyp);
router.get("/trending", trendingHandicrafts);
router.get("/continue", continueHandicraft);
router.get("/recently", recentlyAdded);

export default router;
