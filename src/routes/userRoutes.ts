import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, getUsersById } from "../controllers/userController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

router.post("/", accessValidation, createUser);
router.get("/", accessValidation, getUsers);
// get user by id
router.get("/:id", accessValidation, getUsersById);
router.patch("/:id", accessValidation, updateUser);
router.delete("/:id", accessValidation, deleteUser);

export default router;
