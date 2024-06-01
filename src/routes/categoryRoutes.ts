import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController";
import { accessValidationAdmin } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidationAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.patch("/:id", accessValidationAdmin, updateCategory);
router.delete("/:id", accessValidationAdmin, deleteCategory);

export default router;
