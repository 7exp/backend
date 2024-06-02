import { Router } from "express";
import { createDetailHandicraft, getDetailHandicraft, editDetailHandicraft, deleteDetailHandicraft } from "../controllers/detailHandicraftController";
import { handicraftValidation } from "../middleware/handicraftMiddleware";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.post("/:id_handicraft", accessValidation, handicraftValidation, createDetailHandicraft);
router.get("/:id", accessValidation, getDetailHandicraft);
router.get("/", accessValidation, getDetailHandicraft);
router.put("/:id", accessValidation, handicraftValidation, editDetailHandicraft);
router.delete("/:id", accessValidation, handicraftValidation, deleteDetailHandicraft);
