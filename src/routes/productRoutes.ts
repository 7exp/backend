import { Router } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidation, createProduct);
router.get("/", accessValidation, getProducts);
router.patch("/:id", accessValidation, updateProduct);
router.delete("/:id", accessValidation, deleteProduct);

export default router;
