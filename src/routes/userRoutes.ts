import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, getUsersById, updatePassword, updateUserRole } from "../controllers/userController";
import { accessValidation, accessValidationAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", accessValidation, getUsers);
// get user by id
router.get("/:id", accessValidation, getUsersById);
router.put("/:id", accessValidation, updateUser);
router.post("/", accessValidationAdmin, createUser);
router.delete("/:id", accessValidationAdmin, deleteUser);
router.put("/:id/updatePassword", accessValidation, updatePassword);
router.put("/:id/updateRole", accessValidationAdmin, updateUserRole);

export default router;
