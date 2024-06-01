import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, getUsersById } from "../controllers/userController";
import { accessValidation, accessValidationAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", accessValidation, getUsers);
// get user by id
router.get("/:id", accessValidation, getUsersById);
router.put("/:id", accessValidation, updateUser);
router.post("/", accessValidationAdmin, createUser);
router.delete("/:id", accessValidationAdmin, deleteUser);

export default router;
