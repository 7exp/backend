import { Router } from "express";
import { fyp } from "../controllers/dashboardController";

const router = Router();

router.get("/:id", fyp);

export default router;
