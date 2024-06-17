import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser, getUsersById, updatePassword, updateUserRole, deleteSelf } from "../controllers/userController";
import { accessValidation, accessValidationAdmin, accessValidationSelf } from "../middleware/authMiddleware";

const router = Router();

router.get("/", accessValidation, getUsers);
// get user by id
router.get("/:id", accessValidation, getUsersById);
router.put("/:id", accessValidation, updateUser);
router.post("/", accessValidationAdmin, createUser);
router.delete("/:id", accessValidationAdmin, deleteUser);
router.put("/:id/updatePassword", accessValidation, updatePassword);
router.put("/:id/updateRole", accessValidationAdmin, updateUserRole);
router.delete("/deleteself/:id", accessValidationSelf, deleteSelf);

export default router;
