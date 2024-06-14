import { Router } from "express";
import { fyp, trendingHandicrafts, continueHandicraft } from "../controllers/dashboardController";

const router = Router();

router.get("/fyp/:id", fyp);
router.get("/trending", trendingHandicrafts);
router.get("/continue", continueHandicraft);

export default router;
